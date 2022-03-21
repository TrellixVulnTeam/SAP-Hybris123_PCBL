package de.hybris.platform.outboundsync.exceptions

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test
import spock.lang.Specification

@UnitTest
class CannotDeleteIntegrationObjectLinkedWithOutboundChannelConfigExceptionUnitTest extends Specification {
    private static final def IO_CODE = "notMatters"
    private static final def OCC_CODE = "occNotMatters"

    @Test
    def "localized error message is from bundle resource"() {
        given:
        def exception = new CannotDeleteIntegrationObjectLinkedWithOutboundChannelConfigException(IO_CODE, OCC_CODE)

        expect:
        exception.getMessage() != exception.getLocalizedMessage()
        exception.getLocalizedMessage().contains("This Integration Object cannot be deleted because it is in use with " +
                "OutboundChannelConfiguration: $OCC_CODE. Please delete the related OutboundChannelConfiguration and try again.")
    }

    @Test
    def "localized error message equals error message if exception's bundle key not exists in bundle resource."() {
        given:
        def exception = Spy(CannotDeleteIntegrationObjectLinkedWithOutboundChannelConfigException, constructorArgs: [IO_CODE, OCC_CODE]) {
            getBundleKey() >> "notExistedBundleKey"
        }

        expect:
        exception.getMessage() == exception.getLocalizedMessage()
        exception.getMessage().contains("The [$IO_CODE] cannot be deleted because it is in use with " +
                "OutboundChannelConfiguration: $OCC_CODE . Please delete the related OutboundChannelConfiguration and try again.")
    }
}
