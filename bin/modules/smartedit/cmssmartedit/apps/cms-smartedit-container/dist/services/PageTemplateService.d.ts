import { CMSPageTypes } from 'cmscommons';
import { IRestServiceFactory, IUriContext } from 'smarteditcommons';
import { PageTemplateType } from './pages/types';
export interface PageTemplateResponse {
    templates: PageTemplateType[];
}
export declare class PageTemplateService {
    private pageTemplateRestService;
    constructor(restServiceFactory: IRestServiceFactory);
    getPageTemplatesForType(uriContext: IUriContext, pageType: CMSPageTypes): Promise<PageTemplateResponse>;
}
