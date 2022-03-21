/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.widgets.services;

import com.hybris.cockpitng.dataaccess.facades.type.DataAttribute;
import com.hybris.cockpitng.dataaccess.facades.type.DataType;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.integrationbackoffice.widgets.common.services.impl.DefaultIntegrationSortingService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class DefaultIntegrationSortingServiceUnitTest
{

	@Mock
	private DataAttribute dataAttribute;

	private DefaultIntegrationSortingService defaultIntegrationSortingService;

	@Before
	public void setUp() {
		defaultIntegrationSortingService = new DefaultIntegrationSortingService();
	}

	@Test
	public void sortAtomicShouldBeTrue()
	{
		final DataType dt = dataType(true, false);
		when(dataAttribute.getValueType()).thenReturn(dt);
		when(dataAttribute.getAttributeType()).thenReturn(DataAttribute.AttributeType.SINGLE);
		when(dataAttribute.isSearchable()).thenReturn(true);
		assertTrue(defaultIntegrationSortingService.isAttributeSortable(dataAttribute));
	}

	@Test
	public void sortEnumShouldBeTrue()
	{
		final DataType dt = dataType(false, true);
		when(dataAttribute.getValueType()).thenReturn(dt);
		when(dataAttribute.getAttributeType()).thenReturn(DataAttribute.AttributeType.SINGLE);
		when(dataAttribute.isSearchable()).thenReturn(true);
		assertTrue(defaultIntegrationSortingService.isAttributeSortable(dataAttribute));
	}

	@Test
	public void sortBadDataTypeShouldBeFalse()
	{
		final DataType dt = dataType(false, false);
		when(dataAttribute.getAttributeType()).thenReturn(DataAttribute.AttributeType.SINGLE);
		when(dataAttribute.getValueType()).thenReturn(dt);
		assertFalse(defaultIntegrationSortingService.isAttributeSortable(dataAttribute));
	}

	@Test
	public void sortBadAttributeTypeShouldBeFalse()
	{
		final DataType dt = dataType(true, true);
		when(dataAttribute.getAttributeType()).thenReturn(DataAttribute.AttributeType.COLLECTION);
		when(dataAttribute.getValueType()).thenReturn(dt);
		assertFalse(defaultIntegrationSortingService.isAttributeSortable(dataAttribute));
	}

	private DataType dataType(final boolean isAtomic, final boolean isEnum)
	{
		final DataType dt = mock(DataType.class);
		when(dt.isAtomic()).thenReturn(isAtomic);
		when(dt.isEnum()).thenReturn(isEnum);
		return dt;
	}

}
