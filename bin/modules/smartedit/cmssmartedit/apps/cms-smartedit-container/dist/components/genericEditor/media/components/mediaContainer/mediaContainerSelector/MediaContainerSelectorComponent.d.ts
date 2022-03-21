import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActionableSearchItem, GenericEditorField, SystemEventService } from 'smarteditcommons';
import { MediaContainer } from '../MediaContainerComponent';
import { MediaContainerSelectorItemComponent } from '../mediaContainerSelectorItem';
declare const FieldQualifier = "mediaContainer";
export declare class MediaContainerSelectorComponent implements OnInit, OnDestroy {
    private cdr;
    private systemEventService;
    eventNameAffix: string;
    isAdvancedCloning: boolean;
    name: string;
    initialName: string;
    nameChange: EventEmitter<string>;
    onCreate: EventEmitter<string>;
    onRemove: EventEmitter<void>;
    onSelect: EventEmitter<MediaContainer>;
    onCreationInProgressChange: EventEmitter<boolean>;
    id: string;
    field: GenericEditorField;
    mediaContainerNameModel: {
        [FieldQualifier]: string;
    };
    actionableSearchItem: ActionableSearchItem;
    itemComponent: typeof MediaContainerSelectorItemComponent;
    creationInProgress: boolean;
    private unRegSelectMediaContainer;
    private unRegCreateMediaContainer;
    constructor(cdr: ChangeDetectorRef, systemEventService: SystemEventService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onNameChange(name: string): void;
    isNameReadOnly(): boolean;
    isSelected(): boolean;
    private onSelectItem;
    private onCreateMediaContainer;
    private setCreationInProgressAndEmit;
}
export {};
