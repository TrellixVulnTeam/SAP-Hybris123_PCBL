/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.activator.impl

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.deltadetection.ChangeDetectionService
import de.hybris.deltadetection.ChangesCollector
import de.hybris.deltadetection.StreamConfiguration
import de.hybris.platform.catalog.model.CatalogModel
import de.hybris.platform.catalog.model.CatalogVersionModel
import de.hybris.platform.category.model.CategoryModel
import de.hybris.platform.core.Registry
import de.hybris.platform.core.model.type.ComposedTypeModel
import de.hybris.platform.cronjob.enums.CronJobResult
import de.hybris.platform.cronjob.enums.CronJobStatus
import de.hybris.platform.cronjob.model.CronJobModel
import de.hybris.platform.integrationservices.IntegrationObjectModelBuilder
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.ItemTracker
import de.hybris.platform.integrationservices.util.Log
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade
import de.hybris.platform.outboundservices.service.DeleteRequestSender
import de.hybris.platform.outboundservices.util.TestDeleteRequestSender
import de.hybris.platform.outboundservices.util.TestOutboundFacade
import de.hybris.platform.outboundsync.OutboundChannelConfigurationBuilder
import de.hybris.platform.outboundsync.job.impl.OutboundSyncCronJobPerformable
import de.hybris.platform.outboundsync.util.OutboundSyncEssentialData
import de.hybris.platform.outboundsync.util.OutboundSyncTestUtil
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.cronjob.CronJobService
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestClientException
import spock.lang.AutoCleanup
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
@Issue('https://jira.hybris.com/browse/STOUT-3466')
class DeleteOutboundSyncJobStateIntegrationTest extends ServicelayerSpockSpecification {
    private static final def TEST_NAME = "DeleteOutboundSyncJobState"
    private static final def IO = "${TEST_NAME}_IO"
    private static final def CATEGORY_CODE = "${TEST_NAME}_Category"
    private static final def CATEGORY_CODE_1 = "${CATEGORY_CODE}1"
    private static final def CATALOG = "${TEST_NAME}_Catalog"
    private static final def CATALOG_VERSION = 'DeleteOutboundSyncJobState'
    private static final def CHANNEL_CODE = "${TEST_NAME}_OutboundChannelConfiguration"
    private static final def DESTINATION_ID = "${TEST_NAME}_Destination"

    @Resource(name = 'defaultOutboundSyncService')
    private DefaultOutboundSyncService outboundSyncService
    private OutboundServiceFacade originalOutboundServiceFacade
    @Resource(name = 'defaultDeleteOutboundSyncService')
    private DefaultDeleteOutboundSyncService deleteOutboundSyncService
    private DeleteRequestSender originalDeleteRequestSender
    @Resource
    private ChangeDetectionService changeDetectionService

    @Shared
    @ClassRule
    OutboundSyncEssentialData essentialData = OutboundSyncEssentialData.outboundSyncEssentialData()

    @Rule
    ItemTracker itemTracker = ItemTracker.track CategoryModel
    @Rule
    TestOutboundFacade testOutboundFacade = new TestOutboundFacade()
    @Rule
    TestDeleteRequestSender testDeleteRequestSender = new TestDeleteRequestSender()
    @Rule
    OutboundChannelConfigurationBuilder outboundChannelBuilder = outboundChannelConfigurationBuilder()
            .withCode(CHANNEL_CODE)
            .withDeleteSynchronization()
            .withConsumedDestination(consumedDestinationBuilder().withId(DESTINATION_ID))
            .withIntegrationObjectCode IO
    @Rule
    IntegrationObjectModelBuilder categoryIO = integrationObject()
            .withCode(IO)
            .withItem(integrationObjectItem().withCode('Category').root()
                    .withAttribute(integrationObjectItemAttribute().withName('code')))
    @AutoCleanup('cleanup')
    def streamBuilder = outboundSyncStreamConfigurationBuilder()
            .withOutboundChannelCode(CHANNEL_CODE)
            .withItemType('Category')

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
        contextJob = new OutboundSyncJob()

        originalOutboundServiceFacade = outboundSyncService.outboundServiceFacade
        outboundSyncService.outboundServiceFacade = testOutboundFacade

        originalDeleteRequestSender = deleteOutboundSyncService.deleteRequestSender
        deleteOutboundSyncService.deleteRequestSender = testDeleteRequestSender
    }

    def cleanup() {
        outboundSyncService.outboundServiceFacade = originalOutboundServiceFacade
        deleteOutboundSyncService.deleteRequestSender = originalDeleteRequestSender
    }

    @Test
    def 'delete outboundsync job is immediately FINISHED when there are no changes'() {
        when: 'the job is executed without changes present'
        contextJob.start()

        then: 'its status is changed to FINISHED'
        with(contextJob.refresh()) {
            status == CronJobStatus.FINISHED
            result == CronJobResult.SUCCESS
        }
    }

    @Test
    def 'delete outboundsync job finishes successfully when all changes are sent'() {
        given: 'initial change detected for category creation'
        categoriesChanged CATEGORY_CODE
        streamBuilder.build()

        and: 'delete the same category'
        deleteCategories CATEGORY_CODE

        when:
        contextJob.start()

        then: 'its status is changed to FINISHED with SUCCESS result'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.FINISHED
                assert result == CronJobResult.SUCCESS
            }
            and: 'the change is consumed'
            streamBuilder.allChanges.empty
        }
    }

    @Test
    def 'delete outboundsync job fails when at least one change is not sent'() {
        given: 'initial change detected for category creation'
        categoriesChanged CATEGORY_CODE, CATEGORY_CODE_1
        streamBuilder.build()

        and: 'delete the same categories'
        deleteCategories CATEGORY_CODE, CATEGORY_CODE_1

        and: 'responses from the sync destination for the changes are failure and then success'
        testDeleteRequestSender
                .throwException(new RestClientException('IGNORE - Testing Exception - Failed delete sync'))
                .doAndRespondWith(ResponseEntity.ok(), {})

        when:
        contextJob.start()

        then: 'its status is changed to FINISHED with ERROR'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.FINISHED
                assert result == CronJobResult.ERROR
            }
            and: 'the changes are consumed'
            streamBuilder.allChanges.empty
        }
    }

    @Test
    def 'delete outboundsync job reports ERROR when something unexpected happens'() {
        given: 'initial change detected for category creation'
        categoriesChanged CATEGORY_CODE
        streamBuilder.build()

        and: 'the delete sync service is misconfigured'
        deleteOutboundSyncService.deleteRequestSender = null

        and: 'delete the same category'
        deleteCategories CATEGORY_CODE

        when:
        contextJob.start()

        then: 'its status is changed to FINISHED with ERROR'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.FINISHED
                assert result == CronJobResult.ERROR
            }
            and: 'the change is consumed'
            streamBuilder.allChanges.empty
        }

        cleanup: 'restore the deleteRequestSender'
        deleteOutboundSyncService.deleteRequestSender = testDeleteRequestSender
    }

    @Test
    def 'job aborted before items sent to destination has UNKNOWN result'() {
        given: 'initial change detected for category creation'
        categoriesChanged CATEGORY_CODE
        streamBuilder.build()

        and: 'delete the same category'
        deleteCategories CATEGORY_CODE

        and: "change the job performable's change detection service to abort the job before collecting the changes"
        def jobPerformable = Registry.applicationContext.getBean 'defaultOutboundSyncCronJobPerformable', OutboundSyncCronJobPerformable
        jobPerformable.changeDetectionService = Stub(ChangeDetectionService) {
            collectChangesForType(_ as ComposedTypeModel, _ as StreamConfiguration, _ as ChangesCollector) >> { List args ->
                contextJob.refresh().abort()
                changeDetectionService.collectChangesForType(args[0] as ComposedTypeModel, args[1] as StreamConfiguration, args[2] as ChangesCollector)
            }
        }
        
        when:
        contextJob.start()

        then: 'eventually job status is changed to ABORTED'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.ABORTED
                assert result == CronJobResult.UNKNOWN
            }
            and: 'changes are consumed'
            assert streamBuilder.allChanges.empty
            and: 'no items sent'
            assert testDeleteRequestSender.invocations() == 0
        }

        cleanup: 'restore the change detection service'
        jobPerformable.changeDetectionService = changeDetectionService
    }

    @Test
    @Unroll
    def "job aborted after an item #condition has #res result"() {
        given: 'initial change detected for category creation'
        def categories = (1..50).collect { "${CATEGORY_CODE}$it" }
        categoriesChanged categories
        streamBuilder.build()

        and: 'delete the same categories'
        deleteCategories categories
        
        and: 'the job is aborted while the change is being sent'
        def runnable = {
            contextJob.refresh().abort()
            sleep(1000)
        }
        testDeleteRequestSender
                .doAndRespondWith(response, runnable)
                .doAndRespondWith(ResponseEntity.ok(), {})
        
        when:
        contextJob.start()

        then: 'final job status is changed to ABORTED'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                assert status == CronJobStatus.ABORTED
                assert result == res
            }
            and: 'changes are consumed'
            assert streamBuilder.allChanges.empty
            and: 'items sent is less than delete changes'
            assert testDeleteRequestSender.invocations() < categories.size()
        }

        where:
        condition              | response                  | res
        'is sent successfully' | ResponseEntity.ok()       | CronJobResult.SUCCESS
        'failed to send'       | ResponseEntity.notFound() | CronJobResult.ERROR
    }

    @Test
    def 'job does not start again when it is already running'() {
        given: 'initial change detected for category creation'
        categoriesChanged CATEGORY_CODE
        streamBuilder.build()

        and: 'delete the same category'
        deleteCategories CATEGORY_CODE

        and: 'delete response takes a long time which prevents current job from finishing'
        testDeleteRequestSender.doAndRespondWith(ResponseEntity.ok(), { sleep(1000) })
        
        when: 'the job is started for delete'
        contextJob.start()

        and: 'a new category is added, start the job again -> job is not started while one is in progress already, so testOutboundFacade is not invoked'
        categoriesChanged CATEGORY_CODE_1
        contextJob.start()

        then: 'after the job finishes only delete change is processed, the create change is not'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                status == CronJobStatus.FINISHED
                result == CronJobResult.SUCCESS
            }
            assert streamBuilder.allChanges.size() == 1
            assert testOutboundFacade.invocations() == 0
            assert testDeleteRequestSender.invocations() == 1
        }
    }

    @Test
    def 'job synchronizes new and delete items'() {
        given: 'initial change detected for category creation'
        categoriesChanged CATEGORY_CODE
        streamBuilder.build()

        and: 'delete the same category'
        deleteCategories CATEGORY_CODE

        and: 'add a new category'
        categoriesChanged CATEGORY_CODE_1

        when:
        contextJob.start()

        then: 'both changes are synchronized'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                status == CronJobStatus.FINISHED
                result == CronJobResult.SUCCESS
            }
            assert streamBuilder.allChanges.empty
            assert testOutboundFacade.invocations() == 1 // for CATEGORY_CODE_1
            assert testDeleteRequestSender.invocations() == 1 // for CATEGORY_CODE
        }
    }

    @Test
    def 'delete outbound sync aborts causes synchronizing of new items to abort too'() {
        given: 'initial change detected for category creation'
        def categoriesToDelete = (1..50).collect { "${CATEGORY_CODE}$it" }
        categoriesChanged categoriesToDelete
        streamBuilder.build()

        and: 'delete the same categories'
        deleteCategories categoriesToDelete
        
        and: 'abort while synchronizing delete'
        def runnable = {
            contextJob.abort()
            sleep(1000)
        }
        testDeleteRequestSender.doAndRespondWith(ResponseEntity.ok(), runnable)
        
        and: 'new categories are added'
        def newCategories = (1..50).collect { "${CATEGORY_CODE}_NEW$it" }
        categoriesChanged newCategories
        
        when:
        contextJob.start()

        then: 'job aborted without finishing synchronizing both new and deleted items'
        eventualCondition().expect {
            with(contextJob.refresh()) {
                status == CronJobStatus.ABORTED
                result == CronJobResult.SUCCESS
            }
            assert !streamBuilder.allChanges.empty
            assert testOutboundFacade.invocations() < newCategories.size()
            assert testDeleteRequestSender.invocations() < categoriesToDelete.size()
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

    private static void deleteCategories(String... codes) {
        deleteCategories(codes as List)
    }

    private static void deleteCategories(List codes) {
        def impexLines = ['REMOVE Category; code[unique = true]']
        impexLines.addAll codes.collect({ "                      ; $it" })
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
