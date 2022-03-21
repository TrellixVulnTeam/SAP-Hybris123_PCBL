/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function(angular) {
    angular
        .module('clickThroughOverlayModule', ['smarteditServicesModule'])

        .run(function(crossFrameEventService, $timeout, yjQuery) {
            crossFrameEventService.subscribe('PREVENT_OVERLAY_CLICKTHROUGH', function() {
                yjQuery('#smarteditoverlay').css('pointer-events', 'auto');
                yjQuery('body').removeClass('clickthroughflash');
            });

            crossFrameEventService.subscribe('CLICK_THROUGH_OVERLAY', function() {
                yjQuery('#smarteditoverlay').css('pointer-events', 'none');
                yjQuery('body').removeClass('clickthroughflash');
                $timeout(function() {
                    yjQuery('body').addClass('clickthroughflash');
                });
            });
        });
})(angular);
