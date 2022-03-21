/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationbackoffice.widgets.modals.generator;

import de.hybris.platform.catalog.model.classification.*;
import de.hybris.platform.impex.jalo.ImpExException;
import de.hybris.platform.integrationbackoffice.widgets.modals.controllers.MetadataViewerControllerIntegrationTest;
import de.hybris.platform.integrationservices.model.*;
import de.hybris.platform.integrationservices.util.IntegrationObjectTestUtil;
import de.hybris.platform.integrationservices.util.IntegrationTestUtil;
import de.hybris.platform.servicelayer.ServicelayerTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx;
import static org.junit.Assert.*;

public class DefaultIntegrationObjectImpexGenerationIntegrationTest extends ServicelayerTest
{
	private static final String TEST_NAME = "DefaultIntegrationObjectImpexGeneration";
	private static final String ITEM_TYPE_MATCH_IO = TEST_NAME + "_StockLevelIO";
	private static final String VIRTUAL_ATTRIBUTE_IO = TEST_NAME + "_ProductIO_1";
	private static final String CLASSIFICATION_ATTR_IO = TEST_NAME + "_ProductIO_2";
	private static final String CLASSIFICATION_SYSTEM = TEST_NAME + "_Electronics";
	private static final String VERSION = "Staged";
	private static final String SYSTEM_VERSION = CLASSIFICATION_SYSTEM + ":" + VERSION;

	private IntegrationObjectImpexGenerator integrationObjectImpexGenerator;

	@Before
	public void setUp()
	{
		integrationObjectImpexGenerator = new DefaultIntegrationObjectImpexGenerator();
	}

	@After
	public void tearDown()
	{
		Arrays.asList(ITEM_TYPE_MATCH_IO, VIRTUAL_ATTRIBUTE_IO, CLASSIFICATION_ATTR_IO)
				.forEach(objectCode -> IntegrationTestUtil.removeSafely(IntegrationObjectModel.class, it -> it.getCode().equals(objectCode)));
		IntegrationTestUtil.remove(ClassAttributeAssignmentModel.class, it -> it.getClassificationClass().getCatalogVersion().getCatalog().getId().equals(CLASSIFICATION_SYSTEM));
		IntegrationTestUtil.remove(ClassificationAttributeModel.class, it -> it.getSystemVersion().getCatalog().getId().equals(CLASSIFICATION_SYSTEM));
		IntegrationTestUtil.remove(ClassificationAttributeUnitModel.class, it -> it.getSystemVersion().getCatalog().getId().equals(CLASSIFICATION_SYSTEM));
		IntegrationTestUtil.remove(ClassificationClassModel.class, it -> it.getCatalogVersion().getCatalog().getId().equals(CLASSIFICATION_SYSTEM));
		IntegrationTestUtil.remove(ClassificationSystemModel.class, it -> it.getId().equals(CLASSIFICATION_SYSTEM));
	}

	private void setupItemTypeMatch() throws ImpExException
	{
		importImpEx(
				"$ioCode=" + ITEM_TYPE_MATCH_IO,
				"INSERT_UPDATE IntegrationObject; code[unique = true];",
				"                               ; $ioCode",

				"$io = integrationObject(code)[unique = true]",
				"INSERT_UPDATE IntegrationObjectItem; $io    ; code[unique = true]; type(code)    ; root[default = false] ;itemTypeMatch(code)",
				"                                   ; $ioCode; Product            ; Product       ;                       ; ALL_SUB_AND_SUPER_TYPES	;",
				"                                   ; $ioCode; CatalogVersion     ; CatalogVersion;                       ; RESTRICT_TO_ITEM_TYPE  	;",
				"                                   ; $ioCode; StockLevel         ; StockLevel    ; true                  ; ALL_SUB_AND_SUPER_TYPES	;",
				"                                   ; $ioCode; Catalog            ; Catalog       ;                       ; ALL_SUBTYPES           	;",

				"$integrationItem = integrationObjectItem(integrationObject(code), code)[unique = true]",
				"$attrName = attributeName[unique = true]",
				"$attrDescriptor = attributeDescriptor(enclosingType(code), qualifier)",
				"$attributeType=returnIntegrationObjectItem(integrationObject(code), code)",
				"INSERT_UPDATE IntegrationObjectItemAttribute; $integrationItem      ; $attrName     ; $attrDescriptor       ; $attributeType        ; unique[default = false]; autoCreate[default = false]",
				"                                            ; $ioCode:Product       ; catalogVersion; Product:catalogVersion; $ioCode:CatalogVersion; true	;",
				"                                            ; $ioCode:Product       ; code          ; Product:code          ;                       ; true	;",
				"                                            ; $ioCode:CatalogVersion; catalog       ; CatalogVersion:catalog; $ioCode:Catalog       ; true	;",
				"                                            ; $ioCode:CatalogVersion; version       ; CatalogVersion:version;                       ; true	;",
				"                                            ; $ioCode:StockLevel    ; product       ; StockLevel:product    ; $ioCode:Product       ;      ;",
				"                                            ; $ioCode:StockLevel    ; productCode   ; StockLevel:productCode;                       ; true	;",
				"                                            ; $ioCode:Catalog       ; id            ; Catalog:id            ;                       ; true	;"
		);
	}

	private void setupClassification() throws ImpExException
	{
		importImpEx(
				"$SYSTEM=" + CLASSIFICATION_SYSTEM,
				"$VERSION=" + VERSION,
				"$SYSTEM_VERSION=" + SYSTEM_VERSION,
				"$catalogVersionHeader=catalogVersion(catalog(id), version)",
				"$systemVersionHeader=systemVersion(catalog(id), version)",
				"INSERT_UPDATE ClassificationSystem; id[unique = true]",
				"                                  ; $SYSTEM",
				"INSERT_UPDATE ClassificationSystemVersion; catalog(id)[unique = true]; version[unique = true]",
				"                                         ; $SYSTEM                   ; $VERSION",
				"INSERT_UPDATE ClassificationClass; code[unique = true]; $catalogVersionHeader[unique = true]",
				"                                 ; dimensions         ; $SYSTEM_VERSION",
				"INSERT_UPDATE ClassificationAttributeUnit; $systemVersionHeader[unique = true]; code[unique = true]; symbol; unitType",
				"                                         ; $SYSTEM_VERSION                    ; centimeters        ; cm    ; measurement",
				"INSERT_UPDATE ClassificationAttribute; code[unique = true]; $systemVersionHeader[unique = true]",
				"                                     ; height             ; $SYSTEM_VERSION",
				"                                     ; width              ; $SYSTEM_VERSION",
				"                                     ; depth              ; $SYSTEM_VERSION",
				"$class=classificationClass($catalogVersionHeader, code)",
				"$attribute=classificationAttribute($systemVersionHeader, code)",
				"INSERT_UPDATE ClassAttributeAssignment; $class[unique = true]     ; $attribute[unique = true]; unit($systemVersionHeader, code); attributeType(code)",
				"                                      ; $SYSTEM_VERSION:dimensions; $SYSTEM_VERSION:height   ; $SYSTEM_VERSION:centimeters     ; number",
				"                                      ; $SYSTEM_VERSION:dimensions; $SYSTEM_VERSION:width    ; $SYSTEM_VERSION:centimeters     ; number",
				"                                      ; $SYSTEM_VERSION:dimensions; $SYSTEM_VERSION:depth    ; $SYSTEM_VERSION:centimeters     ; number");

		importImpEx(
				"$ioCode=" + CLASSIFICATION_ATTR_IO,
				"INSERT_UPDATE IntegrationObject; code[unique = true];",
				"                               ; $ioCode",
				"$io = integrationObject(code)[unique = true]",
				"INSERT_UPDATE IntegrationObjectItem; $io ; code[unique = true]; type(code)     ; root[default = false]",
				"                                   ; $ioCode                                   ; Product            ; Product   ; true",
				"                                   ; $ioCode                                   ; Catalog            ; Catalog",
				"                                   ; $ioCode                                   ; CatalogVersion     ; CatalogVersion",
				"$item=integrationObjectItem(integrationObject(code), code)",
				"$descriptor=attributeDescriptor(enclosingType(code), qualifier)",
				"$attributeType=returnIntegrationObjectItem(integrationObject(code), code)",
				"INSERT_UPDATE IntegrationObjectItemAttribute; $item[unique = true]; attributeName[unique = true]; $descriptor           ; $attributeType;",
				"                                            ; $ioCode:Product         ; code                        ; Product:code",
				"                                            ; $ioCode:Product         ; catalogVersion              ; Product:catalogVersion; $ioCode:CatalogVersion",
				"                                            ; $ioCode:CatalogVersion  ; version                     ; CatalogVersion:version",
				"                                            ; $ioCode:CatalogVersion  ; catalog                     ; CatalogVersion:catalog; $ioCode:Catalog",
				"                                            ; $ioCode:Catalog         ; id                          ; Catalog:id",
				"$SYSTEM_VERSION=" + SYSTEM_VERSION,
				"$item=integrationObjectItem(integrationObject(code), code)",
				"$systemVersionHeader=systemVersion(catalog(id), version)",
				"$classificationClassHeader=classificationClass(catalogVersion(catalog(id), version), code)",
				"$classificationAttributeHeader=classificationAttribute($systemVersionHeader, code)",
				"$classificationAssignment=classAttributeAssignment($classificationClassHeader, $classificationAttributeHeader)",
				"INSERT_UPDATE IntegrationObjectItemClassificationAttribute; $item[unique = true]; attributeName[unique = true]; $classificationAssignment",
				"                                                          ; $ioCode:Product         ; height                      ; $SYSTEM_VERSION:dimensions:$SYSTEM_VERSION:height",
				"                                                          ; $ioCode:Product         ; depth                       ; $SYSTEM_VERSION:dimensions:$SYSTEM_VERSION:depth",
				"                                                          ; $ioCode:Product         ; width                       ; $SYSTEM_VERSION:dimensions:$SYSTEM_VERSION:width");
	}

	private void setupVirtualAttributesTest() throws ImpExException
	{
		importImpEx(
				"$ioCode=" + VIRTUAL_ATTRIBUTE_IO,
				"INSERT_UPDATE IntegrationObject; code[unique = true];",
				"                               ; $ioCode",
				"$io = integrationObject(code)[unique = true]",
				"INSERT_UPDATE IntegrationObjectItem; $io    ; code[unique = true]; type(code)     ; root[default = false] ;itemTypeMatch(code)",
				"                                   ; $ioCode; Catalog            ; Catalog        ;      ; ;",
				"                                   ; $ioCode; CatalogVersion     ; CatalogVersion ;      ; ;",
				"                                   ; $ioCode; Product            ; Product        ; true ; ;",
				"INSERT_UPDATE IntegrationObjectItemAttribute; integrationObjectItem(integrationObject(code), code)[unique = true]; attributeName[unique = true]; attributeDescriptor(enclosingType(code), qualifier); returnIntegrationObjectItem(integrationObject(code), code); unique[default = false]; autoCreate[default = false]",
				"                                            ; $ioCode:Catalog        ; id             ; Catalog:id             ;                                     ; ;",
				"                                            ; $ioCode:CatalogVersion ; version        ; CatalogVersion:version ;                                     ; ;",
				"                                            ; $ioCode:CatalogVersion ; catalog        ; CatalogVersion:catalog ; $ioCode:Catalog        ; ;",
				"                                            ; $ioCode:Product        ; code           ; Product:code           ;                                     ; ;",
				"                                            ; $ioCode:Product        ; catalogVersion ; Product:catalogVersion ; $ioCode:CatalogVersion ; ;",
				"                                            ; $ioCode:Product        ; onlineDate     ; Product:onlineDate",
				"INSERT_UPDATE IntegrationObjectItemVirtualAttribute; integrationObjectItem(integrationObject(code), code)[unique = true]; attributeName[unique = true]; retrievalDescriptor(code)",
				"                                                   ; $ioCode:Product ; virtintValueDescriptor        ; intValueDescriptor",
				"                                                   ; $ioCode:Product ; virtfloatValueDescriptor      ; floatValueDescriptor",
				"                                                   ; $ioCode:Product ; virtdoubleValueDescriptor     ; doubleValueDescriptor",
				"                                                   ; $ioCode:Product ; virtbooleanValueDescriptor    ; booleanValueDescriptor",
				"                                                   ; $ioCode:Product ; virtbyteValueDescriptor       ; byteValueDescriptor",
				"                                                   ; $ioCode:Product ; virtlongValueDescriptor       ; longValueDescriptor",
				"                                                   ; $ioCode:Product ; virtshortValueDescriptor      ; shortValueDescriptor",
				"                                                   ; $ioCode:Product ; virtcharValueDescriptor       ; charValueDescriptor",
				"                                                   ; $ioCode:Product ; virtbigDecimalValueDescriptor ; bigDecimalValueDescriptor",
				"                                                   ; $ioCode:Product ; formattedOnlineDate           ; formattedOnlineDate",
				"INSERT_UPDATE IntegrationObjectVirtualAttributeDescriptor; code[unique = true]; logicLocation; type(code)",
				"                                                         ; booleanValueDescriptor    ; model://booleanValue    ; java.lang.Boolean",
				"                                                         ; charValueDescriptor       ; model://charValue       ; java.lang.Character",
				"                                                         ; byteValueDescriptor       ; model://byteValue       ; java.lang.Byte",
				"                                                         ; floatValueDescriptor      ; model://floatValue      ; java.lang.Float",
				"                                                         ; doubleValueDescriptor     ; model://doubleValue     ; java.lang.Double",
				"                                                         ; longValueDescriptor       ; model://longValue       ; java.lang.Long",
				"                                                         ; bigDecimalValueDescriptor ; model://bigDecimalValue ; java.math.BigDecimal",
				"                                                         ; intValueDescriptor        ; model://intValue        ; java.lang.Integer",
				"                                                         ; shortValueDescriptor      ; model://shortValue      ; java.lang.Short",
				"                                                         ; formattedOnlineDate       ; model://formattedOnlineDateScript"
		);
	}

	@Test
	public void testImpexStringWithClassificationAttributes() throws ImpExException
	{
		setupClassification();
		IntegrationObjectModel integrationObjectModel = IntegrationObjectTestUtil.findIntegrationObjectByCode(
				CLASSIFICATION_ATTR_IO);
		assertEquals(CLASSIFICATION_ATTR_IO, integrationObjectModel.getCode());

		final String generatedImpex = integrationObjectImpexGenerator.generateImpex(integrationObjectModel);
		IntegrationTestUtil.removeSafely(IntegrationObjectModel.class,
				object -> object.getCode().equals(CLASSIFICATION_ATTR_IO));
		integrationObjectModel = IntegrationObjectTestUtil.findIntegrationObjectByCode(CLASSIFICATION_ATTR_IO);
		assertNull(integrationObjectModel);

		importImpEx(generatedImpex);
		integrationObjectModel = IntegrationObjectTestUtil.findIntegrationObjectByCode(CLASSIFICATION_ATTR_IO);
		assertEquals(CLASSIFICATION_ATTR_IO, integrationObjectModel.getCode());
		assertEquals(integrationObjectModel.getItems().size(), 3);
		assertTrue(integrationObjectModel.getItems().stream().map(IntegrationObjectItemModel::getCode).collect(Collectors.toSet())
		                                 .containsAll(Arrays.asList("Product", "Catalog", "CatalogVersion")));
		Set<String> attributeSet = integrationObjectModel.getItems().stream()
		                                                 .flatMap(item -> item.getAttributes().stream())
		                                                 .map(IntegrationObjectItemAttributeModel::getAttributeName)
		                                                 .collect(Collectors.toSet());
		assertEquals(attributeSet.size(), 5);
		assertTrue(attributeSet.containsAll(Arrays.asList("code", "catalogVersion", "id", "version", "catalog")));
		assertTrue(integrationObjectModel.getItems().stream()
		                                 .filter(item -> item.getCode().equals("Product"))
		                                 .flatMap(item -> item.getClassificationAttributes().stream())
		                                 .map(AbstractIntegrationObjectItemAttributeModel::getAttributeName)
		                                 .collect(Collectors.toSet())
		                                 .containsAll(Arrays.asList("height", "depth", "width")));

		IntegrationTestUtil.removeSafely(IntegrationObjectModel.class,
				object -> object.getCode().equals(CLASSIFICATION_ATTR_IO));
	}

	@Test
	public void testImpexItemTypeMatch() throws ImpExException
	{
		setupItemTypeMatch();
		IntegrationObjectModel objectModel = IntegrationObjectTestUtil.findIntegrationObjectByCode(ITEM_TYPE_MATCH_IO);
		assertNotNull(objectModel);
		assertEquals(objectModel.getItems().size(), 4);
		assertEquals(IntegrationObjectTestUtil.findIntegrationObjectItemByCodeAndIntegrationObject("Product", objectModel)
		                                      .getItemTypeMatch()
		                                      .getCode(), "ALL_SUB_AND_SUPER_TYPES");
		assertEquals(IntegrationObjectTestUtil.findIntegrationObjectItemByCodeAndIntegrationObject("CatalogVersion", objectModel)
		                                      .getItemTypeMatch()
		                                      .getCode(), "RESTRICT_TO_ITEM_TYPE");
		assertEquals(IntegrationObjectTestUtil.findIntegrationObjectItemByCodeAndIntegrationObject("StockLevel", objectModel)
		                                      .getItemTypeMatch()
		                                      .getCode(), "ALL_SUB_AND_SUPER_TYPES");
		assertEquals(IntegrationObjectTestUtil.findIntegrationObjectItemByCodeAndIntegrationObject("Catalog", objectModel)
		                                      .getItemTypeMatch()
		                                      .getCode(), "ALL_SUBTYPES");

		IntegrationTestUtil.removeSafely(IntegrationObjectModel.class,
				object -> object.getCode().equals(ITEM_TYPE_MATCH_IO));
	}

	@Test
	public void testImpexVirtualAttributes() throws ImpExException
	{
		setupVirtualAttributesTest();
		IntegrationObjectModel objectModel = IntegrationObjectTestUtil.findIntegrationObjectByCode(VIRTUAL_ATTRIBUTE_IO);
		assertNotNull(objectModel);

		final String generatedImpex = integrationObjectImpexGenerator.generateImpex(objectModel);
		IntegrationTestUtil.removeSafely(IntegrationObjectModel.class, object -> object.getCode().equals(VIRTUAL_ATTRIBUTE_IO));
		importImpEx(generatedImpex);
		objectModel = IntegrationObjectTestUtil.findIntegrationObjectByCode(VIRTUAL_ATTRIBUTE_IO);

		assertNotNull(objectModel);
		final Set<IntegrationObjectItemModel> items = objectModel.getItems();
		assertTrue(items.stream()
		                .map(IntegrationObjectItemModel::getCode)
		                .collect(Collectors.toSet())
		                .containsAll(Arrays.asList("Product", "Catalog", "CatalogVersion")));
		assertTrue(items.stream()
		                .flatMap(item -> item.getAttributes().stream())
		                .map(IntegrationObjectItemAttributeModel::getAttributeName)
		                .collect(Collectors.toSet())
		                .containsAll(Arrays.asList("code", "catalogVersion", "id", "version", "catalog")));

		final Map<String, String> expectedVirtualAttributes = Map.of(
				"virtintValueDescriptor", "intValueDescriptor",
				"virtfloatValueDescriptor", "floatValueDescriptor",
				"virtdoubleValueDescriptor", "doubleValueDescriptor",
				"virtbooleanValueDescriptor", "booleanValueDescriptor",
				"virtbyteValueDescriptor", "byteValueDescriptor",
				"virtlongValueDescriptor", "longValueDescriptor",
				"virtshortValueDescriptor", "shortValueDescriptor",
				"virtcharValueDescriptor", "charValueDescriptor",
				"virtbigDecimalValueDescriptor", "bigDecimalValueDescriptor",
				"formattedOnlineDate", "formattedOnlineDate"
		);
		final Map<String, String> actualVirtualAttributes =
				items.stream()
				     .flatMap(item -> item.getVirtualAttributes().stream())
				     .collect(Collectors.toSet())
				     .stream()
				     .collect(Collectors.toMap(IntegrationObjectItemVirtualAttributeModel::getAttributeName,
						     va -> va.getRetrievalDescriptor().getCode()));
		assertEquals(expectedVirtualAttributes, actualVirtualAttributes);

		final Map<String, IntegrationObjectVirtualAttributeDescriptorModel> actualDescriptors =
				items.stream()
				     .flatMap(item -> item.getVirtualAttributes().stream())
				     .collect(Collectors.toSet())
				     .stream()
				     .map(IntegrationObjectItemVirtualAttributeModel::getRetrievalDescriptor)
				     .collect(Collectors.toSet())
				     .stream()
				     .collect(Collectors.toMap(IntegrationObjectVirtualAttributeDescriptorModel::getCode,
						     descriptor -> descriptor));
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc1 = actualDescriptors.get("intValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc2 = actualDescriptors.get("floatValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc3 = actualDescriptors.get("doubleValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc4 = actualDescriptors.get("booleanValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc5 = actualDescriptors.get("byteValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc6 = actualDescriptors.get("longValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc7 = actualDescriptors.get("shortValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc8 = actualDescriptors.get("charValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc9 = actualDescriptors.get("bigDecimalValueDescriptor");
		final IntegrationObjectVirtualAttributeDescriptorModel actualDesc10 = actualDescriptors.get("formattedOnlineDate");
		assertEquals("model://intValue", actualDesc1.getLogicLocation());
		assertEquals("model://floatValue", actualDesc2.getLogicLocation());
		assertEquals("model://doubleValue", actualDesc3.getLogicLocation());
		assertEquals("model://booleanValue", actualDesc4.getLogicLocation());
		assertEquals("model://byteValue", actualDesc5.getLogicLocation());
		assertEquals("model://longValue", actualDesc6.getLogicLocation());
		assertEquals("model://shortValue", actualDesc7.getLogicLocation());
		assertEquals("model://charValue", actualDesc8.getLogicLocation());
		assertEquals("model://bigDecimalValue", actualDesc9.getLogicLocation());
		assertEquals("model://formattedOnlineDateScript", actualDesc10.getLogicLocation());
		assertEquals("java.lang.Integer", actualDesc1.getType().getCode());
		assertEquals("java.lang.Float", actualDesc2.getType().getCode());
		assertEquals("java.lang.Double", actualDesc3.getType().getCode());
		assertEquals("java.lang.Boolean", actualDesc4.getType().getCode());
		assertEquals("java.lang.Byte", actualDesc5.getType().getCode());
		assertEquals("java.lang.Long", actualDesc6.getType().getCode());
		assertEquals("java.lang.Short", actualDesc7.getType().getCode());
		assertEquals("java.lang.Character", actualDesc8.getType().getCode());
		assertEquals("java.math.BigDecimal", actualDesc9.getType().getCode());
		assertEquals("java.lang.String", actualDesc10.getType().getCode());

		IntegrationTestUtil.removeSafely(IntegrationObjectModel.class, object -> object.getCode().equals(VIRTUAL_ATTRIBUTE_IO));
	}

	public static String loadFileAsString(final String fileLocation) throws IOException
	{
		final ClassLoader classLoader = MetadataViewerControllerIntegrationTest.class.getClassLoader();
		final URL url = classLoader.getResource(fileLocation);
		File file = null;
		if (url != null)
		{
			file = new File(url.getFile());
		}

		return Files.readString(Paths.get(file.getPath()));
	}
}
