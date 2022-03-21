/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.webhookbackoffice.handlers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.servicelayer.exceptions.ModelSavingException;
import de.hybris.platform.webhookservices.exceptions.DestinationTargetNoSupportedEventConfigException;
import de.hybris.platform.webhookservices.exceptions.WebhookConfigInvalidChannelException;
import de.hybris.platform.webhookservices.exceptions.WebhookConfigNoEventConfigException;
import de.hybris.platform.webhookservices.exceptions.WebhookConfigNotValidLocationException;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Properties;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

import com.hybris.cockpitng.dataaccess.facades.object.exceptions.ObjectSavingException;

@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class WebhookExceptionTranslationHandlerUnitTest
{
	@Spy
	private WebhookExceptionTranslationHandler exceptionHandler;
	private Properties prop = new Properties();

	@Before
	public void setUp()
	{
		try
		{
			final ClassLoader classLoader = WebhookExceptionTranslationHandlerUnitTest.class.getClassLoader();
			final URL url = classLoader.getResource("webhookbackoffice-backoffice-labels/labels_en.properties");
			assert url != null;
			prop.load(new FileInputStream(url.getFile()));
		}
		catch (IOException | NullPointerException ex)
		{
			ex.printStackTrace();
		}
	}

	@Test
	public void testCanHandle()
	{
		assertThat(exceptionHandler.canHandle(null)).isFalse();

		Throwable throwable = new Throwable();
		assertThat(exceptionHandler.canHandle(throwable)).isFalse();

		ObjectSavingException savingException = new ObjectSavingException("test", new Throwable());
		assertThat(exceptionHandler.canHandle(savingException)).isFalse();

		ModelSavingException modelSavingException = new ModelSavingException("This error message doesn't matter");
		assertThat(exceptionHandler.canHandle(modelSavingException)).isFalse();

		WebhookConfigNotValidLocationException supportedException2 = new WebhookConfigNotValidLocationException("not matters", null);
		assertThat(exceptionHandler.canHandle(supportedException2)).isTrue();
		WebhookConfigInvalidChannelException supportedException3 = new WebhookConfigInvalidChannelException(null);
		assertThat(exceptionHandler.canHandle(supportedException3)).isTrue();
		DestinationTargetNoSupportedEventConfigException supportedException4 = new DestinationTargetNoSupportedEventConfigException();
		assertThat(exceptionHandler.canHandle(supportedException4)).isTrue();
		WebhookConfigNoEventConfigException supportedException5 = new WebhookConfigNoEventConfigException(null);
		assertThat(exceptionHandler.canHandle(supportedException5)).isTrue();


		ModelSavingException causeCanBeHandled = new ModelSavingException("This error message doesn't matter", supportedException2);
		assertThat(exceptionHandler.canHandle(causeCanBeHandled)).isTrue();

		ObjectSavingException causeCanBeHandled2 = new ObjectSavingException("test", causeCanBeHandled);
		assertThat(exceptionHandler.canHandle(causeCanBeHandled2)).isTrue();
	}

	@Test
	public void testToString()
	{
		final String expectedLabel = "An expected error message.";

		// No way to access labels by Labels.getLabel so method toString() can't be tested normally. To ensure the connection between
		// the exception's name and label key, using classLoader.getResource() and Properties class.
		WebhookConfigInvalidChannelException supportedException = new WebhookConfigInvalidChannelException(null);
		doReturn(expectedLabel).when(exceptionHandler).convertExceptionToResourceMsg(supportedException);

		// The target exception is translated.
		assertThat(exceptionHandler.toString(supportedException)).isEqualTo(expectedLabel);
		// If target exception is the cause or cause's cause of a exception, it will be translated to expected error message correctly.
		ModelSavingException causeCanBeHandled = new ModelSavingException("This error message doesn't matter", supportedException);
		assertThat(exceptionHandler.toString(causeCanBeHandled)).isEqualTo(expectedLabel);
		ObjectSavingException causeCanBeHandled2 = new ObjectSavingException("This error message doesn't matter", causeCanBeHandled);
		assertThat(exceptionHandler.toString(causeCanBeHandled2)).isEqualTo(expectedLabel);

		// If the supported exception can't be converted to resource labels, error message falls back to exception's message.
		// Labels.getLabel not working in unit test so will fall back.
		WebhookConfigNoEventConfigException fallbackException = new WebhookConfigNoEventConfigException(null);
		assertThat(exceptionHandler.toString(fallbackException)).isSubstringOf(fallbackException.getLocalizedMessage());

	}

	@Test
	public void isSupportedExceptionLabelsAvailable()
	{
		WebhookConfigNotValidLocationException supportedException2 = new WebhookConfigNotValidLocationException("not matters", null);
		assertThat(getMessageFromResource(supportedException2)).isNotNull();
		WebhookConfigInvalidChannelException supportedException3 = new WebhookConfigInvalidChannelException(null);
		assertThat(getMessageFromResource(supportedException3)).isNotNull();
		DestinationTargetNoSupportedEventConfigException supportedException4 = new DestinationTargetNoSupportedEventConfigException();
		assertThat(getMessageFromResource(supportedException4)).isNotNull();
		WebhookConfigNoEventConfigException supportedException5 = new WebhookConfigNoEventConfigException(null);
		assertThat(getMessageFromResource(supportedException5)).isNotNull();
	}

	private String getMessageFromResource(Throwable exception)
	{
		final String errorMessageFromExceptionPrefix = "webhookbackoffice.exceptionTranslation.msg.";
		return prop.getProperty(errorMessageFromExceptionPrefix + exception.getClass().getSimpleName());
	}
}
