/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.commerceservices.url.impl;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.storelocator.model.PointOfServiceModel;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.BDDMockito.given;


/**
 * Unit test for {@link DefaultPointOfServiceUrlResolver}
 */
@UnitTest
public class DefaultPointOfServiceUrlResolverTest
{
	private static final String PATTERN = "/store/{store-name}";
	private static final String EXPECTED_URL = "/store/Test%20Store%20Name";
	private static final String TEST_STORE_NAME = "Test Store Name";

	@Mock
	private PointOfServiceModel pointOfService;

	private DefaultPointOfServiceUrlResolver pointOfServiceUrlResolver;

	@Before
	public void setUp() throws Exception
	{
		MockitoAnnotations.initMocks(this);
		given(pointOfService.getName()).willReturn(TEST_STORE_NAME);

		pointOfServiceUrlResolver = new DefaultPointOfServiceUrlResolver();
		pointOfServiceUrlResolver.setPattern(PATTERN);
	}

	@Test
	public void testResolveInternalStoreName()
	{
		final String actualUrl = pointOfServiceUrlResolver.resolveInternal(pointOfService);
		Assert.assertEquals("Invalid URL", EXPECTED_URL, actualUrl);
	}
}
