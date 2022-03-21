/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationservices;

import de.hybris.platform.impex.jalo.ImpExException;
import de.hybris.platform.integrationservices.model.IntegrationObjectItemModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.integrationservices.search.ItemTypeMatch;
import de.hybris.platform.integrationservices.util.IntegrationTestUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import com.google.common.base.Preconditions;


/**
 * Integration object item builder to build an {@link IntegrationObjectItemModel}.
 */
public class IntegrationObjectItemModelBuilder
{
	private static final String EMPTY_TYPE = "";
	private final List<IntegrationObjectItemAttributeModelBuilder> attributes = new ArrayList<>();
	private final List<IntegrationObjectItemClassificationAttributeBuilder> classificationAttributes = new ArrayList<>();
	private String code;
	private String type;
	private boolean root = false;
	private String integrationObjectCode;
	private ItemTypeMatch itemTypeMatch;

	private IntegrationObjectItemModelBuilder()
	{
		//Empty private constructor that cannot be called externally.
	}

	public static IntegrationObjectItemModelBuilder integrationObjectItem(final String code)
	{
		return integrationObjectItem().withCode(code);
	}

	public static IntegrationObjectItemModelBuilder integrationObjectItem()
	{
		return new IntegrationObjectItemModelBuilder();
	}

	public IntegrationObjectItemModelBuilder withCode(final String code)
	{
		this.code = code;
		return this;
	}

	public IntegrationObjectItemModelBuilder withIntegrationObject(final IntegrationObjectModel model)
	{
		return withIntegrationObjectCode(model.getCode());
	}

	public IntegrationObjectItemModelBuilder withIntegrationObjectCode(final String ioCode)
	{
		integrationObjectCode = ioCode;
		return this;
	}

	public IntegrationObjectItemModelBuilder withType(final String type)
	{
		this.type = type;
		return this;
	}

	public IntegrationObjectItemModelBuilder withTypeMatch(final ItemTypeMatch match)
	{
		itemTypeMatch = match;
		return this;
	}

	public IntegrationObjectItemModelBuilder root()
	{
		return withRoot(true);
	}

	public IntegrationObjectItemModelBuilder withRoot(final boolean value)
	{
		root = value;
		return this;
	}

	public IntegrationObjectItemModelBuilder withAttribute(final IntegrationObjectItemAttributeModelBuilder attr)
	{
		attributes.add(attr);
		return this;
	}

	public IntegrationObjectItemModelBuilder withAttribute(final IntegrationObjectItemClassificationAttributeBuilder attr)
	{
		classificationAttributes.add(attr);
		return this;
	}

	public IntegrationObjectItemModel build()
	{
		Preconditions.checkArgument(code != null, "code cannot be null");
		Preconditions.checkArgument(integrationObjectCode != null, "integrationObject cannot be null");

		final List<String> impex = buildItemImpexHeader();
		impex.add(buildImpexLine());
		if (!CollectionUtils.isEmpty(attributes))
		{
			impex.addAll(IntegrationObjectItemAttributeModelBuilder.buildAttributeImpexHeader());
			impex.addAll(buildAttributeLines());
		}

		if (!CollectionUtils.isEmpty(classificationAttributes))
		{
			impex.addAll(
					IntegrationObjectItemClassificationAttributeBuilder.buildClassificationAttributeImpexHeader());
			impex.addAll(buildClassificationAttributeLines());
		}

		try
		{
			IntegrationTestUtil.importImpEx(impex);
		}
		catch (final ImpExException ex)
		{
			throw new RuntimeException(ex);
		}

		return IntegrationTestUtil.findAny(IntegrationObjectItemModel.class, integrationObjectItem ->
				integrationObjectItem.getCode().equals(code) && integrationObjectItem.getIntegrationObject()
				                                                                     .getCode()
				                                                                     .equals(integrationObjectCode)
		).orElse(null);
	}

	public static List<String> buildItemImpexHeader()
	{
		return new ArrayList<>(List.of(
				"INSERT_UPDATE IntegrationObjectItem ; integrationObject(code)[unique = true]; code[unique = true]; type(code)     ; root ; itemTypeMatch(code)"));
	}

	public String buildImpexLine()
	{
		return "                                    ; " + integrationObjectCode + "                ; " + code + "              ; " + deriveType() + "; " + root + "; " + deriveTypeMatch();
	}

	public List<String> buildAttributeLines()
	{
		return attributes.stream().map(attribute -> attribute.withIntegrationObjectCode(integrationObjectCode)
		                                                     .withItemCode(code)
		                                                     .withItemType(type).buildImpexLine())
		                 .collect(Collectors.toList());
	}

	public List<String> buildClassificationAttributeLines()
	{

		return classificationAttributes.stream().map(attribute -> attribute.withIntegrationObjectCode(integrationObjectCode)
		                                                                   .withItemCode(code).buildImpexLine())
		                               .collect(Collectors.toList());
	}

	private String deriveType()
	{
		return StringUtils.isNotBlank(type) ? type : code;
	}

	private String deriveTypeMatch()
	{
		return Objects.nonNull(itemTypeMatch) ? itemTypeMatch.name() : EMPTY_TYPE;
	}

}
