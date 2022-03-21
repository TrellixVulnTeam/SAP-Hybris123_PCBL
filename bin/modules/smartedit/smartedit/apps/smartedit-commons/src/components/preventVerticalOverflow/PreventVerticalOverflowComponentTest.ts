/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectorRef } from '@angular/core';

import { PreventVerticalOverflowComponent } from './PreventVerticalOverflowComponent';

describe('PreventVerticalOverflowComponent - ', () => {
    let documentElement: jasmine.SpyObj<HTMLElement>;
    let containerNativeElement: jasmine.SpyObj<HTMLDivElement>;
    let cdr: jasmine.SpyObj<ChangeDetectorRef>;

    let component: PreventVerticalOverflowComponent;
    beforeEach(() => {
        documentElement = jasmine.createSpyObj<HTMLElement>('documentElement', [
            'getBoundingClientRect'
        ]);
        const document = ({
            documentElement
        } as unknown) as Document;

        cdr = jasmine.createSpyObj<ChangeDetectorRef>('cdr', ['detectChanges']);

        component = new PreventVerticalOverflowComponent(document, cdr);

        containerNativeElement = jasmine.createSpyObj<HTMLDivElement>('containerNativeElement', [
            'getBoundingClientRect'
        ]);
        component.containerElement = {
            nativeElement: containerNativeElement
        };
    });

    it('WHEN zoom in AND container overflows document THEN it will sets styles to prevent overflow', () => {
        containerNativeElement.getBoundingClientRect.and.returnValue({
            height: 100,
            top: 50
        });

        documentElement.getBoundingClientRect.and.returnValue({
            height: 140
        });

        (component as any).onResize();

        expect(component.containerStyle['max-height.px']).toBe(90);
        expect(component.containerStyle.overflow).toBe('auto');
    });

    it('WHEN zoom in AND container does not overflow document THEN it will not styles to prevent overflow', () => {
        containerNativeElement.getBoundingClientRect.and.returnValue({
            height: 100,
            top: 50
        });

        documentElement.getBoundingClientRect.and.returnValue({
            height: 300
        });

        (component as any).onResize();

        expect(component.containerStyle['max-height.px']).toBe(null);
        expect(component.containerStyle.overflow).toBe(null);
    });

    it('GIVEN is zoomed in and overflow is applied WHEN zoom out AND that zoom requires overflow THEN it will reapply overflow', () => {
        containerNativeElement.getBoundingClientRect.and.returnValue({
            height: 100,
            top: 50
        });

        documentElement.getBoundingClientRect.and.returnValue({
            height: 130
        });
        (component as any).onResize();
        expect(component.containerStyle['max-height.px']).toBe(80);

        // WHEN
        containerNativeElement.getBoundingClientRect.and.returnValue({
            height: 100,
            top: 40
        });
        (component as any).onResize();

        // THEN
        expect(component.containerStyle['max-height.px']).toBe(90);
    });

    it('GIVEN is zoomed in and overflow is applied WHEN zoom out AND zoom does not require overflow THEN overflow styles are removed', () => {
        containerNativeElement.getBoundingClientRect.and.returnValue({
            height: 100,
            top: 50
        });

        documentElement.getBoundingClientRect.and.returnValue({
            height: 130
        });

        (component as any).onResize();
        expect(component.containerStyle['max-height.px']).toBe(80);

        // WHEN
        containerNativeElement.getBoundingClientRect.and.returnValue({
            height: 100,
            top: 20
        });
        (component as any).onResize();

        // THEN
        expect(component.containerStyle['max-height.px']).toBe(null);
    });
});
