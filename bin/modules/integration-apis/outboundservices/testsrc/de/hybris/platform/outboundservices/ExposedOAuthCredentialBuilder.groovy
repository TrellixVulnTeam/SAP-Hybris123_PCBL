/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices


import de.hybris.platform.apiregistryservices.model.ExposedOAuthCredentialModel
import de.hybris.platform.webservicescommons.model.OAuthClientDetailsModel

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx
import static de.hybris.platform.outboundservices.OAuthClientDetailsBuilder.oAuthClientDetailsBuilder

class ExposedOAuthCredentialBuilder extends AbstractCredentialBuilder<ExposedOAuthCredentialBuilder, ExposedOAuthCredentialModel> {
    private static final def DEFAULT_DETAILS_BUILDER = oAuthClientDetailsBuilder()
	private static final def DEFAULT_ID = 'testOauthCredential'
	private static final def DEFAULT_PASSWORD = 'testSecret'

    private Set<OAuthClientDetailsBuilder> buildersToClean = []
    private OAuthClientDetailsBuilder clientDetailsBuilder
	private OAuthClientDetailsModel clientDetails

    static ExposedOAuthCredentialBuilder exposedOAuthCredentialBuilder() {
        new ExposedOAuthCredentialBuilder()
                .withClientDetails DEFAULT_DETAILS_BUILDER
    }

    ExposedOAuthCredentialBuilder withClientDetails(OAuthClientDetailsBuilder builder) {
        tap { clientDetailsBuilder = builder }
	}

	ExposedOAuthCredentialBuilder withClientDetails(OAuthClientDetailsModel details) {
		tap { clientDetails = details }
	}

    @Override
	protected void persist(String id, String password) {
		importImpEx(
				'INSERT_UPDATE ExposedOAuthCredential; id[unique = true]; oAuthClientDetails         ; password',
				"                                    ; $id              ; ${deriveClientDetails().pk}; $password")
	}

    @Override
	protected String defaultId() {
		DEFAULT_ID
	}

    private OAuthClientDetailsModel deriveClientDetails() {
        clientDetails ?: buildClientDetails()
    }

    private OAuthClientDetailsModel buildClientDetails() {
        def builder = clientDetailsBuilder ?: DEFAULT_DETAILS_BUILDER
        buildersToClean << builder
        builder.build()
    }

    @Override
	protected String defaultPassword() {
		DEFAULT_PASSWORD
	}

    @Override
	protected Class<ExposedOAuthCredentialModel> credentialClass() {
		ExposedOAuthCredentialModel
	}

    @Override
    void cleanup() {
        super.cleanup()
        buildersToClean.each {it.cleanup() }
        buildersToClean.clear()
    }
}
