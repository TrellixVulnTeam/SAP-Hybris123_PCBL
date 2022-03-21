/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundsync.retry.impl

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.catalog.model.CatalogModel
import de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder
import de.hybris.platform.integrationservices.exception.IntegrationAttributeException
import de.hybris.platform.integrationservices.exception.IntegrationAttributeProcessingException
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade
import de.hybris.platform.outboundservices.util.TestOutboundFacade
import de.hybris.platform.outboundsync.TestItemChangeDetector
import de.hybris.platform.outboundsync.TestOutboundItemConsumer
import de.hybris.platform.outboundsync.activator.OutboundItemConsumer
import de.hybris.platform.outboundsync.activator.impl.DefaultOutboundSyncService
import de.hybris.platform.outboundsync.model.OutboundSyncRetryModel
import de.hybris.platform.outboundsync.retry.SyncRetryService
import de.hybris.platform.outboundsync.util.OutboundSyncEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.config.ConfigurationService
import de.hybris.platform.servicelayer.cronjob.CronJobService
import de.hybris.platform.servicelayer.search.FlexibleSearchService
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.AutoCleanup
import spock.lang.Shared

import javax.annotation.Resource
import java.time.Duration

import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.EventualCondition.eventualCondition
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder
import static de.hybris.platform.outboundsync.OutboundChannelConfigurationBuilder.outboundChannelConfigurationBuilder
import static de.hybris.platform.outboundsync.util.OutboundSyncTestUtil.outboundCronJob

@IntegrationTest
class SyncRetryServiceIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "SyncRetryService"
    private static final String OBJECT_CODE = "${TEST_NAME}_OutboundCatalogIO"
    private static final String ITEM_CODE = 'Catalog'
    private static final String CHANNEL_CODE = "${TEST_NAME}_Channel"
    private static final def CATALOG_ID = "${TEST_NAME}_Catalog"
    private static final def RETRIES_TO_DO = 1

    @Resource
    CronJobService cronJobService
    @Resource
    DefaultOutboundSyncService outboundSyncService
    @Resource
    SyncRetryService syncRetryService
    @Resource
    private FlexibleSearchService flexibleSearchService
    private OutboundServiceFacade outboundServiceFacade
    private OutboundItemConsumer outboundItemConsumer

    @Shared
    @ClassRule
    OutboundSyncEssentialData essentialData = OutboundSyncEssentialData.outboundSyncEssentialData()
    @Rule
    TestOutboundFacade testOutboundFacade = new TestOutboundFacade().respondWithNotFound()
    @Rule
    TestOutboundItemConsumer testOutboundItemConsumer = new TestOutboundItemConsumer()
    @Rule
    TestItemChangeDetector changeDetector = new TestItemChangeDetector()
    @AutoCleanup('cleanup')
    def channelBuilder = outboundChannelConfigurationBuilder()
            .withCode(CHANNEL_CODE)
            .withConsumedDestination(consumedDestinationBuilder().withId("destination_$CHANNEL_CODE"))
            .withIntegrationObject integrationObject().withCode(OBJECT_CODE).withItem(IntegrationObjectItemModelBuilder.integrationObjectItem(ITEM_CODE))


    @Resource(name = "defaultConfigurationService")
    private ConfigurationService configurationService

    def setup() {
        def channel = channelBuilder.build()
        changeDetector.createChangeStream channel, ITEM_CODE

        outboundServiceFacade = outboundSyncService.outboundServiceFacade
        outboundSyncService.setOutboundServiceFacade(testOutboundFacade)
        outboundItemConsumer = outboundSyncService.outboundItemConsumer
        outboundSyncService.setOutboundItemConsumer(testOutboundItemConsumer)
    }

    def cleanup() {
        outboundSyncService.setOutboundServiceFacade(outboundServiceFacade)
        outboundSyncService.setOutboundItemConsumer(outboundItemConsumer)
        IntegrationTestUtil.removeSafely(CatalogModel) { it.id == CATALOG_ID }
    }

    @Test
    def "changes are consumed when retry exceeds max retries"() {
        given:
        setMaxRetries(RETRIES_TO_DO)
        and: 'a change is present'
        def catalog = IntegrationTestUtil.createCatalogWithId(CATALOG_ID)

        when: "the job is executed first time"
        cronJobService.performCronJob outboundCronJob(), true

        then: "the failed change publication is not consumed"
        eventualCondition().expect {
            assert testOutboundItemConsumer.invocations() == 0
            and: 'retry is created'
            def retry = retryFor catalog
            with(retry) {
                assert syncAttempts == 1
                assert remainingSyncAttempts == RETRIES_TO_DO
            }
        }

        when: "the job is executed second time and the retry max has been reached"
        cronJobService.performCronJob outboundCronJob(), true

        then: "the failed change is consumed"
        eventualCondition().expect {
            assert testOutboundItemConsumer.invocations() == 1
            and: 'retry has been updated for no remaining attempts'
            def retry = retryFor(catalog)
            assert with(retry) {
                syncAttempts == 2
                remainingSyncAttempts == 0
            }
        }
    }

    @Test
    def "changes are consumed when max retries set to 0 and sync fails"() {
        given: 'retries disabled'
        setMaxRetries(0)
        and: 'a change is present'
        def catalog = IntegrationTestUtil.createCatalogWithId(CATALOG_ID)

        when:
        cronJobService.performCronJob outboundCronJob(), true

        then: 'the change is consumed'
        eventualCondition().expect {
            assert testOutboundItemConsumer.invocations() == 1
            and: 'no retry is created'
            assert !retryFor(catalog)
        }
    }

    @Test
    def 'retry is created when IntegrationAttributeProcessingException is thrown for the item'() {
        given: 'retries are enabled'
        setMaxRetries(RETRIES_TO_DO)
        and: 'a change is present'
        def catalog = IntegrationTestUtil.createCatalogWithId CATALOG_ID
        and: 'exception is thrown for the catalog when it is sent'
        def exception = Stub IntegrationAttributeProcessingException
        outboundSyncService.outboundServiceFacade = new TestOutboundFacade().throwException(exception)

        when:
        cronJobService.performCronJob outboundCronJob(), true

        then: 'the retry is created'
        eventualCondition().expect {
            def retry = retryFor catalog
            assert with(retry) {
                syncAttempts == 1
                remainingSyncAttempts == RETRIES_TO_DO
            }
            and: 'the change is not consumed'
            assert testOutboundItemConsumer.invocations() == 0
        }
    }

    @Test
    def 'retries not created when IntegrationAttributeException is thrown for the item'() {
        given: 'retries are enabled'
        setMaxRetries(RETRIES_TO_DO)
        and: 'a change is present'
        def catalog = IntegrationTestUtil.createCatalogWithId CATALOG_ID
        and: 'systemic exception is thrown for the catalog when it is sent'
        def exception = Stub IntegrationAttributeException
        outboundSyncService.outboundServiceFacade = new TestOutboundFacade().throwException(exception)

        when:
        cronJobService.performCronJob outboundCronJob(), true

        then: 'the retry is not created within 6 seconds'
        eventualCondition().within(Duration.ofSeconds(6)).retains {
            assert !retryFor(catalog)
            and: 'the change is not consumed'
            assert testOutboundItemConsumer.invocations() == 0
        }
    }

    def setMaxRetries(int maxRetries) {
        configurationService.getConfiguration().setProperty 'outboundsync.max.retries', String.valueOf(maxRetries)
    }

    private OutboundSyncRetryModel retryFor(CatalogModel catalog) {
        def sample = new OutboundSyncRetryModel(itemPk: catalog.pk.longValue)
        def matches = flexibleSearchService.getModelsByExample sample
        matches.empty ? null : matches[0]
    }
}
