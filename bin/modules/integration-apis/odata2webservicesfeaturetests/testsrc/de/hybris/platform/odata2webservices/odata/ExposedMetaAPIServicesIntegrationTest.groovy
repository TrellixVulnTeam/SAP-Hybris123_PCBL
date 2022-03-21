/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.odata2webservices.odata

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.odata2webservices.odata.builders.ODataRequestBuilder
import de.hybris.platform.odata2webservices.odata.builders.PathInfoBuilder
import de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData
import de.hybris.platform.outboundsync.util.OutboundSyncEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.apache.olingo.odata2.api.processor.ODataContext
import org.junit.ClassRule
import org.junit.Test
import spock.lang.Shared
import spock.lang.Unroll

import javax.annotation.Resource

import static de.hybris.platform.odata2webservices.odata.ODataFacadeTestUtils.createContext
import static de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData.odata2WebservicesEssentialData
import static de.hybris.platform.outboundsync.util.OutboundSyncEssentialData.outboundSyncEssentialData

@IntegrationTest
class ExposedMetaAPIServicesIntegrationTest extends ServicelayerSpockSpecification {
    @Shared
    @ClassRule
    Odata2WebServicesEssentialData inboundEssentialData = odata2WebservicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    OutboundSyncEssentialData outboundSyncData = outboundSyncEssentialData()

    @Resource(name = "oDataWebMonitoringFacade")
    private ODataFacade facade

    @Test
    @Unroll
    def "access rights provided for exposed meta api service /#service/\$metadata"() {
        when:
        def response = facade.handleRequest request(service)

        then:
        response.getStatus() == HttpStatusCodes.OK

        where:
        service << ['InboundIntegrationMonitoring', 'OutboundIntegrationMonitoring', 'IntegrationService',
                    'ScriptService', 'OutboundChannelConfig']
    }

    ODataContext request(String service) {
        createContext ODataRequestBuilder.oDataGetRequest()
                .withPathInfo(PathInfoBuilder.pathInfo()
                        .withServiceName(service)
                        .withRequestPath('$metadata'))
    }
}