/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.widgets.configuration.controllers;

import de.hybris.platform.integrationbackoffice.widgets.common.controllers.AbstractIntegrationButtonPanelController;
import de.hybris.platform.integrationbackoffice.widgets.configuration.data.ExportConfigurationEditorPresentation;

import org.zkoss.zk.ui.select.annotation.WireVariable;

/**
 * Controller for integrationbackoffice export configuration toolbar button panel.
 * Enables refreshing of export configuration editor.
 */
public class ExportConfigurationButtonPanelController extends AbstractIntegrationButtonPanelController
{
	protected static final String REFRESHCOMFIRM_TITLE_LABEL_KEY = "integrationbackoffice.exportConfigurationEditorContainer.warning.title.refreshConfirmation";
	protected static final String REFRESHCOMFIRM_MSG_LABEL_KEY = "integrationbackoffice.exportConfigurationEditorContainer.warning.msg.refreshConfirmation";

	@WireVariable
	private transient ExportConfigurationEditorPresentation exportConfigEditorPresentation;

	@Override
	protected boolean unsavedChangesPresent()
	{
		return exportConfigEditorPresentation.isAnyInstanceSelected();
	}

	@Override
	protected void handleRefreshConfirmation()
	{
		showRefreshConfirmation(REFRESHCOMFIRM_TITLE_LABEL_KEY, REFRESHCOMFIRM_MSG_LABEL_KEY);
	}
}
