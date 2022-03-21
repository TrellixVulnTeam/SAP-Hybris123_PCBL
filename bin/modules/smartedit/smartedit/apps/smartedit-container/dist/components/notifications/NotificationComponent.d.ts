import { OnInit } from '@angular/core';
import { INotificationConfiguration } from 'smarteditcommons';
export declare class NotificationComponent implements OnInit {
    notification: INotificationConfiguration;
    id: string;
    ngOnInit(): void;
    hasTemplate(): boolean;
    hasTemplateUrl(): boolean;
    hasComponent(): boolean;
}
