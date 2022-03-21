import { IRestOptions, Page, Pageable, Payload, SearchParams, RestServiceFactory } from 'smarteditcommons';
/** @internal */
export declare class DelegateRestService {
    private restServiceFactory;
    constructor(restServiceFactory: RestServiceFactory);
    delegateForSingleInstance<T>(methodName: string, params: string | Payload, uri: string, identifier: string, metadataActivated: boolean, options?: IRestOptions): Promise<T>;
    delegateForArray<T>(methodName: string, params: string | Payload, uri: string, identifier: string, metadataActivated: boolean, options?: IRestOptions): Promise<T[]>;
    delegateForPage<T>(pageable: Pageable, uri: string, identifier: string, metadataActivated: boolean, options?: IRestOptions): Promise<Page<T>>;
    delegateForQueryByPost<T>(payload: Payload, params: SearchParams, uri: string, identifier: string, metadataActivated: boolean, options?: IRestOptions): Promise<T>;
}
