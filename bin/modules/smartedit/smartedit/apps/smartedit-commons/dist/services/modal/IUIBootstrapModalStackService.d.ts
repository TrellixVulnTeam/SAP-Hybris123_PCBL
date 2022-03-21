import * as uib from 'angular-ui-bootstrap';
export declare abstract class IUIBootstrapModalStackService implements uib.IModalStackService {
    close(modalInstance: uib.IModalInstanceService, result?: any): void;
    dismiss(modalInstance: uib.IModalInstanceService, reason?: any): void;
    dismissAll(reason?: any): void;
    getTop(): uib.IModalStackedMapKeyValuePair;
    open(modalInstance: uib.IModalInstanceService, modal: any): void;
}
