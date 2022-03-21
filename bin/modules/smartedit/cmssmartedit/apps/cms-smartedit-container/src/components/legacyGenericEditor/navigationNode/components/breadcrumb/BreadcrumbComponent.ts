/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewEncapsulation
} from '@angular/core';
import { CmsitemsRestService } from 'cmscommons';
import { NavigationEditorNodeService } from 'cmssmarteditcontainer/components/navigation/navigationEditor/NavigationEditorNodeService';
import { SeDowngradeComponent, IUriContext, TreeNodeWithLevel } from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-breadcrumb',
    templateUrl: './BreadcrumbComponent.html',
    styleUrls: ['./BreadcrumbComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
/**
 * build a navigation breadcrumb for the Node identified by either uuid or uid
 */
export class BreadcrumbComponent implements OnInit {
    @Input() nodeUid: string;
    @Input() nodeUuid: string;
    @Input() uriContext: IUriContext;

    public breadcrumb: TreeNodeWithLevel[];

    constructor(
        private navigationEditorNodeService: NavigationEditorNodeService,
        private cmsitemsRestService: CmsitemsRestService,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
        if (!this.nodeUid && !this.nodeUuid) {
            throw new Error('BreadcrumbComponent requires either nodeUid or nodeUuid');
        }

        const uid = await this.getUid();
        const ancestry = await this.navigationEditorNodeService.getNavigationNodeAncestry(
            uid,
            this.uriContext
        );

        this.breadcrumb = ancestry;
        this.cdr.detectChanges();
    }

    private async getUid(): Promise<string> {
        if (!this.nodeUid) {
            const cmsItem = await this.cmsitemsRestService.getById(this.nodeUuid);

            return cmsItem.uid;
        }

        return this.nodeUid;
    }
}
