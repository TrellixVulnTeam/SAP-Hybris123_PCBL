/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    ViewChild
} from '@angular/core';

import { SeDowngradeComponent } from '../../di';
import { Nullable } from '../../dtos';

/**
 * Component used to detect whether it's children are vertically overflowing the document.
 *
 * In case of overflow it sets it's max-height to the difference between top position and document bottom, and enables scrolling.
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-prevent-vertical-overflow',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div #container [ngStyle]="containerStyle">
            <ng-content></ng-content>
        </div>
    `
})
export class PreventVerticalOverflowComponent implements AfterViewInit, OnDestroy {
    @ViewChild('container', { static: false }) containerElement: ElementRef<HTMLDivElement>;

    public containerStyle: {
        'max-height.px': Nullable<number>;
        overflow: Nullable<string>;
    } = {
        'max-height.px': null,
        overflow: null
    };
    private observer: IntersectionObserver;

    constructor(@Inject(DOCUMENT) private document: Document, private cdr: ChangeDetectorRef) {}

    @HostListener('window:resize')
    onWindowResize(): void {
        if (this.containerElement) {
            this.onResize();
        }
    }

    ngAfterViewInit(): void {
        // when user opens popover, it will be called once to check for overflow
        this.observer = new IntersectionObserver(
            ([event]: IntersectionObserverEntry[]) => {
                if (event.isIntersecting) {
                    this.onResize();
                }
            },
            { root: (this.document as unknown) as Element, threshold: 0 }
        );
        this.observer.observe(this.containerElement.nativeElement);
    }

    ngOnDestroy(): void {
        this.observer.unobserve(this.containerElement.nativeElement);
    }

    private onResize(): void {
        const { top, height } = this.getContainerBoundingClientRect();
        // popover is not opened
        if (top === 0 && height === 0) {
            return;
        }
        this.preventOverflow(top, height);
    }

    private preventOverflow(containerTop: number, containerHeight: number): void {
        const didPrevent = this.preventIfOverflowing(containerTop, containerHeight);
        // If I zoom out, "didPrevent" may return false because it has set overflow and max-height.
        // In such a case, I need either to stop preventing overflow or stretch the container height for better UX.
        // To achieve that, I display it without max-height being set and then I check again whether it is overflowing.
        // If it is, I stretch the container. If it doesn't, remove max-height and overflow styles so it sets the height based on its content.
        if (!didPrevent && this.containerStyle['max-height.px']) {
            this.reset();
            const { top, height } = this.getContainerBoundingClientRect();
            this.preventIfOverflowing(top, height);
        }
    }

    private preventIfOverflowing(top: number, height: number): boolean {
        if (this.isOverflowing(top, height)) {
            this.prevent(top);
            return true;
        }
        return false;
    }

    private isOverflowing(top: number, height: number): boolean {
        const documentHeight = this.getDocumentHeight();
        return documentHeight < top + height;
    }

    private prevent(elementTop: number): void {
        const documentHeight = this.getDocumentHeight();
        const maxHeight = documentHeight - elementTop;

        this.containerStyle['max-height.px'] = maxHeight;
        this.containerStyle.overflow = 'auto';
        this.cdr.detectChanges();
    }

    private reset(): void {
        this.containerStyle['max-height.px'] = null;
        this.containerStyle.overflow = null;
        this.cdr.detectChanges();
    }

    private getContainerBoundingClientRect(): ClientRect {
        return this.containerElement.nativeElement.getBoundingClientRect();
    }

    private getDocumentHeight(): number {
        const { height } = this.document.documentElement.getBoundingClientRect();
        return height;
    }
}
