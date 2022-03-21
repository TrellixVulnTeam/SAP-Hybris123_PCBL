/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('componentTypesTabModule', [
        'smarteditServicesModule',
        'componentSearchModule',
        'componentTypeModule',
        'cmsSmarteditServicesModule'
    ])
    .controller('componentTypesTabController', function (
        $q,
        $log,
        componentService,
        pageService,
        catalogService,
        languageService,
        crossFrameEventService
    ) {
        // --------------------------------------------------------------------------------------------------
        // Constants
        // --------------------------------------------------------------------------------------------------
        this.pageInfo = null;
        this.uriContext = null;
        const SWITCH_LANGUAGE_EVENT = 'SWITCH_LANGUAGE_EVENT';

        // --------------------------------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------------------------------
        this.onSearchTermChanged = function (searchTerm) {
            this.searchTerm = searchTerm;
        }.bind(this);

        this.$onInit = function () {
            this.unRegisterEventService = crossFrameEventService.subscribe(
                SWITCH_LANGUAGE_EVENT,
                function () {
                    // for trigger search when language changed.
                    this.searchTerm = this.searchTerm !== undefined ? undefined : '';
                }.bind(this)
            );
        };

        this.loadPageContext = function () {
            if (this.pageInfo) {
                return $q.when();
            }

            return $q
                .all([
                    pageService.getCurrentPageInfo(),
                    $q.when(catalogService.retrieveUriContext())
                ])
                .then(
                    function (dataRetrieved) {
                        this.pageInfo = dataRetrieved[0];
                        this.uriContext = dataRetrieved[1];
                    }.bind(this)
                );
        };

        this.loadComponentTypes = function (mask, pageSize, currentPage) {
            return $q
                .all([languageService.getResolveLocale(), this.loadPageContext()])
                .then(
                    function (dataReceived) {
                        const payload = {
                            pageId: this.pageInfo.uid,
                            catalogId: this.uriContext.CURRENT_CONTEXT_CATALOG,
                            catalogVersion: this.uriContext.CURRENT_CONTEXT_CATALOG_VERSION,
                            mask,
                            langIsoCode: dataReceived[0],
                            pageSize,
                            currentPage
                        };

                        return componentService.getSupportedComponentTypesForCurrentPage(payload);
                    }.bind(this)
                )
                .then(
                    function (pageLoaded) {
                        return pageLoaded;
                    }.bind(this)
                )
                .catch(function (errData) {
                    $log.error(
                        'ComponentMenuController.$onInit() - error loading types. ' + errData
                    );
                });
        }.bind(this);

        this.$onDestroy = function () {
            this.unRegisterEventService();
        };
    })
    .component('componentTypesTab', {
        templateUrl: 'componentTypesTabTemplate.html',
        controller: 'componentTypesTabController',
        bindings: {
            isTabActive: '<',
            isMenuOpen: '<'
        }
    });
