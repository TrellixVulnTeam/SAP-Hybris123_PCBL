import * as angular from 'angular';
import { PersonalizationsmarteditCombinedViewCommonsService } from 'personalizationsmarteditcontainer/combinedView/PersonalizationsmarteditCombinedViewCommonsService';
import { PersonalizationsmarteditContextService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter';
import { PersonalizationsmarteditContextUtils } from 'personalizationcommons';
export declare class PersonalizationsmarteditCombinedViewToolbarContextComponent {
    protected $scope: angular.IScope;
    protected personalizationsmarteditCombinedViewCommonsService: PersonalizationsmarteditCombinedViewCommonsService;
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils;
    protected crossFrameEventService: any;
    protected SHOW_TOOLBAR_ITEM_CONTEXT: any;
    protected HIDE_TOOLBAR_ITEM_CONTEXT: any;
    protected COMBINED_VIEW_TOOLBAR_ITEM_KEY: any;
    visible: boolean;
    title: string;
    subtitle: string;
    private selectedCustomization;
    constructor($scope: angular.IScope, personalizationsmarteditCombinedViewCommonsService: PersonalizationsmarteditCombinedViewCommonsService, personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils, crossFrameEventService: any, SHOW_TOOLBAR_ITEM_CONTEXT: any, HIDE_TOOLBAR_ITEM_CONTEXT: any, COMBINED_VIEW_TOOLBAR_ITEM_KEY: any);
    $onInit(): void;
    clear(): void;
}
