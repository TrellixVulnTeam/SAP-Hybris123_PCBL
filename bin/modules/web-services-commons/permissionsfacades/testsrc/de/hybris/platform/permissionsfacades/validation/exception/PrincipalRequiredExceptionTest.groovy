/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.permissionsfacades.validation.exception

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test
import spock.lang.Specification

@UnitTest
class PrincipalRequiredExceptionTest extends Specification {

	@Test
	def 'instantiates the exception'() {
		given:
		def e = new PrincipalRequiredException()

		expect:
		e.message == "Attribute 'principalUid' is a required field."
	}
}
