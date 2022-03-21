/// <reference types="angular" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import { SliderPanelConfiguration } from './interfaces';
import { SliderPanelService } from './SliderPanelService';
export declare class SliderPanelServiceFactory {
    private yjQuery;
    constructor(yjQuery: JQueryStatic);
    /**
     * Set and returns a new instance of the slider panel.
     */
    getNewServiceInstance(element: JQuery, window: Window, configuration: SliderPanelConfiguration): SliderPanelService;
}
