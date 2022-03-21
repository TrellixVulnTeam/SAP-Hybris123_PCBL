import * as angular from 'angular';
import { PersonalizationsmarteditContextService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter';
import { PersonalizationsmarteditContextUtils } from 'personalizationcommons';
import { PersonalizationsmarteditPreviewService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditPreviewService';
export declare class PersonalizationsmarteditCustomizeToolbarContextComponent {
    protected $scope: angular.IScope;
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils;
    protected personalizationsmarteditPreviewService: PersonalizationsmarteditPreviewService;
    protected crossFrameEventService: any;
    protected SHOW_TOOLBAR_ITEM_CONTEXT: any;
    protected HIDE_TOOLBAR_ITEM_CONTEXT: any;
    protected CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY: any;
    visible: boolean;
    title: string;
    subtitle: string;
    private selectedCustomization;
    private selectedVariations;
    constructor($scope: angular.IScope, personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils, personalizationsmarteditPreviewService: PersonalizationsmarteditPreviewService, crossFrameEventService: any, SHOW_TOOLBAR_ITEM_CONTEXT: any, HIDE_TOOLBAR_ITEM_CONTEXT: any, CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY: any);
    $onInit(): void;
    clear(): void;
}
