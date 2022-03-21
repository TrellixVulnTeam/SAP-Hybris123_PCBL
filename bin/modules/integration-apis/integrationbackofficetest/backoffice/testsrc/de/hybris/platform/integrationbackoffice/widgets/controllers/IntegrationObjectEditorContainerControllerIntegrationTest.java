/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.widgets.controllers;

import de.hybris.platform.core.Registry;
import de.hybris.platform.core.model.type.ComposedTypeModel;
import de.hybris.platform.impex.jalo.ImpExException;
import de.hybris.platform.integrationbackoffice.dto.AbstractListItemDTO;
import de.hybris.platform.integrationbackoffice.services.ReadService;
import de.hybris.platform.integrationbackoffice.widgets.modeling.builders.DefaultDataStructureBuilder;
import de.hybris.platform.integrationbackoffice.widgets.modeling.controllers.IntegrationObjectEditorContainerController;
import de.hybris.platform.integrationbackoffice.widgets.modeling.data.IntegrationObjectPresentation;
import de.hybris.platform.integrationbackoffice.widgets.modeling.data.SubtypeData;
import de.hybris.platform.integrationbackoffice.widgets.modeling.utility.EditorAttributesFilteringService;
import de.hybris.platform.integrationbackoffice.widgets.modeling.utility.EditorUtils;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.integrationservices.util.IntegrationObjectTestUtil;
import de.hybris.platform.integrationservices.util.IntegrationTestUtil;
import de.hybris.platform.servicelayer.ServicelayerTest;
import de.hybris.platform.servicelayer.type.TypeService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.support.GenericApplicationContext;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx;
import static org.junit.Assert.*;

public class IntegrationObjectEditorContainerControllerIntegrationTest extends ServicelayerTest
{
	private static final String TEST_NAME = "IntegrationObjectEditorContainerController";
	private static final String IO_CODE = TEST_NAME + "_OrderIO";

	@Resource
	private TypeService typeService;
	private EditorAttributesFilteringService editorAttrFilterService;

	private ReadService readService;
	private DefaultDataStructureBuilder dataStructureBuilder;
	private IntegrationObjectPresentation integrationObjectPresentation;

	final private IntegrationObjectEditorContainerController controller = new IntegrationObjectEditorContainerController();

	@Before
	public void setUp() throws Exception
	{
		final GenericApplicationContext applicationContext = (GenericApplicationContext) Registry.getApplicationContext();
		final DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) applicationContext.getBeanFactory();

		final AbstractBeanDefinition validationDefinition = BeanDefinitionBuilder.rootBeanDefinition(ReadService.class)
		                                                                         .getBeanDefinition();
		beanFactory.registerBeanDefinition("readService", validationDefinition);
		readService = (ReadService) Registry.getApplicationContext().getBean("readService");
		readService.setTypeService(typeService);
		dataStructureBuilder = new DefaultDataStructureBuilder(readService, editorAttrFilterService);
		integrationObjectPresentation = new IntegrationObjectPresentation(null, readService, dataStructureBuilder, null);
		controller.setEditorPresentation(integrationObjectPresentation);
		setCompileSubtypeSetTestImpex();
	}

	@After
	public void tearDown()
	{
		IntegrationTestUtil.removeSafely(IntegrationObjectModel.class,
				object -> object.getCode().equals(IO_CODE));
	}

	private void setCompileSubtypeSetTestImpex() throws ImpExException
	{
		importImpEx(
				"$ioCode=" + IO_CODE,
				"INSERT_UPDATE IntegrationObject; code[unique = true];",
				"                               ; $ioCode",
				"$io = integrationObject(code)",
				"INSERT_UPDATE IntegrationObjectItem; $io[unique = true]; code[unique = true]; type(code); root[default = false] ",
				"                                   ; $ioCode           ; Order              ; Order     ; true",
				"                                   ; $ioCode           ; Customer           ; Customer  ;     ",
				"$integrationItem = integrationObjectItem(integrationObject(code), code)[unique = true]",
				"$attrDescriptor = attributeDescriptor(enclosingType(code), qualifier)",
				"INSERT_UPDATE IntegrationObjectItemAttribute; $integrationItem; attributeName[unique = true]; $attrDescriptor    ; returnIntegrationObjectItem(integrationObject(code), code); unique[default = false]; autoCreate[default = false] ",
				"                                            ; $ioCode:Order   ; user                        ; Order:user         ; $ioCode:Customer;                                         ;",
				"                                            ; $ioCode:Order   ; code                        ; Order:code         ;                                                           ;   true;",
				"                                            ; $ioCode:Customer; name                        ; Customer:name      ;                                                           ;       ;",
				"                                            ; $ioCode:Customer; customerID                  ; Customer:customerID;                                                           ;   true;"
		);
	}

	@Test
	public void readServiceTest()
	{
		assertTrue(Objects.nonNull(readService));
	}

	@Test
	public void compileSubtypeDataSetTest()
	{
		IntegrationObjectModel integrationObjectModel = IntegrationObjectTestUtil.findIntegrationObjectByCode(
				IO_CODE);
		assertNotNull(integrationObjectModel);

		final Map<ComposedTypeModel, List<AbstractListItemDTO>> convertedMap = EditorUtils.convertIntegrationObjectToDTOMap(
				readService, integrationObjectModel);
		integrationObjectPresentation.setSubtypeDataSet(dataStructureBuilder.compileSubtypeDataSet(convertedMap, new HashSet<>()));

		final SubtypeData subtypeData = (SubtypeData) integrationObjectPresentation.getSubtypeDataSet().toArray()[0];

		assertEquals(IO_CODE, integrationObjectModel.getCode());
		assertEquals(1, integrationObjectPresentation.getSubtypeDataSet().size());
		assertEquals("User", subtypeData.getBaseType().getCode());
		assertEquals("Customer", subtypeData.getSubtype().getCode());
		assertEquals("Order", subtypeData.getParentNodeType().getCode());
		assertEquals("user", subtypeData.getAttributeAlias());
	}

	@Test
	public void findSubtypeMatchTest()
	{
		IntegrationObjectModel integrationObjectModel = IntegrationObjectTestUtil.findIntegrationObjectByCode(
				IO_CODE);
		assertNotNull(integrationObjectModel);

		final Map<ComposedTypeModel, List<AbstractListItemDTO>> convertedMap = EditorUtils.convertIntegrationObjectToDTOMap(
				readService, integrationObjectModel);
		integrationObjectPresentation.setSubtypeDataSet(
				dataStructureBuilder.compileSubtypeDataSet(convertedMap, new HashSet<>()));

		ComposedTypeModel order = integrationObjectModel.getRootItem().getType();
		SubtypeData subtypeData = (SubtypeData) integrationObjectPresentation.getSubtypeDataSet().toArray()[0];
		ComposedTypeModel attributeType = (ComposedTypeModel) subtypeData.getBaseType();
		String qualifier = "user";
		ComposedTypeModel expectedSubtype = (ComposedTypeModel) subtypeData.getSubtype();

		ComposedTypeModel actualSubtype = dataStructureBuilder.findSubtypeMatch(order, qualifier, attributeType,
				integrationObjectPresentation.getSubtypeDataSet());

		assertEquals(IO_CODE, integrationObjectModel.getCode());
		assertEquals(expectedSubtype, actualSubtype);
	}
}