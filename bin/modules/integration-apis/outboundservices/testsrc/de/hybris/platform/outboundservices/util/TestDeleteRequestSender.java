/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundservices.util;

import de.hybris.platform.outboundservices.facade.SyncParameters;
import de.hybris.platform.outboundservices.service.DeleteRequestSender;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public class TestDeleteRequestSender extends OutboundInvocationTracker<TestDeleteRequestSender> implements DeleteRequestSender
{
	@Override
	protected ResponseEntity<Map> createDefaultResponse()
	{
		return null;
	}

	@Override
	public TestDeleteRequestSender throwException(final RuntimeException e)
	{
		return super.throwException(e);
	}

	@Override
	public TestDeleteRequestSender doAndRespondWith(final ResponseEntity.BodyBuilder builder, final Runnable act)
	{
		final var response = builder.build();
		if (response.getStatusCodeValue() >= 400)
		{
			final var exception = new RuntimeException(
					String.format("IGNORE - Testing Exception - Response code is in error range: %d", response.getStatusCodeValue()));
			return respondWith(new ExceptionResponse(exception, act));
		}
		return super.doAndRespondWith(builder, act);
	}

	@Override
	public synchronized void send(final SyncParameters parameters)
	{
		internalSend(parameters);
	}
}
