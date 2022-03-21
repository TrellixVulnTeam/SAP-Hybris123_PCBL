import { SmarteditRoutingService } from 'smarteditcommons';
import { IframeManagerService } from 'smarteditcontainer/services/iframe/IframeManagerService';
import './sitesLink.scss';
export declare class SitesLinkComponent {
    private routingService;
    private iframeManagerService;
    cssClass: string;
    iconCssClass: string;
    shortcutLink: any;
    constructor(routingService: SmarteditRoutingService, iframeManagerService: IframeManagerService);
    goToSites(): void;
}
