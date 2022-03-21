/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.exceptionhandlers;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.core.Ordered;

import com.hybris.cockpitng.service.ExceptionTranslationHandler;


/**
 * An abstract class for translating target exceptions to localized error messages. Its subclass needs to overwrite methods in
 * order to specify the target exceptions and how to acquire localized messages.
 */
public abstract class IntegrationApiExceptionTranslationHandler implements ExceptionTranslationHandler, Ordered
{
	@Override
	public boolean canHandle(final Throwable throwable)
	{
		return isExceptionOrCauseSupported(throwable);
	}

	@Override
	public String toString(final Throwable throwable)
	{
		Throwable realThrowable = getRealExceptionCause(throwable);
		final String localizedMsg = convertExceptionToResourceMsg(realThrowable);
		return !StringUtils.isBlank(localizedMsg) ?
				localizedMsg :
				realThrowable.getLocalizedMessage();
	}

	@Override
	public int getOrder()
	{
		return Ordered.HIGHEST_PRECEDENCE;
	}

	private boolean isExceptionOrCauseSupported(final Throwable throwable)
	{
		return throwable != null && (isExceptionSupported(throwable) || isExceptionOrCauseSupported(throwable.getCause()));
	}

	private boolean isExceptionSupported(final Throwable throwable)
	{
		return throwable != null && isTargetedException(throwable);
	}

	private boolean isTargetedException(final Throwable throwable)
	{
		return getTargetedException().stream().anyMatch(name -> throwable.getClass().getSimpleName().equals(name));
	}

	private Throwable getRealExceptionCause(final Throwable throwable)
	{
		if (throwable.getCause() != null && isExceptionSupported(throwable.getCause().getCause()))
		{
			return throwable.getCause().getCause();
		}
		if (isExceptionSupported(throwable.getCause()))
		{
			return throwable.getCause();
		}
		return throwable;
	}

	/**
	 * @return The list of exceptions that this handler is able to handle.
	 */
	protected abstract List<String> getTargetedException();

	/**
	 * Try to get bundle resource with the information of the exception that is being handled.
	 * @param exception The exception that is being translated. Use its class name or other information as key to get bundle resource
	 */
	protected abstract String convertExceptionToResourceMsg(final Throwable exception);
}
