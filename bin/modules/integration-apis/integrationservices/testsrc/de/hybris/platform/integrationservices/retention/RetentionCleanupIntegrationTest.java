/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationservices.retention;

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.assertModelDoesNotExist;
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.assertModelExists;

import de.hybris.bootstrap.annotations.IntegrationTest;
import de.hybris.platform.cronjob.model.CronJobModel;
import de.hybris.platform.impex.jalo.ImpExException;
import de.hybris.platform.integrationservices.model.IntegrationApiMediaModel;
import de.hybris.platform.integrationservices.util.IntegrationTestUtil;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.integrationservices.util.impex.IntegrationServicesEssentialData;
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData;
import de.hybris.platform.servicelayer.ServicelayerTest;
import de.hybris.platform.servicelayer.cronjob.CronJobService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.annotation.Resource;

import org.junit.ClassRule;
import org.junit.Test;
import org.slf4j.Logger;

@IntegrationTest
public class RetentionCleanupIntegrationTest extends ServicelayerTest
{
	private static final String TEST_NAME = "RetentionCleanup";
	private static final Logger LOG = Log.getLogger(RetentionCleanupIntegrationTest.class);
	private static final String INTEGRATION_API_MEDIA_CLEANUP_CRON_JOB_NAME = "integrationApiMediaCleanupCronJob";

	@ClassRule
	public static ModuleEssentialData essentialData = IntegrationServicesEssentialData.integrationServicesEssentialData();

	@Resource
	private CronJobService cronJobService;

	@Test
	public void testCleanupRuleCleansUpIntegrationApiMediaOlderThanRetentionPeriod() throws ImpExException
	{
		final String mediaCode = TEST_NAME + "_integrationApiMedia";
		final String oneWeekAgo = LocalDateTime.now()
		                                       .minusDays(7)
		                                       .minusHours(1)
		                                       .format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm"));
		final String[] oldIntegrationApiMedia = {
				"$mediaCode=" + mediaCode,
				"INSERT_UPDATE IntegrationApiMedia; code[unique=true]; creationtime[dateformat=dd.MM.yyyy HH:mm]",
				"                                 ; $mediaCode; " + oneWeekAgo
		};
		IntegrationTestUtil.importImpEx(oldIntegrationApiMedia);

		assertModelExists(integrationApiMedia(mediaCode));

		executeMediaCleanupCronJob();

		assertModelDoesNotExist(integrationApiMedia(mediaCode));
	}

	private void executeMediaCleanupCronJob()
	{
		final CronJobModel cronJob = cronJobService.getCronJob(INTEGRATION_API_MEDIA_CLEANUP_CRON_JOB_NAME);
		LOG.info("Performing cronJob {} synchronously", cronJob.getCode());
		cronJobService.performCronJob(cronJob, true);
		LOG.info("CronJob completed with status {}", cronJob.getStatus());
	}

	private IntegrationApiMediaModel integrationApiMedia(final String code)
	{
		final IntegrationApiMediaModel media = new IntegrationApiMediaModel();
		media.setCode(code);
		return media;
	}
}
