import { FundamentalModalManagerService, TypedMap } from '@smart/utils';
import { Observable } from 'rxjs';
export declare class ConfirmDialogComponent {
    private modalManager;
    constructor(modalManager: FundamentalModalManagerService);
    get modalData(): Observable<any>;
    get descriptionPlaceholders(): Observable<TypedMap<string>>;
}
