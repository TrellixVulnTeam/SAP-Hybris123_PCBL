package de.hybris.platform.webhookbackoffice.services

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.core.PK
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.scripting.model.ScriptModel
import de.hybris.platform.servicelayer.model.ModelService
import de.hybris.platform.servicelayer.search.FlexibleSearchQuery
import de.hybris.platform.servicelayer.search.FlexibleSearchService
import de.hybris.platform.servicelayer.search.SearchResult
import de.hybris.platform.webhookservices.event.ItemSavedEvent
import de.hybris.platform.webhookservices.jalo.WebhookConfiguration
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel
import org.junit.Test
import spock.lang.Issue
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
@Issue('https://cxjira.sap.com/browse/IAPI-5170')
class WebhookConfigBackofficeServiceUnitTest extends Specification {

    private static final def FILTER_LOCATION = '//filter-location'
    private static final def DEFAULT_EVENT_TYPE = ItemSavedEvent.class.getCanonicalName()

    def service  = new WebhookConfigBackofficeService()

    def modelService = Stub(ModelService) {
        create(WebhookConfigurationModel) >>  new WebhookConfigurationModel()
    }
    def integrationObject = Stub(IntegrationObjectModel) {
        getCode() >> "IO"
        getPk() >> PK.fromLong(1L)
    }
    def consumedDestination = Stub(ConsumedDestinationModel) {
        getId() >> "co"
        getPk() >> PK.fromLong(2L)
    }
    def flexibleSearchService = Stub(FlexibleSearchService)

    @Test
    def 'expect webhook configuration is created when all info provided' () {
        given:
        service.setModelService(modelService)

        when:
        def webhookConfig = service.createWebhookConfiguration(integrationObject, consumedDestination, FILTER_LOCATION)
        then:
        with(webhookConfig) {
            integrationObject == integrationObject
            destination == consumedDestination
            filterLocation == FILTER_LOCATION
            eventType == DEFAULT_EVENT_TYPE
        }
    }

    @Test
    def 'expect webhook configuration is created when all info provided with event type' () {
        given:
        service.setModelService(modelService)

        when:
        def webhookConfig = service.createWebhookConfiguration(integrationObject, consumedDestination, FILTER_LOCATION, DEFAULT_EVENT_TYPE)
        then:
        with(webhookConfig) {
            integrationObject == integrationObject
            destination == consumedDestination
            filterLocation == FILTER_LOCATION
            eventType == DEFAULT_EVENT_TYPE
        }
    }

    @Test
    @Unroll
    def "find #findResult script(s) when #description"(){
        given:
        def searchResult = Stub(SearchResult) {
            getResult() >> findResult
        }
        and:
        flexibleSearchService.search(_ as FlexibleSearchQuery) >> searchResult
        service.setFlexibleSearchService(flexibleSearchService)

        expect:
        service.getActiveGroovyScripts() == findResult
        where:
        description                  | findResult
        "has active script"          | [Stub(ScriptModel)]
        "doesn't have active script" | []
    }

    @Test
    @Unroll
    def "find webhook configuration(s) when #description"(){
        given:
        def searchResult = Stub(SearchResult) {
            getResult() >> findResult
        }

        and:
        flexibleSearchService.search(_ as FlexibleSearchQuery) >> searchResult
        service.setFlexibleSearchService(flexibleSearchService)

        expect:
        service.getWebhookConfiguration(integrationObject, consumedDestination) == findResult
        where:
        description                   | findResult
        "has webhookconfigs "         | [Stub(WebhookConfiguration)]
        "doesn't have webhookconfigs" | []
    }

    @Test
    @Unroll
    def "null #description fails precondition for creteWebhookConfiguration"() {
        when:
        service.createWebhookConfiguration(io, consume, FILTER_LOCATION, DEFAULT_EVENT_TYPE)
        then:
        thrown IllegalArgumentException

        where:
        description           | io                           | consume
        "integrationObject"   | null                         | Stub(ConsumedDestinationModel)
        "consumedDestination" | Stub(IntegrationObjectModel) | null
    }

    @Test
    @Unroll
    def "null #description fails precondition for getWebhookConfiguration"() {
        when:
        service.getWebhookConfiguration(io, consume)
        then:
        thrown IllegalArgumentException

        where:
        description           | io                           | consume
        "integrationObject"   | null                         | Stub(ConsumedDestinationModel)
        "consumedDestination" | Stub(IntegrationObjectModel) | null
    }

    @Test
    def "null model service fails precondition for setModelService"() {
        when:
        service.setModelService(null)
        then:
        thrown IllegalArgumentException
    }

    @Test
    def "create new model service if setModelService was not executed"() {
        expect:
        service.getModelService() != null
    }

    @Test
    def "null flexible search service fails precondition for setFlexibleSearchService"() {
        when:
        service.setFlexibleSearchService(null)
        then:
        thrown IllegalArgumentException
    }

    @Test
    def "create new flexible search service  if setFlexibleSearchService was not executed"() {
        expect:
        service.getFlexibleSearchService() != null
    }

}
