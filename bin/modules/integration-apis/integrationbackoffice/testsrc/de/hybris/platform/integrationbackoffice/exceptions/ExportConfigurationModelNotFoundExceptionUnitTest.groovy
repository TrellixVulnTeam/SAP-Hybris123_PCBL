/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.exceptions

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.servicelayer.exceptions.ModelNotFoundException
import org.junit.Test

@UnitTest
class ExportConfigurationModelNotFoundExceptionUnitTest
        extends IntegrationBackofficeExceptionUnitTest<ExportConfigurationModelNotFoundException> {
    @Override
    Class<ExportConfigurationModelNotFoundException> getExceptionClass() {
        return ExportConfigurationModelNotFoundException.class
    }

    @Override
    String expectedLocalizedExceptionMessage() {
        return "An entity or an entity instance may have been deleted. Please refresh the list of instances."
    }

    @Test
    def "Cause exception can be passed in constructor."() {
        given:
        def modelNotFoundException = Stub(ModelNotFoundException)
        def exception = new ExportConfigurationModelNotFoundException(modelNotFoundException)

        expect:
        exception.getCause() == modelNotFoundException
    }

    @Test
    def "Localized string key is created from exception class name."() {
        given:
        def exception = new ExportConfigurationModelNotFoundException(Stub(ModelNotFoundException))

        expect:
        exception.getLocalizedStringKey() == "integrationbackoffice.exceptiontranslation.msg.exportconfigurationmodelnotfoundexception"
    }

}
