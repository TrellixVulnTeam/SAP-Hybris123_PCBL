/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.catalog.model.CatalogModel
import de.hybris.platform.catalog.model.CatalogVersionModel
import de.hybris.platform.category.model.CategoryModel
import de.hybris.platform.core.Registry
import de.hybris.platform.cronjob.enums.CronJobResult
import de.hybris.platform.cronjob.enums.CronJobStatus
import de.hybris.platform.cronjob.model.CronJobModel
import de.hybris.platform.integrationservices.exception.IntegrationAttributeException
import de.hybris.platform.integrationservices.exception.IntegrationAttributeProcessingException
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.ItemTracker
import de.hybris.platform.integrationservices.util.Log
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade
import de.hybris.platform.outboundservices.util.TestOutboundFacade
import de.hybris.platform.outboundsync.activator.impl.DefaultOutboundSyncService
import de.hybris.platform.outboundsync.job.impl.OutboundSyncCronJobPerformable
import de.hybris.platform.outboundsync.util.OutboundSyncEssentialData
import de.hybris.platform.outboundsync.util.OutboundSyncTestUtil
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.cronjob.CronJobService
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import org.springframework.http.ResponseEntity
import spock.lang.AutoCleanup
import spock.lang.Ignore
import spock.lang.Issue
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

import javax.annotation.Resource

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.EventualCondition.eventualCondition
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder
import static de.hybris.platform.outboundsync.OutboundChannelConfigurationBuilder.outboundChannelConfigurationBuilder
import static de.hybris.platform.outboundsync.OutboundSyncStreamConfigurationBuilder.outboundSyncStreamConfigurationBuilder

@IntegrationTest
@Issue('https://jira.hybris.com/browse/STOUT-3404')
@Ignore('https://cxjira.sap.com/browse/IAPI-4558')
class OutboundSyncJobStateIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "OutboundSyncJobState"
    private static final String IO = "${TEST_NAME}_IO"
    private static final URI SOME_URI = new URI('//does.not/matter')
    private static final String CATALOG = "${TEST_NAME}_Catalog"
    private static final String CATEGORY_CODE1 = "${TEST_NAME}_Category_1"
    private static final String CATEGORY_CODE2 = "${TEST_NAME}_Category_2"
    private static final String CATEGORY_CODE3 = "${TEST_NAME}_Category_3"
    private static final String CATALOG_VERSION = 'OutboundSyncJobState'
    private static final String CHANNEL_CODE = "${TEST_NAME}_OutboundChannelConfiguration"
    private static final String STREAM_ID = "${TEST_NAME}_StreamConfiguration"

    @Resource
    private CronJobService cronJobService
    @Resource(name = 'outboundSyncService')
    private DefaultOutboundSyncService outboundSyncService
    private OutboundServiceFacade originalOutboundServiceFacade

    @Shared
    @ClassRule
    OutboundSyncEssentialData essentialData = OutboundSyncEssentialData.outboundSyncEssentialData()
    @Rule
    TestOutboundFacade testOutboundFacade = new TestOutboundFacade()
    @Rule
    OutboundChannelConfigurationBuilder channelBuilder = outboundChannelConfigurationBuilder()
            .withCode(CHANNEL_CODE)
            .withConsumedDestination(consumedDestinationBuilder().withId('outboundsync-job-state'))
            .withIntegrationObject integrationObject().withCode(IO)
            .withItem(integrationObjectItem().withCode('Category').root()
                    .withAttribute(integrationObjectItemAttribute().withName('code')))
    @AutoCleanup('cleanup')
    OutboundSyncStreamConfigurationBuilder streamBuilder = outboundSyncStreamConfigurationBuilder()
            .withOutboundChannelCode(CHANNEL_CODE)
            .withId(STREAM_ID)
            .withItemType('Category')
    @Rule
    ItemTracker itemTracker = ItemTracker.track CategoryModel

    OutboundSyncJob contextJob

    def setupSpec() {
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Catalog; id[unique=true]',
                "                     ; $CATALOG",
                'INSERT_UPDATE CatalogVersion; version[unique=true]; catalog(id)[unique=true]',
                "                            ; $CATALOG_VERSION    ; $CATALOG")
    }

    def cleanupSpec() {
        IntegrationTestUtil.removeSafely CatalogVersionModel, { it.version == CATALOG_VERSION }
        IntegrationTestUtil.removeSafely CatalogModel, { it.id == CATALOG }
    }

    def setup() {
        streamBuilder.build()
        contextJob = new OutboundSyncJob()
        originalOutboundServiceFacade = outboundSyncService.outboundServiceFacade
        outboundSyncService.outboundServiceFacade = testOutboundFacade
    }

    def cleanup() {
        outboundSyncService.outboundServiceFacade = originalOutboundServiceFacade
    }

    @Test
    def 'outboundsync job is immediately FINISHED when there are no changes'() {
        when: 'the job is executed without changes present'
        contextJob.start()

        then: 'its status is changed to FINISHED'
        with(contextJob.refresh()) {
            status == CronJobStatus.FINISHED
            result == CronJobResult.SUCCESS
        }
    }

    @Test
    def 'outboundsync job has RUNNING status while changes are being sent'() {
        given: 'at least one change is present'
        categoriesChanged(CATEGORY_CODE1)

        when: 'the job is executed'
        contextJob.start()

        then: 'its status is changed to RUNNING'
        with(contextJob.refresh()) {
            assert status == CronJobStatus.RUNNING
            assert result == CronJobResult.UNKNOWN
        }

        then:
        eventualCondition().expect {
            assert contextJob.refresh().status == CronJobStatus.FINISHED
        }
    }

    @Test
    def 'outboundsync job finishes successfully when all changes are sent'() {
        given: 'changes are present'
        categoriesChanged(CATEGORY_CODE1, CATEGORY_CODE2)

        when: 'the job is executed'
        contextJob.start()

        then: 'its status is changed to FINISHED with SUCCESS result'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.FINISHED
                assert result == CronJobResult.SUCCESS
            }
        }
    }

    @Test
    def 'outboundsync job fails when at least one change is not sent'() {
        given: 'changes are present'
        def willFail = CATEGORY_CODE1
        def willPass = CATEGORY_CODE2
        categoriesChanged(willFail, willPass)
        and: 'responses from the sync destination for the changes are failure and then success'
        testOutboundFacade
                .respondWithBadRequest()
                .respondWithCreated()

        when: 'the job is executed'
        contextJob.start()

        then: 'its status is changed to FINISHED with ERROR'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.FINISHED
                assert result == CronJobResult.ERROR
            }
        }
    }

    @Test
    def 'outboundsync job reports FAILURE when something unexpected happens'() {
        setup: 'the job is misconfigured'
        def jobPerformable = Registry.applicationContext.getBean 'defaultOutboundSyncCronJobPerformable', OutboundSyncCronJobPerformable
        def eventServiceBackup = jobPerformable.eventService
        jobPerformable.eventService = null
        and: 'a change is present'
        categoriesChanged(CATEGORY_CODE1)

        when: 'the job is executed'
        contextJob.start()

        then: 'its status is changed to FINISHED with FAILURE'
        with(contextJob.refresh()) {
            assert status == CronJobStatus.FINISHED
            assert result == CronJobResult.FAILURE
        }
        then: 'the change is not consumed'
        !streamBuilder.allChanges.empty

        cleanup: 'restore the itemChangeSender'
        jobPerformable.eventService = eventServiceBackup
    }

    @Test
    def 'job aborted before items processed has UNKNOWN result'() {
        given: 'a change is present'
        categoriesChanged(CATEGORY_CODE1)

        when: 'the job is kicked off'
        contextJob.start()
        and: 'the job is aborted'
        contextJob.abort()

        then: 'job status remains RUNNING while the queued change is not processed'
        contextJob.refresh().status == CronJobStatus.RUNNING

        then: 'eventually job status is changed to ABORTED'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.ABORTED
                // we aborted before any items were processed (5 sec delay for aggregation)
                // and therefore the result is unknown
                assert result == CronJobResult.UNKNOWN
            }
            and: 'changes are not consumed'
            assert !streamBuilder.allChanges.empty
            and: 'no items sent'
            assert testOutboundFacade.invocations() == 0
        }
    }

    @Test
    @Unroll
    def "job aborted after an item #condition has #res result"() {
        given: 'significant number of changes present to give a chance to abort to happen'
        List categories = (1..100).collect { "category$it" }
        categoriesChanged(categories)
        and: 'the job is aborted while the first change is being sent'
        def runnable = {
            contextJob.abort()
            // pause for a second to let the job service to process abort request
            sleep(1000)
        }
        testOutboundFacade
                .doAndRespondWith(response, runnable)
                .respondWithCreated()

        when:
        contextJob.start()

        then: 'final job status is changed to ABORTED'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.ABORTED
                // we aborted before any items were processed (5 sec delay for aggregation)
                // and therefore the result is unknown
                assert result == res
            }
            and: 'changes are not consumed'
            assert !streamBuilder.allChanges.empty
            and: 'no items sent'
            assert testOutboundFacade.invocations() < categories.size()
        }

        where:
        condition              | response                         | res
        'is sent successfully' | ResponseEntity.created(SOME_URI) | CronJobResult.SUCCESS
        'failed to send'       | ResponseEntity.notFound()        | CronJobResult.ERROR
    }

    @Test
    def 'job does not start again when it is already running'() {
        given: 'a change is present'
        categoriesChanged(CATEGORY_CODE1)
        and: 'the job is executed'
        contextJob.start()
        and: 'another change is added'
        categoriesChanged(CATEGORY_CODE2)

        when: 'the job is started again'
        contextJob.start()

        then: 'after the job finishes only first change is processed, the second change is not'
        eventualCondition().expect {
            assert contextJob.refresh().status == CronJobStatus.FINISHED
            assert streamBuilder.allChanges.size() == 1
            assert testOutboundFacade.invocations() == 1
        }
    }

    @Test
    @Issue('https://cxjira.sap.com/browse/IAPI-4067')
    def 'job continues to process when attribute processing error occurs'() {
        given: 'there are a few categories that changed'
        def categories = [CATEGORY_CODE1, CATEGORY_CODE2, CATEGORY_CODE3]
        categoriesChanged(categories)
        and: 'processing of the first changed category fails'
        def exception = Stub IntegrationAttributeProcessingException
        testOutboundFacade
                .throwException(exception)
                .respondWithCreated()

        when: 'the job is executed'
        contextJob.start()

        then: 'job result is ERROR'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.FINISHED
                assert result == CronJobResult.ERROR
            }
            and: 'the error item change is not consumed'
            assert streamBuilder.allChanges.size() == 1
            and: 'all categories were sent to the outbound destination'
            assert testOutboundFacade.invocations() == categories.size()
        }
    }

    @Test
    @Issue('https://cxjira.sap.com/browse/IAPI-4067')
    def 'job stops processing when a systemic attribute error occurs'() {
        given: 'there is significant number of categories to notice that the job is interrupted'
        def categories = (1..100).collect { "category$it" }
        categoriesChanged(categories)
        and: 'processing of the first changed category fails for a system problem but others would succeed'
        def exception = Stub IntegrationAttributeException
        testOutboundFacade
                .throwException(exception)
                .respondWithCreated()

        when: 'the job is executed'
        contextJob.start()

        then: 'job result is FAILURE'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.FINISHED
                assert result == CronJobResult.FAILURE
            }
            and: 'unprocessed category changes are not consumed'
            assert !streamBuilder.allChanges.empty
            and: 'the job was interrupted and not all categories sent'
            assert testOutboundFacade.invocations() < categories.size()
        }
    }

    private static CronJobModel contextCronJob() {
        OutboundSyncTestUtil.outboundCronJob()
    }

    private static void categoriesChanged(String... codes) {
        categoriesChanged(codes as List)
    }

    private static void categoriesChanged(List codes) {
        def impexLines = ['INSERT_UPDATE Category; code[unique = true]; catalogVersion(version, catalog(id))']
        impexLines.addAll codes.collect({ "                      ; $it; $CATALOG_VERSION:$CATALOG" })
        IntegrationTestUtil.importImpEx(impexLines as String[])
    }

    private static class OutboundSyncJob {
        private static final Log LOG = Log.getLogger Specification
        private static final CronJobService cronJobService = Registry.applicationContext.getBean 'cronJobService', CronJobService
        private CronJobModel job

        OutboundSyncJob() {
            job = contextCronJob()
        }

        private OutboundSyncJob(CronJobModel model) {
            job = model
        }

        void start() {
            cronJobService.performCronJob(job, true)
        }

        void abort() {
            cronJobService.requestAbortCronJob(job)
        }

        OutboundSyncJob refresh() {
            def fresh = IntegrationTestUtil.refresh(job)
            LOG.info('Fresh state: {}', toString())
            new OutboundSyncJob(fresh)
        }

        CronJobStatus getStatus() {
            job.status
        }

        CronJobResult getResult() {
            job.result
        }

        String toString() {
            "$job: $job.status $job.result"
        }
    }
}
