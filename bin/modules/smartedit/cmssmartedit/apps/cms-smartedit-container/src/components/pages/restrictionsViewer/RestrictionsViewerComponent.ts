/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CMSRestriction } from 'cmscommons';
import { LogService, ModalService, SeDowngradeComponent } from 'smarteditcommons';
import { RestrictionsModalComponent } from './RestrictionsModalComponent';

@SeDowngradeComponent()
@Component({
    selector: 'se-restrictions-viewer',
    templateUrl: './RestrictionsViewerComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestrictionsViewerComponent {
    @Input() restrictions: CMSRestriction[];

    constructor(private modalService: ModalService, private logService: LogService) {}

    public showRestrictions(event: Event): Promise<any> {
        event.preventDefault();

        return this.modalService
            .open({
                component: RestrictionsModalComponent,
                data: this.restrictions,
                templateConfig: {
                    title: 'se.cms.restrictionsviewer.title',
                    isDismissButtonVisible: true
                },
                config: {
                    modalPanelClass: 'modal-md'
                }
            })
            .afterClosed.toPromise()
            .catch(() => {
                this.logService.warn('RestrictionsViewer - modal closed without any action');
            });
    }
}
