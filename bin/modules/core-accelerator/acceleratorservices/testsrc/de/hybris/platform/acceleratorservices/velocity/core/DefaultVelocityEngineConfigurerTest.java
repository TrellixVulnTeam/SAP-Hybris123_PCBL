/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.acceleratorservices.velocity.core;

import de.hybris.bootstrap.annotations.UnitTest;

import java.util.LinkedHashMap;
import java.util.Map;

import junit.framework.Assert;

import org.apache.velocity.app.VelocityEngine;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;


@UnitTest
public class DefaultVelocityEngineConfigurerTest
{
	@InjectMocks
	private final CoreVelocityConfigurer<VelocityEngine, Void> configurer = new DefaultVelocityEngineConfigurer();

	@Spy
	private final Map config = new LinkedHashMap();


	@Before
	public void preppare()
	{
		MockitoAnnotations.initMocks(this);

	}


	@Test(expected = UnsupportedOperationException.class)
	public void testNotImplementedMethod()
	{
		configurer.configure(null);
	}

	@Test
	public void testConfigure()
	{
		config.put("one", "param");
		config.put("two", "other-param");

		final VelocityEngine result = configurer.configure();

		Assert.assertEquals("param", result.getProperty("one"));
		Assert.assertEquals("other-param", result.getProperty("two"));
	}
}
