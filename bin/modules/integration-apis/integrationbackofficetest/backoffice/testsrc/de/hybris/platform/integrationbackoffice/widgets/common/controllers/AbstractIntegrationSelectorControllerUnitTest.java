/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationbackoffice.widgets.common.controllers;

import static de.hybris.platform.integrationbackoffice.widgets.common.controllers.AbstractIntegrationSelectorController.REFRESH_COMBOBOX_IN_SOCKET;
import static de.hybris.platform.integrationbackoffice.widgets.common.controllers.AbstractIntegrationSelectorController.SETTING_ACTIONS_SLOT;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import de.hybris.platform.integrationservices.model.IntegrationObjectModel;

import org.junit.Test;
import org.mockito.Mock;
import org.zkoss.zk.ui.Component;
import org.zkoss.zul.Combobox;
import org.zkoss.zul.Comboitem;

import com.hybris.cockpitng.components.Actions;
import com.hybris.cockpitng.testing.AbstractWidgetUnitTest;


public abstract class AbstractIntegrationSelectorControllerUnitTest<T extends AbstractIntegrationSelectorController>
		extends AbstractWidgetUnitTest<AbstractIntegrationSelectorController>
{
	@Mock
	private Actions actions;

	private AbstractIntegrationSelectorController controller;

	protected Combobox getCombobox()
	{
		return controller.integrationComboBox;
	}

	public void setup()
	{
		controller = getWidgetController();
		controller.actions = actions;
		controller.integrationComboBox = new Combobox();
		controller.initialize(mock(Component.class));
	}

	@Test
	public void actionsInitializedWhenControllerInitialized()
	{
		assertEquals("action initialized with correct config",
				controller.getWidgetSettings().getString(SETTING_ACTIONS_SLOT),
				controller.actions.getConfig());
	}

	@Test
	public void loadComboboxWhenRefreshComboboxSocketInput()
	{
		// called in initialization
		verify(controller, times(1)).loadCombobox();

		executeInputSocketEvent(REFRESH_COMBOBOX_IN_SOCKET, (Object) null);
		verify(controller, times(2)).loadCombobox();
	}

	@Test
	public void comboitemFoundInCombobox()
	{
		IntegrationObjectModel iO = new IntegrationObjectModel();
		Comboitem comboitem = new Comboitem();
		comboitem.setValue(iO);
		controller.integrationComboBox.appendChild(comboitem);
		assertEquals(comboitem, controller.findComboitem(iO));
	}

}
