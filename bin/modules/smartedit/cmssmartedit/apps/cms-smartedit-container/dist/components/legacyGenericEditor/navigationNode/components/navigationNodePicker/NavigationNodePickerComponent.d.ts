import { OnInit } from '@angular/core';
import { CmsitemsRestService } from 'cmscommons';
import { SystemEventService, IUriContext, TypedMap } from 'smarteditcommons';
import { NavigationNodePickerRenderComponent } from './NavigationNodePickerRenderComponent';
export declare class NavigationNodePickerComponent implements OnInit {
    private cmsitemsRestService;
    private systemEventService;
    uriContext: IUriContext;
    editable: boolean;
    nodeURI: string;
    rootNodeUid: string;
    removeDefaultTemplate: boolean;
    actions: TypedMap<(...args: any[]) => void>;
    nodePickerRenderComponent: typeof NavigationNodePickerRenderComponent;
    constructor(cmsitemsRestService: CmsitemsRestService, systemEventService: SystemEventService);
    ngOnInit(): void;
}
