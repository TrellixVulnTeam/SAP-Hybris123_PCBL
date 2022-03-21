/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('slotSharedButtonModule', function () {
    describe('slotSharedButtonController', function () {
        var controller;
        var crossFrameEventService;
        var slotSharedService;
        var componentHandlerService;
        var catalogService;
        var mocks;
        var $rootScope;
        var $q;
        var $translate;
        var reload = function () {};

        beforeEach(function () {
            var harness = AngularUnitTestHelper.prepareModule('slotSharedButtonModule')
                .mock('slotSharedService', 'isSlotShared')
                .and.returnResolvedPromise(true)
                .mock('slotSharedService', 'replaceGlobalSlot')
                .and.returnResolvedPromise({})
                .mock('slotSharedService', 'replaceSharedSlot')
                .and.returnResolvedPromise({})
                .mock('componentHandlerService', 'isExternalComponent')
                .and.returnResolvedPromise(true)
                .mock('crossFrameEventService', 'subscribe')
                .mock('catalogService', 'isCurrentCatalogMultiCountry')
                .and.returnResolvedPromise(true)
                .mock('$window', 'location')
                .mockConstant('EVENT_OUTER_FRAME_CLICKED', 'EVENT_OUTER_FRAME_CLICKED')
                .controller('slotSharedButtonController', {});

            controller = harness.controller;
            crossFrameEventService = harness.mocks.crossFrameEventService;
            slotSharedService = harness.mocks.slotSharedService;
            catalogService = harness.mocks.catalogService;
            componentHandlerService = harness.mocks.componentHandlerService;
            harness.mocks.$window.location.reload = reload;
            $q = harness.injected.$q;

            $translate = jasmine.createSpyObj('$translate', ['instant']);

            controller.setRemainOpen = function () {};
            $rootScope = harness.injected.$rootScope;

            mocks = harness.mocks;
        });

        it('.isPopupOpened is initialized to false', function () {
            expect(controller.isPopupOpened).toEqual(false);
        });

        it('.isPopupOpenedPreviousValue is initialized to false', function () {
            expect(controller.isPopupOpenedPreviousValue).toEqual(false);
        });

        it('will set isPopupOpenedPreviousValue to true when .isPopupOpened is true on a $doCheck() lifecycle call', function () {
            // Given
            controller.isPopupOpenedPreviousValue = false;
            controller.isPopupOpened = true;

            // When
            controller.$doCheck();

            // Then
            expect(controller.isPopupOpenedPreviousValue).toEqual(true);
        });

        it('will set isPopupOpenedPreviousValue to false when .isPopupOpened is false on a $doCheck() lifecycle call', function () {
            // Given
            controller.isPopupOpenedPreviousValue = true;
            controller.isPopupOpened = false;

            // When
            controller.$doCheck();

            // Then
            expect(controller.isPopupOpenedPreviousValue).toEqual(false);
        });

        it('will set isPopupOpenedPreviousValue to false when .isPopupOpened is false on a $doCheck() lifecycle call', function () {
            // Given
            controller.isPopupOpenedPreviousValue = true;
            controller.isPopupOpened = false;

            // When
            controller.$doCheck();

            // Then
            expect(controller.isPopupOpenedPreviousValue).toEqual(false);
        });

        it('will not change when isPopupOpenedPreviousValue and .isPopupOpened are both true on a $doCheck() lifecycle call', function () {
            // Given
            controller.isPopupOpenedPreviousValue = true;
            controller.isPopupOpened = true;

            // When
            controller.$doCheck();

            // Then
            expect(controller.isPopupOpenedPreviousValue).toEqual(true);
        });

        it('will not change when .isPopupOpenedPreviousValue and .isPopupOpened are both false on a $doCheck() lifecycle call', function () {
            // Given
            controller.isPopupOpenedPreviousValue = false;
            controller.isPopupOpened = false;

            // When
            controller.$doCheck();

            // Then
            expect(controller.isPopupOpenedPreviousValue).toEqual(false);
        });

        it('if it is a global slot when replaceSlot is called', function () {
            // Given
            controller.isPopupOpened = true;
            controller.isGlobalSlot = true;

            // When
            controller.replaceSlot();
            $rootScope.$digest();

            // Then
            expect(slotSharedService.replaceGlobalSlot).toHaveBeenCalledWith(undefined);
            expect(controller.isPopupOpened).toEqual(false);
        });

        it('if it is a shared slot when replaceSlot is called', function () {
            // Given
            controller.isPopupOpened = true;
            controller.isMultiCountry = false;
            controller.isExternalSlot = false;
            controller.isSlotShared = true;

            // When
            controller.replaceSlot();
            $rootScope.$digest();

            // Then
            expect(slotSharedService.replaceSharedSlot).toHaveBeenCalledWith(undefined);
            expect(controller.isPopupOpened).toEqual(false);
        });
    });
});
