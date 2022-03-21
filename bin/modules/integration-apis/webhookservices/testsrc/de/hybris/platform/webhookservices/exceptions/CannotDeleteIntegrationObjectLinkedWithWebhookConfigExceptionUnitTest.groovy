package de.hybris.platform.webhookservices.exceptions

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test
import spock.lang.Specification

@UnitTest
class CannotDeleteIntegrationObjectLinkedWithWebhookConfigExceptionUnitTest extends Specification {
    private static final def IO_CODE = "notMatters"

    @Test
    def "localized error message is from bundle resource."() {
        given:
        def exception = new CannotDeleteIntegrationObjectLinkedWithWebhookConfigException("notMatters")

        expect:
        exception.getMessage() != exception.getLocalizedMessage()
        exception.getLocalizedMessage().contains("This Integration Object cannot be deleted because it is in use with " +
                "at least one WebhookConfiguration. Please delete the related WebhookConfiguration and try again.")
    }

    @Test
    def "localized error message equals error message if exception's bundle key not exists in bundle resource."() {
        given:
        def exception = Spy(CannotDeleteIntegrationObjectLinkedWithWebhookConfigException, constructorArgs: [IO_CODE]) {
            getBundleKey() >> "notExistedBundleKey"
        }

        expect:
        exception.getMessage() == exception.getLocalizedMessage()
        exception.getMessage().contains("The [$IO_CODE] cannot be deleted because it is in use with at least one " +
                "WebhookConfiguration. Please delete the related WebhookConfiguration and try again.")
    }
}
