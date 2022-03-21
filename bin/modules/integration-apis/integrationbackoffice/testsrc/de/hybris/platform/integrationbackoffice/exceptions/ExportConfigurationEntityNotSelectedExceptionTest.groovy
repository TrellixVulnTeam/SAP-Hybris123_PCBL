/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.exceptions

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test

@UnitTest
class ExportConfigurationEntityNotSelectedExceptionTest
        extends IntegrationBackofficeExceptionUnitTest<ExportConfigurationEntityNotSelectedException> {
    @Override
    Class<ExportConfigurationEntityNotSelectedException> getExceptionClass() {
        return ExportConfigurationEntityNotSelectedException.class
    }

    @Override
    String expectedLocalizedExceptionMessage() {
        return "No entity is currently selected in the editor."
    }

    @Test
    def "Localized string key is created from exception class name."() {
        given:
        def exception = new ExportConfigurationEntityNotSelectedException();
        expect:
        exception.getLocalizedStringKey() == "integrationbackoffice.exceptiontranslation.msg.exportconfigurationentitynotselectedexception"
    }
}