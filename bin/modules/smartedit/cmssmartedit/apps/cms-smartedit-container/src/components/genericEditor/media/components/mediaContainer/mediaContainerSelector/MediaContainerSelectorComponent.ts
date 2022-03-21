/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {
    ActionableSearchItem,
    GenericEditorField,
    IGenericEditorDropdownSelectedOptionEventData,
    LINKED_DROPDOWN,
    SystemEventService
} from 'smarteditcommons';
import { MediaContainer } from '../MediaContainerComponent';
import { MediaContainerSelectorItemComponent } from '../mediaContainerSelectorItem';

type DropdownItem = IGenericEditorDropdownSelectedOptionEventData<MediaContainer>;

const MediaContainersUri =
    '/cmswebservices/v1/catalogs/CURRENT_CONTEXT_CATALOG/versions/CURRENT_CONTEXT_CATALOG_VERSION/mediacontainers';
const FieldQualifier = 'mediaContainer';

@Component({
    selector: 'se-media-container-selector',
    templateUrl: './MediaContainerSelectorComponent.html',
    styleUrls: ['./MediaContainerSelectorComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MediaContainerSelectorComponent implements OnInit, OnDestroy {
    /** Affix used to create a unique event name of dropdown events such as Select or Create. */
    @Input() eventNameAffix: string;
    @Input() isAdvancedCloning: boolean;
    @Input() name: string;
    @Input() initialName: string;

    @Output() nameChange: EventEmitter<string>;
    @Output() onCreate: EventEmitter<string>;
    @Output() onRemove: EventEmitter<void>;
    @Output() onSelect: EventEmitter<MediaContainer>;
    @Output() onCreationInProgressChange: EventEmitter<boolean>;

    public id: string;
    /** dropdown field. */
    public field: GenericEditorField;
    public mediaContainerNameModel: {
        [FieldQualifier]: string;
    };

    public actionableSearchItem: ActionableSearchItem;
    public itemComponent: typeof MediaContainerSelectorItemComponent;
    public creationInProgress: boolean;

    private unRegSelectMediaContainer: () => void;
    private unRegCreateMediaContainer: () => void;

    constructor(private cdr: ChangeDetectorRef, private systemEventService: SystemEventService) {
        this.nameChange = new EventEmitter();
        this.onCreate = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onCreationInProgressChange = new EventEmitter();

        this.field = {
            cmsStructureType: 'EditableDropdown',
            qualifier: FieldQualifier,
            required: true,
            uri: MediaContainersUri,
            idAttribute: 'qualifier',
            editable: true,
            paged: true
        };

        this.creationInProgress = false;
        this.itemComponent = MediaContainerSelectorItemComponent;
    }

    ngOnInit(): void {
        this.id = `${FieldQualifier}_${this.eventNameAffix}`;

        this.mediaContainerNameModel = {
            [FieldQualifier]: this.initialName
        };

        // name of the event that is triggered when user selects existing media container
        const selectMediaContainerEventName = `${this.id}${LINKED_DROPDOWN}`;
        this.unRegSelectMediaContainer = this.systemEventService.subscribe(
            selectMediaContainerEventName,
            (_eventId, selectedItem: DropdownItem) => this.onSelectItem(selectedItem)
        );

        // name of the event that is triggered when user clicks on "Create" new media container button in dropdown.
        const createMediaContainerEventName = `CREATE_MEDIA_CONTAINER_BUTTON_PRESSED_EVENT_${this.eventNameAffix}`;
        this.actionableSearchItem = {
            eventId: createMediaContainerEventName
        };
        this.unRegCreateMediaContainer = this.systemEventService.subscribe(
            createMediaContainerEventName,
            (_eventId, name: string) => this.onCreateMediaContainer(name)
        );
    }

    ngOnDestroy(): void {
        this.unRegSelectMediaContainer();
        this.unRegCreateMediaContainer();
    }

    public onNameChange(name: string): void {
        this.nameChange.emit(name);
    }

    public isNameReadOnly(): boolean {
        return !this.isAdvancedCloning && !this.creationInProgress && this.isSelected();
    }

    public isSelected(): boolean {
        return !!this.mediaContainerNameModel[FieldQualifier];
    }

    private onSelectItem({ optionObject: selectedMediaContainer }: DropdownItem): void {
        this.setCreationInProgressAndEmit(false);

        if (!this.mediaContainerNameModel.mediaContainer) {
            this.onRemove.emit();
        } else if (!!selectedMediaContainer) {
            this.onSelect.emit(selectedMediaContainer);
        }

        this.cdr.detectChanges();
    }

    private onCreateMediaContainer(name: string): void {
        this.setCreationInProgressAndEmit(true);

        this.onCreate.emit(name);

        this.cdr.detectChanges();
    }

    private setCreationInProgressAndEmit(isInProgress: boolean): void {
        this.creationInProgress = isInProgress;

        this.onCreationInProgressChange.emit(isInProgress);
    }
}
