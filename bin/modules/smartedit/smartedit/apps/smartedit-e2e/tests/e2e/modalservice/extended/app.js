/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
window.smartedit = {
    i18nAPIRoot: 'somepath'
};

angular
    .module('app', [
        'templateCacheDecoratorModule',
        'coretemplates',
        'modalServiceModule',
        'resourceLocationsModule',
        'smarteditServicesModule'
    ])
    .controller('defaultController', function ($scope, httpBackendService, $log, modalService) {
        httpBackendService.whenGET(/Template/).passThrough();

        $scope.openModalWithTitle = function () {
            modalService
                .open({
                    title: 'modal.title.lamp',
                    controller: 'modalTestController',
                    templateUrl:
                        '/apps/smartedit-e2e/generated/e2e/modalservice/extended/modalContentTemplate.html'
                })
                .then(
                    function (result) {
                        $log.log('Modal closed', result);
                    },
                    function (failure) {
                        $log.log('Modal dismissed', failure);
                    }
                );
        };

        $scope.openModalWithTitleAndButtons = function () {
            modalService
                .open({
                    title: 'modal.title.lamp',
                    controller: 'modalTestController',
                    templateUrl:
                        '/apps/smartedit-e2e/generated/e2e/modalservice/extended/modalContentTemplate.html',
                    buttons: [
                        {
                            id: 'modalButton'
                        }
                    ]
                })
                .then(
                    function (result) {
                        $log.log('Modal closed', result);
                    },
                    function (failure) {
                        $log.log('Modal dismissed', failure);
                    }
                );
        };

        $scope.openModalWithDisabledButton = function () {
            modalService
                .open({
                    templateInline: '<span>hello</span>',
                    buttons: [
                        {
                            id: 'modalButton',
                            disabled: true
                        },
                        {
                            label: 'Close',
                            action: 'close'
                        }
                    ]
                })
                .then(
                    function (result) {
                        $log.log('Modal closed', result);
                    },
                    function (failure) {
                        $log.log('Modal dismissed', failure);
                    }
                );
        };
    })

    .controller('modalTestController', function ($q, modalManager) {
        var counter = 0;

        function buttonHandlerFn(buttonId) {
            counter++;
            modalManager.title = modalManager.title + counter;

            modalManager.addButton({
                label: 'newbutton' + counter,
                id: 'newbutton' + counter
            });

            if (buttonId === 'newbutton3') {
                modalManager.removeButton.call(this, 'newbutton1');
            }
        }

        function dismissCallback() {
            return $q(function (resolve, reject) {
                if (confirm('Resolve the promise?')) {
                    resolve();
                } else {
                    reject();
                }
            });
        }

        this.modalManager = modalManager;
        this.showX = true;
        this.newButtonConfig = '{ "id": 1, "label": "someLabel" }';

        modalManager.setButtonHandler(buttonHandlerFn);
        modalManager.setDismissCallback(dismissCallback);

        this.addButton = function () {
            modalManager.addButton(JSON.parse(this.newButtonConfig));
        };

        this.removeButton = function () {
            modalManager.removeButton(this.buttonIdToRemove);
        };

        this.disableButton = function () {
            modalManager.disableButton(this.disableButtonId);
        };
        this.enableButton = function () {
            modalManager.enableButton(this.enableButtonId);
        };
    })
    .run(function ($templateCache) {
        $templateCache.put(
            '/apps/smartedit-e2e/generated/e2e/modalservice/extended/modalContentTemplate.html',
            '<div>\n' +
                '    <div>Title: <input type="text" data-ng-model="modalController.modalManager.title" /></div>\n' +
                '    <div>\n' +
                '        Show the dismiss X button:\n' +
                '        <input\n' +
                '            type="checkbox"\n' +
                '            data-ng-change="modalController.setShowHeaderDismiss(showX)"\n' +
                '            data-ng-model="modalController.showX"\n' +
                '        />\n' +
                '    </div>\n' +
                '    <div>\n' +
                '        <button class="btn btn-default" type="button" data-ng-click="modalController.addButton()">\n' +
                '            Add a button\n' +
                '        </button>\n' +
                '        <textarea data-ng-model="modalController.newButtonConfig" />\n' +
                '    </div>\n' +
                '    <div>\n' +
                '        <button\n' +
                '            class="btn btn-default"\n' +
                '            type="button"\n' +
                '            data-ng-click="modalController.removeButton()"\n' +
                '        >\n' +
                '            Remove button with ID:\n' +
                '        </button>\n' +
                '        <input type="text" data-ng-model="modalController.buttonIdToRemove" />\n' +
                '    </div>\n' +
                '    <div>\n' +
                '        <button\n' +
                '            class="btn btn-default"\n' +
                '            type="button"\n' +
                '            data-ng-click="modalController.modalManager.removeAllButtons()"\n' +
                '        >\n' +
                '            Remove All Buttons\n' +
                '        </button>\n' +
                '    </div>\n' +
                '    <div>\n' +
                '        <button\n' +
                '            class="btn btn-default"\n' +
                '            type="button"\n' +
                '            data-ng-click="modalController.disableButton()"\n' +
                '        >\n' +
                '            Disable Button\n' +
                '        </button>\n' +
                '        <input type="text" data-ng-model="modalController.disableButtonId" />\n' +
                '        <button\n' +
                '            class="btn btn-default"\n' +
                '            type="button"\n' +
                '            data-ng-click="modalController.enableButton()"\n' +
                '        >\n' +
                '            Enable Button\n' +
                '        </button>\n' +
                '        <input type="text" data-ng-model="modalController.enableButtonId" />\n' +
                '    </div>\n' +
                '    <div>\n' +
                '        <button class="btn btn-default" type="button" data-ng-click="modalController.close()">\n' +
                '            Manual CLOSE\n' +
                '        </button>\n' +
                '        <button class="btn btn-default" type="button" data-ng-click="modalController.dismiss()">\n' +
                '            Manual DISMISS\n' +
                '        </button>\n' +
                '    </div>\n' +
                '</div>\n'
        );
    });
