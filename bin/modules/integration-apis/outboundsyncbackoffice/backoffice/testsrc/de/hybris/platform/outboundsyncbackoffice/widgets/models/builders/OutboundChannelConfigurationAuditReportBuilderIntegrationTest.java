package de.hybris.platform.outboundsyncbackoffice.widgets.models.builders;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import de.hybris.bootstrap.annotations.IntegrationTest;
import de.hybris.platform.audit.internal.config.DefaultAuditConfigService;
import de.hybris.platform.audit.view.AuditViewService;
import de.hybris.platform.auditreport.service.ReportViewConverterStrategy;
import de.hybris.platform.commons.renderer.RendererService;
import de.hybris.platform.integrationbackoffice.rules.ItemTypeAuditEnableRule;
import de.hybris.platform.integrationservices.util.IntegrationTestUtil;
import de.hybris.platform.outboundsync.model.OutboundChannelConfigurationModel;
import de.hybris.platform.servicelayer.ServicelayerTest;
import de.hybris.platform.servicelayer.i18n.CommonI18NService;
import de.hybris.platform.servicelayer.search.FlexibleSearchService;
import de.hybris.platform.servicelayer.search.SearchResult;
import de.hybris.platform.servicelayer.user.UserService;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import spock.lang.Shared;

@IntegrationTest
public class OutboundChannelConfigurationAuditReportBuilderIntegrationTest extends ServicelayerTest
{
	private static final String TEST_NAME = "OutboundChannelConfigurationAuditReportBuilder";
	private static final String IO = TEST_NAME + "_Product";
	private static final String OUTBOUND_SYNC_STREAM_CONFIGURATION_CONTAINER = TEST_NAME + "_StreamContainer";
	private static final String ODATA_OUTBOUND_SYNC_JOB = TEST_NAME + "_OutboundSyncJob";
	private static final String BASIC_CREDENTIAL = TEST_NAME + "_BasicCredentialTest";
	private static final String DESTINATION_TARGET = TEST_NAME + "_DestinationTarget";
	private static final String ENDPOINT = TEST_NAME + "_Endpoint";
	private static final String CONSUME_DESTINATION = TEST_NAME + "_ConsumeDestination";
	private static final String OUTBOUND_SYNC_STREAM_CONFIGURATION = TEST_NAME + "_OutboundSyncStreamConfiguration";
	private static final String OUTBOUND_CHANNEL_CONFIGURATION = TEST_NAME + "_OutboundChannelConfiguration";

	@Resource
	private FlexibleSearchService flexibleSearchService;
	@Resource
	private AuditViewService auditViewService;
	@Resource
	private RendererService rendererService;
	@Resource
	private CommonI18NService commonI18NService;
	@Resource
	private UserService userService;
	@Resource
	private List<ReportViewConverterStrategy> reportViewConverterStrategies;
	@Resource
	private DefaultAuditConfigService auditConfigService;
	@Shared
	@ClassRule
	public static final ItemTypeAuditEnableRule auditEnableRule = ItemTypeAuditEnableRule.create().integrationObject().enable();

	private final OutboundChannelConfigurationAuditReportBuilder auditReportBuilder = new OutboundChannelConfigurationAuditReportBuilder();

	@Before
	public void setUp() throws Exception
	{
		final ClassLoader classLoader = getClass().getClassLoader();
		final File file = new File(
				classLoader.getResource("outboundsyncbackoffice-OutboundChannelConfiguration-audit.xml").getFile());
		final String content = Files.readString(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);

		IntegrationTestUtil.importImpEx("INSERT_UPDATE IntegrationObject; code[unique = true]; integrationType(code)\n" +
				"                                                              ; " + IO + "         ; INBOUND\n" +
				"\n" +
				"INSERT_UPDATE IntegrationObjectItem; integrationObject(code)[unique = true]; code[unique = true]; type(code)     ; root[default = false]\n" +
				"                                   ; " + IO + "                            ; Product            ; Product        ; true\n" +
				"                                   ; " + IO + "                              ; Catalog            ; Catalog        ;\n" +
				"                                   ; " + IO + "                            ; CatalogVersion     ; CatalogVersion ;\n" +
				"                                   ; " + IO + "                            ; Category           ; Category       ;\n" +
				"\n" +
				"INSERT_UPDATE IntegrationObjectItemAttribute; integrationObjectItem(integrationObject(code), code)[unique = true]; attributeName[unique = true]; attributeDescriptor(enclosingType(code), qualifier); returnIntegrationObjectItem(integrationObject(code), code); unique[default = false]\n" +
				"                                            ; " + IO + ":Catalog                                                 ; id                          ; Catalog:id                                         ;\n" +
				"                                            ; " + IO + ":CatalogVersion                                          ; catalog                     ; CatalogVersion:catalog                             ; " + IO + ":Catalog\n" +
				"                                            ; " + IO + ":CatalogVersion                                          ; version                     ; CatalogVersion:version                             ;\n" +
				"                                            ; " + IO + ":CatalogVersion                                          ; active                      ; CatalogVersion:active                              ;\n" +
				"                                            ; " + IO + ":Product                                                 ; code                        ; Product:code                                       ;\n" +
				"                                            ; " + IO + ":Product                                                 ; catalogVersion              ; Product:catalogVersion                             ; " + IO + ":CatalogVersion\n" +
				"                                            ; " + IO + ":Product                                                 ; name                        ; Product:name                                       ;\n" +
				"                                            ; " + IO + ":Product                                                 ; supercategories             ; Product:supercategories                            ; " + IO + ":Category\n" +
				"                                            ; " + IO + ":Category                                                ; code                        ; Category:code                                      ;\n" +
				"                                            ; " + IO + ":Category                                                ; name                        ; Category:name                                      ;\n" +
				"\n" +
				"INSERT_UPDATE OutboundSyncStreamConfigurationContainer; id[unique = true]       ;\n" +
				"                                                      ; " + OUTBOUND_SYNC_STREAM_CONFIGURATION_CONTAINER + " ;\n" +
				"\n" +
				"INSERT_UPDATE OutboundSyncJob; code[unique = true]           ; streamConfigurationContainer(id)\n" +
				"                             ; " + ODATA_OUTBOUND_SYNC_JOB + " ; " + OUTBOUND_SYNC_STREAM_CONFIGURATION_CONTAINER + "\n" +
				"\n" +
				"INSERT_UPDATE OutboundSyncCronJob; code[unique = true]          ; job(code)                     ; sessionLanguage(isoCode)[default = en]\n" +
				"                                 ; TEST_ODATA_OUTBOUND_SYNC_JOB ; " + ODATA_OUTBOUND_SYNC_JOB + " ;\n" +
				"\n" +
				"INSERT_UPDATE BasicCredential; id[unique = true]   ; username; password\n" +
				"                             ; " + BASIC_CREDENTIAL + " ; abc     ; 123\n" +
				"\n" +
				"INSERT_UPDATE Endpoint; id[unique = true]   ; version[unique = true]; name           ; specUrl\n" +
				"                      ; " + ENDPOINT + "     ; unknown               ; " + ENDPOINT + " ; https://localhost:9002/odata2webservices/OutboundProduct/$metadata?Product\n" +
				"\n" +
				"INSERT_UPDATE DestinationTarget; id[unique = true]\n" +
				"                               ; " + DESTINATION_TARGET + "\n" +
				"\n" +
				"INSERT_UPDATE ConsumedDestination; id[unique = true]            ; url                                                               ; endpoint(id, version)  ; credential(id)      ; destinationTarget(id)[default = " + DESTINATION_TARGET + "]\n" +
				"                                 ; " + CONSUME_DESTINATION + "    ; https://localhost:9002/odata2webservices/OutboundProduct/Products ; " + ENDPOINT + ":unknown ; " + BASIC_CREDENTIAL + "\n" +
				"\n" +
				"INSERT_UPDATE OutboundSyncStreamConfiguration; streamId[unique = true]; container(id)           ; itemTypeForStream(code)                            ; outboundChannelConfiguration(code)\n" +
				"                                             ; " + OUTBOUND_SYNC_STREAM_CONFIGURATION + "         ; " + OUTBOUND_SYNC_STREAM_CONFIGURATION_CONTAINER + " ; Product                ; " + OUTBOUND_CHANNEL_CONFIGURATION + "\n" +
				"\n" +
				"INSERT_UPDATE OutboundChannelConfiguration; code[unique = true]                     ; integrationObject(code); destination(id)\n" +
				"                                          ; " + OUTBOUND_CHANNEL_CONFIGURATION + "    ; " + IO + "             ; " + CONSUME_DESTINATION);

		importCsv("/impex/essentialdata-DefaultAuditReportBuilderTemplate.impex",
				"UTF-8");  //This file is too big to use IntegrationTestUtil.importImpEx.

		auditConfigService.storeConfiguration("OutboundChannelConfigurationReport", content);
		auditReportBuilder.setAuditViewService(auditViewService);
		auditReportBuilder.setCommonI18NService(commonI18NService);
		auditReportBuilder.setRendererService(rendererService);
		auditReportBuilder.setReportViewConverterStrategies(reportViewConverterStrategies);
		auditReportBuilder.setUserService(userService);
		auditReportBuilder.setConfigName("OutboundChannelConfigurationReport");
		auditReportBuilder.setIsDownload(false);
	}

	@Test
	public void generateAndCompareAuditReportTest() throws IOException
	{
		// generate first audit report from one integration object
		final SearchResult<OutboundChannelConfigurationModel> search = flexibleSearchService.search(
				"SELECT PK FROM {OutboundChannelConfiguration} WHERE (p_code = '" + OUTBOUND_CHANNEL_CONFIGURATION + "')");
		final OutboundChannelConfigurationModel outboundChannelConfigurationModel = search.getResult().get(0);
		final Map<String, InputStream> reportGenerateRes = auditReportBuilder.generateAuditReport(
				outboundChannelConfigurationModel);
		byte[] arr1 = null;
		assertEquals(1, reportGenerateRes.values().size());
		for (final InputStream inputStream : reportGenerateRes.values())
		{
			arr1 = inputStream.readAllBytes();
		}
		if (arr1 == null)
		{
			fail("Audit report is not generated. No data found.");
		}

		//  if baseline changed, update it
		//  Files.write(Paths.get("./outboundChannelConfigAuditReportBuilderBaseline.html"), arr1);

		final JsonParser parser = new JsonParser();

		// get json object from data just fetched
		String htmlContent = new String(arr1);
		htmlContent = htmlContent.substring(htmlContent.indexOf("<script>") + 8, htmlContent.indexOf("</script>"));
		htmlContent = htmlContent.substring(htmlContent.indexOf("=") + 1, htmlContent.lastIndexOf(";"));
		htmlContent = htmlContent.substring(htmlContent.indexOf("["), htmlContent.lastIndexOf("]") + 1);

		final ClassLoader classLoader = getClass().getClassLoader();
		final String htmlPath = "test/text/OutboundChannelConfigAuditReportBuilderBaseline.html";
		final File file = new File(classLoader.getResource(htmlPath).getFile());
		String htmlContentBaseline = Files.readString(Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8);
		htmlContentBaseline = htmlContentBaseline.substring(htmlContentBaseline.indexOf("<script>") + 8,
				htmlContentBaseline.indexOf("</script>"));
		htmlContentBaseline = htmlContentBaseline.substring(htmlContentBaseline.indexOf("=") + 1,
				htmlContentBaseline.lastIndexOf(";"));
		htmlContentBaseline = htmlContentBaseline.substring(htmlContentBaseline.indexOf("["),
				htmlContentBaseline.lastIndexOf("]") + 1);
		final JsonArray jsonObjectListNew = parser.parse(htmlContent).getAsJsonArray();
		final JsonObject jsonObjectNew = jsonObjectListNew.get(jsonObjectListNew.size() - 1).getAsJsonObject();
		final JsonArray jsonObjectListBaseline = parser.parse(htmlContentBaseline).getAsJsonArray();
		final JsonObject jsonObjectBaseline = jsonObjectListBaseline.get(jsonObjectListBaseline.size() - 1).getAsJsonObject();

		final JsonObject OBChannelConfigNew = jsonObjectNew.getAsJsonObject("payload")
		                                                   .getAsJsonObject("OutboundChannelConfiguration");
		final JsonObject OBChannelConfigBaseline = jsonObjectBaseline.getAsJsonObject("payload")
		                                                             .getAsJsonObject("OutboundChannelConfiguration");
		assertEquals(OBChannelConfigNew.get("code").toString(), OBChannelConfigBaseline.get("code").toString());

		final JsonObject ConsumedDestinationNew = OBChannelConfigNew.getAsJsonObject(
				"ConsumedDestination_id : " + CONSUME_DESTINATION);
		final JsonObject ConsumedDestinationBase = OBChannelConfigBaseline.getAsJsonObject(
				"ConsumedDestination_id : " + CONSUME_DESTINATION);
		assertEquals(ConsumedDestinationNew.getAsJsonObject("Credential_id : " + BASIC_CREDENTIAL).toString(),
				ConsumedDestinationBase.getAsJsonObject("Credential_id : " + BASIC_CREDENTIAL).toString());
		assertEquals(ConsumedDestinationNew.getAsJsonObject("DestinationTarget_id : " + DESTINATION_TARGET).toString(),
				ConsumedDestinationBase.getAsJsonObject("DestinationTarget_id : " + DESTINATION_TARGET).toString());
		assertEquals(ConsumedDestinationNew.getAsJsonObject("Endpoint_id : " + ENDPOINT).toString(),
				ConsumedDestinationBase.getAsJsonObject("Endpoint_id : " + ENDPOINT).toString());
		assertEquals(ConsumedDestinationNew.getAsJsonObject("Endpoint_id : " + ENDPOINT).toString(),
				ConsumedDestinationBase.getAsJsonObject("Endpoint_id : " + ENDPOINT).toString());
		assertEquals(ConsumedDestinationNew.get("url").toString(),
				ConsumedDestinationBase.get("url").toString());
		assertEquals(ConsumedDestinationNew.get("active").toString(),
				ConsumedDestinationBase.get("active").toString());
		assertEquals(ConsumedDestinationNew.get("additional Properties").toString(),
				ConsumedDestinationBase.get("additional Properties").toString());

		final JsonObject IntegrationObjectNew = OBChannelConfigNew.getAsJsonObject("IntegrationObject_id : " + IO);
		final JsonObject IntegrationObjectBaseline = OBChannelConfigBaseline.getAsJsonObject(
				"IntegrationObject_id : " + IO);
		assertEquals(IntegrationObjectNew.toString(), IntegrationObjectBaseline.toString());

		final JsonObject OutboundSyncStreamConfigurationNew = OBChannelConfigNew.getAsJsonObject(
				"OutboundSyncStreamConfiguration_id : " + OUTBOUND_SYNC_STREAM_CONFIGURATION);
		final JsonObject OutboundSyncStreamConfigurationNewBaseline = OBChannelConfigBaseline.getAsJsonObject(
				"OutboundSyncStreamConfiguration_id : " + OUTBOUND_SYNC_STREAM_CONFIGURATION);
		assertEquals(OutboundSyncStreamConfigurationNew.getAsJsonObject(
				"OutboundSyncStreamConfigurationContainer_id : " + OUTBOUND_SYNC_STREAM_CONFIGURATION_CONTAINER).toString(),
				OutboundSyncStreamConfigurationNewBaseline.getAsJsonObject(
						"OutboundSyncStreamConfigurationContainer_id : " + OUTBOUND_SYNC_STREAM_CONFIGURATION_CONTAINER)
				                                          .toString());
	}
}