/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.core.model.type.ComposedTypeModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectItemModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class IntegrationbackofficetestUtils
{
	public static ItemModel itemModelMock(final long pk)
	{
		final ItemModel itemModel = mock(ItemModel.class);
		when(itemModel.getPk()).thenReturn(PK.fromLong(pk));
		return itemModel;
	}

	public static Set<ItemModel> mutableSetOfItemModels(final ItemModel... itemModels)
	{
		final Set<ItemModel> set = new HashSet<>();
		Collections.addAll(set, itemModels);
		return set;
	}

	public static ComposedTypeModel composedTypeModel(final String code)
	{
		final ComposedTypeModel composedTypeModel = new ComposedTypeModel();
		composedTypeModel.setCode(code);
		return composedTypeModel;
	}

	public static IntegrationObjectItemModel integrationObjectItemModel(final String code,
	                                                                    final ComposedTypeModel composedTypeModel)
	{
		final IntegrationObjectItemModel integrationObjectItemModel = new IntegrationObjectItemModel();
		integrationObjectItemModel.setCode(code);
		integrationObjectItemModel.setType(composedTypeModel);
		return integrationObjectItemModel;
	}

	public static IntegrationObjectModel integrationObjectModel(final String code)
	{
		final IntegrationObjectModel integrationObjectModel = new IntegrationObjectModel();
		integrationObjectModel.setCode(code);
		return integrationObjectModel;
	}

	public static IntegrationObjectModel integrationObjectModelMock(final IntegrationObjectItemModel rootItem)
	{
		final IntegrationObjectModel integrationObjectModel = mock(IntegrationObjectModel.class);
		when(integrationObjectModel.getRootItem()).thenReturn(rootItem);
		return integrationObjectModel;
	}

	public static IntegrationObjectModel integrationObjectModelMock(final String code, final IntegrationObjectItemModel rootItem)
	{
		final IntegrationObjectModel integrationObjectModel = integrationObjectModelMock(rootItem);
		when(integrationObjectModel.getCode()).thenReturn(code);
		return integrationObjectModel;
	}

}
