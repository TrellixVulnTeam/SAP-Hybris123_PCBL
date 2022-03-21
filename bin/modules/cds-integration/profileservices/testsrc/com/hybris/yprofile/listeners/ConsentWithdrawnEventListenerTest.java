package com.hybris.yprofile.listeners;

import com.hybris.yprofile.consent.services.ConsentService;
import com.hybris.yprofile.services.ProfileTransactionService;
import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.basecommerce.model.site.BaseSiteModel;
import de.hybris.platform.commerceservices.consent.CommerceConsentService;
import de.hybris.platform.commerceservices.enums.SiteChannel;
import de.hybris.platform.commerceservices.event.ConsentWithdrawnEvent;
import de.hybris.platform.commerceservices.event.ConsentWithdrawnEvent;
import de.hybris.platform.commerceservices.model.consent.ConsentModel;
import de.hybris.platform.commerceservices.model.consent.ConsentTemplateModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.servicelayer.cluster.ClusterService;
import de.hybris.platform.servicelayer.event.impl.EventScope;
import de.hybris.platform.servicelayer.tenant.TenantService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static com.hybris.yprofile.constants.ProfileservicesConstants.PROFILE_CONSENT;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@UnitTest
public class ConsentWithdrawnEventListenerTest {

    private static final int CLUSTER_ID = 1;
    private static final long CLUSTER_ISLAND_ID = 1L;
    private static final List<String> CLUSTER_GROUPS = Arrays.asList("test");
    private static final String TENANT_ID = "TENANT";
    private static final String CONSENT_REFERENCE = "consent-ref";
    private static final String SITE_ID = "testsite";
    
    @Mock
    private ConsentService consentService;

    @Mock
    private ConsentWithdrawnEvent event;

    @Mock
    private TenantService tenantService;

    @Mock
    private ClusterService clusterService;

    @InjectMocks
    private ConsentWithdrawnEventListener listener = new ConsentWithdrawnEventListener();

    @Before
    public void setUp() throws Exception {

        MockitoAnnotations.initMocks(this);

        when(clusterService.getClusterId()).thenReturn(CLUSTER_ID);
        when(clusterService.getClusterIslandId()).thenReturn(CLUSTER_ISLAND_ID);
        when(clusterService.getClusterGroups()).thenReturn(CLUSTER_GROUPS);

        when(tenantService.getCurrentTenantId()).thenReturn(TENANT_ID);

        EventScope eventScope = new EventScope();
        eventScope.setClusterId(CLUSTER_ID);
        eventScope.setClusterIslandId(CLUSTER_ISLAND_ID);
        eventScope.setTenantId(TENANT_ID);

        when(event.getScope()).thenReturn(eventScope);
    }

    @Test
    public void shouldNotHandleEventWithNullConsentTemplate() {

        listener.onApplicationEvent(event);

        verify(consentService, never()).deleteConsentReferenceInConsentServiceAndInUserModel(any(CustomerModel.class), anyString());
    }

    @Test
    public void shouldNotHandleEventWithNullCustomer() {

        ConsentTemplateModel templateModel = mock(ConsentTemplateModel.class);
        when(templateModel.getId()).thenReturn(PROFILE_CONSENT);
        BaseSiteModel baseSiteModel = mock(BaseSiteModel.class);
        when(baseSiteModel.getUid()).thenReturn(SITE_ID);
        when(templateModel.getBaseSite()).thenReturn(baseSiteModel);
        ConsentModel consentModel = mock(ConsentModel.class);
        when(consentModel.getConsentTemplate()).thenReturn(templateModel);
        when(event.getConsent()).thenReturn(consentModel);
        listener.onApplicationEvent(event);

        verify(consentService, never()).deleteConsentReferenceInConsentServiceAndInUserModel(any(CustomerModel.class), anyString());
    }

    @Test
    public void shouldNotHandleEventWithNullCustomerConsentReference() {

        ConsentTemplateModel templateModel = mock(ConsentTemplateModel.class);
        when(templateModel.getId()).thenReturn(PROFILE_CONSENT);
        BaseSiteModel baseSiteModel = mock(BaseSiteModel.class);
        when(baseSiteModel.getUid()).thenReturn(SITE_ID);
        when(templateModel.getBaseSite()).thenReturn(baseSiteModel);
        ConsentModel consentModel = mock(ConsentModel.class);
        when(consentModel.getConsentTemplate()).thenReturn(templateModel);
        when(event.getConsent()).thenReturn(consentModel);
        CustomerModel customer = mock(CustomerModel.class);
        when(event.getConsent().getCustomer()).thenReturn(customer);

        listener.onApplicationEvent(event);

        verify(consentService, never()).deleteConsentReferenceInConsentServiceAndInUserModel(any(CustomerModel.class), anyString());
    }

    @Test
    public void shouldHandleEvent() {

        ConsentTemplateModel templateModel = mock(ConsentTemplateModel.class);
        when(templateModel.getId()).thenReturn(PROFILE_CONSENT);
        BaseSiteModel baseSiteModel = mock(BaseSiteModel.class);
        when(baseSiteModel.getUid()).thenReturn(SITE_ID);
        when(baseSiteModel.getChannel()).thenReturn(SiteChannel.B2C);
        when(templateModel.getBaseSite()).thenReturn(baseSiteModel);
        ConsentModel consentModel = mock(ConsentModel.class);
        when(consentModel.getConsentTemplate()).thenReturn(templateModel);
        when(event.getConsent()).thenReturn(consentModel);
        CustomerModel customer = mock(CustomerModel.class);
        when(customer.getConsentReference()).thenReturn(CONSENT_REFERENCE);
        when(event.getConsent().getCustomer()).thenReturn(customer);

        doNothing().when(consentService).deleteConsentReferenceInConsentServiceAndInUserModel(any(CustomerModel.class), anyString());

        listener.onApplicationEvent(event);

        verify(consentService, times(1)).deleteConsentReferenceInConsentServiceAndInUserModel(eq(customer), eq(SITE_ID));

    }

}
