package de.hybris.platform.outboundsync.activator.impl

import com.github.tomakehurst.wiremock.junit.WireMockRule
import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.user.CustomerModel
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.cronjob.model.CronJobModel
import de.hybris.platform.integrationservices.enums.IntegrationRequestStatus
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.ItemTracker
import de.hybris.platform.outboundservices.ConsumedDestinationBuilder
import de.hybris.platform.outboundservices.enums.OutboundSource
import de.hybris.platform.outboundservices.model.OutboundRequestModel
import de.hybris.platform.outboundservices.util.OutboundMonitoringRule
import de.hybris.platform.outboundsync.OutboundChannelConfigurationBuilder
import de.hybris.platform.outboundsync.activator.DeleteOutboundSyncService
import de.hybris.platform.outboundsync.job.impl.OutboundSyncCronJobPerformable
import de.hybris.platform.outboundsync.util.OutboundSyncEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.cronjob.CronJobService
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.AutoCleanup
import spock.lang.Issue
import spock.lang.Shared

import javax.annotation.Resource

import static com.github.tomakehurst.wiremock.client.WireMock.anyUrl
import static com.github.tomakehurst.wiremock.client.WireMock.delete
import static com.github.tomakehurst.wiremock.client.WireMock.ok
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.EventualCondition.eventualCondition
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.findAll
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.findAny
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder
import static de.hybris.platform.outboundsync.OutboundChannelConfigurationBuilder.outboundChannelConfigurationBuilder
import static de.hybris.platform.outboundsync.OutboundSyncStreamConfigurationBuilder.outboundSyncStreamConfigurationBuilder

@IntegrationTest
class OutboundMonitoringE2EIntegrationTest extends ServicelayerSpockSpecification {
    private static final def TEST_NAME = 'OutboundDeleteE2E'
    private static final def DESTINATION_ID = "${TEST_NAME}_Destination"
    private static final def CUSTOMER_IO = "${TEST_NAME}_CustomerIO"
    private static final def CHANNEL_CODE = "${TEST_NAME}_OCC"
    private static final def CUSTOMER_UID = "${TEST_NAME}_Customer".toLowerCase()
    private static final String DESTINATION_ENDPOINT = "/odata2webservices/$CUSTOMER_IO/Customer"

    @Shared
    @ClassRule
    OutboundSyncEssentialData essentialData = OutboundSyncEssentialData.outboundSyncEssentialData()
    @Rule
    ItemTracker itemTracker = ItemTracker.track(CustomerModel, EmployeeModel, OutboundRequestModel)

    ConsumedDestinationBuilder destinationBuilder = consumedDestinationBuilder().withId(DESTINATION_ID)
    @Rule
    OutboundChannelConfigurationBuilder outboundChannelBuilder = outboundChannelConfigurationBuilder().withCode(CHANNEL_CODE)
            .withDeleteSynchronization()
            .withConsumedDestination(consumedDestinationBuilder().withId(DESTINATION_ID))
            .withIntegrationObject(integrationObject().withCode(CUSTOMER_IO)
                    .withItem(integrationObjectItem().withCode('Customer').root()
                            .withAttribute(integrationObjectItemAttribute().withName('uid').unique())))

    @Rule
    OutboundMonitoringRule outboundMonitoringRule = OutboundMonitoringRule.enabled()
    @AutoCleanup('cleanup')
    def streamBuilder = outboundSyncStreamConfigurationBuilder()
            .withOutboundChannelCode(CHANNEL_CODE)

    @Rule
    WireMockRule wireMockRule = new WireMockRule(wireMockConfig()
            .dynamicHttpsPort()
            .keystorePath("resources/devcerts/platform.jks")
            .keystorePassword('123456'))

    @Resource
    private CronJobService cronJobService
    @Resource(name = 'defaultDeleteOutboundSyncService')
    private DeleteOutboundSyncService outboundSyncService

    @Resource(name = 'outboundSyncCronJobPerformable')
    private OutboundSyncCronJobPerformable outboundSyncCronJobPerformable

    private CronJobModel cronJob

    def setup() {
        destinationBuilder
                .withUrl("https://localhost:${wireMockRule.httpsPort()}$DESTINATION_ENDPOINT")
                .build()

        cronJob = essentialData.outboundCronJob()
        createCustomer()
    }

    @Test
    @Issue('https://cxjira.sap.com/browse/IAPI-5386')
    def 'the expected outbound request model is created when a delete request is sent'() {
        given: 'destination server returns OK'
        stubFor(delete(anyUrl()).willReturn(ok()))
        and: 'existing stream for the root item in the IO'
        streamBuilder.withItemType('Customer').build()
        and: 'the customer is deleted'
        deleteCustomer()

        when:
        cronJobService.performCronJob cronJob, true

        then: 'an outbound request model exists with a success status set'
        eventualCondition().expect {
            assert findAll(OutboundRequestModel).size() == 1
            assert findAny(OutboundRequestModel, { orm ->
                orm.status == IntegrationRequestStatus.SUCCESS
                orm.integrationKey == CUSTOMER_UID
                orm.status == IntegrationRequestStatus.SUCCESS
                orm.source == OutboundSource.OUTBOUNDSYNC
                orm.user == null
                !orm.sapPassport.empty
                orm.destination.contains(DESTINATION_ENDPOINT)
                orm.error == null
            }).present
        }
    }

    private static def createCustomer() {
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Customer; uid[unique = true]',
                "                      ; $CUSTOMER_UID"
        )
    }

    private static def deleteCustomer() {
        IntegrationTestUtil.remove(CustomerModel) { it.uid == CUSTOMER_UID }
    }
}
