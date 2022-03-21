/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.inboundservices.exceptions

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test
import spock.lang.Specification

@UnitTest
class CannotCreateIntegrationClientCredentialsDetailWithAdminExceptionUnitTest extends Specification {
    @Test
    def "localized error message is from bundle resource."() {
        given:
        def exception = new CannotCreateIntegrationClientCredentialsDetailWithAdminException()

        expect:
        exception.getMessage() != exception.getLocalizedMessage()
        exception.getLocalizedMessage() == "The IntegrationClientCredentialsDetail cannot be created with admin user."
    }

    @Test
    def "localized error message equals error message if exception's bundle key not exists in bundle resource."() {
        given:
        def exception = Spy(CannotCreateIntegrationClientCredentialsDetailWithAdminException) {
            getBundleKey() >> "notExistedBundleKey"
        }

        expect:
        exception.getMessage() == exception.getLocalizedMessage()
        exception.getMessage().contains("Cannot create IntegrationClientCredentialsDetails with admin user.")
    }
}
