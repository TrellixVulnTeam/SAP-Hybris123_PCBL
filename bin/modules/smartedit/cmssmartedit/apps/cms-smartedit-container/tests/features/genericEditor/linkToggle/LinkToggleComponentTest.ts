/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import {
    LinkToggleComponent,
    LinkToggleDTO
} from 'cmssmarteditcontainer/components/legacyGenericEditor/linkToggle/LinkToggleComponent';
import { GenericEditorWidgetData } from 'smarteditcommons';

describe('LinkToggleComponent', () => {
    let component: LinkToggleComponent;
    let injectedData: GenericEditorWidgetData<LinkToggleDTO>;

    it('WHEN created THEN it should set model and field and set initial value for linkToggle', () => {
        injectedData = {
            field: { cmsStructureType: 'LinkToggle', qualifier: 'linkToggle' },
            model: {}
        } as GenericEditorWidgetData<LinkToggleDTO>;

        component = new LinkToggleComponent(injectedData);

        expect(component.field).toEqual({
            cmsStructureType: 'LinkToggle',
            qualifier: 'linkToggle'
        });
        expect(component.model).toEqual({ linkToggle: { external: true } });
    });

    it('WHEN created and link toggle is defined but value of external field is undefined THEN it should be set to true by default', () => {
        injectedData = {
            field: { cmsStructureType: 'LinkToggle', qualifier: 'linkToggle' },
            model: { linkToggle: {} }
        } as GenericEditorWidgetData<LinkToggleDTO>;

        component = new LinkToggleComponent(injectedData);

        expect(component.model).toEqual({ linkToggle: { external: true } });
    });

    it('WHEN created and value of external is set to false THEN it should remain with that value', () => {
        injectedData = {
            field: { cmsStructureType: 'LinkToggle', qualifier: 'linkToggle' },
            model: { linkToggle: { external: false, urlLink: '/some/link' } }
        } as GenericEditorWidgetData<LinkToggleDTO>;

        component = new LinkToggleComponent(injectedData);

        expect(component.model).toEqual({ linkToggle: { external: false, urlLink: '/some/link' } });
    });
});
