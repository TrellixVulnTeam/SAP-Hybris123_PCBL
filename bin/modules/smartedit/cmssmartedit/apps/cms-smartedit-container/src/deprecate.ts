/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces angular.module:false */
import * as angular from 'angular';

/**
 * Backwards compatibility for partners and downstream teams
 * The deprecated modules below were moved to cmsSmarteditServicesModule or cmssmarteditContainer
 *
 * IMPORANT: THE DEPRECATED MODULES WILL NOT BE AVAILABLE IN FUTURE RELEASES
 */
/* @internal */
const deprecatedSince1905 = (): void => {
    angular.module('oldModule', ['newModule']);
    angular.module('pageServiceModule', ['cmsSmarteditServicesModule']);
};

const deprecatedSince1911 = (): void => {
    angular.module('cmsitemsRestService', ['cmsSmarteditServicesModule']);
};

const deprecatedSince2005 = (): void => {
    angular.module('catalogVersionRestServiceModule', ['cmssmarteditContainer']);
};

export const deprecate = (): void => {
    deprecatedSince1905();
    deprecatedSince1911();
    deprecatedSince2005();
};
