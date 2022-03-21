/// <reference types="angular" />
import { ISeComponent } from 'smarteditcommons/di';
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
export declare class YEventMessageComponent implements ISeComponent {
    private systemEventService;
    type: string;
    title: string;
    description: string;
    show: boolean;
    showToStart: string | boolean;
    recompile: () => void;
    private unregisterShowEventHandler;
    private unregisterHideEventHandler;
    constructor(systemEventService: SystemEventService);
    $onChanges(changesObj: angular.IOnChangesObject): void;
    $onInit(): void;
    $onDestroy(): void;
    showDescription(): boolean;
    showTitle(): boolean;
    showEventHandler(eventId: string, eventData: IYEventMessageData): void;
    private removeHideEventHandler;
    private removeShowEventHandler;
}
