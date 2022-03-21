/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationservices.search;

import de.hybris.platform.integrationservices.item.IntegrationItem;
import de.hybris.platform.integrationservices.model.TypeDescriptor;

import java.util.List;
import java.util.Locale;

/**
 * A builder for {@link ImmutableItemSearchRequest}
 */
public class ItemSearchRequestBuilder
{
	private TypeDescriptor typeDescriptor;
	private IntegrationItem integrationItem;
	private PaginationParameters pageParameters;
	private WhereClauseConditions whereClause;
	private List<OrderExpression> orderBy;
	private Locale locale;
	private boolean totalCount;
	private boolean countOnly;

	public ItemSearchRequestBuilder()
	{
	}

	ItemSearchRequestBuilder(final ItemSearchRequest request)
	{
		request.getRequestedItem().ifPresent(this::integrationItem);
		itemType(request.getTypeDescriptor());
		filter(request.getFilter());
		orderBy(request.getOrderBy());
		locale(request.getAcceptLocale());
		countOnly(request.isCountOnly());
		totalCount(request.includeTotalCount());
		request.getPaginationParameters().ifPresent(this::pageParameters);
	}

	private ItemSearchRequestBuilder integrationItem(final IntegrationItem item)
	{
		final var type = item != null ? item.getItemType() : null;
		integrationItem = item;
		return itemType(type);
	}

	public ItemSearchRequestBuilder withIntegrationItem(final IntegrationItem item)
	{
		return integrationItem(item);
	}

	private ItemSearchRequestBuilder itemType(final TypeDescriptor type)
	{
		typeDescriptor = type;
		return this;
	}

	public ItemSearchRequestBuilder withItemType(final TypeDescriptor type)
	{
		return itemType(type);
	}

	private ItemSearchRequestBuilder filter(final WhereClauseConditions filter)
	{
		whereClause = filter;
		return this;
	}

	public ItemSearchRequestBuilder withFilter(final WhereClauseConditions filter)
	{
		return filter(filter);
	}

	private ItemSearchRequestBuilder orderBy(final List<OrderExpression> orderByExpressions)
	{
		orderBy = orderByExpressions;
		return this;
	}

	public ItemSearchRequestBuilder withOrderBy(final List<OrderExpression> orderByExpressions)
	{
		return orderBy(orderByExpressions);
	}

	private ItemSearchRequestBuilder locale(final Locale locale)
	{
		this.locale = locale;
		return this;
	}

	public ItemSearchRequestBuilder withLocale(final Locale locale)
	{
		return locale(locale);
	}

	private ItemSearchRequestBuilder countOnly(final boolean value)
	{
		countOnly = value;
		return totalCount(value);
	}

	public ItemSearchRequestBuilder withCountOnly()
	{
		return countOnly(true);
	}

	public ItemSearchRequestBuilder withNoCountOnly()
	{
		return countOnly(false);
	}

	private ItemSearchRequestBuilder totalCount(final boolean value)
	{
		totalCount = value;
		return this;
	}

	public ItemSearchRequestBuilder withTotalCount()
	{
		return totalCount(true);
	}

	public ItemSearchRequestBuilder withNoTotalCount() {
		return totalCount(false);
	}

	private ItemSearchRequestBuilder pageParameters(final PaginationParameters params)
	{
		pageParameters = params;
		return this;
	}

	public ItemSearchRequestBuilder withPageParameters(final PaginationParameters params)
	{
		return pageParameters(params);
	}

	public ImmutableItemSearchRequest build()
	{
		final var request = new ImmutableItemSearchRequest(typeDescriptor);
		request.integrationItem = integrationItem;
		request.paginationParameters = pageParameters;
		request.filter = whereClause;
		request.orderBy = orderBy;
		request.totalCount = totalCount;
		request.countOnly = countOnly;
		request.locale = locale;
		return request;
	}
}
