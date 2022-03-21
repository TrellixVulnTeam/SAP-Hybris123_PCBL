/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISeComponent, SeComponent } from 'smarteditcommons/di';
import { SystemEventService } from '../../../services/SystemEventService';
import { IYEventMessageData } from './IYEventMessageData';

/**
 * **Deprecated since 2005, use {@link MessageComponent}.**
 *
 * The YEventMessage is a wrapper around YMessage, used to display or hide the message based on events sent through the systemEventService.
 *
 * ### Parameters
 *
 * `type` - The YMessage type
 *
 * `title` - The YMessage title
 *
 * `description` - The YMessage description
 *
 * `showEvent` - The event id where the YMessage should be shown. You can update the message or title at this time,
 * by passing a {@link IYEventMessageData} as argument to the event service.
 *
 *
 * `hideEvent` - The event id where the YMessage should be hidden
 *
 * `showToStart` - Controls whether the component is shown right away after compiling the dom
 *
 * @deprecated
 */
@SeComponent({
    template: `
		<div data-recompile-dom="$ctrl.recompile">
			<se-message [type]="$ctrl.type"
				data-ng-if="$ctrl.show">
				<ng-container data-ng-if="$ctrl.title.length" se-message-title>
					{{ $ctrl.title | translate }}
				</ng-container>
				<ng-container data-ng-if="$ctrl.description.length" se-message-description>
					{{ $ctrl.description | translate }}
				</ng-container>
			</se-message>
		</div>
    `,
    inputs: [
        'type: ?',
        'title: ?',
        'description: ?',
        'showEvent: ?',
        'hideEvent: ?',
        'showToStart: ?'
    ]
})
export class YEventMessageComponent implements ISeComponent {
    public type = 'info';
    public title: string;
    public description: string;
    public show = false;
    public showToStart: string | boolean;
    public recompile: () => void;

    private unregisterShowEventHandler: () => void;
    private unregisterHideEventHandler: () => void;

    constructor(private systemEventService: SystemEventService) {}

    $onChanges(changesObj: angular.IOnChangesObject): void {
        if (changesObj.showEvent) {
            this.removeShowEventHandler();
            this.unregisterShowEventHandler = this.systemEventService.subscribe(
                changesObj.showEvent.currentValue,
                (eventId: string, eventData: any) => this.showEventHandler(eventId, eventData)
            );
        }
        if (changesObj.hideEvent) {
            this.removeHideEventHandler();
            this.unregisterHideEventHandler = this.systemEventService.subscribe(
                changesObj.hideEvent.currentValue,
                () => (this.show = false)
            );
        }
        if (this.recompile) {
            this.recompile();
        }
    }

    $onInit(): void {
        this.show = this.showToStart === 'true' || this.showToStart === true;
    }

    $onDestroy(): void {
        this.removeShowEventHandler();
        this.removeHideEventHandler();
    }

    showDescription(): boolean {
        return typeof this.description === 'string' && this.description.length > 0;
    }

    showTitle(): boolean {
        return typeof this.title === 'string' && this.title.length > 0;
    }

    showEventHandler(eventId: string, eventData: IYEventMessageData): void {
        if (eventData.description && eventData.description.length) {
            this.description = eventData.description;
        }
        if (eventData.title && eventData.title.length) {
            this.title = eventData.title;
        }
        this.show = true;
        if (this.recompile) {
            this.recompile();
        }
    }

    private removeHideEventHandler(): void {
        if (this.unregisterHideEventHandler) {
            this.unregisterHideEventHandler();
        }
    }

    private removeShowEventHandler(): void {
        if (this.unregisterShowEventHandler) {
            this.unregisterShowEventHandler();
        }
    }
}
