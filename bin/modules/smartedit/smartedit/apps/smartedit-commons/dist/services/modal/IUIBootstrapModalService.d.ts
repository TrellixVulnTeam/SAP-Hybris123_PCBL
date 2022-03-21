import * as angular from 'angular';
import * as uib from 'angular-ui-bootstrap';
export declare abstract class IUIBootstrapModalService implements uib.IModalService {
    getPromiseChain(): angular.IPromise<any>;
    open(options: uib.IModalSettings): uib.IModalInstanceService;
}
