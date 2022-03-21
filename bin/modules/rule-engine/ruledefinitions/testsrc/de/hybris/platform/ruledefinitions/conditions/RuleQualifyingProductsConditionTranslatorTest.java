/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.ruledefinitions.conditions;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.ruledefinitions.AmountOperator;
import de.hybris.platform.ruledefinitions.CollectionOperator;
import de.hybris.platform.ruleengineservices.compiler.RuleCompilerContext;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeOperator;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeRelCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrEmptyCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrExistsCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrGroupCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrNotCondition;
import de.hybris.platform.ruleengineservices.rao.CartRAO;
import de.hybris.platform.ruleengineservices.rao.OrderEntryRAO;
import de.hybris.platform.ruleengineservices.rule.data.RuleConditionData;
import de.hybris.platform.ruleengineservices.rule.data.RuleConditionDefinitionData;
import de.hybris.platform.ruleengineservices.rule.data.RuleParameterData;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.never;


@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class RuleQualifyingProductsConditionTranslatorTest
{

	private static final String ORDER_ENTRY_RAO_VAR = "orderEntryRaoVariable";
	private static final String CART_RAO_VAR = "cartRaoVariable";
	private static final String PRODUCT_RAO_VAR = "productCodeVariable";
	private static final String AVAILABLE_QUANTITY_VAR = "availableQuantity";
	public static final String CART_RAO_ENTRIES_ATTRIBUTE = "entries";
	public static final String ORDER_ENTRY_RAO_PRODUCT_ATTRIBUTE = "product";
	public static final String QUANTITY_PARAM = "quantity";


	@InjectMocks
	private RuleQualifyingProductsConditionTranslator translator;

	@Mock
	private RuleCompilerContext context;
	@Mock
	private RuleConditionData condition;
	@Mock
	private RuleConditionDefinitionData conditionDefinition;
	@Mock
	private Map<String, RuleParameterData> parameters;
	@Mock
	private RuleParameterData operatorParameter, quantityParameter, productsOperatorParameter, productsParameter;
	@Mock
	private RuleConditionConsumptionSupport consumptionSupport;

	@Before
	public void setUp()
	{
		when(condition.getParameters()).thenReturn(parameters);
		when(parameters.get(RuleQualifyingProductsConditionTranslator.OPERATOR_PARAM)).thenReturn(operatorParameter);
		when(parameters.get(RuleQualifyingProductsConditionTranslator.QUANTITY_PARAM)).thenReturn(quantityParameter);
		when(parameters.get(RuleQualifyingProductsConditionTranslator.PRODUCTS_OPERATOR_PARAM)).thenReturn(
				productsOperatorParameter);
		when(parameters.get(RuleQualifyingProductsConditionTranslator.PRODUCTS_PARAM)).thenReturn(productsParameter);
		when(operatorParameter.getValue()).thenReturn(AmountOperator.GREATER_THAN);
		when(quantityParameter.getValue()).thenReturn(new Integer(1));

		final List<String> productList = new ArrayList<>();
		productList.add("productCode1");
		productList.add("productCode2");
		when(productsParameter.getValue()).thenReturn(productList);

		when(context.generateVariable(OrderEntryRAO.class)).thenReturn(ORDER_ENTRY_RAO_VAR);
		when(context.generateVariable(CartRAO.class)).thenReturn(CART_RAO_VAR);
		when(context.generateVariable(String.class)).thenReturn(PRODUCT_RAO_VAR);
	}

	@Test
	public void testTranslateOperatorParamNull()
	{
		when(parameters.get(RuleQualifyingProductsConditionTranslator.OPERATOR_PARAM)).thenReturn(null);
		final RuleIrCondition ruleIrCondition = translator.translate(context, condition, conditionDefinition);
		assertThat(ruleIrCondition, instanceOf(RuleIrEmptyCondition.class));
	}

	@Test
	public void testTranslateProductsOperatorParamNull()
	{
		when(parameters.get(RuleQualifyingProductsConditionTranslator.PRODUCTS_OPERATOR_PARAM)).thenReturn(null);
		final RuleIrCondition ruleIrCondition = translator.translate(context, condition, conditionDefinition);
		assertThat(ruleIrCondition, instanceOf(RuleIrEmptyCondition.class));
	}

	@Test
	public void testTranslateProductsParamNull()
	{
		when(parameters.get(RuleQualifyingProductsConditionTranslator.PRODUCTS_PARAM)).thenReturn(null);
		final RuleIrCondition ruleIrCondition = translator.translate(context, condition, conditionDefinition);
		assertThat(ruleIrCondition, instanceOf(RuleIrEmptyCondition.class));
	}

	@Test
	public void testTranslateNotOperatorCondition()
	{
		when(productsOperatorParameter.getValue()).thenReturn(CollectionOperator.NOT_CONTAINS);

		final RuleIrCondition ruleIrCondition = translator.translate(context, condition, conditionDefinition);
		assertThat(ruleIrCondition, instanceOf(RuleIrGroupCondition.class));

		final RuleIrGroupCondition irGroupCondition = (RuleIrGroupCondition) ruleIrCondition;
		final List<RuleIrCondition> childCondition = irGroupCondition.getChildren();
		assertThat(childCondition.get(0), instanceOf(RuleIrNotCondition.class));
		final RuleIrNotCondition irNotCondition = (RuleIrNotCondition) childCondition.get(0);
		assertEquals(3, irNotCondition.getChildren().size());
		checkBasicChildConditions(irNotCondition.getChildren());
		verify(consumptionSupport, never()).newProductConsumedCondition(context, ORDER_ENTRY_RAO_VAR);

	}

	@Test
	public void testTranslateAnyOperatorCondition()
	{
		when(productsOperatorParameter.getValue()).thenReturn(CollectionOperator.CONTAINS_ANY);

		final RuleIrCondition ruleIrCondition = translator.translate(context, condition, conditionDefinition);
		assertThat(ruleIrCondition, instanceOf(RuleIrGroupCondition.class));
		final RuleIrGroupCondition irGroupCondition = (RuleIrGroupCondition) ruleIrCondition;
		assertEquals(3, irGroupCondition.getChildren().size());
		checkChildConditions(irGroupCondition.getChildren());

	}

	@Test
	public void testTranslateAllOperatorCondition()
	{
		when(productsOperatorParameter.getValue()).thenReturn(CollectionOperator.CONTAINS_ALL);

		final RuleIrCondition ruleIrCondition = translator.translate(context, condition, conditionDefinition);
		assertThat(ruleIrCondition, instanceOf(RuleIrGroupCondition.class));
		final RuleIrGroupCondition irGroupCondition = (RuleIrGroupCondition) ruleIrCondition;
		assertEquals(5, irGroupCondition.getChildren().size());
		checkBasicChildConditions(irGroupCondition.getChildren());
		assertThat(irGroupCondition.getChildren().get(3), instanceOf(RuleIrExistsCondition.class));
		assertThat(irGroupCondition.getChildren().get(4), instanceOf(RuleIrExistsCondition.class));
	}

	public List<RuleIrAttributeCondition> getRuleIrAttributeConditionFromGroup(final RuleIrGroupCondition groupCondition)
	{
		final List<RuleIrAttributeCondition> result = new ArrayList<>(groupCondition.getChildren().stream()
				.filter(c -> c instanceof RuleIrAttributeCondition).map(c -> (RuleIrAttributeCondition) c)
				.collect(Collectors.toList()));
		result.addAll(groupCondition.getChildren().stream().filter(c -> c instanceof RuleIrGroupCondition)
				.map(c -> (RuleIrGroupCondition) c).flatMap(gc -> getRuleIrAttributeConditionFromGroup(gc).stream())
				.collect(Collectors.toList()));
		return result;
	}

	private void checkChildConditions(final List<RuleIrCondition> ruleIrConditions)
	{
		checkBasicChildConditions(ruleIrConditions);

		verify(consumptionSupport).newProductConsumedCondition(context, ORDER_ENTRY_RAO_VAR);
	}

	private void checkBasicChildConditions(final List<RuleIrCondition> ruleIrConditions)
	{
		assertThat(ruleIrConditions.get(0), instanceOf(RuleIrGroupCondition.class));
		final List<RuleIrAttributeCondition> irAttrConditionsFromGroup = getRuleIrAttributeConditionFromGroup((RuleIrGroupCondition) ruleIrConditions
				.get(0));
		final RuleIrAttributeCondition ruleIrAttributeCondition = irAttrConditionsFromGroup.iterator().next();
		assertEquals(RuleIrAttributeOperator.IN, ruleIrAttributeCondition.getOperator());
		final List<String> products = (List<String>) ruleIrAttributeCondition.getValue();
		assertTrue(products.contains("productCode1"));
		assertTrue(products.contains("productCode2"));

		assertThat(ruleIrConditions.get(1), instanceOf(RuleIrAttributeCondition.class));
		final RuleIrAttributeCondition ruleIrAttributeOrderEntryQuantityCondition = (RuleIrAttributeCondition) ruleIrConditions
				.get(1);
		assertEquals(ORDER_ENTRY_RAO_VAR, ruleIrAttributeOrderEntryQuantityCondition.getVariable());
		assertEquals(QUANTITY_PARAM, ruleIrAttributeOrderEntryQuantityCondition.getAttribute());
		assertEquals(RuleIrAttributeOperator.GREATER_THAN, ruleIrAttributeOrderEntryQuantityCondition.getOperator());
		assertEquals(1, ruleIrAttributeOrderEntryQuantityCondition.getValue());

		assertThat(ruleIrConditions.get(2), instanceOf(RuleIrAttributeRelCondition.class));
		final RuleIrAttributeRelCondition RuleIrCartOrderEntryRelCondition = (RuleIrAttributeRelCondition) ruleIrConditions.get(2);
		assertEquals(RuleIrAttributeOperator.CONTAINS, RuleIrCartOrderEntryRelCondition.getOperator());
		assertEquals(CART_RAO_VAR, RuleIrCartOrderEntryRelCondition.getVariable());
		assertEquals(ORDER_ENTRY_RAO_VAR, RuleIrCartOrderEntryRelCondition.getTargetVariable());
		assertEquals(CART_RAO_ENTRIES_ATTRIBUTE, RuleIrCartOrderEntryRelCondition.getAttribute());
	}
}
