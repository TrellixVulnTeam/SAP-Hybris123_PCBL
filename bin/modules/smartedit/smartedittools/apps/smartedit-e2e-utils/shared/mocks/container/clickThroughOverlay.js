/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function(angular) {
    angular
        .module('clickThroughOverlayTriggerModule', ['smarteditServicesModule'])
        .run(function(toolbarServiceFactory, crossFrameEventService) {
            var tbs = toolbarServiceFactory.getToolbarService('smartEditPerspectiveToolbar');
            tbs.addItems([
                {
                    key: 'se.CLICK_THROUGH_OVERLAY',
                    type: 'ACTION',
                    nameI18nKey: 'CLICK_THROUGH_OVERLAY',
                    descriptionI18nKey: 'CLICK_THROUGH_OVERLAY',
                    section: 'right',
                    iconClassName: 'hyicon hyicon-dragdrop se-toolbar-menu-ddlb--button__icon',
                    callback: function() {
                        crossFrameEventService.publish('CLICK_THROUGH_OVERLAY');
                    }
                }
            ]);
            tbs.addItems([
                {
                    key: 'se.PREVENT_OVERLAY_CLICKTHROUGH',
                    type: 'ACTION',
                    nameI18nKey: 'PREVENT_OVERLAY_CLICKTHROUGH',
                    descriptionI18nKey: 'PREVENT_OVERLAY_CLICKTHROUGH',
                    section: 'right',
                    iconClassName: 'hyicon hyicon-list se-toolbar-menu-ddlb--button__icon',
                    callback: function() {
                        crossFrameEventService.publish('PREVENT_OVERLAY_CLICKTHROUGH');
                    }
                }
            ]);
        });

    angular.module('smarteditcontainer').requires.push('clickThroughOverlayTriggerModule');
})(angular);
