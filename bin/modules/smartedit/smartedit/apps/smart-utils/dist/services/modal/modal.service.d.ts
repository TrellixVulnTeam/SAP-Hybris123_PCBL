import { ModalRef as FundamentalModalRef, ModalService as FundamentalModalService } from '@fundamental-ngx/core';
import { IFundamentalModalConfig } from './i-modal.service';
export declare class ModalService {
    protected fundamentalModalService: FundamentalModalService;
    constructor(fundamentalModalService: FundamentalModalService);
    open<T>(options: IFundamentalModalConfig<T>): FundamentalModalRef;
    private openStandalone;
    private openWithTemplate;
}
