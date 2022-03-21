/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('OuterMocksModule', ['resourceLocationsModule', 'smarteditServicesModule'])

    .constant('SMARTEDIT_ROOT', 'web/webroot')

    .value('CONFIGURATION_MOCK', [
        {
            value:
                '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/utils/commonMockedModules/goToCustomView.js"}',
            key: 'applications.goToCustomView'
        },
        {
            value:
                '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/e2e/yCollapsibleContainer/setup/customViewController.js"}',
            key: 'applications.customViewModule'
        }
    ]);

try {
    angular.module('smarteditloader').requires.push('OuterMocksModule');
    angular.module('smarteditcontainer').requires.push('OuterMocksModule');
} catch (ex) {}
