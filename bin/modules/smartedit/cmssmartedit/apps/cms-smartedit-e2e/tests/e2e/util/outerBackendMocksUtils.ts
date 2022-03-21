/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */
/* forbiddenNameSpaces angular.module:false */
import * as angular from 'angular';
import 'angular-mocks';
import { SeInjectable, SeModule, SeModuleConstructor, TypedMap } from 'smarteditcommons';

@SeInjectable()
export class BackendMocksUtils {
    private _backendMocks: TypedMap<any> = {};

    storeBackendMock(key: string, backendMock: any) {
        this._backendMocks[key] = backendMock;
    }

    getBackendMock(key: string) {
        return this._backendMocks[key];
    }
}
@SeModule({
    providers: [BackendMocksUtils]
})
export class BackendMocksUtilsModule {}

const moduleName = (BackendMocksUtilsModule as SeModuleConstructor).moduleName;

angular.module('smarteditloader').requires.push(moduleName);
angular.module('smarteditcontainer').requires.push(moduleName);
