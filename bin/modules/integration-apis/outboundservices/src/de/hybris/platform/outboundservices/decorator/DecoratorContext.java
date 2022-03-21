/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices.decorator;

import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.enums.HttpMethod;
import de.hybris.platform.integrationservices.jalo.IntegrationObject;
import de.hybris.platform.integrationservices.model.IntegrationObjectDescriptor;
import de.hybris.platform.integrationservices.model.TypeDescriptor;
import de.hybris.platform.outboundservices.enums.OutboundSource;
import de.hybris.platform.outboundservices.event.EventType;
import de.hybris.platform.outboundservices.event.impl.DefaultEventType;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;

import javax.validation.constraints.NotNull;

import com.google.common.base.Preconditions;

/**
 * Context that is used to hold & transfer data pertaining to outbound requests.
 */
public class DecoratorContext
{
	private static final IntegrationObjectDescriptor NULL_IO = new NullIntegrationObjectDescriptor();
	private static final ConsumedDestinationModel NULL_DESTINATION = new ConsumedDestinationModel();
	private static final EventType DEFAULT_EVENT_TYPE = DefaultEventType.UNKNOWN;
	private static final OutboundSource DEFAULT_SOURCE = OutboundSource.UNKNOWN;
	private static final HttpMethod DEFAULT_HTTP_METHOD = HttpMethod.POST;

	private final IntegrationObjectDescriptor integrationObject;
	private final ConsumedDestinationModel destinationModel;
	private final EventType eventType;
	private final HttpMethod httpMethod;
	private final Collection<String> errors;
	ItemModel itemModel;
	OutboundSource outboundSource;
	String integrationKey;

	/**
	 * @deprecated use {@link #DecoratorContext(ItemModel, IntegrationObjectDescriptor, ConsumedDestinationModel, OutboundSource, Collection)} instead
	 */
	@Deprecated(since = "2011.0", forRemoval = true)
	protected DecoratorContext()
	{
		this(NULL_IO, NULL_DESTINATION, DEFAULT_SOURCE, DEFAULT_HTTP_METHOD, DEFAULT_EVENT_TYPE, Collections.emptyList());
	}

	/**
	 * Instantiates a new context.
	 *
	 * @param item        item model being synchronized to an external system.
	 * @param io          integration object that governs the {@code item} presentation in the external system
	 * @param destination destination where the {@code item} is being sent.
	 * @param source      platform module that is performing the {@code item} synchronization. If value is not provided, i.e. it is
	 *                    {@code null}, then a default value of {@link OutboundSource#UNKNOWN} is used.
	 * @param errors      errors that will be included in the monitoring request if any are present
	 * @deprecated Use {@link de.hybris.platform.outboundservices.decorator.DecoratorContextBuilder} to create instances.
	 */
	@Deprecated(since = "2105", forRemoval = true)
	protected DecoratorContext(final ItemModel item,
	                           @NotNull final IntegrationObjectDescriptor io,
	                           @NotNull final ConsumedDestinationModel destination,
	                           final OutboundSource source,
	                           final Collection<String> errors)
	{
		this(io, destination, source, DEFAULT_HTTP_METHOD, DEFAULT_EVENT_TYPE, errors);
		itemModel = item;
	}

	/**
	 * Instantiates a new context.
	 *
	 * @param io          integration object that governs the {@code item} presentation in the external system
	 * @param destination destination where the {@code item} is being sent.
	 * @param source      platform module that is performing the {@code item} synchronization. If value is not provided, i.e. it is
	 *                    {@code null}, then a default value of {@link OutboundSource#UNKNOWN} is used.
	 * @param httpMethod  httpMethod represented as a string
	 * @param eventType   event type {@link EventType} that stores the operation change value
	 * @param errors      errors that will be included in the monitoring request if any are present
	 */
	DecoratorContext(@NotNull final IntegrationObjectDescriptor io,
	                 @NotNull final ConsumedDestinationModel destination,
	                 final OutboundSource source,
	                 final HttpMethod httpMethod,
	                 final EventType eventType,
	                 final Collection<String> errors)
	{
		Preconditions.checkArgument(io != null, "IntegrationObjectDescriptor cannot be null");
		Preconditions.checkArgument(destination != null, "ConsumedDestinationModel cannot be null");

		integrationObject = io;
		destinationModel = destination;
		outboundSource = source == null ? DEFAULT_SOURCE : source;
		this.httpMethod = httpMethod == null ? DEFAULT_HTTP_METHOD : httpMethod;
		this.eventType = eventType == null ? DEFAULT_EVENT_TYPE : eventType;
		this.errors = errors == null ? new ArrayList<>() : new ArrayList<>(errors);
	}

	public static DecoratorContextBuilder decoratorContextBuilder()
	{
		return new DecoratorContextBuilder();
	}

	/**
	 * Retrieves the item model under concern.
	 *
	 * @return item model
	 */
	public ItemModel getItemModel()
	{
		return itemModel;
	}

	/**
	 * Retrieves the {@link IntegrationObject#getCode()} value.
	 *
	 * @return integration object code
	 */
	@NotNull
	public IntegrationObjectDescriptor getIntegrationObject()
	{
		return integrationObject;
	}

	/**
	 * A convenience/shortcut method for retrieving the context integration object code. Calling this method is same as
	 * {@code getIntegrationObject().getCode()}
	 *
	 * @return code of the context integration object.
	 */
	public String getIntegrationObjectCode()
	{
		return getIntegrationObject().getCode();
	}

	/**
	 * Retrieves integration object item type descriptor for the context integration object and item model.
	 *
	 * @return an {@code Optional} containing a {@code TypeDescriptor}, if the integration object contains at least one item
	 * for the context item model type. I.e. there is a integration object item model matching the {@code getItemModel().getItemtype()}.
	 * Otherwise, an {@code Optional.empty()} is returned.
	 */
	public Optional<TypeDescriptor> getIntegrationObjectItem()
	{
		return getIntegrationObject().getItemTypeDescriptor(getItemModel());
	}

	/**
	 * @deprecated No longer used. Use {@link #getIntegrationObjectItem()} instead.
	 */
	@Deprecated(since = "2011.0", forRemoval = true)
	public String getIntegrationObjectItemCode()
	{
		return getIntegrationObjectItem().map(TypeDescriptor::getItemCode).orElse("");
	}

	/**
	 * Retrieves destination, to which the item should be sent.
	 *
	 * @return consumed destination
	 */
	@NotNull
	public ConsumedDestinationModel getDestinationModel()
	{
		return destinationModel;
	}

	/**
	 * Retrieves a list of errors that indicate why this context is not valid
	 * or returns an empty list.
	 *
	 * @return a list of errors
	 */
	@NotNull
	public Collection<String> getErrors()
	{
		return errors;
	}

	/**
	 * Retrieves a value indicating if this context is valid
	 * based off the presence of errors.
	 *
	 * @return {@code true} if this context has errors, else {@code false}
	 */
	@NotNull
	public boolean hasErrors()
	{
		return !errors.isEmpty();
	}

	/**
	 * Retrieves source of the item synchronization.
	 *
	 * @return a platform module that sends the item to external system.
	 */
	@NotNull
	public OutboundSource getSource()
	{
		return outboundSource;
	}

	/**
	 * Retrieves {@link EventType} of the value
	 *
	 * @return value of event type
	 */
	public EventType getEventType()
	{
		return eventType;
	}

	/**
	 * Retrieves httpMethod of the item synchronization.
	 *
	 * @return httpMethod for the delta being sent
	 */
	@NotNull
	public HttpMethod getHttpMethod()
	{
		return httpMethod;
	}

	public String getIntegrationKey()
	{
		return integrationKey;
	}

	/**
	 * @deprecated use {@link de.hybris.platform.outboundservices.decorator.DecoratorContextBuilder} instead
	 */
	@Deprecated(since = "2105", forRemoval = true)
	public static class DecoratorContextBuilder extends de.hybris.platform.outboundservices.decorator.DecoratorContextBuilder
	{
	}

	private static final class NullIntegrationObjectDescriptor implements IntegrationObjectDescriptor
	{
		private static final Set<TypeDescriptor> NO_ITEMS = Collections.emptySet();

		@Override
		public String getCode()
		{
			return "";
		}

		@Override
		public Set<TypeDescriptor> getItemTypeDescriptors()
		{
			return NO_ITEMS;
		}

		@Override
		public Optional<TypeDescriptor> getItemTypeDescriptor(final ItemModel item)
		{
			return Optional.empty();
		}

		@Override
		public Optional<TypeDescriptor> getRootItemType()
		{
			return Optional.empty();
		}
	}
}
