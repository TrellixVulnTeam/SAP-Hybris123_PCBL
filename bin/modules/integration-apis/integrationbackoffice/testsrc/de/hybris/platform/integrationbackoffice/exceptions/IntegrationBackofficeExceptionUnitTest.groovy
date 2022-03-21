/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.exceptions

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.servicelayer.i18n.L10NService
import org.junit.Test
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
abstract class IntegrationBackofficeExceptionUnitTest<T extends IntegrationBackofficeException> extends Specification {
    private static T exception

    def setupSpec() {
        exception = Spy(getExceptionClass())
    }

    /**
     * Get the class of the exception to test.
     *
     * @return the class object of the tested exception.
     */
    abstract Class<T> getExceptionClass();

    /**
     * Get the expected exception message to test against.
     *
     * @return the formatted message that was built from localized string.
     * @see IntegrationBackofficeException#getLocalizedMessage()
     */
    abstract String expectedLocalizedExceptionMessage();

    @Test
    def "Localized exception message equals exception message if localization service is not available."() {
        given:
        exception.getL10nService() >> null

        expect:
        exception.getMessage() == exception.getLocalizedMessage()
    }

    @Test
    @Unroll
    def "Expect exception message to be \"#expected\" when localized string is \"#returnFromL10nService\"."() {
        given:
        def l10Service = Stub(L10NService)
        exception.getL10nService() >> l10Service

        and:
        l10Service.getLocalizedString(exception.getLocalizedStringKey()) >> returnFromL10nService

        expect:
        expected == exception.getLocalizedMessage()

        where:
        returnFromL10nService             | expected
        null                              | exception.getMessage()
        ""                                | exception.getMessage()
        " "                               | exception.getMessage()
        exception.getLocalizedStringKey() | exception.getMessage()
    }

    @Test
    def "Exception message is localized when localized string exists."() {
        expect:
        expectedLocalizedExceptionMessage() == exception.getLocalizedMessage()
    }
}
