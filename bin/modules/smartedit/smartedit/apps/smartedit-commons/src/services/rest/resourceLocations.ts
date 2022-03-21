/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import { stringUtils } from 'smarteditcommons/utils';
import {
    CONFIGURATION_URI,
    CONTEXT_CATALOG,
    CONTEXT_CATALOG_VERSION,
    CONTEXT_SITE_ID,
    DEFAULT_AUTHENTICATION_CLIENT_ID,
    DEFAULT_AUTHENTICATION_ENTRY_POINT,
    I18N_LANGUAGES_RESOURCE_URI,
    LANDING_PAGE_PATH,
    LANGUAGE_RESOURCE_URI,
    MEDIA_PATH,
    MEDIA_RESOURCE_URI,
    PAGE_CONTEXT_CATALOG,
    PAGE_CONTEXT_CATALOG_VERSION,
    PAGE_CONTEXT_SITE_ID,
    PREVIEW_RESOURCE_URI,
    PRODUCT_LIST_RESOURCE_API,
    PRODUCT_RESOURCE_API,
    SITES_RESOURCE_URI,
    SMARTEDIT_RESOURCE_URI_REGEXP,
    STORE_FRONT_CONTEXT,
    TYPES_RESOURCE_URI
} from 'smarteditcommons/utils/smarteditconstants';

/* forbiddenNameSpaces angular.module:false */
angular
    .module('resourceLocationsModule', [])

    /**
     * Constant containing the name of the site uid placeholder in URLs
     */
    .constant('CONTEXT_SITE_ID', CONTEXT_SITE_ID)
    /**
     * Constant containing the name of the catalog uid placeholder in URLs
     */
    .constant('CONTEXT_CATALOG', CONTEXT_CATALOG)
    /**
     * Constant containing the name of the catalog version placeholder in URLs
     */
    .constant('CONTEXT_CATALOG_VERSION', CONTEXT_CATALOG_VERSION)
    /**
     * Constant containing the name of the current page site uid placeholder in URLs
     */
    .constant('PAGE_CONTEXT_SITE_ID', PAGE_CONTEXT_SITE_ID)

    /**
     * Constant containing the name of the current page catalog uid placeholder in URLs
     */
    .constant('PAGE_CONTEXT_CATALOG', PAGE_CONTEXT_CATALOG)

    /**
     * Constant containing the name of the current page catalog version placeholder in URLs
     */
    .constant('PAGE_CONTEXT_CATALOG_VERSION', PAGE_CONTEXT_CATALOG_VERSION)
    /**
     * the name of the webapp root context
     */
    .constant('SMARTEDIT_ROOT', 'smartedit')
    /**
     * to calculate platform domain URI, this regular expression will be used
     */
    .constant('SMARTEDIT_RESOURCE_URI_REGEXP', SMARTEDIT_RESOURCE_URI_REGEXP)
    /**
     * the name of the SmartEdit configuration API root
     */
    .constant('CONFIGURATION_URI', CONFIGURATION_URI)

    /**
     * Constant for the cmswebservices API root
     */
    .constant('CMSWEBSERVICES_RESOURCE_URI', '/cmswebservices')
    /**
     * **Deprecated since 2005, `import DEFAULT_AUTHENTICATION_ENTRY_POINT from smarteditconstants.ts`.**
     *
     * When configuration is not available yet to provide authenticationMap, one needs a default authentication entry point to access configuration API itself
     *
     * @deprecated
     */
    .constant('DEFAULT_AUTHENTICATION_ENTRY_POINT', DEFAULT_AUTHENTICATION_ENTRY_POINT)
    /**
     * The default OAuth 2 client id to use during authentication.
     */
    .constant('DEFAULT_AUTHENTICATION_CLIENT_ID', DEFAULT_AUTHENTICATION_CLIENT_ID)

    /**
     * Resource URI to fetch the i18n initialization map for a given locale.
     */
    .constant('I18N_RESOURCE_URI', '/smarteditwebservices/v1/i18n/translations')
    /**
     * Resource URI to fetch the supported i18n languages.
     */
    .constant('I18N_LANGUAGES_RESOURCE_URI', I18N_LANGUAGES_RESOURCE_URI)

    .constant('PREVIEW_RESOURCE_URI', PREVIEW_RESOURCE_URI)
    /**
     * Resource URI of the languages REST service.
     */
    .constant('LANGUAGE_RESOURCE_URI', LANGUAGE_RESOURCE_URI)
    .constant('PRODUCT_RESOURCE_API', PRODUCT_RESOURCE_API)
    .constant('PRODUCT_LIST_RESOURCE_API', PRODUCT_LIST_RESOURCE_API)

    /**
     * Resource URI of the sites REST service.
     */
    .constant('SITES_RESOURCE_URI', SITES_RESOURCE_URI)
    /**
     * Path of the landing page
     */
    .constant('LANDING_PAGE_PATH', LANDING_PAGE_PATH)
    /**
     * to fetch the store front context for inflection points.
     */
    .constant('STORE_FRONT_CONTEXT', STORE_FRONT_CONTEXT)
    /**
     * Path of the catalogs
     */
    .constant('CATALOGS_PATH', '/cmswebservices/v1/catalogs/')
    /**
     * Path of the media
     */
    .constant('MEDIA_PATH', MEDIA_PATH)
    /**
     * Path to fetch list of values of a given enum type
     */
    .constant('ENUM_RESOURCE_URI', '/cmswebservices/v1/enums')

    /**
     * Path of the synchronization service
     */
    .constant(
        'SYNC_PATH',
        '/cmswebservices/v1/catalogs/:catalog/versions/Staged/synchronizations/versions/Online'
    )
    /**
     * Resource URI of the media REST service.
     */
    .constant('MEDIA_RESOURCE_URI', MEDIA_RESOURCE_URI)
    /**
     * Resource URI of the component types REST service.
     */
    .constant('TYPES_RESOURCE_URI', TYPES_RESOURCE_URI)

    /**
     * Generates a regular expresssion matcher from a given resource location URL, replacing predefined keys by wildcard
     * matchers.
     *
     * ### Example
     *
     *      // Get a regex matcher for the someResource endpoint, ie: /\/smarteditwebservices\/someResource\/.*$/g
     *      var endpointRegex = resourceLocationToRegex('/smarteditwebservices/someResource/:id');
     *
     *      // Use the regex to match hits to the mocked HTTP backend. This regex will match for any ID passed in to the
     *      // someResource endpoint.
     *      httpBackendService.whenGET(endpointRegex).respond({someKey: 'someValue'});
     *
     */
    .factory('resourceLocationToRegex', function () {
        return stringUtils.resourceLocationToRegex;
    });
