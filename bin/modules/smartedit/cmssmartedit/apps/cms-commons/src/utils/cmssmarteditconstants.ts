/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Constants identifying CMS drag and drop events.
 */
export enum DRAG_AND_DROP_EVENTS {
    /**
     * Name of event executed when a drag and drop event starts.
     */
    DRAG_STARTED = 'CMS_DRAG_STARTED',
    /**
     * Name of event executed when a drag and drop event stops.
     */
    DRAG_STOPPED = 'CMS_DRAG_STOPPED',
    /**
     * Name of event executed when onDragOver is triggered.
     */
    DRAG_OVER = 'CMS_DRAG_OVER',
    /**
     * Name of event executed when onDragLeave is triggered.
     */
    DRAG_LEAVE = 'CMS_DRAG_LEAVE'
}

export const COMPONENT_CREATED_EVENT = 'COMPONENT_CREATED_EVENT';
export const COMPONENT_REMOVED_EVENT = 'COMPONENT_REMOVED_EVENT';
export const COMPONENT_UPDATED_EVENT = 'COMPONENT_UPDATED_EVENT';

export const CMSITEMS_UPDATE_EVENT = 'CMSITEMS_UPDATE';
export const ACTIONABLE_ALERT_CONSTANTS = {
    /**
     * Lodash template defining the HTML content inserted within the
     * actionableAlert.
     * Below are listed the placeholders you can use which will get substituted
     * at run-time:
     *  - description - Text related to the associated cmsItem
     *  - descriptionDetails - Map of parameters passed to the translated description
     *  - hyperlinkLabel - Label for the hyperlink rendered within the
     *  - hyperlinkDetails - Map of parameters passed to the translated hyperlink
     *  contextual alert
     **/
    ALERT_TEMPLATE:
        "<div><p>{{ $alertInjectedCtrl.description | translate: $alertInjectedCtrl.descriptionDetails }}</p><div><a data-ng-click='alert.hide(); $alertInjectedCtrl.onClick();'>{{ $alertInjectedCtrl.hyperlinkLabel | translate: $alertInjectedCtrl.hyperlinkDetails }}</a></div></div>",

    /**
     * The timeout duration of the cms alert item, in milliseconds.
     */
    TIMEOUT_DURATION: 20000,

    /**
     * Injectable angular constant
     *
     * This object provides an enumeration with values for each of the possible types of alerts
     * that can be opened with the actionableAlertService. Currently the available options are:
     * INFO, ALERT, DANGER, WARNING and SUCCESS.
     */
    ALERT_TYPES: {
        INFO: 'INFO',
        ALERT: 'ALERT',
        DANGER: 'DANGER',
        WARNING: 'WARNING',
        SUCCESS: 'SUCCESS'
    }
};

export const EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV = 'EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV';

export const NAVIGATION_NODE_TYPECODE = 'CMSNavigationNode';
export const NAVIGATION_NODE_ROOT_NODE_UID = 'root';

export const IMAGES_URL = '/cmssmartedit/images';
