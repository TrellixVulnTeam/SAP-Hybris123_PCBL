'use strict';

var angular$1 = require('angular');

angular.module('personalizationsearchRestServiceModule', [
        'smarteditServicesModule',
        'personalizationsmarteditCommonsModule',
        'personalizationsmarteditServicesModule'
    ])
    .factory('personalizationsearchRestService', ["restServiceFactory", "personalizationsmarteditContextService", "personalizationsmarteditUtils", function(restServiceFactory, personalizationsmarteditContextService, personalizationsmarteditUtils) {

        var SEARCH_PROFILES = "/adaptivesearchwebservices/v1/searchprofiles";

        var UPDATE_CUSTOMIZATION_RANK = "/personalizationwebservices/v1/query/cxUpdateSearchProfileActionRank";
        var GET_INDEX_TYPES_FOR_SITE = "/personalizationwebservices/v1/query/cxGetIndexTypesForSite";

        var restService = {};

        restService.getSearchProfiles = function(filter) {

            var experienceData = personalizationsmarteditContextService.getSeData().seExperienceData;

            var catalogVersionsStr = (experienceData.productCatalogVersions || []).map(function(cv) {
                return cv.catalog + ':' + cv.catalogVersion;
            }).join(",");

            var restService = restServiceFactory.get(SEARCH_PROFILES);

            var param = {
                "catalogVersions": catalogVersionsStr
            };

            filter = angular.extend(filter, param);

            return restService.get(filter);
        };


        restService.updateSearchProfileActionRank = function(filter) {
            var experienceData = personalizationsmarteditContextService.getSeData().seExperienceData;

            var restService = restServiceFactory.get(UPDATE_CUSTOMIZATION_RANK);
            var entries = [];
            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "customization", filter.customizationCode);
            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "variation", filter.variationCode);
            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "rankBeforeAction", filter.rankBeforeAction);
            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "rankAfterAction", filter.rankAfterAction);
            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "actions", filter.actions);

            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalog", experienceData.catalogDescriptor.catalogId);
            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalogVersion", experienceData.catalogDescriptor.catalogVersion);
            var requestParams = {
                "params": {
                    "entry": entries
                }
            };
            return restService.save(requestParams);
        };

        restService.getIndexTypesForCatalogVersion = function(productCV) {
            var experienceData = personalizationsmarteditContextService.getSeData().seExperienceData;

            var restService = restServiceFactory.get(GET_INDEX_TYPES_FOR_SITE);
            var entries = [];

            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "baseSiteId", experienceData.catalogDescriptor.siteId);
            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalog", productCV.catalog);
            personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalogVersion", productCV.catalogVersion);
            var requestParams = {
                "params": {
                    "entry": entries
                }
            };
            return restService.save(requestParams);
        };

        return restService;
    }]);

angular
    .module('personalizationsearchSearchProfilesModule', [
        'personalizationsmarteditCommonsModule',
        'personalizationsmarteditCommerceCustomizationModule',
        'personalizationsmarteditDataFactory',
        'personalizationsearchRestServiceModule',
        'smarteditServicesModule',
        'personalizationsearchSearchProfilesContextServiceModule',
        'ui.tree'
    ])
    .constant('SEARCH_PROFILE_ACTION_TYPE', 'cxSearchProfileActionData')
    .run(["$q", "$filter", "personalizationsearchRestService", "personalizationsmarteditCommerceCustomizationService", "personalizationsearchSearchProfilesContextService", "personalizationsmarteditMessageHandler", "SEARCH_PROFILE_ACTION_TYPE", function($q, $filter, personalizationsearchRestService, personalizationsmarteditCommerceCustomizationService, personalizationsearchSearchProfilesContextService, personalizationsmarteditMessageHandler, SEARCH_PROFILE_ACTION_TYPE) {

        personalizationsmarteditCommerceCustomizationService.registerType({
            type: SEARCH_PROFILE_ACTION_TYPE,
            text: 'personalizationsearchsmartedit.commercecustomization.action.type.search',
            template: 'personalizationsearchSearchProfilesTemplate.html',
            confProperty: 'personalizationsearch.commercecustomization.search.profile.enabled',
            getName: function(action) {
                return $filter('translate')('personalizationsearchsmartedit.commercecustomization.search.display.name') + " - " + action.searchProfileCode;
            },
            updateActions: function(customizationCode, variationCode, actions, respCreate) {
                var deferred = $q.defer();

                if (angular.isDefined(respCreate)) {
                    personalizationsearchSearchProfilesContextService.updateSearchActionContext(respCreate.actions);
                }

                var searchProfilesCtx = personalizationsearchSearchProfilesContextService.searchProfileContext;
                var rankAfterAction = searchProfilesCtx.searchProfilesOrder.splice(0, 1)[0];
                var spActionCodes = searchProfilesCtx.searchProfilesOrder.map(function(sp) {
                    return sp.code;
                }).join(',');

                var filter = {
                    customizationCode: searchProfilesCtx.customizationCode,
                    variationCode: searchProfilesCtx.variationCode,
                    rankAfterAction: rankAfterAction.code,
                    actions: spActionCodes
                };

                personalizationsearchRestService.updateSearchProfileActionRank(filter).then(function successCallback() {
                    deferred.resolve();
                }, function errorCallback() {
                    personalizationsmarteditMessageHandler.sendError($filter('translate')('personalization.error.updatingcustomization'));
                    deferred.reject();
                });

                return deferred.promise;
            }
        });
    }])
    .controller('personalizationsearchSearchProfilesController', ["$q", "$scope", "$filter", "$timeout", "personalizationsearchRestService", "personalizationsmarteditMessageHandler", "waitDialogService", "personalizationsearchSearchProfilesContextService", "personalizationsmarteditContextService", "PaginationHelper", "SEARCH_PROFILE_ACTION_TYPE", "PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES", function($q, $scope, $filter, $timeout, personalizationsearchRestService, personalizationsmarteditMessageHandler, waitDialogService, personalizationsearchSearchProfilesContextService, personalizationsmarteditContextService, PaginationHelper, SEARCH_PROFILE_ACTION_TYPE, PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES) {

        $scope.selectedSearchProfile = null;
        $scope.availableSearchProfiles = [];
        $scope.searchProfileActions = [];
        $scope.helpTemplate = "<span>" + $filter('translate')('personalizationsearchsmartedit.commercecustomization.search.helpmsg') + "</span>";

        $scope.searchProfileContext = personalizationsearchSearchProfilesContextService.searchProfileContext;

        $scope.searchProfilePagination = new PaginationHelper();
        $scope.searchProfilePagination.reset();
        $scope.searchProfileFilter = {
            code: ''
        };

        var getIndexTypes = function() {
            var deferred = $q.defer();

            var experienceData = personalizationsmarteditContextService.getSeData().seExperienceData;

            var promises = [];

            angular.forEach((experienceData.productCatalogVersions || []), function(productCV) {
                promises.push(personalizationsearchRestService.getIndexTypesForCatalogVersion(productCV));
            });

            $q.all(promises)
                .then(function successCallback(response) {
                    var mergedResponse = {
                        indexTypeIds: []
                    };

                    angular.forEach(response, function(res) {
                        mergedResponse.indexTypeIds = mergedResponse.indexTypeIds.concat(res.indexTypeIds.filter(function(item) {
                            return mergedResponse.indexTypeIds.indexOf(item) < 0;
                        }));
                    });

                    deferred.resolve(mergedResponse);
                }, function errorCallback(errorResponse) {
                    deferred.reject(errorResponse);
                });

            return deferred.promise;
        };

        var getSearchProfileFilterObject = function() {
            return {
                code: $scope.searchProfileFilter.code,
                pageSize: $scope.searchProfilePagination.count,
                currentPage: $scope.searchProfilePagination.page + 1
            };
        };

        var buildAction = function(item) {
            return {
                type: SEARCH_PROFILE_ACTION_TYPE,
                searchProfileCode: item.code,
                searchProfileCatalog: item.catalogVersion.split(":")[0]
            };
        };

        var getWrapperActionForAction = function(action) {
            return $scope.actions.filter(function(wrapper) {
                return personalizationsearchSearchProfilesContextService.searchProfileActionComparer(action, wrapper.action);
            })[0];
        };

        $scope.searchProfileSelected = function(item, uiSelectObject) {
            var action = buildAction(item);
            $scope.addAction(action, personalizationsearchSearchProfilesContextService.searchProfileActionComparer);
            uiSelectObject.selected = null;
        };

        $scope.isItemInSelectDisabled = function(item) {
            var action = buildAction(item);
            return $scope.isItemInSelectedActions(action, personalizationsearchSearchProfilesContextService.searchProfileActionComparer);
        };

        $scope.initUiSelect = function(uiSelectController) {
            uiSelectController.isActive = function() {
                return false;
            };
        };

        $scope.removeSelectedSearchAction = function(action) {
            var wrapperActionToRem = getWrapperActionForAction(action);

            $scope.removeSelectedAction(wrapperActionToRem);
        };

        var setStatusForUpdatedActions = function(wrapperActions) {
            wrapperActions.forEach(function(action) {
                if (action.status !== PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.NEW) {
                    action.status = PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.UPDATE;
                }
            });
        };

        $scope.setSearchActionRank = function(action, increaseValue) {
            var wrappedAction = getWrapperActionForAction(action);

            var wrappedAffectedAction = getWrapperActionForAction($scope.searchProfileActions[$scope.searchProfileActions.indexOf(action) + increaseValue]);

            var sourceIndex = $scope.actions.indexOf(wrappedAction);
            var targetIndex = $scope.actions.indexOf(wrappedAffectedAction);
            $scope.actions.splice(targetIndex, 0, $scope.actions.splice(sourceIndex, 1)[0]);

            setStatusForUpdatedActions([wrappedAction, wrappedAffectedAction]);
        };

        $scope.isDirty = function() {
            return true;
        };

        $scope.moreSearchProfilestRequestProcessing = false;
        $scope.addMoreSearchProfilesItems = function() {
            if ($scope.searchProfilePagination.page < $scope.searchProfilePagination.totalPages - 1 && !$scope.moreSearchProfilestRequestProcessing) {
                $scope.moreSearchProfilestRequestProcessing = true;

                getIndexTypes().then(
                    function successCallback(response) {
                        var filter = getSearchProfileFilterObject();

                        var param = {
                            indexTypes: response.indexTypeIds || []
                        };

                        filter = angular.extend(filter, param);

                        personalizationsearchRestService.getSearchProfiles(filter).then(function successCallback(response) {
                            Array.prototype.push.apply($scope.availableSearchProfiles, response.searchProfiles);
                            $scope.searchProfilePagination = new PaginationHelper(response.pagination);
                            $scope.moreSearchProfilestRequestProcessing = false;
                        }, function errorCallback() {
                            personalizationsmarteditMessageHandler.sendError($filter('translate')('personalizationsearchsmartedit.commercecustomization.search.error.gettingsearchprofiles'));
                            $scope.moreSearchProfilestRequestProcessing = false;
                        });
                    },
                    function errorCallback() {
                        personalizationsmarteditMessageHandler.sendError($filter('translate')('personalizationsearchsmartedit.commercecustomization.search.error.gettingindextypes'));
                    }
                );


            }
        };

        $scope.segmentSearchInputKeypress = function(keyEvent, searchObj) {
            if (keyEvent && ([37, 38, 39, 40].indexOf(keyEvent.which) > -1)) { //keyleft, keyup, keyright, keydown
                return;
            }
            $scope.searchProfilePagination.reset();
            $scope.searchProfileFilter.code = searchObj;
            $scope.availableSearchProfiles.length = 0;
            $scope.addMoreSearchProfilesItems();
        };

        $scope.treeOptions = {
            dropped: function(e) {
                if (e.source.index !== e.dest.index) {
                    $scope.aaa = true;
                    //update backing actions array
                    var sourceEl = e.source.nodeScope.$modelValue;
                    var destEl = e.dest.nodesScope.$modelValue[e.dest.index];
                    $timeout(function() {
                        $scope.actions.splice(destEl.baseIndex, 0, $scope.actions.splice(sourceEl.baseIndex, 1)[0]);
                    }, 0);

                    //set UPDATED status for modified actions
                    var startIdx = e.source.index < e.dest.index ? e.source.index : e.dest.index;
                    var increaseValue = Math.abs(e.dest.index - e.source.index) + 1;

                    var modifiedActions = $scope.searchProfileActions.slice(startIdx, increaseValue);
                    var modifiedWrappedActions = modifiedActions.map(function(action) {
                        return getWrapperActionForAction(action);
                    });
                    setStatusForUpdatedActions(modifiedWrappedActions);
                    $scope.aaa = false;
                }
            }
        };

        $scope.$watch('actions', function(newValue) {
            if (!$scope.aaa) {
                var actionsArray = newValue || [];
                $scope.searchProfileActions = actionsArray
                    .filter(function(item) {
                        return item.action.type === SEARCH_PROFILE_ACTION_TYPE;
                    }).map(function(item) {
                        var extAction = angular.extend(item.action, {
                            baseIndex: actionsArray.indexOf(item)
                        });
                        return extAction;
                    });

                $scope.searchProfileContext.searchProfilesOrder = $scope.searchProfileActions;
            }
        }, true);

        $scope.$watch('customization', function(newValue) {
            if (angular.isDefined(newValue)) {
                $scope.searchProfileContext.customizationCode = newValue.code;
            } else {
                $scope.searchProfileContext.customizationCode = undefined;
            }
        }, true);

        $scope.$watch('variation', function(newValue) {
            if (angular.isDefined(newValue)) {
                $scope.searchProfileContext.variationCode = newValue.code;
            } else {
                $scope.searchProfileContext.variationCode = undefined;
            }
        }, true);
    }]);

angular
    .module('personalizationsearchSearchProfilesContextServiceModule', []).
factory('personalizationsearchSearchProfilesContextService', function() {
    var self = this;

    var SearchProfileActionContext = function() {
        this.customizationCode = undefined;
        this.variationCode = undefined;
        this.initialOrder = [];
        this.searchProfilesOrder = [];
    };

    this.searchProfileActionComparer = function(a1, a2) {
        return a1.type === a2.type && a1.searchProfileCode === a2.searchProfileCode && a1.searchProfileCatalog === a2.searchProfileCatalog;
    };

    this.getSearchProfileActionContext = function() {
        return new SearchProfileActionContext();
    };

    this.searchProfileContext = this.getSearchProfileActionContext();

    this.updateSearchActionContext = function(actions) {
        actions.forEach(function(action) {
            var searchProfileActions = self.searchProfileContext.searchProfilesOrder.filter(function(spAction) {
                return self.searchProfileActionComparer(action, spAction);
            });

            if (searchProfileActions.length > 0) {
                searchProfileActions[0].code = action.code;
            }
        });

    };

    self.isDirty = function() {
        return false;
    };

    return self;
});

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('personalizationsearchsmarteditContainerTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('personalizationsearchsmarteditContainerTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "personalizationsearchSearchProfilesTemplate.html", 
        "<div ng-controller=\"personalizationsearchSearchProfilesController\" class=\"ps-search-profile\"><div class=\"form-group\"><label for=\"search-profile-selector-1\" class=\"control-label ps-control-label\" data-translate=\"personalizationsearchsmartedit.commercecustomization.search.label\"></label><ui-select data-ng-init=\"initUiSelect($select)\" id=\"search-profile-selector-1\" class=\"form-control\" ng-model=\"selectedSearchProfile\" ng-keyup=\"segmentSearchInputKeypress($event, $select.search)\" on-select=\"searchProfileSelected($item, $select)\" theme=\"select2\" search-enabled=\"true\" reset-search-input=\"false\"><ui-select-match placeholder=\"{{'personalizationsearchsmartedit.commercecustomization.search.placeholder' | translate}}\"><span>{{'personalizationsearchsmartedit.commercecustomization.search.placeholder' | translate}}</span></ui-select-match><ui-select-choices repeat=\"item in availableSearchProfiles\" ui-disable-choice=\"isItemInSelectDisabled(item)\" position=\"down\" personalization-infinite-scroll=\"addMoreSearchProfilesItems()\" personalization-infinite-scroll-distance=\"2\"><div class=\"row ng-scope\"><span class=\"col-md-8 ng-binding\" ng-bind=\"item.name\"></span> <span class=\"col-md-4 ng-binding\" ng-bind=\"item.catalog\"></span></div></ui-select-choices></ui-select><div class=\"ps-search-profile__selection\" data-ng-if=\"searchProfileActions\"><label data-ng-if=\"searchProfileActions.length\" class=\"control-label ps-control-label\"><span>{{'personalizationsearchsmartedit.commercecustomization.search.selection.label' | translate}}</span><y-help data-ng-if=\"searchProfileActions.length\" data-template=\"helpTemplate\"></y-help></label><div ui-tree=\"treeOptions\" id=\"tree-root\" class=\"ps-search-profile__sel-tree\"><div ui-tree-nodes ng-model=\"searchProfileActions\" class=\"ps-search-profile__sel-tbody\"><div ng-repeat=\"action in searchProfileActions\" ui-tree-node data-nodrop-enabled=\"true\" class=\"ps-search-profile__sel-tree-row\"><div class=\"ps-search-profile__sel-tree-row-wrapper\"><div ui-tree-handle class=\"ps-search-profile__sel-profile\"><span class=\"ps-search-profile__sel-profile-code\" data-ng-bind=\"action.searchProfileCode\"></span></div><div class=\"ps-search-profile__sel-menu\" data-uib-dropdown><button type=\"button\" data-uib-dropdown-toggle class=\"btn btn-link dropdown-toggle pull-right\"><span class=\"hyicon hyicon-more\"></span></button><ul class=\"dropdown-menu pull-right text-left\" role=\"menu\"><li ng-class=\"$first ? 'disabled' : '' \"><a data-ng-click=\"($first) ? $event.stopPropagation() : setSearchActionRank(action, -1)\" data-translate=\"personalizationsearchsmartedit.commercecustomization.search.actions.grid.options.moveup\"></a></li><li ng-class=\"$last ? 'disabled' : '' \"><a data-ng-click=\"($last) ? $event.stopPropagation() : setSearchActionRank(action, 1)\" data-translate=\"personalizationsearchsmartedit.commercecustomization.search.actions.grid.options.movedown\"></a></li><li role=\"separator\" class=\"divider\"></li><li><a data-ng-click=\"removeSelectedSearchAction(action)\" data-translate=\"personalizationsearchsmartedit.commercecustomization.search.actions.grid.options.delete\"></a></li></ul></div></div></div></div></div></div></div><label data-ng-if=\"searchProfileActions.length\" class=\"control-label ps-control-label__cust\" data-translate=\"personalizationsearchsmartedit.commercecustomization.search.label.cust\"></label></div>"
    );
    
      }]);
    })();

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
angular$1.module('personalizationsearchsmarteditContainer', [
    'smarteditServicesModule',
    'personalizationsearchsmarteditContainerTemplates',
    'personalizationsearchSearchProfilesModule',
    'yjqueryModule'
])
    .run(["yjQuery", "domain", function (yjQuery, domain) {
    'ngInject';
}]);
