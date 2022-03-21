/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.hybris.yprofile.listeners;

import de.hybris.platform.basecommerce.model.site.BaseSiteModel;
import de.hybris.platform.commerceservices.consent.CommerceConsentService;
import de.hybris.platform.commerceservices.enums.SiteChannel;
import de.hybris.platform.commerceservices.event.AbstractSiteEventListener;
import de.hybris.platform.commerceservices.event.ClosedAccountEvent;
import de.hybris.platform.commerceservices.model.consent.ConsentModel;
import de.hybris.platform.commerceservices.model.consent.ConsentTemplateModel;
import de.hybris.platform.core.model.user.CustomerModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Required;

import static com.hybris.yprofile.constants.ProfileservicesConstants.PROFILE_CONSENT;

/**
 * Event listener for Closed Account Event.
 */
public class ClosedAccountEventListener extends AbstractSiteEventListener<ClosedAccountEvent> {

    private static final Logger LOG = Logger.getLogger(ClosedAccountEventListener.class);
    private CommerceConsentService commerceConsentService;

    @Override
    protected void onSiteEvent(ClosedAccountEvent event) {

        try {

            final CustomerModel customer = event.getCustomer();

            LOG.debug("Closed Account Event Received Successfully!!!!!");

            final ConsentTemplateModel consentTemplate = getCommerceConsentService().getLatestConsentTemplate(PROFILE_CONSENT, event.getSite());
            final ConsentModel activeConsent = getCommerceConsentService().getActiveConsent(customer, consentTemplate);
            //this one triggers the deletion of the consent reference
            getCommerceConsentService().withdrawConsent(activeConsent);

        } catch (Exception e) {
            LOG.error("Error sending Closed Account event: " + e.getMessage());
            LOG.debug("Error sending Closed Account event: ", e);
        }

    }

    @Override
    protected boolean shouldHandleEvent(ClosedAccountEvent event) {
        return eventContainsSite(event) &&
                eventContainsCustomer(event) &&
                eventContainsCustomerConsentReference(event);
    }

    private static boolean eventContainsCustomer(ClosedAccountEvent event) {
        final CustomerModel customer = event.getCustomer();
        if (customer == null){
            LOG.warn("Parameter event.customer can not be null");
        }
        return customer != null;
    }

    private static boolean eventContainsCustomerConsentReference(ClosedAccountEvent event) {
        final CustomerModel customer = event.getCustomer();
        final String consentReference = customer.getConsentReference();
        if (consentReference == null || consentReference.isEmpty()){
            LOG.warn("Parameter event.customer.consentReference can not be null");
        }
        return consentReference != null && !consentReference.isEmpty();
    }

    private static boolean eventContainsSite(ClosedAccountEvent event) {
        final BaseSiteModel site = event.getSite();
        if (site == null){
            LOG.warn("Parameter event.site can not be null");
        }
        return site != null && SiteChannel.B2C.equals(site.getChannel());
    }

    public CommerceConsentService getCommerceConsentService() {
        return commerceConsentService;
    }

    @Required
    public void setCommerceConsentService(CommerceConsentService commerceConsentService) {
        this.commerceConsentService = commerceConsentService;
    }
}
