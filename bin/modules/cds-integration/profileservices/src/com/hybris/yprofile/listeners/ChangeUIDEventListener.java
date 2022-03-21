/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.hybris.yprofile.listeners;

import com.hybris.yprofile.services.ProfileTransactionService;
import de.hybris.platform.commerceservices.event.AbstractSiteEventListener;
import de.hybris.platform.commerceservices.event.ChangeUIDEvent;
import de.hybris.platform.core.model.user.CustomerModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Required;

public class ChangeUIDEventListener extends AbstractSiteEventListener<ChangeUIDEvent> {
    private static final Logger LOG = Logger.getLogger(ChangeUIDEventListener.class);

    private ProfileTransactionService profileTransactionService;

    @Override
    protected void onSiteEvent(ChangeUIDEvent event) {
        try {
            final String consentReference = event.getCustomer().getConsentReference();
            this.getProfileTransactionService().sendUidChangedEvent(event, consentReference);
        } catch (Exception e) {
            LOG.error("Error sending Change UID event: " + e.getMessage());
            LOG.debug("Error sending Change UID event: ", e);
        }
    }

    @Override
    protected boolean shouldHandleEvent(final ChangeUIDEvent event) {
        return (eventContainsCustomer(event)
                && eventContainsUid(event)
                && eventContainsOriginalUid(event)
                && eventContainsCustomerConsentReference(event));
    }

    @Required
    public void setProfileTransactionService(ProfileTransactionService profileTransactionService) {
        this.profileTransactionService = profileTransactionService;
    }


    private static boolean eventContainsCustomer(ChangeUIDEvent event) {
        final CustomerModel customer = event.getCustomer();

        if (customer == null){
            LOG.warn("Parameter event.customer can not be null");
        }
        return customer != null;
    }

    private static boolean eventContainsUid(ChangeUIDEvent event) {
        final String uid = getUidFromEvent(event);
        if (uid == null){
            LOG.warn("Parameter event.customer.uid can not be null");
        }
        return uid != null;
    }

    private static boolean eventContainsOriginalUid(ChangeUIDEvent event) {
        final String originalUid = getOriginalUidFromEvent(event);
        if (originalUid == null){
            LOG.warn("Parameter event.customer.originalUid can not be null");
        }
        return originalUid != null;
    }

    private static boolean eventContainsCustomerConsentReference(ChangeUIDEvent event) {
        final CustomerModel customer = event.getCustomer();
        final String consentReference = customer.getConsentReference();
        if (consentReference == null || consentReference.isEmpty()){
            LOG.warn("Parameter event.customer.consentReference can not be null");
        }
        return consentReference != null && !consentReference.isEmpty();
    }

    private static String getUidFromEvent(ChangeUIDEvent event) {
        return event.getCustomer().getUid();
    }

    private static String getOriginalUidFromEvent(ChangeUIDEvent event) {
        return event.getCustomer().getOriginalUid();
    }

    private ProfileTransactionService getProfileTransactionService() {
        return profileTransactionService;
    }
}
