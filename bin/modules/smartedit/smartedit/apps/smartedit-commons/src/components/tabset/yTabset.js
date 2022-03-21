/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * # Module
 *
 * **Deprecated since 2005, use {@link TabsModule}**.
 *
 * # Component
 *
 * **Deprecated since 2005, use {@link TabsComponent}**.
 *
 * ### Example AngularJS
 *
 *      <se-tabs [model]='myModel' [tabs-list]="tabsList" [num-tabs-displayed]="3"></se-tab>
 *
 * ### Example Angular
 *
 *      <se-tabs [model]='myModel' [tabList]="tabsList" [numTabsDisplayed]="3"></se-tab>
 *
 * @deprecated
 */
angular
    .module('tabsetModule', [])
    .component('yTabset', {
        transclude: false,
        templateUrl: 'yTabsetTemplate.html',
        controller: 'yTabsetController',
        controllerAs: 'yTabset',
        bindings: {
            model: '=',
            tabsList: '<',
            tabControl: '=',
            numTabsDisplayed: '@'
        }
    })
    .controller('yTabsetController', function () {});
