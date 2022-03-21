/*
 *  Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.util

import de.hybris.platform.core.model.product.ProductModel
import de.hybris.platform.cronjob.enums.CronJobResult
import de.hybris.platform.cronjob.enums.CronJobStatus
import de.hybris.platform.cronjob.model.CronJobModel
import de.hybris.platform.impex.jalo.ImpExException
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.outboundsync.model.OutboundChannelConfigurationModel
import de.hybris.platform.outboundsync.model.OutboundSyncCronJobModel
import de.hybris.platform.outboundsync.model.OutboundSyncJobModel
import de.hybris.platform.outboundsync.model.OutboundSyncStreamConfigurationContainerModel

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importCatalogVersion
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder
import static de.hybris.platform.outboundsync.OutboundChannelConfigurationBuilder.outboundChannelConfigurationBuilder

class OutboundSyncTestUtil {

	private static final String DEFAULT_CATALOG_VERSION = "Default:Staged"

	static OutboundChannelConfigurationModel outboundChannelConfigurationExists(final String channelCode, final String integrationObjectCode) {
		outboundChannelConfigurationBuilder()
				.withCode(channelCode)
				.withIntegrationObjectCode(integrationObjectCode)
				.withConsumedDestination(consumedDestinationBuilder().withId("destination_" + channelCode))
				.build()
	}

	static cleanup() {
		IntegrationTestUtil.removeAll OutboundSyncJobModel
		IntegrationTestUtil.removeAll OutboundSyncCronJobModel
        IntegrationTestUtil.removeAll OutboundSyncStreamConfigurationContainerModel
        IntegrationTestUtil.removeAll CronJobModel
	}

	static ProductModel importProductWithCode(final String code)
	{
		importCatalogVersion("Staged", "Default", true)
		importImpEx(
				"INSERT_UPDATE Product; code[unique = true]; catalogVersion(catalog(id), version)",
				"                     ; $code              ; $DEFAULT_CATALOG_VERSION"
		)
		getProductByCode(code)
	}

	static void outboundSyncRetryExists(final Long itemPk, final String channelConfigurationCode) throws ImpExException {
		importImpEx(
				"INSERT_UPDATE OutboundSyncRetry; itemPk[unique = true]; syncAttempts; channel(code)",
				"                               ; $itemPk              ; 3           ; $channelConfigurationCode ")
	}

	static ProductModel getProductByCode(final String code)
	{
		return IntegrationTestUtil.findAny(ProductModel, { it.code == code }).orElse(null)
	}

	static OutboundChannelConfigurationModel getChannelConfigurationByAttributes(String code, IntegrationObjectModel integrationObject) {

		return IntegrationTestUtil.findAny(OutboundChannelConfigurationModel, { it.code == code && it.integrationObject == integrationObject }).orElse(null)
	}

    /**
     * Retrieves the outbound sync job configured in the persistence storage.
     * @return the job model, if there is only one job configured in the storage; {@code null}, if there are no outbound
     * sync jobs in the persistent storage.
     * @throws IllegalStateException when there is more than one job exists in the persistent storage. This method is not
     * suitable for such cases and the ambiguity needs to be resolved by the test.
     */
	static CronJobModel outboundCronJob() {
        def jobs = IntegrationTestUtil.findAll OutboundSyncCronJobModel
        if (jobs.size() > 1) {
            throw new IllegalStateException("More than one context jobs found: " + jobs)
        }
		return jobs.empty ? null : jobs.first()
	}

    /**
     * Creates an outbound sync cron job model with the corresponding job model and the stream container model
     * @param id ID for the jobs to create. The ID will be appended by {@code "Job"} for the job model creation, by
     * {@code "CronJob"} for the cron job model and by {@code "Streams"} for the stream container model creation.
     * @return the created cron job model, which has reference to the corresponding job model that was also created.
     */
    static OutboundSyncCronJobModel createOutboundSyncJob(String id) {
        def containerId = "${id}Streams"
        def jobId = "${id}Job"
        def cronJobId = "${id}CronJob"
        importImpEx(
                'INSERT_UPDATE OutboundSyncStreamConfigurationContainer; id[unique = true]',
                "                                                      ; $containerId",
                'INSERT_UPDATE OutboundSyncJob; code[unique = true]; streamConfigurationContainer(id)',
                "                             ; $jobId             ; $containerId",
                'INSERT_UPDATE OutboundSyncCronJob; code[unique = true]; job(code); sessionLanguage(isocode)',
                "                                 ; $cronJobId         ; $jobId   ; en")
        IntegrationTestUtil.findAny(OutboundSyncCronJobModel, { it.code == cronJobId })
                .orElse(null)
    }

    /**
     * Creates a cron job model with the corresponding job model.
     * @param id ID for the jobs to create. The ID will be appended by {@code "Job"} for the job model creation and by
     * {@code "CronJob"} for the cron job model.
     * @param performableBean name or ID of the spring bean implementing the job logic
     * @return the created cron job model, which has reference to the corresponding job model that was also created.
     */
    static CronJobModel createCronJob(String id, String performableBean) {
        def jobId = "${id}Job"
        def cronJobId = "${id}CronJob"
        importImpEx(
                'INSERT_UPDATE ServicelayerJob; code[unique = true]; springId        ; sessionLanguage(isocode)',
                "                             ; $jobId             ; $performableBean; en",
                'INSERT_UPDATE CronJob; code[unique = true]; job(code); sessionLanguage(isocode)',
                "                     ; $cronJobId         ; $jobId   ; en")
        IntegrationTestUtil.findAny(CronJobModel, { it.code == cronJobId }).orElse(null)
    }

    /**
     * Updates result of performing a job.
     * @param model a model of the job to be updated.
     * @param result result to update the job with
     * @param status status to update the job with
     */
    static void updateCronJobResult(CronJobModel model, CronJobResult result, CronJobStatus status) {
        importImpEx(
                'UPDATE CronJob; pk[unique = true]; result(code); status(code)',
                "              ; $model.pk        ; $result     ; $status")
    }
}
