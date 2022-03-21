/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.hybris.merchandising.config;

import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.webservicescommons.swagger.strategies.ApiVendorExtensionStrategy;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.hybris.merchandising.constants.MerchandisingcmswebservicesConstants;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.ClientCredentialsGrant;
import springfox.documentation.service.OAuth;
import springfox.documentation.service.ResourceOwnerPasswordCredentialsGrant;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@EnableSwagger2
@Component
public class SwaggerConfig
{
	@Resource(name = "configurationService")
	private ConfigurationService configurationService;

	@Resource(name = "apiVendorExtensionStrategy")
	private ApiVendorExtensionStrategy apiVendorExtensionStrategy;

	@Bean
	public Docket apiDocumentation()
	{
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())//
				.select()//
				.paths(PathSelectors.any())//
				.build()//
				.securitySchemes(Arrays.asList(clientCredentialFlow(), passwordFlow()))//
				.securityContexts(Collections.singletonList(oauthSecurityContext()))//
				.useDefaultResponseMessages(false)//
				.extensions(apiVendorExtensionStrategy.getVendorExtensions(MerchandisingcmswebservicesConstants.EXTENSIONNAME))//
				.produces(new HashSet<>(Arrays.asList("application/json")))//
				.tags(new Tag("Strategies", "Operations for strategies configured in CDS"));
	}

	protected ApiInfo apiInfo()
	{
		return new ApiInfoBuilder()
				.title(getPropertyValue(MerchandisingcmswebservicesConstants.DOCUMENTATION_TITLE_PROPERTY))//
				.description(getPropertyValue(MerchandisingcmswebservicesConstants.DOCUMENTATION_DESC_PROPERTY))//
				.termsOfServiceUrl(getPropertyValue(MerchandisingcmswebservicesConstants.TERMS_OF_SERVICE_URL_PROPERTY))//
				.license(getPropertyValue(MerchandisingcmswebservicesConstants.LICENSE_PROPERTY))//
				.licenseUrl(getPropertyValue(MerchandisingcmswebservicesConstants.LICENSE_URL_PROPERTY))//
				.version(MerchandisingcmswebservicesConstants.API_VERSION)//
				.build();
	}

	protected OAuth passwordFlow()
	{
		final ResourceOwnerPasswordCredentialsGrant resourceOwnerPasswordCredentialsGrant = new ResourceOwnerPasswordCredentialsGrant(
				MerchandisingcmswebservicesConstants.AUTHORIZATION_URL);
		return new OAuth(MerchandisingcmswebservicesConstants.PASSWORD_AUTHORIZATION_NAME, buildAuthorizationScopeList(),
				Collections.singletonList(resourceOwnerPasswordCredentialsGrant));
	}

	protected OAuth clientCredentialFlow()
	{
		final ClientCredentialsGrant clientCredentialsGrant = new ClientCredentialsGrant(
				MerchandisingcmswebservicesConstants.AUTHORIZATION_URL);
		return new OAuth(MerchandisingcmswebservicesConstants.CLIENT_CREDENTIAL_AUTHORIZATION_NAME, buildAuthorizationScopeList(),
				Collections.singletonList(clientCredentialsGrant));
	}

	protected List<AuthorizationScope> buildAuthorizationScopeList()
	{
		return List.of(new AuthorizationScope("basic", ""));
	}

	protected String getPropertyValue(final String propertyName)
	{
		return configurationService.getConfiguration().getString(propertyName);
	}

	protected SecurityContext oauthSecurityContext()
	{
		return SecurityContext.builder().securityReferences(oauthSecurityReferences()).forPaths(PathSelectors.any()).build();
	}

	protected List<SecurityReference> oauthSecurityReferences()
	{
		final AuthorizationScope[] authorizationScopes = buildAuthorizationScopeList().toArray(new AuthorizationScope[0]);
		return Arrays.asList(
				new SecurityReference(MerchandisingcmswebservicesConstants.PASSWORD_AUTHORIZATION_NAME, authorizationScopes),
				new SecurityReference(MerchandisingcmswebservicesConstants.CLIENT_CREDENTIAL_AUTHORIZATION_NAME, authorizationScopes));
	}

}
