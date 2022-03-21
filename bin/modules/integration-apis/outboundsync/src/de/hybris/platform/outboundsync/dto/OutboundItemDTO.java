/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundsync.dto;

import de.hybris.platform.core.PK;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.outboundsync.model.OutboundChannelConfigurationModel;

import javax.annotation.concurrent.Immutable;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.google.common.base.Preconditions;

@Immutable
public class OutboundItemDTO
{
	private OutboundItemChange item;
	private Long integrationObjectPK;
	private Long channelConfigurationPK;
	private Long rootItemPK;
	private PK cronJobPK;
	private ChangeInfo changeInfo;
	private boolean synchronizeDelete;

	public @NotNull OutboundItemChange getItem()
	{
		return item;
	}

	public @NotNull Long getIntegrationObjectPK()
	{
		return integrationObjectPK;
	}

	public @NotNull Long getChannelConfigurationPK()
	{
		return channelConfigurationPK;
	}

	public Long getRootItemPK()
	{
		return rootItemPK;
	}

	public @NotNull PK getCronJobPK()
	{
		return cronJobPK;
	}

	public String getIntegrationKey()
	{
		return changeInfo != null ? changeInfo.getIntegrationKey() : null;
	}

	public boolean isSynchronizeDelete()
	{
		return synchronizeDelete;
	}

	public String getItemType()
	{
		return changeInfo != null ? changeInfo.getItemType() : null;
	}

	public String getRootItemType()
	{
		return changeInfo != null ? changeInfo.getRootItemType() : null;
	}

	/**
	 * Determines whether this DTO represents a deleted item.
	 *
	 * @return {@code true}, if the item represented by this DTO has been deleted in the platform; {@code false}, if the item was
	 * created or changed.
	 */
	public boolean isDeleted()
	{
		return item.getChangeType() == OutboundChangeType.DELETED;
	}

	@Override
	public String toString()
	{
		return "OutboundItemChange{" +
				"item=" + item +
				", rootItemPK=" + rootItemPK +
				", changeInfo=" + changeInfo +
				", integrationObjectPK=" + integrationObjectPK +
				", channelConfigurationPK=" + channelConfigurationPK +
				", cronJobPK=" + cronJobPK +
				", synchronizeDelete=" + synchronizeDelete +
				'}';
	}

	@Override
	public boolean equals(final Object o)
	{
		if (this == o)
		{
			return true;
		}

		if (o == null || getClass() != o.getClass())
		{
			return false;
		}

		final OutboundItemDTO that = (OutboundItemDTO) o;

		return new EqualsBuilder()
				.append(item, that.item)
				.append(integrationObjectPK, that.integrationObjectPK)
				.append(channelConfigurationPK, that.channelConfigurationPK)
				.append(rootItemPK, that.rootItemPK)
				.append(changeInfo, that.changeInfo)
				.append(cronJobPK, that.cronJobPK)
				.append(synchronizeDelete, that.synchronizeDelete)
				.isEquals();
	}

	@Override
	public int hashCode()
	{
		return new HashCodeBuilder(17, 37)
				.append(item)
				.append(integrationObjectPK)
				.append(channelConfigurationPK)
				.append(rootItemPK)
				.append(changeInfo)
				.append(cronJobPK)
				.append(synchronizeDelete)
				.toHashCode();
	}

	public static final class Builder
	{
		private final OutboundItemDTO outboundItemDTO = new OutboundItemDTO();

		private Builder()
		{
		}

		public static Builder item()
		{
			return new Builder();
		}

		public static Builder from(final OutboundItemDTO dto)
		{
			return new Builder()
					.withItem(dto.getItem())
					.withIntegrationObjectPK(dto.getIntegrationObjectPK())
					.withChannelConfigurationPK(dto.getChannelConfigurationPK())
					.withRootItemPK(dto.getRootItemPK())
					.withInfo(dto.changeInfo)
					.withCronJobPK(dto.getCronJobPK())
					.withSynchronizeDelete(dto.isSynchronizeDelete());
		}

		public Builder withItem(final OutboundItemChange item)
		{
			outboundItemDTO.item = item;
			return this;
		}

		public Builder withIntegrationObject(final IntegrationObjectModel model)
		{
			return withIntegrationObjectPK(model.getPk().getLong());
		}

		public Builder withIntegrationObjectPK(final Long pk)
		{
			outboundItemDTO.integrationObjectPK = pk;
			return this;
		}

		/**
		 * Specifies the outbound channel configuration and all items that can be derived from the channel configuration, e.g.
		 * integration object, etc.
		 * @param model model of the outbound channel configuration to include in the DTO
		 * @return a builder with the channel configuraiton specified
		 */
		public Builder withChannelConfiguration(final OutboundChannelConfigurationModel model)
		{
			return withChannelConfigurationPK(model.getPk().getLong())
					.withIntegrationObject(model.getIntegrationObject())
					.withSynchronizeDelete(model.getSynchronizeDelete());
		}

		public Builder withChannelConfigurationPK(final Long pk)
		{
			outboundItemDTO.channelConfigurationPK = pk;
			return this;
		}

		public Builder withRootItemPK(final Long pk)
		{
			outboundItemDTO.rootItemPK = pk;
			return this;
		}

		public Builder withCronJobPK(final PK pk)
		{
			outboundItemDTO.cronJobPK = pk;
			return this;
		}

		public Builder withSynchronizeDelete(final boolean synchronizeDelete)
		{
			outboundItemDTO.synchronizeDelete = synchronizeDelete;
			return this;
		}

		public Builder withInfo(final ChangeInfo info)
		{
			outboundItemDTO.changeInfo = info;
			return this;
		}

		public OutboundItemDTO build()
		{
			validateItem();
			return outboundItemDTO;
		}

		private void validateItem()
		{
			Preconditions.checkArgument(outboundItemDTO.item != null, "item cannot be null");
			Preconditions.checkArgument(outboundItemDTO.channelConfigurationPK != null, "channelConfiguration PK cannot be null");
			Preconditions.checkArgument(outboundItemDTO.cronJobPK != null, "cronJob PK cannot be null");
		}
	}

}
