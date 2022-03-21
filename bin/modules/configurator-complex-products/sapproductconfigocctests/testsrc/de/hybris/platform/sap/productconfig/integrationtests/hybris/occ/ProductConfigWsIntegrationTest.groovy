/*
 * [y] hybris Platform
 *
 * Copyright (c) 2017 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.productconfig.integrationtests.hybris.occ

import static groovyx.net.http.ContentType.JSON
import static groovyx.net.http.ContentType.XML
import static org.apache.http.HttpStatus.SC_OK

import de.hybris.bootstrap.annotations.ManualTest

import org.slf4j.LoggerFactory

import groovyx.net.http.HttpResponseDecorator


@ManualTest
class ProductConfigWsIntegrationTest extends BaseSpockTest {

	def org.slf4j.Logger LOG = LoggerFactory.getLogger(ProductConfigWsIntegrationTest.class)

	def "Get a new simple default configuration"() {

		when: "creates a new configuration"

		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/YSAP_SIMPLE_POC/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "gets a new default configuration withh all fields mapped"
		LOG.info("RESPONSE: "+response.data.toString())
		with(response) {
			status == SC_OK
			data.configId.isEmpty() == false
			data.consistent == true
			data.complete == false
			data.totalNumberOfIssues == 0
			data.rootProduct == "YSAP_SIMPLE_POC"
			data.groups.size() == 1
			data.groups[0].id == "1-YSAP_SIMPLE_POC@_GEN"
			data.groups[0].name == "_GEN"
			data.groups[0].description == "[_GEN]"
			data.groups[0].configurable == true
			data.groups[0].attributes.size() == 1
			data.groups[0].attributes[0].key=="1-YSAP_SIMPLE_POC@_GEN@YSAP_POC_SIMPLE_FLAG"
			data.groups[0].attributes[0].name=="YSAP_POC_SIMPLE_FLAG"
			data.groups[0].attributes[0].langDepName=="Simple Flag: Hide options"
			data.groups[0].attributes[0].type=="CHECK_BOX"
			data.groups[0].attributes[0].validationType=="NONE"
			data.groups[0].attributes[0].visible==true
			data.groups[0].attributes[0].required==false
			data.groups[0].attributes[0].typeLength==0
			data.groups[0].attributes[0].numberScale==0
			data.groups[0].attributes[0].negativeAllowed==false
			data.groups[0].attributes[0].intervalInDomain==false
			data.groups[0].attributes[0].maxlength==1
			data.groups[0].attributes[0].domainValues.size() == 1
			data.groups[0].attributes[0].domainValues[0].key == "X"
			data.groups[0].attributes[0].domainValues[0].langDepName == "Hide"
			data.groups[0].attributes[0].domainValues[0].name == "X"
			data.groups[0].attributes[0].domainValues[0].readonly == false
			data.groups[0].attributes[0].domainValues[0].selected == true
		}

		where:
		format << [XML, JSON]
	}

	def "Get a new multilevel default configuration requesting attributes for all groups"() {

		when: "creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/CPQ_HOME_THEATER/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format,
				query:['provideAllAttributes': 'true']
				)

		then: "gets a new default configuration with correct structure"
		LOG.info("RESPONSE: "+response.data.toString())
		with(response) {
			status == SC_OK
			data.configId.isEmpty() == false
			data.totalNumberOfIssues == 1
			data.groups.size() == 3
			data.groups[0].name == "1"
			data.groups[0].description == "Powerful audio"
			data.groups[0].id=="1-CPQ_HOME_THEATER@1"
			data.groups[0].attributes.size() == 3
			data.groups[0].attributes[0].name == "CPQ_HT_SURROUND_MODE"
			data.groups[0].attributes[0].domainValues.size() == 2
			data.groups[0].attributes[0].longText == "Surround Mode to support - will influence speaker setup"
			data.groups[0].attributes[1].name == "CPQ_HT_SUBWOOFER"
			data.groups[0].attributes[1].domainValues.size() == 1
			data.groups[0].attributes[2].name == "CPQ_HT_POWER2"
			data.groups[0].attributes[2].domainValues.size() == 3

			data.groups[1].name == "2"
			data.groups[1].description == "Visual entertainment"
			data.groups[1].id=="1-CPQ_HOME_THEATER@2"
			data.groups[1].attributes.size() == 3
			data.groups[1].attributes[0].name == "CPQ_HT_INCLUDE_TV"
			data.groups[1].attributes[0].domainValues.size() == 1
			data.groups[1].attributes[1].name == "CPQ_HT_INCLUDE_BR"
			data.groups[1].attributes[0].domainValues.size() == 1
			data.groups[1].attributes[2].name == "CPQ_HT_VIDEO_SOURCES"
			data.groups[1].attributes[2].domainValues.size() == 6

			data.groups[2].name =="CPQ_RECEIVER"
			data.groups[2].description=="Receiver"
			data.groups[2].id=="2-CPQ_RECEIVER"
			data.groups[2].subGroups.size() == 1
			data.groups[2].subGroups[0].name =="CPQ_RECEIVER"
			data.groups[2].subGroups[0].description=="Receiver"
			data.groups[2].subGroups[0].id=="2-CPQ_RECEIVER@_GEN"
			data.groups[2].subGroups[0].attributes.size() == 3
			data.groups[2].subGroups[0].attributes[0].name == "CPQ_HT_RECV_MODEL2"
			data.groups[2].subGroups[0].attributes[0].domainValues.size() == 8
			data.groups[2].subGroups[0].attributes[1].name == "CPQ_HT_RECV_MODE"
			data.groups[2].subGroups[0].attributes[1].domainValues.size() == 2
			data.groups[2].subGroups[0].attributes[2].name == "CPQ_HT_POWER2"
			data.groups[2].subGroups[0].attributes[2].domainValues.size() == 3
		}
		where:
		format << [XML, JSON]
	}

	def "Get a new multilevel default configuration requesting only attributes for first group (default behavior)."() {

		when: "creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/CPQ_HOME_THEATER/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "gets a new default configuration with correct structure"
		LOG.info("RESPONSE: "+response.data.toString())
		with(response) {
			status == SC_OK
			data.configId.isEmpty() == false
			data.groups.size() == 3
			data.groups[0].name == "1"
			data.groups[0].description == "Powerful audio"
			data.groups[0].id=="1-CPQ_HOME_THEATER@1"
			data.groups[0].complete == false
			data.groups[0].consistent == true
			data.groups[0].attributes.size() == 3
			data.groups[0].attributes[0].name == "CPQ_HT_SURROUND_MODE"
			data.groups[0].attributes[0].domainValues.size() == 2
			data.groups[0].attributes[0].longText == "Surround Mode to support - will influence speaker setup"
			data.groups[0].attributes[1].name == "CPQ_HT_SUBWOOFER"
			data.groups[0].attributes[1].domainValues.size() == 1
			data.groups[0].attributes[2].name == "CPQ_HT_POWER2"
			data.groups[0].attributes[2].domainValues.size() == 3

			data.groups[1].name == "2"
			data.groups[1].description == "Visual entertainment"
			data.groups[1].id=="1-CPQ_HOME_THEATER@2"
			data.groups[1].attributes == null || data.groups[1].attributes.size() == 0

			data.groups[2].name =="CPQ_RECEIVER"
			data.groups[2].description=="Receiver"
			data.groups[2].id=="2-CPQ_RECEIVER"
			data.groups[2].subGroups.size() == 1
			data.groups[2].subGroups[0].name =="CPQ_RECEIVER"
			data.groups[2].subGroups[0].description=="Receiver"
			data.groups[2].subGroups[0].id=="2-CPQ_RECEIVER@_GEN"
			data.groups[2].subGroups[0].attributes == null || data.groups[2].subGroups[0].attributes.size() == 0
		}
		where:
		format << [XML, JSON]
	}

	def "Change configuration and see updated value"() {

		when: "Anonymous user creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/CPQ_HOME_THEATER/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "Gets a new default configuration that is not complete"
		LOG.info("RESPONSE: "+response.data.toString())
		with(response) { status == SC_OK }
		when: "Afterwards updates the configuration with a characteristic value"
		def putBody = response.data
		putBody.groups[0].attributes[0].value = "STEREO"


		HttpResponseDecorator responseAfterUpdate = restClient.patch(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + response.data.configId,
				body : putBody,
				contentType: format
				)

		then: "Gets the updated configuration result and expects to see the changed value"
		with(responseAfterUpdate) {
			status == SC_OK
			data.groups[0].attributes[0].name == "CPQ_HT_SURROUND_MODE"
			data.groups[0].attributes[0].value == "STEREO"
			data.groups[0].complete == true
			data.groups[0].consistent == true
		}
		where:
		format << [JSON]
	}

	def "Retract values for an attribute"() {

		when: "Anonymous user creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/CPQ_HOME_THEATER/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "Gets a new default configuration that is not complete"
		LOG.info("RESPONSE: "+response.data.toString())
		with(response) {
			status == SC_OK
			data.groups[0].complete == false
			data.groups[0].consistent == true
		}
		when: "Afterwards updates the configuration with a characteristic value"
		def putBody = response.data
		putBody.groups[0].attributes[0].value = "STEREO"


		HttpResponseDecorator responseAfterUpdate = restClient.patch(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + response.data.configId,
				body : putBody,
				contentType: format
				)

		then: "Gets the updated configuration result and expects to see the changed value"
		with(responseAfterUpdate) {
			status == SC_OK
			data.groups[0].attributes[0].name == "CPQ_HT_SURROUND_MODE"
			data.groups[0].attributes[0].value == "STEREO"
			data.groups[0].complete == true
			data.groups[0].consistent == true
		}
		when: "Afterwards updates the configuration and triggers retract for the attribute"
		def putRetractBody = responseAfterUpdate.data
		putRetractBody.groups[0].attributes[0].retractTriggered = true
		HttpResponseDecorator responseAfterRetract = restClient.patch(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + response.data.configId,
				body : putRetractBody,
				contentType: format
				)


		then: "Gets the updated configuration result and expects to see the value gone"
		with(responseAfterRetract) {
			status == SC_OK
			data.groups[0].attributes[0].name == "CPQ_HT_SURROUND_MODE"
			data.groups[0].attributes[0].value == null
			data.groups[0].complete == false
			data.groups[0].consistent == true
		}
		where:
		format << [JSON]
	}

	def "Change configuration and see new instances resulting from value change"() {

		when: "Anonymous user creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/CPQ_HOME_THEATER/configurators/' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "Gets a new default configuration that contains 3 groups, excluding their subgroups"
		LOG.info("RESPONSE: "+response.data.toString())
		with(response) {
			status == SC_OK
			data.groups.size() == 3
		}
		when: "Afterwards updates the configuration with a characteristic value that causes additional instances"
		def putBody = response.data
		putBody.groups[0].attributes[0].value = "STEREO"
		HttpResponseDecorator responseAfterUpdate = restClient.patch(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + response.data.configId,
				body : putBody,
				contentType: format
				)

		response = restClient.get(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + response.data.configId,
				contentType: format
				)

		then: "Gets the updated configuration result and expects to see an extended list of UI groups"
		with(responseAfterUpdate) {
			status == SC_OK
			data.groups.size() == 4
		}
		where:
		format << [JSON]
	}

	def "Get a configuration by the config id"() {

		when: "creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/YSAP_SIMPLE_POC/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "gets a new default configuration with"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response) {
			status == SC_OK
			data.configId.isEmpty() == false
		}

		when: "Afterwards get the created configuration by the config ID"
		String configId = response.data.configId

		response = restClient.get(
				path: getBasePathWithSite() +  SLASH_CONFIGURATOR_TYPE_OCC_SLASH+ configId,
				contentType: format
				)

		then: "gets the newly create configuration by config ID with all fields mapped"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response) {
			status == SC_OK
			data.configId == configId
			data.consistent == true
			data.complete == false
			data.rootProduct == "YSAP_SIMPLE_POC"
			data.groups.size() == 1
			data.groups[0].id == "1-YSAP_SIMPLE_POC@_GEN"
			data.groups[0].name == "_GEN"
			data.groups[0].description == "[_GEN]"
			data.groups[0].configurable == true
			data.groups[0].complete == true
			data.groups[0].consistent == true
			data.groups[0].attributes.size() == 1
			data.groups[0].attributes[0].key == "1-YSAP_SIMPLE_POC@_GEN@YSAP_POC_SIMPLE_FLAG"
			data.groups[0].attributes[0].name == "YSAP_POC_SIMPLE_FLAG"
			data.groups[0].attributes[0].langDepName == "Simple Flag: Hide options"
			data.groups[0].attributes[0].type == "CHECK_BOX"
			data.groups[0].attributes[0].validationType == "NONE"
			data.groups[0].attributes[0].visible == true
			data.groups[0].attributes[0].required == false
			data.groups[0].attributes[0].typeLength == 0
			data.groups[0].attributes[0].numberScale == 0
			data.groups[0].attributes[0].intervalInDomain == false
			data.groups[0].attributes[0].maxlength == 1
			data.groups[0].attributes[0].domainValues.size() == 1
			data.groups[0].attributes[0].domainValues[0].key == "X"
			data.groups[0].attributes[0].domainValues[0].langDepName == "Hide"
			data.groups[0].attributes[0].domainValues[0].name == "X"
			data.groups[0].attributes[0].domainValues[0].readonly == false
			data.groups[0].attributes[0].domainValues[0].selected == true
		}

		where:
		format << [XML, JSON]
	}
	def "Get a multilevel configuration by the config id"() {

		when: "creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/CPQ_HOME_THEATER/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "gets a new default configuration with"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response) {
			status == SC_OK
			data.configId.isEmpty() == false
		}

		when: "Afterwards get the created configuration by the config ID"
		String configId = response.data.configId

		response = restClient.get(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + configId ,
				contentType: format
				)

		then: "gets the newly create configuration by config ID with all fields mapped and attributes for all groups"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response) {
			status == SC_OK
			data.configId.isEmpty() == false
			data.groups.size() == 3
			data.groups[0].name == "1"
			data.groups[0].description == "Powerful audio"
			data.groups[0].id=="1-CPQ_HOME_THEATER@1"
			data.groups[0].attributes.size() == 3
			data.groups[0].attributes[0].name == "CPQ_HT_SURROUND_MODE"
			data.groups[0].attributes[0].domainValues.size() == 2
			data.groups[0].attributes[0].longText == "Surround Mode to support - will influence speaker setup"
			data.groups[0].attributes[1].name == "CPQ_HT_SUBWOOFER"
			data.groups[0].attributes[1].domainValues.size() == 1
			data.groups[0].attributes[2].name == "CPQ_HT_POWER2"
			data.groups[0].attributes[2].domainValues.size() == 3

			data.groups[1].name == "2"
			data.groups[1].description == "Visual entertainment"
			data.groups[1].id=="1-CPQ_HOME_THEATER@2"
			data.groups[1].attributes.size() == 3
			data.groups[1].attributes[0].name == "CPQ_HT_INCLUDE_TV"
			data.groups[1].attributes[0].domainValues.size() == 1
			data.groups[1].attributes[1].name == "CPQ_HT_INCLUDE_BR"
			data.groups[1].attributes[0].domainValues.size() == 1
			data.groups[1].attributes[2].name == "CPQ_HT_VIDEO_SOURCES"
			data.groups[1].attributes[2].domainValues.size() == 6

			data.groups[2].name =="CPQ_RECEIVER"
			data.groups[2].description=="Receiver"
			data.groups[2].id=="2-CPQ_RECEIVER"
			data.groups[2].subGroups.size() == 1
			data.groups[2].subGroups[0].name =="CPQ_RECEIVER"
			data.groups[2].subGroups[0].description=="Receiver"
			data.groups[2].subGroups[0].id=="2-CPQ_RECEIVER@_GEN"
			data.groups[2].subGroups[0].attributes.size() == 3
			data.groups[2].subGroups[0].attributes[0].name == "CPQ_HT_RECV_MODEL2"
			data.groups[2].subGroups[0].attributes[0].domainValues.size() == 8
			data.groups[2].subGroups[0].attributes[1].name == "CPQ_HT_RECV_MODE"
			data.groups[2].subGroups[0].attributes[1].domainValues.size() == 2
			data.groups[2].subGroups[0].attributes[2].name == "CPQ_HT_POWER2"
			data.groups[2].subGroups[0].attributes[2].domainValues.size() == 3
		}


		where:
		format << [XML, JSON]
	}
	def "Get a multilevel configuration by the config id specifying a group"() {

		when: "creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/CPQ_HOME_THEATER/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "gets a new default configuration with"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response) {
			status == SC_OK
			data.configId.isEmpty() == false
		}

		when: "Afterwards get the created configuration by the config ID"
		String configId = response.data.configId

		response = restClient.get(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + configId  ,
				contentType: format,
				query:['groupId': '1-CPQ_HOME_THEATER@2']
				)

		then: "gets the newly create configuration by config ID with all fields mapped but attributes only for the requested group"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response) {
			status == SC_OK
			data.configId.isEmpty() == false
			data.groups.size() == 3
			data.groups[0].name == "1"
			data.groups[0].description == "Powerful audio"
			data.groups[0].id=="1-CPQ_HOME_THEATER@1"
			data.groups[0].attributes == null || data.groups[0].attributes.size() == 0

			data.groups[1].name == "2"
			data.groups[1].description == "Visual entertainment"
			data.groups[1].id=="1-CPQ_HOME_THEATER@2"
			data.groups[1].attributes.size() == 3
			data.groups[1].attributes[0].name == "CPQ_HT_INCLUDE_TV"
			data.groups[1].attributes[0].domainValues.size() == 1
			data.groups[1].attributes[1].name == "CPQ_HT_INCLUDE_BR"
			data.groups[1].attributes[0].domainValues.size() == 1
			data.groups[1].attributes[2].name == "CPQ_HT_VIDEO_SOURCES"
			data.groups[1].attributes[2].domainValues.size() == 6

			data.groups[2].name =="CPQ_RECEIVER"
			data.groups[2].description=="Receiver"
			data.groups[2].id=="2-CPQ_RECEIVER"
			data.groups[2].subGroups.size() == 1
			data.groups[2].subGroups[0].name =="CPQ_RECEIVER"
			data.groups[2].subGroups[0].description=="Receiver"
			data.groups[2].subGroups[0].id=="2-CPQ_RECEIVER@_GEN"
			data.groups[2].subGroups[0].attributes == null || data.groups[2].subGroups[0].attributes.size() == 0
		}


		where:
		format << [XML, JSON]
	}
}
