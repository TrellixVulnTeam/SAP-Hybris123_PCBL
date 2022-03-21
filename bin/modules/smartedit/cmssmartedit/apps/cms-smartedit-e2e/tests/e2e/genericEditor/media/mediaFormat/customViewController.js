/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('customViewModule', ['smarteditServicesModule', 'backendMocksUtilsModule'])
    .constant('PATH_TO_CUSTOM_VIEW', '../e2e/genericEditor/media/mediaFormat/customView.html')
    .controller('customViewController', function (httpBackendService) {
        // Inputs
        this.mediaUuid = 'someUuid';
        this.mediaFormat = 'desktop';
        this.field = {
            editable: false
        };
        this.isUnderEdit = false;
        this.onFileSelect = () => null;
        this._isFieldDisabled = false;
        this.isFieldDisabled = () => this._isFieldDisabled;

        // Model for controls
        this.model = {
            mediaUuid: this.mediaUuid,
            field: this.field,
            isUnderEdit: this.isUnderEdit,
            isFieldDisabled: this._isFieldDisabled
        };

        // Setters that syncs Model with Inputs
        this.setMediaUuid = () => {
            this.mediaUuid = JSON.parse(this.model.mediaUuid);
        };

        this.setField = () => {
            this.field = { ...this.model.field };
        };

        this.setIsUnderEdit = () => {
            this.isUnderEdit = this.model.isUnderEdit;
        };

        this.setIsFieldDisabled = () => {
            this._isFieldDisabled = this.model.isFieldDisabled;
        };

        httpBackendService.whenGET(/cmswebservices\/v1\/media\/someUuid/).respond({
            code: 'someCode',
            url: '/apps/cms-smartedit-e2e/generated/images/contextualmenu_edit_on.png'
        });
    });

try {
    angular.module('smarteditcontainer').requires.push('customViewModule');
} catch (e) {}
