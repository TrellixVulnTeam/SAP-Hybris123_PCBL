/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookbackoffice.widgets.modals.controllers;

import static de.hybris.platform.apiregistrybackoffice.constants.ApiregistrybackofficeConstants.NOTIFICATION_TYPE;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.integrationbackoffice.services.ReadService;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.servicelayer.exceptions.ModelSavingException;
import de.hybris.platform.webhookbackoffice.services.WebhookConfigBackofficeService;
import de.hybris.platform.webhookservices.event.ItemCreatedEvent;
import de.hybris.platform.webhookservices.event.ItemSavedEvent;
import de.hybris.platform.webhookservices.event.ItemUpdatedEvent;
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel;

import java.util.Collections;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;

import org.zkoss.zk.ui.event.Events;
import org.zkoss.zul.Button;
import org.zkoss.zul.Combobox;
import org.zkoss.zul.Comboitem;

import com.hybris.backoffice.widgets.notificationarea.event.NotificationEvent;
import com.hybris.cockpitng.components.Editor;
import com.hybris.cockpitng.core.events.CockpitEventQueue;
import com.hybris.cockpitng.editor.defaultreferenceeditor.DefaultReferenceEditor;
import com.hybris.cockpitng.testing.AbstractWidgetUnitTest;
import com.hybris.cockpitng.testing.annotation.DeclaredInput;
import com.hybris.cockpitng.testing.annotation.DeclaredViewEvent;
import com.hybris.cockpitng.testing.annotation.NullSafeWidget;
import com.hybris.cockpitng.util.DefaultWidgetController;
import com.hybris.cockpitng.util.notifications.NotificationService;

@DeclaredInput(value = "createWebhookConfiguration", socketType = String.class)
@DeclaredViewEvent(componentID = "integrationObjectComboBox", eventName = Events.ON_CHANGE)
@DeclaredViewEvent(componentID = "consumedDestinationEditor", eventName = Editor.ON_VALUE_CHANGED)
@DeclaredViewEvent(componentID = "createButton", eventName = Events.ON_CLICK)
@NullSafeWidget(false)
public class CreateWebhookConfigurationModalControllerUnitTest
		extends AbstractWidgetUnitTest<CreateWebhookConfigurationModalController>
{
	private static final String WEBHOOK_EXISTS_ERROR_MESSAGE = "webhookbackoffice.createWebhookConfiguration.error.msg.webhookExists";
	private static final String WEBHOOK_EXISTS_ERROR_TITLE = "webhookbackoffice.createWebhookConfiguration.error.title.webhookExists";
	private static final String WEBHOOK_CREATION_FAILED_MESSAGE = "webhookbackoffice.createWebhookConfiguration.error.msg.creationFailed";
	private static final String WEBHOOK_CREATION_FAILED_TITLE = "webhookbackoffice.createWebhookConfiguration.error.title.creationFailed";
	private static final String SAVED_EVENT_TYPE = ItemSavedEvent.class.getCanonicalName();
	private static final String CREATED_EVENT_TYPE = ItemCreatedEvent.class.getCanonicalName();
	private static final String UPDATEDEVENT_TYPE = ItemUpdatedEvent.class.getCanonicalName();
	private static final IntegrationObjectModel INTEGRATION_OBJECT_MODEL = new IntegrationObjectModel();
	private static final List<IntegrationObjectModel> EXISTING_IOs = List.of(INTEGRATION_OBJECT_MODEL);
	private static final List<String> EXISTING_EVENT_TYPEs = List.of(SAVED_EVENT_TYPE, CREATED_EVENT_TYPE, UPDATEDEVENT_TYPE);
	private static final Object SOME_VALUE = new Object();

	@Mock
	private Combobox integrationObjectComboBox;
	@Mock
	private Combobox eventTypesComboBox;
	@Mock
	private Combobox filterLocationComboBox;
	@Mock
	private Editor consumedDestinationEditor;
	@Mock
	private DefaultReferenceEditor renderer;
	@Mock
	private transient CockpitEventQueue cockpitEventQueue;
	@Mock
	private NotificationService notificationService;
	@Mock
	private DefaultWidgetController widgetController;
	@Mock
	private ReadService readService;
	@Mock
	private WebhookConfigBackofficeService webhookConfigBackofficeService;
	@Mock
	private ConsumedDestinationModel consumedDestination;
	@Mock
	private WebhookConfigurationModel webhookConfiguration;

	@Spy
	@InjectMocks
	private CreateWebhookConfigurationModalController controller;

	@Override
	protected CreateWebhookConfigurationModalController getWidgetController()
	{
		return controller;
	}

	@Before
	public void setup()
	{
		controller.createButton = new Button();
		when(renderer.getParentObject()).thenReturn(webhookConfiguration);
		when(consumedDestinationEditor.getEditorRenderer()).thenReturn(renderer);
		when(readService.getIntegrationObjectModels()).thenReturn(List.of(INTEGRATION_OBJECT_MODEL));
		when(webhookConfigBackofficeService.getActiveGroovyScripts()).thenReturn(Collections.emptyList());
		when(webhookConfigBackofficeService.createWebhookConfiguration(
				INTEGRATION_OBJECT_MODEL, consumedDestination, "", SAVED_EVENT_TYPE)).thenReturn(webhookConfiguration);

		doNothing().when(controller).showErrorMessageBox(anyString(), anyString());
	}

	@Test
	public void testInitialInputForm()
	{
		final String emptyString = "";

		controller.integrationObjectComboBox = new Combobox();
		controller.eventTypesComboBox = new Combobox();
		controller.filterLocationComboBox = new Combobox();

		executeInputSocketEvent("createWebhookConfiguration", emptyString);

		Assert.assertEquals(EXISTING_IOs.size(), controller.integrationObjectComboBox.getItems().size());
		Assert.assertEquals(EXISTING_EVENT_TYPEs.size(), controller.eventTypesComboBox.getItems().size());
		Assert.assertEquals(SAVED_EVENT_TYPE, controller.eventTypesComboBox.getSelectedItem().getValue());
		Assert.assertTrue(controller.createButton.isDisabled());
		Assert.assertTrue(controller.integrationObjectComboBox.isAutodrop());
		Assert.assertFalse(controller.integrationObjectComboBox.isAutocomplete());
		Assert.assertTrue(controller.filterLocationComboBox.getItems().isEmpty());
		Assert.assertTrue(
				((DefaultReferenceEditor) consumedDestinationEditor.getEditorRenderer()).getParentObject() instanceof WebhookConfigurationModel);
	}

	@Test
	public void testCreateButtonDisabledWithOnlyIOSelected()
	{
		when(controller.integrationObjectComboBox.getSelectedItem()).thenReturn(mock(Comboitem.class));

		executeViewEvent("integrationObjectComboBox", Events.ON_CHANGE);

		Assert.assertTrue(controller.createButton.isDisabled());
	}

	@Test
	public void testCreateButtonDisabledWithOnlyCDSelected()
	{
		when(consumedDestinationEditor.getValue()).thenReturn(SOME_VALUE);

		executeViewEvent("consumedDestinationEditor", Editor.ON_VALUE_CHANGED);

		Assert.assertTrue(controller.createButton.isDisabled());
	}

	@Test
	public void testCreateButtonEnabledWitIOAndCDSelected()
	{
		when(integrationObjectComboBox.getSelectedItem()).thenReturn(mock(Comboitem.class));
		when(consumedDestinationEditor.getValue()).thenReturn(SOME_VALUE);

		executeViewEvent("integrationObjectComboBox", Events.ON_CHANGE);

		Assert.assertFalse(controller.createButton.isDisabled());
	}

	@Test
	public void testConsumedDestinationEditorOnChangeWithIOAndCDSelected()
	{
		when(integrationObjectComboBox.getSelectedItem()).thenReturn(mock(Comboitem.class));
		when(consumedDestinationEditor.getValue()).thenReturn(SOME_VALUE);

		executeViewEvent("consumedDestinationEditor", Editor.ON_VALUE_CHANGED);

		Assert.assertFalse(controller.createButton.isDisabled());
	}

	@Test
	public void testSuccessCreateWebhookConfiguration()
	{
		final Comboitem ioItem = comboitem(INTEGRATION_OBJECT_MODEL);
		when(integrationObjectComboBox.getSelectedItem()).thenReturn(ioItem);

		final Comboitem eventItem = comboitem(SAVED_EVENT_TYPE);
		when(eventTypesComboBox.getSelectedItem()).thenReturn(eventItem);

		when(((ConsumedDestinationModel) consumedDestinationEditor.getValue())).thenReturn(consumedDestination);

		executeViewEvent("createButton", Events.ON_CLICK);

		verify(notificationService).notifyUser(anyString(), eq(NOTIFICATION_TYPE), eq(NotificationEvent.Level.SUCCESS), any());
	}

	@Test
	public void testFailedToCreateExistedWebhookConfiguration()
	{
		final Comboitem ioItem = comboitem(INTEGRATION_OBJECT_MODEL);
		when(integrationObjectComboBox.getSelectedItem()).thenReturn(ioItem);

		final Comboitem eventItem = comboitem(SAVED_EVENT_TYPE);
		when(eventTypesComboBox.getSelectedItem()).thenReturn(eventItem);

		when(((ConsumedDestinationModel) consumedDestinationEditor.getValue())).thenReturn(consumedDestination);
		when(webhookConfigBackofficeService.getWebhookConfiguration(
				INTEGRATION_OBJECT_MODEL, consumedDestination)).thenReturn(List.of(webhookConfiguration));

		executeViewEvent("createButton", Events.ON_CLICK);

		verify(controller).showErrorMessageBox(WEBHOOK_EXISTS_ERROR_MESSAGE, WEBHOOK_EXISTS_ERROR_TITLE);
	}

	@Test
	public void testFailedToCreateUnsupportEventWebhookConfiguration()
	{
		final Comboitem ioItem = comboitem(INTEGRATION_OBJECT_MODEL);
		when(integrationObjectComboBox.getSelectedItem()).thenReturn(ioItem);

		final String unSupportEvent = "NOT_EXIST_EVENT";
		final Comboitem eventItem = comboitem(unSupportEvent);
		when(eventTypesComboBox.getSelectedItem()).thenReturn(eventItem);

		when(((ConsumedDestinationModel)consumedDestinationEditor.getValue())).thenReturn(consumedDestination);
		when(webhookConfigBackofficeService.createWebhookConfiguration(INTEGRATION_OBJECT_MODEL, consumedDestination, "",
				unSupportEvent)).thenThrow(ModelSavingException.class);

		executeViewEvent("createButton", Events.ON_CLICK);

		verify(controller).showErrorMessageBox(WEBHOOK_CREATION_FAILED_MESSAGE, WEBHOOK_CREATION_FAILED_TITLE);
	}

	private Comboitem comboitem(final Object value)
	{
		final Comboitem item = mock(Comboitem.class);
		when(item.getValue()).thenReturn(value);
		return item;
	}
}
