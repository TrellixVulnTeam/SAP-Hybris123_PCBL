/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationservices.services.conversion

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.ItemModel
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.populator.ItemToMapConversionContext
import de.hybris.platform.integrationservices.service.IntegrationObjectConversionService
import de.hybris.platform.integrationservices.util.IntegrationObjectTestUtil
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.odata2webservicesfeaturetests.model.TestIntegrationItemDetailModel
import de.hybris.platform.odata2webservicesfeaturetests.model.TestIntegrationItemModel
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import org.junit.Test

import javax.annotation.Resource

@IntegrationTest
class IntegrationObjectConversionServiceIntegrationTest extends ServicelayerSpockSpecification {

    private static String TEST_NAME = "IntegrationServiceIntegrationObjectConversionService"
    private static String OBJ_CODE = "${TEST_NAME}_IO"
    private static String TEST_ITEM = "${TEST_NAME}_TestIntegrationItem"

    @Resource(name = "integrationObjectConversionService")
    private IntegrationObjectConversionService conversionService

    def setupSpec() {
        IntegrationTestUtil.importImpEx(
                "INSERT_UPDATE IntegrationObject; code[unique = true]",
                "; $OBJ_CODE",
                "INSERT_UPDATE IntegrationObjectItem; integrationObject(code)[unique = true]; code[unique = true] ; type(code)",
                "; $OBJ_CODE ; Item       ; TestIntegrationItem",
                "; $OBJ_CODE ; ItemDetail ; TestIntegrationItemDetail",
                "INSERT_UPDATE IntegrationObjectItemAttribute; integrationObjectItem(integrationObject(code), code)[unique = true]; attributeName[unique = true]; attributeDescriptor(enclosingType(code), qualifier); returnIntegrationObjectItem(integrationObject(code), code)",
                "; $OBJ_CODE:Item       ; code      ; TestIntegrationItem:code",
                "; $OBJ_CODE:Item       ; otherItem ; TestIntegrationItem:otherItem    ; $OBJ_CODE:Item",
                "; $OBJ_CODE:Item       ; detail    ; TestIntegrationItem:detail       ; $OBJ_CODE:ItemDetail",
                "; $OBJ_CODE:Item       ; details   ; TestIntegrationItem:details      ; $OBJ_CODE:ItemDetail",
                "; $OBJ_CODE:ItemDetail ; code      ; TestIntegrationItemDetail:code",
                "; $OBJ_CODE:ItemDetail ; item      ; TestIntegrationItemDetail:item   ; $OBJ_CODE:Item",
                "; $OBJ_CODE:ItemDetail ; master    ; TestIntegrationItemDetail:master ; $OBJ_CODE:Item")
    }

    def cleanupSpec() {
        IntegrationTestUtil.remove IntegrationObjectModel, { it.code == OBJ_CODE }
        IntegrationTestUtil.remove TestIntegrationItemModel, { it.code == TEST_ITEM }
    }

    @Test
    def "converts an item referencing itself"() {
        given: "self referencing item exists"
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE TestIntegrationItem; code[unique = true]; otherItem(code)',
                "                                 ; $TEST_ITEM              ; $TEST_ITEM")
        def item = findItem(TEST_ITEM)

        when: "the item is converted to a map"
        Map<String, ?> map = conversionService.convert conversionContext(item)

        then: "the map contains a value referencing itself only by the key field(s)"
        map['otherItem'] == [code: TEST_ITEM]
    }

    @Test
    def "converts an item referring an item detail with a reference back to the original item"() {
        given: "self referencing item exists"
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE TestIntegrationItem; code[unique = true]; detail(code)',
                "                                 ; $TEST_ITEM             ; child",
                'INSERT_UPDATE TestIntegrationItemDetail; code[unique = true]; item(code)',
                "                                 ; child              ; $TEST_ITEM")
        def item = findItem(TEST_ITEM)

        when: "the item is converted to a map"
        Map<String, ?> map = conversionService.convert conversionContext(item)

        then: "child (['detail']) refers its parent (['item']) and contains only parent's key attributes"
        map['detail']['item'] == [code: TEST_ITEM]
    }

    @Test
    def "converts an item referring item details with a reference back to the original item"() {
        given: "self referencing item exists"
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE TestIntegrationItem; code[unique = true]',
                "                                 ; $TEST_ITEM",
                'INSERT_UPDATE TestIntegrationItemDetail; code[unique = true]; master(code)',
                "                                       ; detail1            ; $TEST_ITEM",
                "                                       ; detail2            ; $TEST_ITEM")
        def item = findItem(TEST_ITEM)

        when: "the item is converted to a map"
        Map<String, ?> map = conversionService.convert conversionContext(item)

        then: "master map contains a collection of detail maps"
        Collection<Map<String, Object>> details = map['details']
        details.size() == 2
        and: "each detail map refers back to the master map only by the master key attributes"
        details.each { assert it['master'] == [code: TEST_ITEM] }
    }

    def findItem(def code) {
        IntegrationTestUtil.findAny(TestIntegrationItemModel, { it.code == code }).orElse(null)
    }

    private static ItemToMapConversionContext conversionContext(ItemModel item, String ioCode = OBJ_CODE) {
        def io = IntegrationObjectTestUtil.findIntegrationObjectDescriptorByCode ioCode
        def type = io.getItemTypeDescriptor(item).orElse(null)
        new ItemToMapConversionContext(item, type)
    }
}
