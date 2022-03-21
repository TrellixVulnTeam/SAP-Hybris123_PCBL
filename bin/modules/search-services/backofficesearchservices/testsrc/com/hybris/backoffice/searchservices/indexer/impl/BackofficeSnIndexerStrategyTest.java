/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved
 */
package com.hybris.backoffice.searchservices.indexer.impl;
import com.hybris.backoffice.searchservices.model.BackofficeIndexedTypeToSearchservicesIndexConfigModel;
import com.hybris.backoffice.searchservices.services.impl.BackofficeSearchservicesFacetSearchConfigService;

import de.hybris.platform.searchservices.admin.data.SnIndexType;
import de.hybris.platform.searchservices.enums.SnIndexerOperationStatus;
import de.hybris.platform.searchservices.enums.SnIndexerOperationType;
import de.hybris.platform.searchservices.indexer.service.SnIndexerContext;
import de.hybris.platform.searchservices.indexer.service.SnIndexerRequest;
import de.hybris.platform.searchservices.indexer.service.SnIndexerResponse;
import de.hybris.platform.searchservices.model.SnIndexTypeModel;
import de.hybris.platform.servicelayer.model.ModelService;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class BackofficeSnIndexerStrategyTest
{
	private static final String PRODUCT_TYPECODE = "Product";
	private static final String PRODUCT_ID= "Backoffice-Product";
	private static final String PRODUCT_ID1= "Other-Product";

	@Mock
	private BackofficeSearchservicesFacetSearchConfigService backofficeFacetSearchConfigService;

	@Mock
	private SnIndexerContext indexerContext;

	@Mock
	private BackofficeIndexedTypeToSearchservicesIndexConfigModel backofficeIndexedTypeToSearchservicesIndexConfigModel;

	@Mock
	private ModelService modelService;

	@Mock
	private SnIndexerResponse snIndexerResponse;

	@Mock
	private SnIndexerRequest snIndexerRequest;

	@Mock
	private SnIndexTypeModel snIndexTypeModel;

	@Mock
	private SnIndexType snIndexType;

	@InjectMocks
	private final BackofficeSnIndexerStrategy backofficeSnIndexerStrategy = new BackofficeSnIndexerStrategy();

	@Before
	public void init()
	{
		MockitoAnnotations.initMocks(this);
		when(backofficeFacetSearchConfigService.findSearchConfigForTypeCode(PRODUCT_TYPECODE)).thenReturn(backofficeIndexedTypeToSearchservicesIndexConfigModel);
		when(indexerContext.getIndexerRequest()).thenReturn(snIndexerRequest);
		when(indexerContext.getIndexType()).thenReturn(snIndexType);
		when(backofficeIndexedTypeToSearchservicesIndexConfigModel.getSnIndexType()).thenReturn(snIndexTypeModel);
		when(snIndexType.getItemComposedType()).thenReturn(PRODUCT_TYPECODE);
		when(snIndexTypeModel.getId()).thenReturn(PRODUCT_ID);
	}

	@Test
	public void shouldSetIndexToActiveWhenFullIndexForBackofficeProductSuccessfully()
	{
		when(snIndexerRequest.getIndexerOperationType()).thenReturn(SnIndexerOperationType.FULL);
		when(snIndexerResponse.getStatus()).thenReturn(SnIndexerOperationStatus.COMPLETED);
		when(snIndexType.getId()).thenReturn(PRODUCT_ID);
		when(backofficeIndexedTypeToSearchservicesIndexConfigModel.isActive()).thenReturn(false);

		backofficeSnIndexerStrategy.setIndexToActive(indexerContext, snIndexerResponse);

		verify(modelService).save(any());
	}

	@Test
	public void shouldNotSetIndexToActiveWhenFullIndexIsActive()
	{
		when(snIndexerRequest.getIndexerOperationType()).thenReturn(SnIndexerOperationType.FULL);
		when(snIndexerResponse.getStatus()).thenReturn(SnIndexerOperationStatus.COMPLETED);
		when(snIndexType.getId()).thenReturn(PRODUCT_ID);
		when(backofficeIndexedTypeToSearchservicesIndexConfigModel.isActive()).thenReturn(true);

		backofficeSnIndexerStrategy.setIndexToActive(indexerContext, snIndexerResponse);

		verify(modelService, never()).save(any());
	}

	@Test
	public void shouldNotSetIndexToActiveWhenIsNotFullIndex()
	{
		when(snIndexerRequest.getIndexerOperationType()).thenReturn(SnIndexerOperationType.INCREMENTAL);
		when(snIndexerResponse.getStatus()).thenReturn(SnIndexerOperationStatus.COMPLETED);
		when(snIndexType.getId()).thenReturn(PRODUCT_ID);
		when(backofficeIndexedTypeToSearchservicesIndexConfigModel.isActive()).thenReturn(false);

		backofficeSnIndexerStrategy.setIndexToActive(indexerContext, snIndexerResponse);

		verify(modelService, never()).save(any());
	}

	@Test
	public void shouldNotSetIndexToActiveWhenIsNotFullIndexForBackofficeProduct()
	{
		when(snIndexerRequest.getIndexerOperationType()).thenReturn(SnIndexerOperationType.FULL);
		when(snIndexerResponse.getStatus()).thenReturn(SnIndexerOperationStatus.COMPLETED);
		when(snIndexType.getId()).thenReturn(PRODUCT_ID1);
		when(backofficeIndexedTypeToSearchservicesIndexConfigModel.isActive()).thenReturn(false);

		backofficeSnIndexerStrategy.setIndexToActive(indexerContext, snIndexerResponse);

		verify(modelService, never()).save(any());
	}

	@Test
	public void shouldSetIndexToActiveWhenFullIndexForBackofficeProductFail()
	{
		when(snIndexerRequest.getIndexerOperationType()).thenReturn(SnIndexerOperationType.FULL);
		when(snIndexerResponse.getStatus()).thenReturn(SnIndexerOperationStatus.FAILED);
		when(snIndexType.getId()).thenReturn(PRODUCT_ID);
		when(backofficeIndexedTypeToSearchservicesIndexConfigModel.isActive()).thenReturn(false);

		backofficeSnIndexerStrategy.setIndexToActive(indexerContext, snIndexerResponse);

		verify(modelService, never()).save(any());
	}
}
