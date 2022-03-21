/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices.decorator.impl

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.core.model.ItemModel
import de.hybris.platform.integrationservices.enums.HttpMethod
import de.hybris.platform.integrationservices.model.DescriptorFactory
import de.hybris.platform.integrationservices.model.IntegrationObjectDescriptor
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.model.impl.NullIntegrationObjectDescriptor
import de.hybris.platform.integrationservices.service.IntegrationObjectService
import de.hybris.platform.outboundservices.enums.OutboundSource
import de.hybris.platform.outboundservices.event.impl.DefaultEventType
import de.hybris.platform.outboundservices.facade.ConsumedDestinationNotFoundModel
import de.hybris.platform.outboundservices.facade.SyncParameters
import de.hybris.platform.outboundservices.facade.SyncParametersBuilder
import de.hybris.platform.servicelayer.exceptions.AmbiguousIdentifierException
import de.hybris.platform.servicelayer.exceptions.ModelNotFoundException
import de.hybris.platform.servicelayer.search.FlexibleSearchService
import org.junit.Test
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class DefaultDecoratorContextFactoryUnitTest extends Specification {
    private static final def OUTBOUND_SOURCE = OutboundSource.WEBHOOKSERVICES
    private static final def ITEM = new ItemModel()
    private static final def DESTINATION_ID = 'testDestinationId'
    private static final def DESTINATION = new ConsumedDestinationModel()
    private static final def IO_CODE = 'TestIOCode'
    private static final def INTEGRATION_OBJECT = new IntegrationObjectModel()
    private static final def INTEGRATION_KEY = 'integration|key|value'
    private static final def EVENT_TYPE = new DefaultEventType('Created')
    private static final def DEST_NOT_FOUND_ERROR_MSG = "Provided destination '$DESTINATION_ID' was not found."
    private static final def IO_NOT_FOUND_ERROR_MSG = "Provided integration object '$IO_CODE' was not found."
    private static final SyncParameters SYNC_PARAMS = parametersBuilder()
            .withItem(ITEM)
            .withIntegrationObjectCode(IO_CODE)
            .withDestinationId(DESTINATION_ID)
            .build()
    @Shared
    def IO_DESCRIPTOR = Stub(IntegrationObjectDescriptor)

    def integrationObjectService = Stub(IntegrationObjectService)
    def flexibleSearchService = Stub(FlexibleSearchService)
    def descriptorFactory = Stub(DescriptorFactory) {
        createIntegrationObjectDescriptor(INTEGRATION_OBJECT) >> IO_DESCRIPTOR
    }
    def factory = new DefaultDecoratorContextFactory(integrationObjectService, flexibleSearchService, descriptorFactory)


    @Test
    def "IllegalArgumentException is thrown when a null #prop is provided"() {
        when:
        new DefaultDecoratorContextFactory(ioService, flexSearchService, descFactory)

        then:
        thrown(IllegalArgumentException)

        where:
        cond                       | ioService                      | flexSearchService           | descFactory
        'IntegrationObjectService' | null                           | Stub(FlexibleSearchService) | Stub(DescriptorFactory)
        'FlexibleSearchService'    | Stub(IntegrationObjectService) | null                        | Stub(DescriptorFactory)
        'DescriptorFactory'        | Stub(IntegrationObjectService) | Stub(FlexibleSearchService) | null
    }

    @Test
    def "creates context with specified parameters"() {
        given:
        def params = parametersBuilder()
                .withItem(ITEM)
                .withIntegrationObject(INTEGRATION_OBJECT)
                .withDestination(DESTINATION)
                .withSource(OUTBOUND_SOURCE)
                .withIntegrationKey(INTEGRATION_KEY)
                .withEventType(EVENT_TYPE)
                .build()

        when:
        def decoratorContext = factory.createContext params

        then:
        with(decoratorContext) {
            destinationModel == DESTINATION
            integrationObject == IO_DESCRIPTOR
            itemModel == ITEM
            source == OUTBOUND_SOURCE
            integrationKey == INTEGRATION_KEY
            eventType == EVENT_TYPE
        }
    }

    @Test
    @Unroll
    def "creates context with #expectedHttpMethod when changed item model is #condition"() {
        when:
        def decoratorContext = factory.createContext outboundParams.build()

        then:
        decoratorContext.httpMethod == expectedHttpMethod

        where:
        expectedHttpMethod | condition     | outboundParams
        HttpMethod.DELETE  | "not present" | parametersBuilder().withIntegrationKey(INTEGRATION_KEY)
        HttpMethod.POST    | "present"     | parametersBuilder().withItem(ITEM)
    }

    @Test
    def "creates context with no errors when destination and integrationObject are found"() {
        given:
        integrationObjectService.findIntegrationObject(IO_CODE) >> INTEGRATION_OBJECT
        flexibleSearchService.getModelByExample(_ as ConsumedDestinationModel) >> DESTINATION

        when:
        def decoratorContext = factory.createContext SYNC_PARAMS

        then:
        with(decoratorContext) {
            destinationModel == DESTINATION
            integrationObject == IO_DESCRIPTOR
            errors == []
            !hasErrors()
        }
    }

    @Test
    def "creates context with no errors when destinationModel and integrationObjectModel are provided in SyncParameters"() {
        given:
        final SyncParameters paramsWithModels = parametersBuilder()
                .withItem(ITEM)
                .withIntegrationObject(INTEGRATION_OBJECT)
                .withDestination(DESTINATION)
                .build()

        when:
        def decoratorContext = factory.createContext(paramsWithModels)

        then:
        with(decoratorContext) {
            errors == []
            !hasErrors()
        }
    }

    @Test
    def "creates context with errors when neither destinationId nor destinationModel were provided"() {
        given:
        final SyncParameters paramsWithoutDestination = parametersBuilder()
                .withItem(ITEM)
                .withIntegrationObject(INTEGRATION_OBJECT)
                .build()

        when:
        def decoratorContext = factory.createContext(paramsWithoutDestination)

        then:
        with(decoratorContext) {
            destinationModel instanceof ConsumedDestinationNotFoundModel
            errors == ["Provided destination 'null' was not found."]
            hasErrors()
        }
    }

    @Test
    def "creates context with errors when neither integrationObjectModel nore integrationObjectCode were provided"() {
        given:
        final SyncParameters paramsWithoutIO = parametersBuilder()
                .withItem(ITEM)
                .withDestination(DESTINATION)
                .build()

        when:
        def decoratorContext = factory.createContext(paramsWithoutIO)

        then:
        with(decoratorContext) {
            integrationObject instanceof NullIntegrationObjectDescriptor
            errors == ["Provided integration object 'null' was not found."]
            hasErrors()
        }
    }

    @Test
    def "creates context with error when destination is not found"() {
        given:
        def params = parametersBuilder()
                .withItem(ITEM)
                .withIntegrationObject(INTEGRATION_OBJECT)
                .withDestinationId(DESTINATION_ID)
                .build()
        and:
        flexibleSearchService.getModelByExample({ it.id == DESTINATION_ID }) >> { throw new RuntimeException() }

        when:
        def decoratorContext = factory.createContext params

        then:
        with(decoratorContext) {
            destinationModel instanceof ConsumedDestinationNotFoundModel
            errors == [DEST_NOT_FOUND_ERROR_MSG]
            hasErrors()
        }
    }

    @Test
    def "creates context with error when destination is ConsumedDestinationNotFoundModel"() {
        given:
        def notFoundDestination = Stub(ConsumedDestinationNotFoundModel) {
            getId() >> DESTINATION_ID
        }
        and:
        def paramsWithErrorModel = SyncParameters.syncParametersBuilder()
                .withItem(ITEM)
                .withIntegrationObject(INTEGRATION_OBJECT)
                .withDestination(notFoundDestination)
                .build()

        when:
        def decoratorContext = factory.createContext(paramsWithErrorModel)

        then:
        with(decoratorContext) {
            destinationModel.is notFoundDestination
            errors == [DEST_NOT_FOUND_ERROR_MSG]
            hasErrors()
        }
    }

    @Test
    @Unroll
    def "creates context with error when findIntegrationObject throws #msg"() {
        given:
        def paramsWithMissingIntegrationObjectCode = parametersBuilder()
                .withItem(ITEM)
                .withDestination(DESTINATION)
                .withIntegrationObjectCode(IO_CODE)
                .build()
        and:
        integrationObjectService.findIntegrationObject(IO_CODE) >> { throw exception }

        when:
        def decoratorContext = factory.createContext paramsWithMissingIntegrationObjectCode

        then:
        with(decoratorContext) {
            integrationObject instanceof NullIntegrationObjectDescriptor
            errors == [IO_NOT_FOUND_ERROR_MSG]
            hasErrors()
        }

        where:
        msg                            | exception
        "AmbiguousIdentifierException" | Stub(AmbiguousIdentifierException)
        "ModelNotFoundException"       | Stub(ModelNotFoundException)
    }

    @Test
    def "creates context with 2 errors when destination and integrationObject are not found"() {
        given:
        integrationObjectService.findIntegrationObject(IO_CODE) >> { throw Stub(ModelNotFoundException) }
        flexibleSearchService.getModelByExample(_ as ConsumedDestinationModel) >> { throw Stub(RuntimeException) }

        when:
        def decoratorContext = factory.createContext SYNC_PARAMS

        then:
        with(decoratorContext) {
            destinationModel instanceof ConsumedDestinationNotFoundModel
            integrationObject instanceof NullIntegrationObjectDescriptor
            errors == [DEST_NOT_FOUND_ERROR_MSG, IO_NOT_FOUND_ERROR_MSG]
            hasErrors()
        }
    }

    static SyncParametersBuilder parametersBuilder() {
        SyncParameters.syncParametersBuilder()
    }
}
