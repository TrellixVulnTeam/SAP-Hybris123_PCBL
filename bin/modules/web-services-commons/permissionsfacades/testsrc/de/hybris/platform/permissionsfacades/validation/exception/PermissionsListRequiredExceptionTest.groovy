/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.permissionsfacades.validation.exception

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test
import spock.lang.Specification

@UnitTest
class PermissionsListRequiredExceptionTest extends Specification {

	@Test
	def 'instantiate the exception'() {
		given:
		def e = new PermissionsListRequiredException()

		expect:
		e.message == "Attribute 'permissionsList' is a required field."
	}
}
