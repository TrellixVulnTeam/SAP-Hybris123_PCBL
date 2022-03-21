/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.hybris.yprofile.listeners;

import com.hybris.yprofile.consent.services.ConsentService;
import com.hybris.yprofile.services.ProfileConfigurationService;
import com.hybris.yprofile.services.ProfileTransactionService;
import de.hybris.platform.commerceservices.event.AbstractSiteEventListener;
import de.hybris.platform.commerceservices.event.LoginSuccessEvent;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.servicelayer.session.impl.DefaultSessionTokenService;
import de.hybris.platform.store.BaseStoreModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Required;

public class LoginSuccessEventListener extends AbstractSiteEventListener<LoginSuccessEvent> {

    private static final Logger LOG = Logger.getLogger(LoginSuccessEventListener.class);

    private ProfileTransactionService profileTransactionService;
    private DefaultSessionTokenService defaultSessionTokenService;
    private ProfileConfigurationService profileConfigurationService;
    private ConsentService consentService;

    @Override
    protected void onSiteEvent(final LoginSuccessEvent event) {

        try {
            final String consentReference = getConsentReference(event);

            if (!isValidConsentReference(consentReference)){
                LOG.debug("Consent reference is null. Could not send event to CDS");
                return;
            }

            final String baseSiteId = event.getBaseStore().getUid();
            final String sessionId = getDefaultSessionTokenService().getOrCreateSessionToken();
            final Boolean profileTagDebugSession = getProfileConfigurationService().isProfileTagDebugEnabledInSession();

            setDebugFlag(event.getCustomer(), profileTagDebugSession);
            getProfileTransactionService().sendLoginEvent(event.getCustomer(), consentReference, sessionId, baseSiteId);
            LOG.debug("Login Success Event Sent Successfully!");

        } catch (Exception e){
            LOG.error("Error sending login event: " + e.getMessage());
            LOG.debug("Error sending login event: ", e);
        }

    }

    private String getConsentReference(LoginSuccessEvent event) {
        return getConsentService().getConsentReferenceFromSession() == null ?
                event.getCustomer().getConsentReference() : getConsentService().getConsentReferenceFromSession();
    }

    private boolean isValidConsentReference(final String consentReference) {
        return consentReference != null && !consentReference.isEmpty();
    }

    private void setDebugFlag(final UserModel currentUser, final Boolean profileTagDebugSession) {
        if (Boolean.TRUE.equals(profileTagDebugSession)) {
            currentUser.setProfileTagDebug(profileTagDebugSession);
        }
    }

    @Override
    protected boolean shouldHandleEvent(final LoginSuccessEvent event) {
        return eventContainsCustomer(event) && eventContainsBaseStore(event);
    }

    private static boolean eventContainsCustomer(LoginSuccessEvent event) {
        final CustomerModel customer = event.getCustomer();
        if (customer == null){
            LOG.warn("Parameter event.customer can not be null");
        }
        return customer != null;
    }

    private static boolean eventContainsBaseStore(LoginSuccessEvent event) {
        final BaseStoreModel baseStore = event.getBaseStore();
        if (baseStore == null){
            LOG.warn("Parameter event.baseStore can not be null");
        }
        return baseStore != null;
    }

    @Required
    public void setProfileTransactionService(ProfileTransactionService profileTransactionService) {
        this.profileTransactionService = profileTransactionService;
    }

    private ProfileTransactionService getProfileTransactionService() {
        return profileTransactionService;
    }

    public DefaultSessionTokenService getDefaultSessionTokenService() {
        return defaultSessionTokenService;
    }

    @Required
    public void setDefaultSessionTokenService(DefaultSessionTokenService defaultSessionTokenService) {
        this.defaultSessionTokenService = defaultSessionTokenService;
    }

    public ConsentService getConsentService() {
        return this.consentService;
    }

    @Required
    public void setConsentService(ConsentService consentService) {
        this.consentService = consentService;
    }


    public ProfileConfigurationService getProfileConfigurationService() {
        return profileConfigurationService;
    }

    @Required
    public void setProfileConfigurationService(ProfileConfigurationService profileConfigurationService) {
        this.profileConfigurationService = profileConfigurationService;
    }
}
