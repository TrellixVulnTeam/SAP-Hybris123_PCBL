/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('configurationMocksModule', [])
    .constant('SMARTEDIT_E2E_NAME', 'cms-smartedit-e2e')
    .constant('CONFIGURATION_MOCKS', [
        {
            value: '"/cmswebservices/v1/i18n/languages"',
            key: 'i18nAPIRoot'
        },
        {
            value:
                '{"smartEditLocation":"/apps/cms-smartedit-e2e/generated/e2e/util/commonMockedModule/rerenderMocks.js"}',
            key: 'applications.rerenderMocks'
        },
        {
            value:
                '{"smartEditLocation":"/apps/cms-smartedit-e2e/generated/e2e/util/commonMockedModule/miscellaneousMocks.js"}',
            key: 'applications.miscellaneousMocks'
        }
    ]);
