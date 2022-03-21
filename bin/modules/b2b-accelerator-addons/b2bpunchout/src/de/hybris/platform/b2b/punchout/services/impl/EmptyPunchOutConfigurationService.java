/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.b2b.punchout.services.impl;

import de.hybris.platform.acceleratorservices.urlresolver.SiteBaseUrlResolutionService;
import de.hybris.platform.b2b.punchout.services.PunchOutConfigurationService;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.site.BaseSiteService;

import org.springframework.beans.factory.annotation.Required;


/**
 * Empty implementation for {@link PunchOutConfigurationService}. Used just to avoid spring issues. Use a real
 * implementation, instead.
 */
public class EmptyPunchOutConfigurationService implements PunchOutConfigurationService
{

	private BaseSiteService baseSiteService;

	private SiteBaseUrlResolutionService siteBaseUrlResolutionService;

	private ConfigurationService configurationService;

	@Override
	public String getPunchOutLoginUrl()
	{
		return siteBaseUrlResolutionService.getWebsiteUrlForSite(baseSiteService.getCurrentBaseSite(), "", true,
				"/dummyPunchOutSessionUrlPath", null);
	}

	public BaseSiteService getBaseSiteService()
	{
		return baseSiteService;
	}

	@Required
	public void setBaseSiteService(final BaseSiteService baseSiteService)
	{
		this.baseSiteService = baseSiteService;
	}

	public SiteBaseUrlResolutionService getSiteBaseUrlResolutionService()
	{
		return siteBaseUrlResolutionService;
	}

	@Required
	public void setSiteBaseUrlResolutionService(final SiteBaseUrlResolutionService siteBaseUrlResolutionService)
	{
		this.siteBaseUrlResolutionService = siteBaseUrlResolutionService;
	}

	@Override
	public String getDefaultCostCenter()
	{
		return getConfigurationService().getConfiguration().getString("b2bpunchout.checkout.costcenter.default");
	}

	public ConfigurationService getConfigurationService()
	{
		return configurationService;
	}

	@Required
	public void setConfigurationService(final ConfigurationService configurationService)
	{
		this.configurationService = configurationService;
	}
}
