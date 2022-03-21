/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2services.export.impl;

import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.model.DescriptorFactory;
import de.hybris.platform.integrationservices.model.IntegrationObjectDescriptor;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.integrationservices.populator.ItemToMapConversionContext;
import de.hybris.platform.integrationservices.service.IntegrationObjectAndItemMismatchException;
import de.hybris.platform.integrationservices.service.IntegrationObjectConversionService;
import de.hybris.platform.integrationservices.service.IntegrationObjectService;
import de.hybris.platform.integrationservices.util.JsonObject;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.odata2services.dto.ExportEntity;
import de.hybris.platform.odata2services.export.ExportConfigurationDecorator;
import de.hybris.platform.odata2services.odata.schema.entity.EntitySetNameGenerator;
import de.hybris.platform.scripting.engine.repository.impl.ModelScriptsRepository;
import de.hybris.platform.scripting.model.ScriptModel;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;

import com.google.common.base.Preconditions;
import com.google.common.base.Splitter;
import com.google.common.collect.Iterables;

import groovy.json.JsonBuilder;

/**
 * The script decorator to augment export configuration with referenced scripts.
 */
public class DefaultScriptDecorator implements ExportConfigurationDecorator
{
	private static final Logger LOG = Log.getLogger(DefaultScriptDecorator.class);

	private static final String SCRIPT_IO = "ScriptService";
	private static final String WEBHOOK_IO = "WebhookService";
	private static final String INTEGRATION_SERVICE_IO = "IntegrationService";

	private static final String SCRIPT_ENTITY_SET = "Script";
	private static final String IO_ENTITY_SET = "IntegrationObject";
	private static final String ICC_ENTITY_SET = "InboundChannelConfiguration";
	private static final String WEBHOOK_ENTITY_SET = "WebhookConfiguration";

	private static final String IO_SCRIPT_PATH = "items[*].virtualAttributes[*].retrievalDescriptor.logicLocation";
	private static final String ICC_SCRIPT_PATH = "integrationObject." + IO_SCRIPT_PATH;
	private static final String WEBHOOK_SCRIPT_PATH = "filterLocation";
	private static final String BASE_URL = "{{hostUrl}}/odata2webservices/";
	private static final String PATH_DELIMITER = "/";
	private static final String SCRIPT_URI_SEPARATOR = "//";
	private static final int SCRIPT_URI_SPLITS = 2;
	private static final Splitter SCRIPT_URI_SPLITTER = Splitter.on(SCRIPT_URI_SEPARATOR);

	private final DescriptorFactory descriptorFactory;
	private final IntegrationObjectService integrationObjectService;
	private final IntegrationObjectConversionService conversionService;
	private final ModelScriptsRepository scriptsRepository;
	private final EntitySetNameGenerator nameGenerator;

	/**
	 * Instantiate a new instance of the script decorator.
	 *
	 * @param descriptorFactory        to create the integration object descriptor
	 * @param integrationObjectService to find the integration object
	 * @param conversionService        to convert the integration object
	 * @param scriptsRepository        to find the script model
	 * @param nameGenerator            to generate the entity set name
	 */
	public DefaultScriptDecorator(
			@NotNull final DescriptorFactory descriptorFactory,
			@NotNull final IntegrationObjectService integrationObjectService,
			@NotNull final IntegrationObjectConversionService conversionService,
			@NotNull final ModelScriptsRepository scriptsRepository,
			@NotNull final EntitySetNameGenerator nameGenerator)
	{
		Preconditions.checkArgument(descriptorFactory != null, "descriptorFactory must not be null.");
		Preconditions.checkArgument(integrationObjectService != null, "integrationObjectService must not be null.");
		Preconditions.checkArgument(conversionService != null, "conversionService must not be null.");
		Preconditions.checkArgument(scriptsRepository != null, "scriptsRepository must not be null.");
		Preconditions.checkArgument(nameGenerator != null, "nameGenerator must not be null.");

		this.descriptorFactory = descriptorFactory;
		this.integrationObjectService = integrationObjectService;
		this.conversionService = conversionService;
		this.scriptsRepository = scriptsRepository;
		this.nameGenerator = nameGenerator;
	}

	@Override
	public Set<ExportEntity> decorate(final Set<ExportEntity> exportEntities)
	{
		final Set<String> scriptBodies = extractScriptLocations(exportEntities).stream()
		                                                                       .map(this::constructRequestBody)
		                                                                       .collect(Collectors.toSet());
		return !scriptBodies.isEmpty() ? decorateExportEntities(exportEntities, scriptBodies) : exportEntities;
	}

	private Set<String> extractScriptLocations(final Set<ExportEntity> exportEntities)
	{
		return Stream.of(
				referencedScripts(exportEntities, this::isIntegrationObject, this::ioScriptLocations),
				referencedScripts(exportEntities, this::isInboundChannelConfiguration, this::iccScriptLocations),
				referencedScripts(exportEntities, this::isWebhook, this::webhookScriptLocations)
		).flatMap(Collection::stream).collect(Collectors.toSet());
	}

	private String constructRequestBody(final String scriptPath)
	{
		final ScriptModel activeScript = scriptsRepository.findActiveScript(getScriptCode(scriptPath));
		final IntegrationObjectModel scriptService = integrationObjectService.findIntegrationObject(SCRIPT_IO);
		final IntegrationObjectDescriptor descriptor = descriptorFactory.createIntegrationObjectDescriptor(scriptService);
		final Map<String, Object> requestBody = conversionService.convert(getConversionContext(activeScript, descriptor));
		final String requestBodyJson = new JsonBuilder(requestBody).toPrettyString();

		LOG.debug("The decorated request body for the script [{}]: {}", scriptPath, requestBodyJson);
		return requestBodyJson;
	}

	private Set<ExportEntity> decorateExportEntities(final Set<ExportEntity> exportEntities, final Set<String> insertBodies)
	{
		final ExportEntity scriptEntity = new ExportEntity();
		scriptEntity.setRequestBodies(insertBodies);
		scriptEntity.setRequestUrl(constructRequestUrl());

		final Set<ExportEntity> augmentedEntities = new LinkedHashSet<>();
		augmentedEntities.add(scriptEntity);
		augmentedEntities.addAll(exportEntities);
		return augmentedEntities;
	}

	private Set<String> referencedScripts(final Set<ExportEntity> exportEntities,
	                                      final Predicate<ExportEntity> filterExportEntity,
	                                      final Function<String, List<String>> scriptLocations)
	{
		return exportEntities.stream()
		                     .filter(filterExportEntity)
		                     .flatMap(exportEntity -> exportEntity.getRequestBodies().stream())
		                     .map(scriptLocations)
		                     .flatMap(Collection::stream)
		                     .filter(StringUtils::isNotBlank)
		                     .collect(Collectors.toSet());
	}

	private List<String> ioScriptLocations(final String requestBodyJson)
	{
		return getAttributes(requestBodyJson, IO_SCRIPT_PATH);
	}

	private List<String> iccScriptLocations(final String requestBodyJson)
	{
		return getAttributes(requestBodyJson, ICC_SCRIPT_PATH);
	}

	private List<String> webhookScriptLocations(final String requestBodyJson)
	{
		final String scriptLocationValue = JsonObject.createFrom(requestBodyJson).getString(WEBHOOK_SCRIPT_PATH);

		return scriptLocationValue != null ? List.of(scriptLocationValue) : Collections.emptyList();
	}

	private boolean isWebhook(final ExportEntity exportEntity)
	{
		return exportEntity.getRequestUrl().contains(exportEndpoint(WEBHOOK_IO, WEBHOOK_ENTITY_SET));
	}

	private boolean isIntegrationObject(final ExportEntity exportEntity)
	{
		return exportEntity.getRequestUrl().contains(exportEndpoint(INTEGRATION_SERVICE_IO, IO_ENTITY_SET));
	}

	private boolean isInboundChannelConfiguration(final ExportEntity exportEntity)
	{
		return exportEntity.getRequestUrl().contains(exportEndpoint(INTEGRATION_SERVICE_IO, ICC_ENTITY_SET));
	}

	private String getScriptCode(final String scriptPath)
	{
		final Iterable<String> result = SCRIPT_URI_SPLITTER.split(scriptPath);
		Preconditions.checkState(
				Iterables.size(result) == SCRIPT_URI_SPLITS, "Script path %s should contain two elements.", scriptPath);
		return Iterables.getLast(result);
	}

	private List<String> getAttributes(final String requestBodyJson, final String path)
	{
		final Object[] objects = JsonObject.createFrom(requestBodyJson).getCollection(path).toArray();
		return Arrays.stream(objects).map(Object::toString).collect(Collectors.toList());
	}

	private String exportEndpoint(final String integrationObject, final String entitySet)
	{
		return integrationObject + PATH_DELIMITER + nameGenerator.generate(entitySet);
	}

	private String constructRequestUrl()
	{
		return BASE_URL + SCRIPT_IO + PATH_DELIMITER + nameGenerator.generate(SCRIPT_ENTITY_SET);
	}

	private ItemToMapConversionContext getConversionContext(final ItemModel item, final IntegrationObjectDescriptor descriptor)
	{
		return descriptor.getItemTypeDescriptor(item)
		                 .map(type -> new ItemToMapConversionContext(item, type))
		                 .orElseThrow(() -> new IntegrationObjectAndItemMismatchException(item, descriptor));
	}

}
