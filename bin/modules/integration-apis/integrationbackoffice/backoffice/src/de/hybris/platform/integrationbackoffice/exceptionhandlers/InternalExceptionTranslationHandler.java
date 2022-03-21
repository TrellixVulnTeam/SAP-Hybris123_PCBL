/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationbackoffice.exceptionhandlers;

import de.hybris.platform.servicelayer.interceptor.impl.UniqueAttributesInterceptor.AmbiguousUniqueKeysException;

import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

import org.springframework.core.Ordered;

import com.hybris.cockpitng.service.ExceptionTranslationHandler;

/**
 * This translationHandler aims to handler the exception that is created and thrown by platform's interceptors. For example,
 * {@link AmbiguousUniqueKeysException} when persisting one item that has the duplicate uniqueAttribute value with another one.
 */
public class InternalExceptionTranslationHandler implements ExceptionTranslationHandler, Ordered
{
	private static final List<Class<? extends Exception>> TARGET_EXCEPTION = List.of(AmbiguousUniqueKeysException.class);
	private static final int LEVEL_IN_EXCEPTION_CAUSE_CHAIN = 3;
	private static final String EMPTY_MESSAGE = "";
	private static final int MESSAGE_LENGTH = 2;
	private static final Pattern MESSAGE_PLACEHOLDER_PATTERN = Pattern.compile("]:");

	@Override
	public boolean canHandle(final Throwable throwable)
	{
		return Objects.nonNull(throwable) &&
				Objects.nonNull(throwable.getMessage()) &&
				isExceptionTypeSupported(throwable);
	}

	@Override
	public String toString(final Throwable throwable)
	{
		final Throwable realThrowable = extractSupportedExceptionCause(throwable, LEVEL_IN_EXCEPTION_CAUSE_CHAIN);
		if (realThrowable == null)
		{
			return "";
		}
		final String[] message = MESSAGE_PLACEHOLDER_PATTERN.split(
				Objects.toString(realThrowable.getLocalizedMessage(), EMPTY_MESSAGE));
		return message.length == MESSAGE_LENGTH ? message[1] : throwable.getLocalizedMessage();
	}

	@Override
	public int getOrder()
	{
		return Ordered.HIGHEST_PRECEDENCE;
	}

	private boolean isExceptionTypeSupported(final Throwable throwable)
	{
		return extractSupportedExceptionCause(throwable, LEVEL_IN_EXCEPTION_CAUSE_CHAIN) != null;
	}


	/**
	 * To return the exception in the exception chain that is an instance of exceptions in TARGET_EXCEPTION
	 * @param throwable an exception to be returned if it's a instance of one of the TARGET_EXCEPTION. If not, iterate its cause.
	 * @param level Stop after certain iteration.

	 * @return The exception that is an instance of exceptions in TARGET_EXCEPTION.
	 */
	private Throwable extractSupportedExceptionCause(final Throwable throwable, final int level)
	{
		if (level == 0 || throwable == null)
		{
			return null;
		}
		if (TARGET_EXCEPTION.stream().anyMatch(aClass -> aClass.isAssignableFrom(throwable.getClass())))
		{
			return throwable;
		}
		return extractSupportedExceptionCause(throwable.getCause(), level - 1);
	}
}
