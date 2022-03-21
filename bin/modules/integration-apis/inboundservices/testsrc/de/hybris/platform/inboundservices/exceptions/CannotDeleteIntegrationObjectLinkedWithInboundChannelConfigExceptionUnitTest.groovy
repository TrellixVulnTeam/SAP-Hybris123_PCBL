package de.hybris.platform.inboundservices.exceptions

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test
import spock.lang.Specification

@UnitTest
class CannotDeleteIntegrationObjectLinkedWithInboundChannelConfigExceptionUnitTest extends Specification {
    @Test
    def "localized error message is from bundle resource."() {
        given:
        def exception = new CannotDeleteIntegrationObjectLinkedWithInboundChannelConfigException("notMatters")

        expect:
        exception.getMessage() != exception.getLocalizedMessage()
        exception.getLocalizedMessage().contains("This Integration Object cannot be deleted because it is in use with at least one " +
                "InboundChannelConfiguration for Authentication. Please delete the related InboundChannelConfiguration and try again.")
    }

    @Test
    def "localized error message equals error message if exception's bundle key not exists in bundle resource."() {
        given:
        def ioCode = "notMatters"
        def exception = Spy(CannotDeleteIntegrationObjectLinkedWithInboundChannelConfigException, constructorArgs: [ioCode]) {
            getBundleKey() >> "notExistedBundleKey"
        }

        expect:
        exception.getMessage() == exception.getLocalizedMessage()
        exception.getMessage().contains("The [$ioCode] cannot be deleted because it is in use with at least one " +
                "InboundChannelConfiguration for Authentication. Please delete the related InboundChannelConfiguration and try again.")
    }
}
