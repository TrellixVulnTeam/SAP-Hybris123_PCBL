/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.xyformsservices.proxy.impl;

import static org.junit.Assert.*;

import de.hybris.bootstrap.annotations.UnitTest;

import java.net.MalformedURLException;

import org.junit.Before;
import org.junit.Test;


@UnitTest
public class DefaultProxyServiceTest
{

	private DefaultProxyService defaultProxyService;

	@Before
	public void setUp() throws MalformedURLException
	{
		defaultProxyService = new DefaultProxyService();
		defaultProxyService.setOrbeonAddress("http://test-orbeon/web-orbeon");
	}

	@Test
	public void rewriteURLForEmptyData() throws MalformedURLException
	{
		final String applicationId = "applicationId";
		final String formId = "formId";

		final String newUrl = defaultProxyService.rewriteURL(applicationId, formId, null, false, true);
		assertEquals("http://test-orbeon/web-orbeon/fr/service/applicationId/formId/new?orbeon-embeddable=true", newUrl);
	}

	@Test
	public void rewriteURLForEdit() throws MalformedURLException
	{
		final String applicationId = "applicationId";
		final String formId = "formId";
		final String formDataId = "formDataId";

		final String newUrl = defaultProxyService.rewriteURL(applicationId, formId, formDataId, true, false);
		assertEquals("http://test-orbeon/web-orbeon/fr/applicationId/formId/edit/formDataId?orbeon-embeddable=true", newUrl);
	}
}
