/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices

import de.hybris.platform.apiregistryservices.model.ConsumedOAuthCredentialModel
import de.hybris.platform.webservicescommons.model.OAuthClientDetailsModel

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx
import static de.hybris.platform.outboundservices.OAuthClientDetailsBuilder.oAuthClientDetailsBuilder

class ConsumedOAuthCredentialBuilder extends AbstractCredentialBuilder<ConsumedOAuthCredentialBuilder, ConsumedOAuthCredentialModel> {
    private static final def DEFAULT_DETAILS_BUILDER = oAuthClientDetailsBuilder()
	private static final def DEFAULT_ID = 'testOauthCredential'
	private static final def DEFAULT_PASSWORD = 'testSecret'

    private Set<OAuthClientDetailsBuilder> buildersToClean = []
    private OAuthClientDetailsBuilder clientDetailsBuilder
	private OAuthClientDetailsModel clientDetails

    static ConsumedOAuthCredentialBuilder consumedOAuthCredentialBuilder() {
        new ConsumedOAuthCredentialBuilder()
    }

    ConsumedOAuthCredentialBuilder withClientDetails(OAuthClientDetailsBuilder builder) {
        tap { clientDetailsBuilder = builder }
	}

	ConsumedOAuthCredentialBuilder withClientDetails(OAuthClientDetailsModel details) {
		tap { clientDetails = details }
	}

    @Override
	protected void persist(String id, String password) {
        def details = deriveClientDetails()
		importImpEx(
				'INSERT_UPDATE ConsumedOAuthCredential; id[unique = true]; clientId         ; oAuthUrl         ; clientSecret',
				"                                     ; $id              ; $details.clientId; $details.OAuthUrl; $password")
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
	protected Class<ConsumedOAuthCredentialModel> credentialClass() {
		ConsumedOAuthCredentialModel
	}

    @Override
    void cleanup() {
        super.cleanup()
        buildersToClean.each {it.cleanup() }
        buildersToClean.clear()
    }
}
