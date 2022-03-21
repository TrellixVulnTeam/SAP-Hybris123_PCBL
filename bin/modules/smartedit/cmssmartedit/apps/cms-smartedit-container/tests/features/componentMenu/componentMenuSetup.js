/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
var setupComponentServiceMock;
var setupController;

var componentMenuSetup = function () {
    setupComponentServiceMock = function () {
        componentService = jasmine.createSpyObj('ComponentService', [
            'loadComponentTypes',
            'addExistingComponent',
            'addNewComponent'
        ]);
        componentService.loadComponentTypes.andCallFake(function (component) {
            return {
                then() {
                    return component;
                }
            };
        });
        componentService.addExistingComponent.and.returnValue();
        componentService.addNewComponent.and.returnValue();

        return componentService;
    };

    setupComponentMenuController = function ($controller, $scope, componentService) {
        return $controller('ComponentMenuController as menuCtrl', {
            $scope: directiveScope,
            componentService
        });
    };
};
