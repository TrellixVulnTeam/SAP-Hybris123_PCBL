/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.hybris.yprofile.listeners;

import com.hybris.yprofile.services.ProfileTransactionService;
import de.hybris.platform.commerceservices.event.AbstractSiteEventListener;
import de.hybris.platform.commerceservices.event.UpdatedProfileEvent;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.store.BaseStoreModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Required;

public class UpdatedProfileEventListener extends AbstractSiteEventListener<UpdatedProfileEvent> {

    private static final Logger LOG = Logger.getLogger(UpdatedProfileEventListener.class);

    private ProfileTransactionService profileTransactionService;

    @Override
    protected void onSiteEvent(UpdatedProfileEvent event) {

        try {
            final String consentReference = event.getCustomer().getConsentReference();
            final String baseSiteId = event.getBaseStore().getUid();
            this.getProfileTransactionService().sendPersonalDetailsChangedEvent(event.getCustomer(), baseSiteId, consentReference);
        } catch (Exception e) {
            LOG.error("Error sending Updated Address event: " + e.getMessage());
            LOG.debug("Error sending Updated Address event: ", e);
        }
    }

    @Override
    protected boolean shouldHandleEvent(UpdatedProfileEvent event) {
        return eventContainsCustomer(event)
                && eventContainsBaseStore(event)
                && eventContainsCustomerConsentReference(event);
    }

    private static boolean eventContainsCustomer(UpdatedProfileEvent event) {
        final CustomerModel customer = event.getCustomer();
        if (customer == null){
            LOG.warn("Parameter event.customer can not be null");
        }
        return customer != null;
    }

    private static boolean eventContainsBaseStore(UpdatedProfileEvent event) {
        final BaseStoreModel baseStore = event.getBaseStore();
        if (baseStore == null){
            LOG.warn("Parameter event.baseStore can not be null");
        }
        return baseStore != null;
    }

    private static boolean eventContainsCustomerConsentReference(UpdatedProfileEvent event) {
        final CustomerModel customer = event.getCustomer();
        final String consentReference = customer.getConsentReference();
        if (consentReference == null || consentReference.isEmpty()){
            LOG.warn("Parameter event.customer.consentReference can not be null");
        }
        return consentReference != null && !consentReference.isEmpty();
    }

    @Required
    public void setProfileTransactionService(ProfileTransactionService profileTransactionService) {
        this.profileTransactionService = profileTransactionService;
    }

    private ProfileTransactionService getProfileTransactionService() {
        return profileTransactionService;
    }
}
