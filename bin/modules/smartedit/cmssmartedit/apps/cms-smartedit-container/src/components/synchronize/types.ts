/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import { IUriContext } from 'smarteditcommons';

export interface PageSyncConditions {
    canSyncHomepage: boolean;
    pageHasUnavailableDependencies: boolean;
    pageHasSyncStatus: boolean;
    pageHasNoDepOrNoSyncStatus: boolean;
}

export interface PageSynchronizationPanelModalData {
    cmsPage: ICMSPage;
    uriContext: IUriContext;
}
