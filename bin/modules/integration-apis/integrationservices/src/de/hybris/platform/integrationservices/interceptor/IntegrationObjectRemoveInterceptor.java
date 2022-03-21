/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationservices.interceptor;

import de.hybris.platform.integrationservices.interceptor.interfaces.BeforeRemoveIntegrationObjectChecker;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.servicelayer.interceptor.InterceptorContext;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;
import de.hybris.platform.servicelayer.interceptor.RemoveInterceptor;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.google.common.base.Preconditions;

/**
 * Interceptor that prevents {@link de.hybris.platform.integrationservices.model.IntegrationObjectModel} from being deleted if items of a certain type
 * reference the Integration Object. If a user wants to prevent an Integration Object from being deleted when it is referenced by a certain type,
 * implement the {@link BeforeRemoveIntegrationObjectChecker} for that type. Then add the implementation to the list in the spring configuration. For example
 * <pre>{@code
 * <bean depends-on="beforeRemoveIntegrationObjectCheckers" parent="listMergeDirective">
 *     <property name="add" ref = "noOutboundChannelConfigBeforeRemoveIOChecker"/>
 * </bean>
 * }</pre>
 * <p>
 * This interceptor calls {@link BeforeRemoveIntegrationObjectChecker#checkIfIntegrationObjectInUse} of the checkers in the list.
 * It will fail fast, meaning, it will stop at the first checker that throws the {@link InterceptorException}.
 */
public class IntegrationObjectRemoveInterceptor implements RemoveInterceptor<IntegrationObjectModel>
{
	private final List<BeforeRemoveIntegrationObjectChecker> beforeRemoveIntegrationObjectCheckers;

	/**
	 * Constructor
	 *
	 * @param beforeRemoveIntegrationObjectCheckers a list of typed checkers which check if there are any items of that type (eg. InboundChannelConfiguration
	 *                                              , OutboundChannelConfiguration, WebhookConfiguration) that reference an Integration Object before removal.
	 */
	public IntegrationObjectRemoveInterceptor(
			@NotNull final List<BeforeRemoveIntegrationObjectChecker> beforeRemoveIntegrationObjectCheckers)
	{
		Preconditions.checkArgument(beforeRemoveIntegrationObjectCheckers != null,
				"beforeRemoveIntegrationObjectCheckers can't be null");
		this.beforeRemoveIntegrationObjectCheckers = beforeRemoveIntegrationObjectCheckers;
	}

	@Override
	public void onRemove(final IntegrationObjectModel integrationObject, final InterceptorContext ctx) throws InterceptorException
	{
		if (integrationObject != null)
		{
			for (BeforeRemoveIntegrationObjectChecker checker : beforeRemoveIntegrationObjectCheckers)
			{
				checker.checkIfIntegrationObjectInUse(integrationObject);
			}
		}
	}

}
