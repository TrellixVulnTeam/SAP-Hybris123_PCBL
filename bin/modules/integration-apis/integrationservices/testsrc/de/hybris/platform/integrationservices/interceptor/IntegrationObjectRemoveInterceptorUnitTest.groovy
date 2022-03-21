package de.hybris.platform.integrationservices.interceptor

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.integrationservices.interceptor.interfaces.BeforeRemoveIntegrationObjectChecker
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.servicelayer.interceptor.InterceptorContext
import org.junit.Test
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class IntegrationObjectRemoveInterceptorUnitTest extends Specification {

    @Test
    def "IntegrationObjectRemoveInterceptor requires a non-null list of BeforeRemoveIntegrationObjectCheckers"() {
        when:
        new IntegrationObjectRemoveInterceptor(null)

        then:
        def e = thrown IllegalArgumentException
        e.message.contains "beforeRemoveIntegrationObjectCheckers can't be null"
    }

    @Test
    @Unroll
    def "checker is invoked #times when the integration object is #integrationObject"() {
        given:
        def checker = Mock(BeforeRemoveIntegrationObjectChecker)
        def interceptor = new IntegrationObjectRemoveInterceptor([checker])

        when:
        interceptor.onRemove integrationObject, Stub(InterceptorContext)

        then:
        times * checker.checkIfIntegrationObjectInUse(integrationObject)

        where:
        integrationObject            | times
        null                         | 0
        Stub(IntegrationObjectModel) | 1
    }
}
