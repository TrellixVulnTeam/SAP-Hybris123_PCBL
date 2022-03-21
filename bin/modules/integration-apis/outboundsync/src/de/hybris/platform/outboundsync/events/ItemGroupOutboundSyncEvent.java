/*
 *  Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.events;

import de.hybris.platform.core.PK;
import de.hybris.platform.outboundsync.dto.OutboundItemChange;
import de.hybris.platform.outboundsync.dto.OutboundItemDTO;
import de.hybris.platform.outboundsync.dto.OutboundItemDTOGroup;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

/**
 * A base event class for all events that are related to synchronization of an {@link OutboundItemDTOGroup}.
 */
public abstract class ItemGroupOutboundSyncEvent extends OutboundSyncEvent
{
	private static final long serialVersionUID = 510812833411102159L;

	private final transient OutboundItemDTOGroup itemGroup;

	protected ItemGroupOutboundSyncEvent(final PK cronJobPk,
	                                     final OutboundItemDTOGroup group)
	{
		super(cronJobPk);
		itemGroup = group;
	}

	protected Collection<Long> getGroupItemPKs()
	{
		return itemGroup == null
				? Collections.emptyList()
				: itemGroup.getOutboundItemDTOs().stream()
				           .map(OutboundItemDTO::getItem)
				           .map(OutboundItemChange::getPK)
				           .collect(Collectors.toList());
	}
}
