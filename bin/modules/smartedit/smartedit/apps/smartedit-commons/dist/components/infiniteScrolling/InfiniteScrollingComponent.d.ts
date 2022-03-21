import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Page } from '@smart/utils';
import { DiscardablePromiseUtils } from '../../utils';
export interface TechnicalUniqueIdAware {
    technicalUniqueId: string;
}
export declare class InfiniteScrollingComponent<T extends TechnicalUniqueIdAware> implements OnInit, OnChanges, AfterViewInit {
    private readonly discardablePromiseUtils;
    private readonly cdr;
    pageSize: number;
    mask: string;
    dropDownContainerClass: string;
    dropDownClass: string;
    distance: number;
    context: {
        items: T[];
    };
    fetchPage: (mask: string, pageSize: number, currentPage: number) => Promise<Page<T>>;
    itemsChange: EventEmitter<T[]>;
    containerElement: ElementRef<HTMLDivElement>;
    contentElement: ElementRef<HTMLDivElement>;
    containerId: string;
    items: T[];
    initiated: boolean;
    currentPage: number;
    pagingDisabled: boolean;
    isLoading: boolean;
    private contentResizeObserver;
    constructor(discardablePromiseUtils: DiscardablePromiseUtils, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    nextPage(): void;
    scrollToTop(): void;
    scrollToBottom(): void;
    private init;
    private initContentResizeObserver;
    private shouldLoadNextPage;
}
