/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices

import de.hybris.platform.apiregistryservices.model.BasicCredentialModel

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx

class BasicCredentialBuilder extends AbstractCredentialBuilder<BasicCredentialBuilder, BasicCredentialModel> {
	private static final String DEFAULT_ID = 'testBasicCredential'
    private static final String DEFAULT_USERNAME = 'test'
    private static final String DEFAULT_PASSWORD = 'test'

	private String username

	static BasicCredentialBuilder basicCredentialBuilder() {
		new BasicCredentialBuilder()
	}

	BasicCredentialBuilder withUsername(String username) {
		this.username = username
		this
	}

    @Override
	protected void persist(String id, String password) {
		importImpEx(
				'INSERT_UPDATE BasicCredential; id[unique = true]; username           ; password',
				"                             ; $id              ; ${deriveUsername()}; $password")
	}

    @Override
	protected String defaultId() {
		DEFAULT_ID
	}

	private String deriveUsername() {
		username ?: DEFAULT_USERNAME
	}

    @Override
	protected String defaultPassword() {
		DEFAULT_PASSWORD
	}

    @Override
	protected Class<BasicCredentialModel> credentialClass() {
		BasicCredentialModel
	}
}
