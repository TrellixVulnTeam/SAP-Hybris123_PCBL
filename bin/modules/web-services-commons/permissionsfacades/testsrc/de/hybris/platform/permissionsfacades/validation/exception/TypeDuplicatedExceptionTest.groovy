/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.permissionsfacades.validation.exception

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class TypeDuplicatedExceptionTest extends Specification {
	
	@Test
	@Unroll
	def "exception message is in the expected format when type is #type"() {
		given:
		def e = new TypeDuplicatedException(type)

		expect:
		e.getMessage() == "Type $typeInMessage is duplicated."

		where:
		type          | typeInMessage
		"TestProduct" | "TestProduct"
		""            | ""
		null          | "null"
	}
}
