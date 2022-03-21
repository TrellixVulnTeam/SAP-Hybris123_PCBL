/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CmsDragAndDropService } from 'cmssmarteditcontainer/services';
import {
    DragAndDropConfiguration,
    DragAndDropService,
    GatewayFactory,
    ISharedDataService,
    MessageGateway,
    SystemEventService
} from 'smarteditcommons';
import { jQueryHelper } from 'testhelpers';

describe('CmsDragAndDropServiceOuter', () => {
    const ID_ATTRIBUTE = 'data-smartedit-component-id';
    const UUID_ATTRIBUTE = 'data-smartedit-component-uuid';
    const TYPE_ATTRIBUTE = 'data-smartedit-component-type';
    const CMS_DRAG_AND_DROP_ID = 'se.cms.dragAndDrop';

    let dragAndDropService: jasmine.SpyObj<DragAndDropService>;
    let gateway: jasmine.SpyObj<MessageGateway>;
    let gatewayFactory: jasmine.SpyObj<GatewayFactory>;
    let sharedDataService: jasmine.SpyObj<ISharedDataService>;
    let systemEventService: jasmine.SpyObj<SystemEventService>;

    let cmsDragAndDropService: CmsDragAndDropService;
    let cmsDragAndDropServiceAny: any;
    beforeEach(() => {
        dragAndDropService = jasmine.createSpyObj<DragAndDropService>('dragAndDropService', [
            'register',
            'unregister',
            'apply',
            'update'
        ]);

        gateway = jasmine.createSpyObj<MessageGateway>('gateway', ['publish']);
        gatewayFactory = jasmine.createSpyObj<GatewayFactory>('gatewayFactory', ['createGateway']);
        gatewayFactory.createGateway.and.returnValue(gateway);

        sharedDataService = jasmine.createSpyObj<ISharedDataService>('sharedDataService', ['get']);

        systemEventService = jasmine.createSpyObj<SystemEventService>('systemEventService', [
            'publishAsync'
        ]);

        cmsDragAndDropService = new CmsDragAndDropService(
            dragAndDropService,
            gatewayFactory,
            sharedDataService,
            systemEventService,
            jQueryHelper.jQuery()
        );
        cmsDragAndDropServiceAny = cmsDragAndDropService;
    });

    it('WHEN cmsDragAndDropService is created THEN a gateway is created to communicate with the inner frame', () => {
        // THEN
        expect(gatewayFactory.createGateway).toHaveBeenCalledWith('cmsDragAndDrop');
        expect(cmsDragAndDropServiceAny.gateway).toBe(gateway);
    });

    describe('register', () => {
        it('WHEN register is called THEN it is registered in the base drag and drop service', () => {
            // WHEN
            cmsDragAndDropService.register();

            // THEN
            const arg = dragAndDropService.register.calls.argsFor(0)[0];
            expect(dragAndDropService.register).toHaveBeenCalled();
            expect(arg.id).toBe(CMS_DRAG_AND_DROP_ID);
            expect(arg.sourceSelector).toBe(
                ".smartEditComponent[data-smartedit-component-type!='ContentSlot']"
            );
            expect(arg.targetSelector).toBe('');
            expect(arg.enableScrolling).toBe(false);
        });

        it('WHEN register is called THEN it is registered with the right onStart callback', () => {
            // GIVEN
            spyOn(cmsDragAndDropServiceAny, 'onStart').and.returnValue(undefined);

            // WHEN
            cmsDragAndDropService.register();

            // THEN
            const arg = dragAndDropService.register.calls.argsFor(0)[0] as DragAndDropConfiguration;
            arg.startCallback(null);
            expect(cmsDragAndDropServiceAny.onStart).toHaveBeenCalled();
        });

        it('WHEN register is called THEN it is registered with the right onStop callback', () => {
            // GIVEN
            spyOn(cmsDragAndDropServiceAny, 'onStop').and.returnValue(undefined);

            // WHEN
            cmsDragAndDropService.register();

            // THEN
            const arg = dragAndDropService.register.calls.argsFor(0)[0] as DragAndDropConfiguration;
            arg.stopCallback(null);
            expect(cmsDragAndDropServiceAny.onStop).toHaveBeenCalled();
        });
    });

    it('WHEN apply is called THEN the cms service is applied in the base drag and drop service', () => {
        // WHEN
        cmsDragAndDropService.apply();

        // THEN
        expect(dragAndDropService.apply).toHaveBeenCalled();
    });

    it('WHEN update is called THEN the cms service is updated in the base drag and drop service', () => {
        // WHEN
        cmsDragAndDropService.update();

        // THEN
        expect(dragAndDropService.update).toHaveBeenCalledWith(CMS_DRAG_AND_DROP_ID);
    });

    it('WHEN unregister is called THEN the cms service is unregistered from the base drag and drop service', () => {
        // WHEN
        cmsDragAndDropService.unregister();

        // THEN
        expect(dragAndDropService.unregister).toHaveBeenCalledWith([CMS_DRAG_AND_DROP_ID]);
    });

    it('WHEN drag is started THEN the service informs other components', async () => {
        // GIVEN
        const componentInfo = {
            id: 'some id',
            uuid: 'some uuid',
            type: 'some type'
        };
        const component = jasmine.createSpyObj('component', ['attr']);
        component.attr.and.callFake((arg: string) => {
            if (arg === ID_ATTRIBUTE) {
                return componentInfo.id;
            } else if (arg === UUID_ATTRIBUTE) {
                return componentInfo.uuid;
            } else if (arg === TYPE_ATTRIBUTE) {
                return componentInfo.type;
            }
            throw new Error('attribute not found');
        });

        const event = {
            target: 'some target'
        };
        const draggedElement = {
            closest: () => component
        };

        spyOn(cmsDragAndDropServiceAny, 'getSelector').and.returnValue(draggedElement);
        sharedDataService.get.and.returnValue(Promise.resolve(false));

        // WHEN
        await cmsDragAndDropServiceAny.onStart(event);

        // THEN
        expect(cmsDragAndDropServiceAny.gateway.publish).toHaveBeenCalledWith('CMS_DRAG_STARTED', {
            componentId: componentInfo.id,
            componentUuid: componentInfo.uuid,
            componentType: componentInfo.type,
            slotId: null,
            slotUuid: null,
            cloneOnDrop: false
        });
        expect(systemEventService.publishAsync).toHaveBeenCalledWith('CMS_DRAG_STARTED');
    });

    it('WHEN drag is stopped THEN the inner frame is informed', () => {
        // WHEN
        cmsDragAndDropServiceAny.onStop();

        // THEN
        expect(cmsDragAndDropServiceAny.gateway.publish).toHaveBeenCalledWith(
            'CMS_DRAG_STOPPED',
            null
        );
    });
});
