/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as uib from 'angular-ui-bootstrap';

export abstract class IUIBootstrapModalService implements uib.IModalService {
    getPromiseChain(): angular.IPromise<any> {
        return null;
    }

    open(options: uib.IModalSettings): uib.IModalInstanceService {
        return null;
    }
}
