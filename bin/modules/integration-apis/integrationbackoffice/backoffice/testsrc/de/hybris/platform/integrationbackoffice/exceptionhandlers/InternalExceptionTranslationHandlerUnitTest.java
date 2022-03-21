/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationbackoffice.exceptionhandlers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;

import org.mockito.runners.MockitoJUnitRunner;

import de.hybris.platform.servicelayer.interceptor.impl.UniqueAttributesInterceptor.AmbiguousUniqueKeysException;
import de.hybris.bootstrap.annotations.UnitTest;

import org.junit.Test;
import org.junit.runner.RunWith;

@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class InternalExceptionTranslationHandlerUnitTest
{
	final private InternalExceptionTranslationHandler exceptionHandler = new InternalExceptionTranslationHandler();

	@Test
	public void testCanHandle()
	{
		// can only handle the exception that is in the TARGET_EXCEPTION
		final AmbiguousUniqueKeysException supportedException = ambiguousUniqueKeysException("notMatter");
		assertThat(exceptionHandler.canHandle(supportedException)).isTrue();
	}

	@Test
	public void testCannotHandle()
	{
		final Exception notSupportedException = new Exception();
		assertThat(exceptionHandler.canHandle(notSupportedException)).isFalse();
	}

	@Test
	public void testCanHandleLevelOne()
	{
		// can only handle the exception that is in the TARGET_EXCEPTION
		final AmbiguousUniqueKeysException supportedException = ambiguousUniqueKeysException("notMatter");
		// The exception can be handled whose cause is in the TARGET_EXCEPTION
		final Exception causeAtLevel1 = exception(supportedException);
		assertThat(exceptionHandler.canHandle(causeAtLevel1)).isTrue();
	}

	@Test
	public void testCanHandleLevelTwo()
	{
		// can only handle the exception that is in the TARGET_EXCEPTION
		final AmbiguousUniqueKeysException supportedException = ambiguousUniqueKeysException("notMatter");
		// The exception can be handled whose cause is in the TARGET_EXCEPTION
		final Exception causeAtLevel1 = exception(supportedException);
		// The exception can be handled whose cause's cause is in the TARGET_EXCEPTION
		final Exception causeAtLevel2 = exception(causeAtLevel1);
		assertThat(exceptionHandler.canHandle(causeAtLevel2)).isTrue();
	}

	@Test
	public void testCannotHandleLevelThree()
	{
		// can only handle the exception that is in the TARGET_EXCEPTION
		final AmbiguousUniqueKeysException supportedException = ambiguousUniqueKeysException("notMatter");
		// The exception can be handled whose cause is in the TARGET_EXCEPTION
		final Exception causeAtLevel1 = exception(supportedException);
		// The exception can be handled whose cause's cause is in the TARGET_EXCEPTION
		final Exception causeAtLevel2 = exception(causeAtLevel1);
		// The exception can't be handled if it's very deep in the cause chain
		final Exception causeAtLevel3 = exception(causeAtLevel2);
		assertThat(exceptionHandler.canHandle(causeAtLevel3)).isFalse();
	}

	@Test
	public void testToStringForExceptionThrownByInterceptor()
	{
		final String mockLocalizedMsg = "The key is ambiguous.";
		final String mockInterceptorMsg = String.format("[interceptor]:%s", mockLocalizedMsg);
		final AmbiguousUniqueKeysException supportedException = ambiguousUniqueKeysException(mockInterceptorMsg);
		assertThat(exceptionHandler.toString(supportedException)).isEqualTo(mockLocalizedMsg);
	}

	@Test
	public void testToStringForExceptionNotThrownByInterceptor()
	{
		final String mockLocalizedMsg = "The key is ambiguous.";
		final AmbiguousUniqueKeysException supportedException = ambiguousUniqueKeysException(mockLocalizedMsg);
		assertEquals("toString() returns exception's localizedMessage if localizedMsg doesn't contain interceptor information.",
				mockLocalizedMsg, exceptionHandler.toString(supportedException));
	}

	private AmbiguousUniqueKeysException ambiguousUniqueKeysException(final String message)
	{
		final AmbiguousUniqueKeysException exception = mock(AmbiguousUniqueKeysException.class);
		doReturn(message).when(exception).getMessage();
		doReturn(message).when(exception).getLocalizedMessage();
		return exception;
	}

	private Exception exception(final Throwable cause)
	{
		final Exception exception = new Exception("notMatters", cause);
		return exception;
	}

}