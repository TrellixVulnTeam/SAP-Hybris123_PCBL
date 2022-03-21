package de.hybris.platform.webhookbackoffice.widgets.modals.controllers;

import com.hybris.backoffice.widgets.notificationarea.event.NotificationEvent;
import com.hybris.cockpitng.components.Editor;
import com.hybris.cockpitng.engine.WidgetInstanceManager;
import com.hybris.cockpitng.testing.AbstractWidgetUnitTest;
import com.hybris.cockpitng.testing.annotation.DeclaredInput;
import com.hybris.cockpitng.testing.annotation.DeclaredViewEvent;
import com.hybris.cockpitng.testing.annotation.NullSafeWidget;
import com.hybris.cockpitng.util.notifications.NotificationService;

import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.integrationbackoffice.widgets.modals.generator.IntegrationObjectJsonGenerator;
import de.hybris.platform.integrationservices.model.IntegrationObjectItemModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.webhookservices.exceptions.WebhookConfigurationValidationException;
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel;
import de.hybris.platform.webhookservices.service.WebhookValidationService;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.zkoss.lang.Strings;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zul.Tab;
import org.zkoss.zul.Tabbox;
import org.zkoss.zul.Textbox;

import static de.hybris.platform.apiregistrybackoffice.constants.ApiregistrybackofficeConstants.NOTIFICATION_TYPE;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;


@DeclaredInput(value = PingWebhookConfigModalController.WEBHOOK_CONFIG_PARAM, socketType = WebhookConfigurationModel.class)
@DeclaredViewEvent(componentID = PingWebhookConfigModalController.WEBHOOK_SEND_BUTTON, eventName = Events.ON_CLICK)
@NullSafeWidget(true)
public class PingWebhookConfigModalControllerUnitTest extends AbstractWidgetUnitTest<PingWebhookConfigModalController>
{

	@Mock
	private IntegrationObjectJsonGenerator integrationObjectJsonGenerator;
	@Mock
	private NotificationService notificationService;
	@Mock
	private WebhookValidationService defaultWebhookValidationService;
	@Mock
	private WidgetInstanceManager widgetInstanceManager;

	@InjectMocks
	private PingWebhookConfigModalController controller;

	private static final String DESTINATION_URL = "webhook/destination/url";
	private static final String RESOURCE_NOT_FOUND_ERROR = "404, the server can not find the requested resource.";
	private static final String[] mockedPayloadSuccessLabels = { DESTINATION_URL };
	private static final String[] mockedPayloadFailureLabels = { DESTINATION_URL, RESOURCE_NOT_FOUND_ERROR };
	private static final String POPUP_SUCCESS_MSG = "Mocked JSON payload successfully sent out";
	private static final String SELECT_ENTITY_ERROR = "Please select an existing entity or create one.";

	protected static final String PING_WEBHOOK_CONFIG_SUCCESS_LABEL = "webhookbackoffice.pingWebhookConfiguration.info.msg.pingSuccess";
	protected static final String PING_WEBHOOK_CONFIG_FAILURE_LABEL = "webhookbackoffice.pingWebhookConfiguration.info.msg.pingFailure";
	protected static final String ERROR_404_LABEL = "webhookbackoffice.pingWebhookConfiguration.error.msg.404";
	protected static final String SELECT_ENTITY_ERROR_LABEL = "webhookbackoffice.pingWebhookConfiguration.info.msg.selectEntityError";


	@Before
	public void setUp()
	{
		when(widgetInstanceManager.getLabel(PING_WEBHOOK_CONFIG_SUCCESS_LABEL, mockedPayloadSuccessLabels)).thenReturn(
				POPUP_SUCCESS_MSG);
		when(widgetInstanceManager.getLabel(PING_WEBHOOK_CONFIG_FAILURE_LABEL, mockedPayloadFailureLabels)).thenReturn(
				RESOURCE_NOT_FOUND_ERROR);
		when(widgetInstanceManager.getLabel(ERROR_404_LABEL)).thenReturn(RESOURCE_NOT_FOUND_ERROR);
		when(widgetInstanceManager.getLabel(SELECT_ENTITY_ERROR_LABEL)).thenReturn(SELECT_ENTITY_ERROR);
		controller.webhookbackofficeJsonTextBox = new Textbox();
		controller.itemModelInstanceEditor = new Editor();
		controller.webhookbackofficeMetadataTabbox = new Tabbox();
		controller.webhookbackofficeJsonTab = mock(Tab.class);
		controller.webhookbackofficeIntegrationObjectInstanceTab = mock(Tab.class);
	}

	@Test
	public void loadTestWebhookConfigurationModalIgnoresNullWebhookConfigurations()
	{
		final String previousTextBoxValue = "some previously set text box value";

		controller.webhookbackofficeJsonTextBox.setText(previousTextBoxValue);

		executeInputSocketEvent(PingWebhookConfigModalController.WEBHOOK_CONFIG_PARAM, (Object) null);

		assertThat(controller.webhookConfiguration).isNull();
		assertThat(controller.webhookbackofficeJsonTextBox.getText()).isEqualTo(previousTextBoxValue);
	}

	@Test
	public void displaysTheIntegrationObjectJsonPresentationWhenWebhookConfigurationIsNotNull()
	{
		final String generatedJSON = "{json IO presentation}";
		final WebhookConfigurationModel webhookConfiguration = givenWebhookConfigResultsInJsonGeneration(generatedJSON);

		executeInputSocketEvent(PingWebhookConfigModalController.WEBHOOK_CONFIG_PARAM, webhookConfiguration);

		assertThat(controller.webhookConfiguration).isEqualTo(webhookConfiguration);
		assertThat(controller.webhookbackofficeJsonTextBox.getText()).isEqualTo(generatedJSON);
	}

	@Test
	public void popUpSuccessNotificationWhenMockedPayloadSent() throws WebhookConfigurationValidationException
	{

		final String generatedJSON = "{mocked IO payload}";

		controller.webhookbackofficeJsonTextBox.setText(generatedJSON);
		controller.webhookConfiguration = getWebhookConfig();

		when(controller.webhookbackofficeJsonTab.getTabbox()).thenReturn(controller.webhookbackofficeMetadataTabbox);

		controller.webhookbackofficeMetadataTabbox.setSelectedTab(controller.webhookbackofficeJsonTab);
		controller.setWidgetInstanceManager(widgetInstanceManager);

		executeViewEvent(PingWebhookConfigModalController.WEBHOOK_SEND_BUTTON, Events.ON_CLICK);

		then(notificationService).should()
		                         .notifyUser(eq(Strings.EMPTY), eq(NOTIFICATION_TYPE), eq(NotificationEvent.Level.SUCCESS),
				                         eq(POPUP_SUCCESS_MSG));
	}

	@Test
	public void popUpFailureNotificationWhenSendMockedPayloadWithServerCannotFindRequestedResource()
			throws WebhookConfigurationValidationException
	{
		final String generatedJSON = "{mocked IO payload}";

		controller.webhookbackofficeJsonTextBox.setText(generatedJSON);
		controller.webhookConfiguration = getWebhookConfig();

		when(controller.webhookbackofficeJsonTab.getTabbox()).thenReturn(controller.webhookbackofficeMetadataTabbox);

		controller.webhookbackofficeMetadataTabbox.setSelectedTab(controller.webhookbackofficeJsonTab);
		controller.setWidgetInstanceManager(widgetInstanceManager);
		doThrow(new WebhookConfigurationValidationException("NOT_FOUND",
				new HttpClientErrorException(HttpStatus.NOT_FOUND))).when(defaultWebhookValidationService)
		                                                            .pingWebhookDestination(controller.webhookConfiguration,
				                                                            generatedJSON);

		executeViewEvent(PingWebhookConfigModalController.WEBHOOK_SEND_BUTTON, Events.ON_CLICK);

		then(notificationService).should()
		                         .notifyUser(eq(Strings.EMPTY), eq(NOTIFICATION_TYPE), eq(NotificationEvent.Level.FAILURE),
				                         eq(RESOURCE_NOT_FOUND_ERROR));
	}

	@Test
	public void popUpSelectOrCreateEntityNotificationWhenNoIntegrationObjectInstanceSelectedInTheEditor()
	{
		controller.webhookConfiguration = getWebhookConfig();

		when(controller.webhookbackofficeIntegrationObjectInstanceTab.getTabbox()).thenReturn(
				controller.webhookbackofficeMetadataTabbox);

		controller.webhookbackofficeMetadataTabbox.setSelectedTab(controller.webhookbackofficeIntegrationObjectInstanceTab);
		controller.setWidgetInstanceManager(widgetInstanceManager);

		executeViewEvent(PingWebhookConfigModalController.WEBHOOK_SEND_BUTTON, Events.ON_CLICK);

		then(notificationService).should()
		                         .notifyUser(eq(Strings.EMPTY), eq(NOTIFICATION_TYPE), eq(NotificationEvent.Level.FAILURE),
				                         eq(SELECT_ENTITY_ERROR));
	}

	private WebhookConfigurationModel givenWebhookConfigResultsInJsonGeneration(final String generatedJSON)
	{
		final var ioModel = mock(IntegrationObjectModel.class);
		when(integrationObjectJsonGenerator.generateJson(ioModel)).thenReturn(generatedJSON);
		final var webhookConfiguration = mock(WebhookConfigurationModel.class);
		when(webhookConfiguration.getIntegrationObject()).thenReturn(ioModel);
		final var ioItemModel = mock(IntegrationObjectItemModel.class);
		final String typeCode = "Product";
		when(webhookConfiguration.getIntegrationObject().getRootItem()).thenReturn(ioItemModel);
		when(ioItemModel.getCode()).thenReturn(typeCode);

		return webhookConfiguration;
	}

	private WebhookConfigurationModel getWebhookConfig()
	{
		final ConsumedDestinationModel destination = mock(ConsumedDestinationModel.class);
		when(destination.getUrl()).thenReturn(DESTINATION_URL);

		final WebhookConfigurationModel webhookConfiguration = mock(WebhookConfigurationModel.class);
		when(webhookConfiguration.getDestination()).thenReturn(destination);

		return webhookConfiguration;
	}

	@Override
	protected PingWebhookConfigModalController getWidgetController()
	{
		return controller;
	}
}