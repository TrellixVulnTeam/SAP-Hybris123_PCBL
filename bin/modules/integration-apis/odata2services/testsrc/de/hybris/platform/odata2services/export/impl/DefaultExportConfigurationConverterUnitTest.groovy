/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2services.export.impl

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.core.PK
import de.hybris.platform.core.model.ItemModel
import de.hybris.platform.integrationservices.model.DescriptorFactory
import de.hybris.platform.integrationservices.model.IntegrationObjectDescriptor
import de.hybris.platform.integrationservices.model.IntegrationObjectItemModel
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.model.TypeDescriptor
import de.hybris.platform.integrationservices.populator.ItemToMapConversionContext
import de.hybris.platform.integrationservices.service.IntegrationObjectConversionService
import de.hybris.platform.integrationservices.util.JsonObject
import de.hybris.platform.odata2services.dto.ConfigurationBundleEntity
import de.hybris.platform.odata2services.dto.IntegrationObjectBundleEntity
import de.hybris.platform.odata2services.export.ExportConfigurationSearchService
import de.hybris.platform.odata2services.odata.schema.entity.EntitySetNameGenerator
import org.junit.Test
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class DefaultExportConfigurationConverterUnitTest extends Specification {

    private static final String EXPORT_URL = "{{hostUrl}}/odata2webservices/ExportableIO/ExportableIORootItems"

    def rootItemInstance = getRootItemInstance()
    def configBundle = configurationBundleEntity(rootItemInstance)
    def exportIODescriptor = ioDescriptor(rootItemInstance)
    def exportIO = exportableIntegrationObject()

    def searchService = Stub(ExportConfigurationSearchService)
    def descriptorFactory = Stub(DescriptorFactory) {
        createIntegrationObjectDescriptor(exportIO) >> exportIODescriptor
    }
    def conversionService = Stub(IntegrationObjectConversionService)
    def nameGenerator = Stub(EntitySetNameGenerator) {
        generate(exportIO.rootItem.code) >> "ExportableIORootItems"
    }
    def exportConfigurationConverter = new DefaultExportConfigurationConverter(
            searchService,
            descriptorFactory,
            conversionService,
            nameGenerator)

    @Test
    @Unroll
    def "convert exportable integration object to export entity"() {
        given: "an exportable IO to export"
        searchService.findExportableIntegrationObjectByCode(exportIO.code) >> exportIO
        searchService.getExportableIntegrationObjects() >> [exportIO]
        and: "the given IO has a root item instance"
        searchService.findRootItemInstances(configBundle.integrationObjectBundles.first()) >> [rootItemInstance]
        and: "the root item instance conversion map"
        conversionService.convert(_ as ItemToMapConversionContext) >> [key1: 'value1', key2: [key3: 'value3']]

        when: "converting the IO bundle"
        def exportEntity = exportConfigurationConverter.convert(configBundle)

        then:
        exportEntity.size() == 1
        with(exportEntity.first()) {
            requestUrl == EXPORT_URL
            requestBodies.size() == 1
            with(JsonObject.createFrom(requestBodies[0]), JsonObject) { getString(attribute) == value }
        }
        where:
        attribute   | value
        'key1'      | 'value1'
        'key2'      | '{key3=value3}'
        'key2.key3' | 'value3'
    }

    @Test
    @Unroll
    def "verify that the content of the sensitive attributes is removed from the request body"() {
        given: "an exportable IO to export"
        searchService.findExportableIntegrationObjectByCode(exportIO.code) >> exportIO
        searchService.getExportableIntegrationObjects() >> [exportIO]
        and: "the given IO has a root item instance"
        searchService.findRootItemInstances(configBundle.integrationObjectBundles.first()) >> [rootItemInstance]
        and: "the root item instance conversion map has some sensitive content to be filtered"
        conversionService.convert(_ as ItemToMapConversionContext) >> conversionMap

        when: "converting the IO bundle"
        def exportEntity = exportConfigurationConverter.convert(configBundle)

        then:
        exportEntity.size() == 1
        with(exportEntity.first()) {
            requestUrl == EXPORT_URL
            requestBodies.size() == 1
            with(JsonObject.createFrom(requestBodies[0]), JsonObject) { getString(attribute) == value }
        }

        where:
        attribute                       | conversionMap                                                        | value
        'nonSensitive'                  | [nonSensitive: 'value']                                              | 'value'
        'nonSensitive'                  | [nonSensitive: [nonSensitiveNested: 'value']]                        | '{nonSensitiveNested=value}'
        'credentialBasic'               | [credentialBasic: 'secret']                                          | null
        'credentialBasic'               | [credentialBasic: [nestedAttribute: 'secret']]                       | null
        'credentialBasicNested'         | [credentialBasicNested: [credentialBasic: 'secret']]                 | '{credentialBasic=null}'
        'credentialConsumedOAuth'       | [credentialConsumedOAuth: 'secret']                                  | null
        'credentialConsumedOAuth'       | [credentialConsumedOAuth: [nestedAttribute: 'secret']]               | null
        'credentialConsumedOAuthNested' | [credentialConsumedOAuthNested: [credentialConsumedOAuth: 'secret']] | '{credentialConsumedOAuth=null}'
    }

    @Test
    def "verify that the autoGenerate flag is always set to true when converting an OutboundChannelConfig"() {
        given: "an OCC IO to export"
        searchService.findExportableIntegrationObjectByCode(exportIO.code) >> exportIO
        searchService.getExportableIntegrationObjects() >> [exportIO]
        and: "the given OCC IO has a root item instance"
        def integrationObjectBundle = configurationBundleEntity(getRootItemInstance())
        searchService.findRootItemInstances(integrationObjectBundle.integrationObjectBundles.first()) >> [rootItemInstance]
        and: "the OCC root item instance conversion map has the autoGenerate flag set to false"
        conversionService.convert(_ as ItemToMapConversionContext) >> [autoGenerate: 'false']

        when: "converting the OCC IO bundle"
        def exportEntity = exportConfigurationConverter.convert(integrationObjectBundle)

        then: "the OCC autoGenerate flag is set to true"
        exportEntity.size() == 1
        with(exportEntity.first()) {
            requestUrl == EXPORT_URL
            requestBodies.size() == 1
            with(JsonObject.createFrom(requestBodies[0]), JsonObject) { getString('autoGenerate') == 'true' }
        }
    }

    @Test
    def "convert exportable integration object which does not have any root item instance"() {
        given: "an exportable IO to export"
        searchService.findExportableIntegrationObjectByCode(exportIO.code) >> exportIO
        searchService.getExportableIntegrationObjects() >> [exportIO]
        and: "the given IO does not have any root item instances"
        def integrationObjectBundle = configurationBundleEntity(getRootItemInstance())
        searchService.findRootItemInstances(integrationObjectBundle.integrationObjectBundles.first()) >> []

        when: "converting the IO bundle"
        def exportEntity = exportConfigurationConverter.convert(integrationObjectBundle)

        then: "the export entity set is empty"
        exportEntity.size() == 0
    }

    @Test
    def "throws an exception when converting a non exportable integration object"() {
        given: "there is no exportable IO configured"
        searchService.getExportableIntegrationObjects() >> []
        and: "no exportable IO is found"
        searchService.findExportableIntegrationObjectByCode(exportIO.code) >> {
            throw new NonExportableIntegrationObjectException(exportIO.code)
        }

        when: "converting the IO bundle"
        exportConfigurationConverter.convert(configurationBundleEntity(getRootItemInstance()))

        then:
        def ex = thrown(NonExportableIntegrationObjectException)
        with(ex) {
            ex.message.contentEquals("The integration object [$exportIO.code] is not exportable. Please check the configuration property odata2services.exportable.integration.objects.")
            ex.integrationObjectCode == exportIO.code
        }
    }

    @Test
    def "throws an exception when converting an exportable integration object without a root item"() {
        given: "there is an exportable IO configured"
        searchService.getExportableIntegrationObjects() >> [Stub(IntegrationObjectModel)]
        and: "the configured IO does not have a root item assigned"
        def ioWithoutRootItem = exportableIntegrationObjectWithoutRootItem()
        searchService.findExportableIntegrationObjectByCode(ioWithoutRootItem.code) >> {
            throw new NonExportableIntegrationObjectNoRootItemException(ioWithoutRootItem.code)
        }

        when: "converting the IO bundle"
        exportConfigurationConverter.convert(configBundle)

        then:
        def ex = thrown(NonExportableIntegrationObjectNoRootItemException)
        with(ex) {
            ex.message.contentEquals("The integration object [$ioWithoutRootItem.code] is not exportable because it does not have a root item assigned.")
            ex.integrationObjectCode == ioWithoutRootItem.code
        }
    }

    def exportableIntegrationObject() {
        return Stub(IntegrationObjectModel) {
            getCode() >> "ExportableIO"
            getRootItem() >> Stub(IntegrationObjectItemModel) {
                getCode() >> "ExportableIORootItem"
            }
        }
    }

    def exportableIntegrationObjectWithoutRootItem() {
        Stub(IntegrationObjectModel) {
            getCode() >> "ExportableIO"
            getRootItem() >> null
        }
    }

    def ioDescriptor(def rootItemInstance) {
        Stub(IntegrationObjectDescriptor) {
            getItemTypeDescriptor(rootItemInstance) >> Optional.of(Stub(TypeDescriptor) {
                isInstance(_) >> true
            })
            getCode() >> "OutboundChannelConfig"
        }
    }

    def configurationBundleEntity(def rootItemInstance) {
        Stub(ConfigurationBundleEntity) {
            getIntegrationObjectBundles() >> [Stub(IntegrationObjectBundleEntity) {
                getIntegrationObjectCode() >> exportableIntegrationObject().code
                getRootItemInstancePks() >> [rootItemInstance.pk]
            }]
        }
    }

    def getRootItemInstance() {
        Stub(ItemModel) {
            getPk() >> { PK.fromLong(1L) }
        }
    }

}
