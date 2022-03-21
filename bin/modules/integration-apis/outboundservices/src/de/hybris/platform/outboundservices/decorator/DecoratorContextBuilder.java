/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundservices.decorator;

import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.core.Registry;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.enums.HttpMethod;
import de.hybris.platform.integrationservices.model.DescriptorFactory;
import de.hybris.platform.integrationservices.model.IntegrationObjectDescriptor;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.integrationservices.model.impl.NullIntegrationObjectDescriptor;
import de.hybris.platform.integrationservices.service.IntegrationObjectService;
import de.hybris.platform.outboundservices.enums.OutboundSource;
import de.hybris.platform.outboundservices.event.EventType;
import de.hybris.platform.servicelayer.exceptions.ModelNotFoundException;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.context.ApplicationContext;

/**
 * A builder for creating {@link DecoratorContext} instances.
 */
public class DecoratorContextBuilder
{
	private ItemModel itemModel;
	private IntegrationObjectDescriptor integrationObject;
	private ConsumedDestinationModel destinationModel;
	private OutboundSource outboundSource;
	private EventType eventType;
	private HttpMethod httpMethod;
	private String integrationKey;
	private Collection<String> errors;

	protected DecoratorContextBuilder()
	{
	}

	private static <T> T getService(final String name, final Class<T> type)
	{
		final ApplicationContext context = Registry.getApplicationContext();
		return context.getBean(name, type);
	}

	public DecoratorContextBuilder withItemModel(final ItemModel itemModel)
	{
		this.itemModel = itemModel;
		return this;
	}

	/**
	 * Specifies an integration object to be placed into the sync context to be created.
	 *
	 * @param io an integration object that will be used for describing data being sent out.
	 * @return a builder with the integration object specified.
	 */
	public DecoratorContextBuilder withIntegrationObject(final IntegrationObjectDescriptor io)
	{
		integrationObject = io;
		return this;
	}

	/**
	 * @deprecated not used anymore, use {@link #withIntegrationObject(IntegrationObjectDescriptor)} instead
	 */
	@Deprecated(since = "2011.0", forRemoval = true)
	public DecoratorContextBuilder withIntegrationObjectCode(final String code)
	{
		final IntegrationObjectModel model;
		try
		{
			final IntegrationObjectService ioService = getService("integrationObjectService", IntegrationObjectService.class);
			model = ioService.findIntegrationObject(code);
			final DescriptorFactory factory = getService("integrationServicesDescriptorFactory", DescriptorFactory.class);
			return withIntegrationObject(factory.createIntegrationObjectDescriptor(model));
		}
		catch (final ModelNotFoundException e)
		{
			withIntegrationObject(new NullIntegrationObjectDescriptor(code));
			return this;
		}
	}

	public DecoratorContextBuilder withDestinationModel(final ConsumedDestinationModel destinationModel)
	{
		this.destinationModel = destinationModel;
		return this;
	}

	/**
	 * @deprecated No longer used. The integration object item is derived from the context integration object and item model.
	 */
	@Deprecated(since = "2011.0", forRemoval = true)
	public DecoratorContextBuilder withIntegrationObjectItemCode(final String integrationObjectItemCode)
	{
		return this;
	}

	/**
	 * Specifies source module sending data outbound
	 *
	 * @param source a source module that initiated the outbound data exchange. If {@code null}, then default value of
	 *               {@link OutboundSource#UNKNOWN} is used.
	 * @return a builder with the source specified.
	 */
	public DecoratorContextBuilder withOutboundSource(final OutboundSource source)
	{
		outboundSource = source;
		return this;
	}

	public DecoratorContextBuilder withHttpMethod(final HttpMethod httpMethod)
	{
		this.httpMethod = httpMethod;
		return this;
	}

	public DecoratorContextBuilder withIntegrationKey(final String integrationKey)
	{
		this.integrationKey = integrationKey;
		return this;
	}

	public DecoratorContextBuilder withErrors(final Collection<String> errors)
	{
		this.errors = errors == null ? Collections.emptyList() : List.copyOf(errors);
		return this;
	}

	public DecoratorContextBuilder withEventType(final EventType eventType)
	{
		this.eventType = eventType;
		return this;
	}

	public DecoratorContext build()
	{
		final DecoratorContext context = new DecoratorContext(integrationObject, destinationModel, outboundSource, httpMethod, eventType, errors);
		context.itemModel = itemModel;
		context.integrationKey = integrationKey;
		return context;
	}
}
