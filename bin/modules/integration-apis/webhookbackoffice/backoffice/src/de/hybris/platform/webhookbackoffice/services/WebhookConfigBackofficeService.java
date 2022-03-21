/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.webhookbackoffice.services;

import de.hybris.platform.apiregistryservices.enums.DestinationChannel;
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.core.Registry;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.scripting.enums.ScriptType;
import de.hybris.platform.scripting.model.ScriptModel;
import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.servicelayer.search.FlexibleSearchQuery;
import de.hybris.platform.servicelayer.search.FlexibleSearchService;
import de.hybris.platform.servicelayer.search.SearchResult;
import de.hybris.platform.webhookservices.event.ItemSavedEvent;
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotNull;

import org.slf4j.Logger;

import com.google.common.base.Preconditions;

/**
 * Handles the read and write requests from the extension's widgets
 */
public class WebhookConfigBackofficeService
{
	private static final String DEFAULT_EVENTTYPE = ItemSavedEvent.class.getCanonicalName();

	private static final Logger LOG = Log.getLogger(WebhookConfigBackofficeService.class);
	private static final String FIND_WEBHOOKCONFIG = " SELECT DISTINCT {" + ItemModel.PK + "}" +
			" FROM {" + WebhookConfigurationModel._TYPECODE + " as wbh}" +
			" WHERE {wbh:" + WebhookConfigurationModel.EVENTTYPE + "}=?eventClass AND " +
			"{wbh:" + WebhookConfigurationModel.INTEGRATIONOBJECT + "}=?IO AND " +
			"{wbh:" + WebhookConfigurationModel.DESTINATION + "}=?destination";
	private static final String FIND_ACTIVE_GROOVY_SCRIPTS = " SELECT DISTINCT {" + ItemModel.PK + "}" +
			" FROM {" + ScriptModel._TYPECODE + " as s JOIN " + ScriptType._TYPECODE + " as st ON {s:" + ScriptModel.SCRIPTTYPE + "}={st:pk}}" +
			" WHERE {st:code}='GROOVY' AND {s:active}=?scriptActive";

	private FlexibleSearchService flexibleSearchService;
	private ModelService modelService;

	public void setFlexibleSearchService(@NotNull final FlexibleSearchService flexibleSearchService)
	{
		Preconditions.checkArgument(flexibleSearchService != null, "flexibleSearchService cannot be null");
		this.flexibleSearchService = flexibleSearchService;
	}

	public void setModelService(@NotNull final ModelService modelService)
	{
		Preconditions.checkArgument(modelService != null, "modelService cannot be null");
		this.modelService = modelService;
	}

	/**
	 * Retrieves a list of WebhookConfigurationModels searched with unique components
	 *
	 * @param integrationObject   An IO model
	 * @param consumedDestination A consumedDestination which is associated with a DestinationTarget that has {@link DestinationChannel}: 'WEBHOOKSERVICES'
	 * @return A list of WebhookConfigurationModel
	 */
	public List<WebhookConfigurationModel> getWebhookConfiguration(@NotNull final IntegrationObjectModel integrationObject,
	                                                               @NotNull final ConsumedDestinationModel consumedDestination)
	{
		Preconditions.checkArgument(integrationObject != null, "integrationObject cannot be null");
		Preconditions.checkArgument(consumedDestination != null, "consumedDestination cannot be null");

		final FlexibleSearchQuery query = new FlexibleSearchQuery(FIND_WEBHOOKCONFIG);
		Map<String, Object> params = Map.of("eventClass", DEFAULT_EVENTTYPE, "IO", integrationObject.getPk(), "destination",
				consumedDestination.getPk());
		query.addQueryParameters(params);
		final SearchResult<WebhookConfigurationModel> result = getFlexibleSearchService().search(query);
		return result.getResult();
	}

	/**
	 * Retrieves ScriptModels that are active and of type Groovy
	 *
	 * @return list of ScriptModels, or empty list
	 */
	public List<ScriptModel> getActiveGroovyScripts()
	{
		final FlexibleSearchQuery query = new FlexibleSearchQuery(FIND_ACTIVE_GROOVY_SCRIPTS);
		query.addQueryParameter("scriptActive", Boolean.TRUE);
		final SearchResult<ScriptModel> result = getFlexibleSearchService().search(query);
		return result.getResult();
	}

	/**
	 * Create and persist a WebhookConfigurationModel and return it.
	 * @deprecated use createWebhookConfiguration(integrationObject, consumedDestination, filterLocation, eventType) instead
	 *
	 * @param integrationObject   An IO model
	 * @param consumedDestination A consumedDestination which is associated with a DestinationTarget that has {@link DestinationChannel}: 'WEBHOOKSERVICES'
	 * @param filterLocation      A location of filter
	 * @return WebhookConfigurationModel just created
	 */
	@Deprecated(since = "2105.0", forRemoval = true)
	public WebhookConfigurationModel createWebhookConfiguration(@NotNull final IntegrationObjectModel integrationObject,
	                                                            @NotNull final ConsumedDestinationModel consumedDestination,
	                                                            final String filterLocation)
	{
		return createWebhookConfiguration(integrationObject, consumedDestination, filterLocation, DEFAULT_EVENTTYPE);
	}

	/**
	 * Create and persist a WebhookConfigurationModel and return it.
	 *
	 * @param integrationObject   An IO model
	 * @param consumedDestination A consumedDestination which is associated with a DestinationTarget that has {@link DestinationChannel}: 'WEBHOOKSERVICES'
	 * @param filterLocation      A location of filter
	 * @param eventType           A webhook event name
	 * @return WebhookConfigurationModel just created
	 */
	public WebhookConfigurationModel createWebhookConfiguration(@NotNull final IntegrationObjectModel integrationObject,
	                                                            @NotNull final ConsumedDestinationModel consumedDestination,
	                                                            final String filterLocation,
	                                                            final String eventType)
	{
		Preconditions.checkArgument(integrationObject != null, "integrationObject cannot be null");
		Preconditions.checkArgument(consumedDestination != null, "consumedDestination cannot be null");

		final WebhookConfigurationModel webhookConfiguration = getModelService().create(WebhookConfigurationModel.class);
		webhookConfiguration.setIntegrationObject(integrationObject);
		webhookConfiguration.setDestination(consumedDestination);
		webhookConfiguration.setEventType(eventType == null ? DEFAULT_EVENTTYPE : eventType);
		if(filterLocation != null)
		{
			webhookConfiguration.setFilterLocation(filterLocation);
		}
		getModelService().save(webhookConfiguration);
		LOG.info("Created a webhookConfiguration with IO: {}, ConsumedDestination: {} and EventType: {}.",
				integrationObject.getCode(), consumedDestination.getId(), (eventType == null ? DEFAULT_EVENTTYPE : eventType));
		return webhookConfiguration;
	}

	FlexibleSearchService getFlexibleSearchService()
	{
		if (flexibleSearchService == null)
		{
			flexibleSearchService = (FlexibleSearchService) Registry.getApplicationContext().getBean("flexibleSearchService");
		}
		return flexibleSearchService;
	}

	ModelService getModelService()
	{
		if (modelService == null)
		{
			modelService = (ModelService) Registry.getApplicationContext().getBean("modelService");
		}
		return modelService;
	}
}
