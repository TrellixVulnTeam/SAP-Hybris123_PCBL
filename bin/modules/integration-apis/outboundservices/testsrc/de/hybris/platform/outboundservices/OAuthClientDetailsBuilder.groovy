/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices


import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.webservicescommons.model.OAuthClientDetailsModel
import org.junit.rules.ExternalResource

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx

class OAuthClientDetailsBuilder extends ExternalResource {
	public static final String DEFAULT_CLIENT_ID = 'testOauthClient'
	public static final String DEFAULT_OAUTH_URL = 'https://oauth.url.for.test/oauth2/api/v1/token'

    private Set<String> createdClientDetailIds = []
	private String clientId
	private String url

	static OAuthClientDetailsBuilder oAuthClientDetailsBuilder() {
		new OAuthClientDetailsBuilder()
	}

	OAuthClientDetailsBuilder withClientId(String clientId) {
		tap { this.clientId = clientId }
	}

	OAuthClientDetailsBuilder withOAuthUrl(String url) {
		tap { this.url = url }
	}

	OAuthClientDetailsModel build() {
		oAuthClientDetails(clientId, url)
	}

	private OAuthClientDetailsModel oAuthClientDetails(String clientId, String url) {
		def clientIdVal = deriveClientId(clientId)
		importImpEx(
				'INSERT_UPDATE OAuthClientDetails; clientId[unique = true]; oAuthUrl',
				"                                ; $clientIdVal           ; ${deriveUrl(url)}")
        createdClientDetailIds << clientIdVal
        getOAuthClientDetailsById(clientIdVal)
	}

	private static String deriveClientId(String clientId) {
		clientId ?: DEFAULT_CLIENT_ID
	}

	private static String deriveUrl(String url) {
		url ?: DEFAULT_OAUTH_URL
	}

	private static OAuthClientDetailsModel getOAuthClientDetailsById(String clientId) {
		IntegrationTestUtil.findAny(OAuthClientDetailsModel, { it.clientId == clientId })
                .orElse(null)
	}

    @Override
    protected void after() {
        cleanup()
    }

    void cleanup() {
        createdClientDetailIds.each {id ->
            IntegrationTestUtil.remove(OAuthClientDetailsModel) {it.clientId == id }
        }
        createdClientDetailIds.clear()
    }
}
