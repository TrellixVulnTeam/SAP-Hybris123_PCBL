package de.hybris.platform.integrationservices.interceptor

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.integrationservices.interceptor.interfaces.BeforeRemoveIntegrationObjectChecker
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.exceptions.ModelRemovalException
import de.hybris.platform.servicelayer.interceptor.InterceptorException
import de.hybris.platform.integrationservices.util.IntegrationObjectTestUtil
import org.junit.Test
import spock.lang.Issue

import javax.annotation.Resource

@IntegrationTest
@Issue('https://cxjira.sap.com/browse/GRIFFIN-4299')
class IntegrationObjectRemoveInterceptorIntegrationTest extends ServicelayerSpockSpecification {
    private static final def ERROR_MSG_MOCK = "This is a mocking error message."
    private static final def TEST_NAME = "IntegrationObjectRemoveInterceptor"
    private static final def IO_CODE = "${TEST_NAME}_IO_CODE"

    @Resource(name = "beforeRemoveIntegrationObjectCheckers")
    private List<BeforeRemoveIntegrationObjectChecker> checkers
    def mockChecker = Stub(BeforeRemoveIntegrationObjectChecker) {
        checkIfIntegrationObjectInUse(_) >> { throw new InterceptorException(ERROR_MSG_MOCK) }
    }

    def cleanup() {
        checkers.remove(0)
        IntegrationTestUtil.remove IntegrationObjectModel, { it.code == IO_CODE }
    }

    @Test
    def "an integration object cannot be deleted when a BeforeRemoveIntegrationObjectChecker prevents it"() {
        given:
        checkers.add(0, mockChecker)
        def integrationObject = IntegrationObjectTestUtil.createIntegrationObject(IO_CODE)

        when:
        IntegrationTestUtil.remove integrationObject

        then:
        def e = thrown ModelRemovalException
        e.message.contains ERROR_MSG_MOCK
    }

}
