/// <reference types="angular" />
/// <reference types="jquery" />
import './PerspectiveSelectorComponent.scss';
import { OnDestroy, OnInit } from '@angular/core';
import { CrossFrameEventService, IIframeClickDetectionService, IPerspective, IPerspectiveService, LogService, SystemEventService, TestModeService } from 'smarteditcommons';
export declare class PerspectiveSelectorComponent implements OnInit, OnDestroy {
    private logService;
    private yjQuery;
    private perspectiveService;
    private iframeClickDetectionService;
    private systemEventService;
    private crossFrameEventService;
    private testModeService;
    isOpen: boolean;
    popperOptions: {
        placement: string;
        modifiers: {
            preventOverflow: {
                enabled: boolean;
                escapeWithReference: boolean;
                boundariesElement: string;
            };
            applyStyle: {
                gpuAcceleration: boolean;
            };
        };
    };
    isDisabled: boolean;
    private perspectives;
    private displayedPerspectives;
    private unRegOverlayDisabledFn;
    private unRegPerspectiveAddedFn;
    private unRegPerspectiveChgFn;
    private unRegUserHasChanged;
    private unRegPerspectiveRefreshFn;
    private unRegStrictPreviewModeToggleFn;
    private activePerspective;
    constructor(logService: LogService, yjQuery: JQueryStatic, perspectiveService: IPerspectiveService, iframeClickDetectionService: IIframeClickDetectionService, systemEventService: SystemEventService, crossFrameEventService: CrossFrameEventService, testModeService: TestModeService);
    onDocumentClick(event: Event): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectPerspective(event: Event, choice: string): void;
    getDisplayedPerspectives(): IPerspective[];
    getActivePerspectiveName(): string;
    hasActivePerspective(): boolean;
    isTooltipVisible(): boolean;
    private checkTooltipVisibilityCondition;
    private filterPerspectives;
    private closeDropdown;
    private onPerspectiveAdded;
    private refreshPerspectives;
    private _refreshActivePerspective;
    private onClickHandler;
    private togglePerspectiveSelector;
}
