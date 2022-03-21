/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('SmartEditContainerMocksModule', [])
    .constant('SMARTEDIT_ROOT', 'web/webroot')
    .constant('SMARTEDIT_RESOURCE_URI_REGEXP', /^(.*)\/apps\/smartedit-e2e\/generated\/e2e/)
    .constant('SMARTEDIT_INNER_FILES', [
        '/apps/smartedit-e2e/node_modules/ckeditor4/ckeditor.js',
        '/apps/smartedit-e2e/generated/e2e/base/smartedit/vendor.js',
        '/apps/smartedit-e2e/generated/e2e/base/smartedit/base-inner-app.js'
    ])
    .constant('SMARTEDIT_INNER_FILES_POST', [
        '/apps/smartedit-e2e/generated/e2e/base/smartedit/inner-app.js'
    ])
    .value('CONFIGURATION_MOCK', [
        {
            key: 'i18nAPIRoot',
            value: '"somepath"'
        },
        {
            key: 'applications.RenderDecoratorsModule',
            value:
                '{"smartEditLocation":"/apps/smartedit-e2e/generated/utils/decorators/RenderDecorators.js"}'
        },
        {
            key: 'applications.OthersMockModule',
            value:
                '{"smartEditLocation": "/apps/smartedit-e2e/generated/utils/commonMockedModules/OthersMock.js"}'
        }
    ]);

angular.module('smarteditloader').requires.push('SmartEditContainerMocksModule');
angular.module('smarteditcontainer').requires.push('SmartEditContainerMocksModule');
