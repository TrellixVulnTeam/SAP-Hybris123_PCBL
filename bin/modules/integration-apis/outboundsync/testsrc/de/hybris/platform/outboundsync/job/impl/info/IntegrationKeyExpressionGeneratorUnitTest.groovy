/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.job.impl.info

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.integrationservices.exception.CircularKeyReferenceException
import de.hybris.platform.integrationservices.model.IntegrationObjectItemAttributeModel
import de.hybris.platform.integrationservices.model.ReferencePath
import de.hybris.platform.integrationservices.model.TypeAttributeDescriptor
import de.hybris.platform.integrationservices.model.TypeDescriptor
import org.junit.Test
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class IntegrationKeyExpressionGeneratorUnitTest extends Specification {
    @Shared
    def STRING = type 'java.lang.String'
    @Shared
    def DATE = type 'java.util.Date'
    @Shared
    def CONTEXT_ITEM_TYPE = Stub(TypeDescriptor) {
        getAttributes() >> []
        pathFrom(_ as TypeDescriptor) >> [path('')]
    }

    def generator = new IntegrationKeyExpressionGenerator()

    def setup() {
        CONTEXT_ITEM_TYPE.attributes.clear()
    }

    @Test
    @Unroll
    def "expression is null when provided item type #condition"() {
        expect:
        generator.generateExpression(type) == null

        where:
        type              | condition
        CONTEXT_ITEM_TYPE | 'has no key attribute'
        null              | 'is null'
    }

    @Test
    def 'expression is null when the context item type and the key attribute are not related'() {
        given:
        def unrelatedType = type 'StrayType', [], [keyAttribute('code', STRING)]
        CONTEXT_ITEM_TYPE.attributes << keyAttribute('someKey', unrelatedType)

        expect:
        generator.generateExpression(CONTEXT_ITEM_TYPE) == null
    }

    @Test
    def 'expression has key attribute qualifier when item type has a single simple key attribute'() {
        given:
        addAttribute CONTEXT_ITEM_TYPE, keyAttribute('code', STRING)

        expect:
        generator.generateExpression(CONTEXT_ITEM_TYPE) == '#{code}'
    }

    @Test
    def 'expression contains paths to all primitive key attribute in all nested key attribute types'() {
        given:
        def catalog = type 'Catalog', ['catalogVersion.catalog'], [keyAttribute('id', STRING)]
        def catalogVersion = type 'Version', ['catalogVersion'], [keyAttribute('version', STRING),
                                                                  keyAttribute('catalog', catalog)]
        def unit = type 'Unit', ['unit'], [keyAttribute('code', STRING)]
        addAttributes CONTEXT_ITEM_TYPE, [keyAttribute('catalogVersion', catalogVersion),
                                          keyAttribute('unit', unit),
                                          keyAttribute('code', STRING)]

        when:
        def expr = generator.generateExpression(CONTEXT_ITEM_TYPE)

        then:
        expr.contains '#{catalogVersion?.catalog?.id}'
        expr.contains '#{catalogVersion?.version}'
        expr.contains '#{code}'
        expr.contains '#{unit?.code}'
    }

    @Test
    def 'expression excludes any non-key attribute'() {
        given:
        def catalog = type 'Catalog', ['catalog'], [keyAttribute('id', STRING), nonKeyAttribute('name', STRING)]
        def catalogVersion = type 'Version', ['catalogVersion'], [keyAttribute('version', STRING),
                                                                  nonKeyAttribute('catalog', catalog)]
        def unit = type 'Unit', ['unit'], [keyAttribute('code', STRING)]
        addAttributes CONTEXT_ITEM_TYPE, [keyAttribute('catalogVersion', catalogVersion),
                                          nonKeyAttribute('unit', unit),
                                          keyAttribute('code', STRING),
                                          nonKeyAttribute('name', STRING)]

        when:
        def expr = generator.generateExpression(CONTEXT_ITEM_TYPE)

        then:
        !expr.contains('#{catalogVersion?.catalog?.id}')
        !expr.contains('#{unit?.code}')
        !expr.contains('#{name}')
    }

    @Test
    def 'expression sorts same type key attributes in their attribute name order'() {
        given:
        addAttributes CONTEXT_ITEM_TYPE, [keyAttribute('attr2', 'aSecond', STRING),
                                          keyAttribute('attr1', 'beFirst', STRING)]

        expect:
        generator.generateExpression(CONTEXT_ITEM_TYPE) == '#{beFirst}|#{aSecond}'
    }

    @Test
    def 'expression sorts complex key attributes in order of their type code'() {
        given:
        def catalogType = type 'Catalog', ['catalog'], [keyAttribute('attr1', 'id', STRING)]
        def catalogVersionType = type 'CatalogVersion', ['catalogVersion'], [keyAttribute('attr2', 'version', STRING),
                                                                             keyAttribute('catalog', catalogType)]
        def productType = type 'Product', ['product'], [keyAttribute('attr3', 'code', STRING),
                                                        keyAttribute('catalogVersion', catalogVersionType)]
        addAttributes CONTEXT_ITEM_TYPE, [keyAttribute('', productType)]

        expect:
        generator.generateExpression(CONTEXT_ITEM_TYPE) == '#{catalogVersion?.version}|#{catalog?.id}|#{product?.code}'
    }

    @Test
    def 'expression is null when integration key attributes form a loop'() {
        given:
        def nestedType = type 'NestedItem', ['nested'], [keyAttribute('code', STRING),
                                              circularKeyAttribute('contextItem', CONTEXT_ITEM_TYPE)]
        addAttributes CONTEXT_ITEM_TYPE, [keyAttribute('nested', nestedType)]

        expect:
        generator.generateExpression(CONTEXT_ITEM_TYPE) == null
    }

    @Test
    def 'expression converts key Date attributes to epoch time'() {
        given:
        addAttribute CONTEXT_ITEM_TYPE, keyAttribute('dateAttribute', DATE)

        expect:
        generator.generateExpression(CONTEXT_ITEM_TYPE) == '#{dateAttribute?.time}'
    }

    TypeAttributeDescriptor keyAttribute(String attrName, String qualifier, TypeDescriptor type) {
        def attribute = keyAttribute(qualifier, type)
        attribute.getAttributeName() >> attrName
        attribute
    }

    TypeAttributeDescriptor keyAttribute(String attrName, TypeDescriptor type) {
        def attribute = nonKeyAttribute(attrName, type)
        attribute.isKeyAttribute() >> true
        attribute
    }

    TypeAttributeDescriptor circularKeyAttribute(String attrName, TypeDescriptor type) {
        def attribute = nonKeyAttribute(attrName, type)
        attribute.isKeyAttribute() >> { throw new CircularKeyReferenceException(Stub(IntegrationObjectItemAttributeModel))}
        attribute
    }

    TypeAttributeDescriptor nonKeyAttribute(String attrName, TypeDescriptor type) {
        Stub(TypeAttributeDescriptor) {
            getQualifier() >> attrName
            getAttributeType() >> type
            isPrimitive() >> type.primitive
        }
    }

    TypeDescriptor type(String code, List<String> paths = [''], List<TypeAttributeDescriptor> attributes = []) {
        def type = Stub(TypeDescriptor) {
            getItemCode() >> code
            getTypeCode() >> code
            pathFrom(CONTEXT_ITEM_TYPE) >> paths.collect({ path(it) })
            getAttributes() >> []
            isPrimitive() >> attributes.empty
        }
        addAttributes(type,  attributes)
    }

    ReferencePath path(String p) {
        Stub(ReferencePath) {
            toPropertyPath() >> p
            length() >> (p == '' ? 0 : p.count('.') + 1)
        }
    }

    TypeDescriptor addAttribute(TypeDescriptor type, TypeAttributeDescriptor attribute) {
        addAttributes(type, [attribute])
    }

    TypeDescriptor addAttributes(TypeDescriptor type, List<TypeAttributeDescriptor> attributes) {
        type.attributes.addAll attributes
        attributes.forEach { it.getTypeDescriptor() >> type }
        type
    }
}
