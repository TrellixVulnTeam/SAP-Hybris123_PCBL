package de.hybris.platform.integrationservices.exception

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.servicelayer.i18n.L10NService
import org.junit.Test
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class CannotDeleteIntegrationObjectExceptionUnitTest extends Specification {
    private static final def ERROR_MESSAGE = "This message doesn't matter."
    private static final def BUNDLE_KEY_MOCK = "notExistedBundleKey"

    @Test
    def "localized error message equals error message if exception's bundle key not exists in bundle resource."() {
        given:
        def exception = Spy(CannotDeleteIntegrationObjectException, constructorArgs: [ERROR_MESSAGE]) {
            getBundleKey() >> BUNDLE_KEY_MOCK
        }

        expect:
        exception.getMessage() == exception.getLocalizedMessage()
        exception.getMessage().contains ERROR_MESSAGE
    }

    @Test
    @Unroll
    def "localized error message equals error message if localization service returns #returnFromL10nService"() {
        given:
        def exception = Spy(CannotDeleteIntegrationObjectException, constructorArgs: [ERROR_MESSAGE]) {
            getBundleKey() >> BUNDLE_KEY_MOCK
            getL10nService() >> Stub(L10NService) {
                getLocalizedString(_) >> returnFromL10nService
            }
        }

        expect:
        exception.getMessage() == exception.getLocalizedMessage()
        exception.getMessage().contains ERROR_MESSAGE

        where:
        returnFromL10nService << [null, "", " ", BUNDLE_KEY_MOCK]
    }

    @Test
    def "localized error message equals error message if localization service is not available."() {
        given:
        def exception = Spy(CannotDeleteIntegrationObjectException, constructorArgs: [ERROR_MESSAGE]) {
            getL10nService() >> null
        }

        expect:
        exception.getMessage() == exception.getLocalizedMessage()
        exception.getMessage().contains ERROR_MESSAGE
    }

    @Test
    @Unroll
    def "With bundle resource: #bundleResource and parameter: #parameters, the localized message is: #result"() {
        given:
        def exception = Spy(CannotDeleteIntegrationObjectException, constructorArgs: [ERROR_MESSAGE, parameters]) {
            getBundleKey() >> BUNDLE_KEY_MOCK
            getL10nService() >> Stub(L10NService) {
                getLocalizedString(_) >> bundleResource
            }
        }

        expect:
        exception.getLocalizedMessage() == result

        where:
        bundleResource              | parameters                   | result
        "localizedMessage: {0}"     | "test"                       | "localizedMessage: test"
        "localizedMessage: {0}"     | (String[]) ["test", "right"] | "localizedMessage: test"
        "localizedMessage: {0} {1}" | "test"                       | "localizedMessage: test {1}"
    }
}
