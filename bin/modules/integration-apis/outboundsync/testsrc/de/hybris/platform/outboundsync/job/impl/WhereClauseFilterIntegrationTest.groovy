/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.job.impl

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.cronjob.model.CronJobModel
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.outboundsync.OutboundChannelConfigurationBuilder
import de.hybris.platform.outboundsync.TestItemChangeDetector
import de.hybris.platform.outboundsync.TestItemChangeSender
import de.hybris.platform.outboundsync.TestOutboundItemConsumer
import de.hybris.platform.outboundsync.activator.OutboundItemConsumer
import de.hybris.platform.outboundsync.job.ChangesCollectorFactory
import de.hybris.platform.outboundsync.job.FilteringService
import de.hybris.platform.outboundsync.job.ItemChangeSender
import de.hybris.platform.outboundsync.util.OutboundSyncEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.cronjob.CronJobService
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.AutoCleanup
import spock.lang.Shared

import javax.annotation.Resource

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder
import static de.hybris.platform.outboundsync.OutboundChannelConfigurationBuilder.outboundChannelConfigurationBuilder

@IntegrationTest
class WhereClauseFilterIntegrationTest extends ServicelayerSpockSpecification {

    private static final String TEST_NAME = "WhereClauseFilter"
    private static final String IO = "{$TEST_NAME}_CatalogIO"
    private static final String CHANNEL = "${TEST_NAME}_Channel"
    private static final String CATALOG = "${TEST_NAME}_catalog"

    private static final String FILTER_EXPR = "{item.id}='$CATALOG'"
    @Resource(name = "outboundSyncCronJobPerformable")
    OutboundSyncCronJobPerformable outboundSyncCronJobPerformable
    @Resource
    CronJobService cronJobService
    @Resource
    ItemChangeSender itemChangeSender
    @Rule
    TestOutboundItemConsumer testOutboundItemConsumer = new TestOutboundItemConsumer()
    OutboundItemConsumer originalFilteringServiceItemConsumer
    @Resource(name = 'outboundSyncFilteringService')
    FilteringService filteringService
    ChangesCollectorFactory collectorFactory

    @Shared
    @ClassRule
    OutboundSyncEssentialData essentialData = OutboundSyncEssentialData.outboundSyncEssentialData()
    @Rule
    TestItemChangeSender testItemSender = new TestItemChangeSender()
    @Rule
    TestItemChangeDetector changeDetector = new TestItemChangeDetector()
    @Shared
    @AutoCleanup('cleanup')
    OutboundChannelConfigurationBuilder channel = outboundChannelConfigurationBuilder()
            .withCode(CHANNEL)
            .withConsumedDestination(consumedDestinationBuilder().withId('destination_testWhereClauseFilterChannel'))
            .withIntegrationObject integrationObject().withCode(IO)
            .withItem(integrationObjectItem().withCode('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id')))
    ChangesCollectorFactory testCollectorFactory
    CronJobModel cronJob

    def setup() {
        originalFilteringServiceItemConsumer = filteringService.getOutboundItemConsumer()
        filteringService.setOutboundItemConsumer(testOutboundItemConsumer)

        testCollectorFactory = new DefaultChangesCollectorFactory(itemChangeSender: testItemSender, filteringService: filteringService)

        collectorFactory = outboundSyncCronJobPerformable.changesCollectorFactory
        outboundSyncCronJobPerformable.setChangesCollectorFactory testCollectorFactory

        changeDetector.createChangeStream channel.build(), 'Catalog', FILTER_EXPR
        cronJob = OutboundSyncEssentialData.outboundCronJob()
    }

    def cleanup() {
        outboundSyncCronJobPerformable.setChangesCollectorFactory collectorFactory
        filteringService.setOutboundItemConsumer originalFilteringServiceItemConsumer
    }

    @Test
    def "catalogs other than catalog1 are filtered out by whereClause"() {
        given:
        def catalog1 = IntegrationTestUtil.createCatalogWithId(CATALOG)
        IntegrationTestUtil.createCatalogWithId("${TEST_NAME}_catalog2")
        IntegrationTestUtil.createCatalogWithId("${TEST_NAME}_catalog3")

        when:
        cronJobService.performCronJob(cronJob, true)

        then:
        testItemSender.getQueueSize() == 1
        testItemSender.getNextItem().item.PK == catalog1.pk.longValue
    }

}
