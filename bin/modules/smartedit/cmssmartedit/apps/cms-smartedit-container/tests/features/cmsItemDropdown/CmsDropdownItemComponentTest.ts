/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { CmsDropdownItemComponent } from 'cmssmarteditcontainer';
import { CMSLinkItem } from 'cmssmarteditcontainer/components/legacyGenericEditor/singleActiveCatalogAwareSelector/types';
import { SystemEventService } from 'smarteditcommons';

describe('CmsDropdownItemComponent', () => {
    let component: CmsDropdownItemComponent;
    let systemEventService: jasmine.SpyObj<SystemEventService>;
    let stopPropagation: jasmine.Spy;
    let event: Event;

    const mockItem = {
        linkTo: 'something',
        slotId: 'slotId'
    } as CMSLinkItem;

    beforeEach(() => {
        systemEventService = jasmine.createSpyObj<SystemEventService>('systemEventService', [
            'publishAsync'
        ]);
        stopPropagation = jasmine.createSpy();
        event = ({ stopPropagation } as unknown) as Event;

        component = new CmsDropdownItemComponent(systemEventService);
    });

    describe('onClick', () => {
        it('WHEN element is clicked AND is selected THEN it should publish an event', () => {
            component.isSelected = true;
            component.item = mockItem;
            component.qualifier = 'name';

            component.onClick(event);

            expect(systemEventService.publishAsync).toHaveBeenCalledWith(
                'ON_EDIT_NESTED_COMPONENT',
                {
                    qualifier: 'name',
                    item: mockItem
                }
            );
        });

        it('WHEN element is clicked AND is NOT selected THEN it should not publish an event', () => {
            component.isSelected = false;
            component.item = mockItem;
            component.qualifier = 'name';

            component.onClick(event);

            expect(systemEventService.publishAsync).not.toHaveBeenCalled();
        });
    });
});
