/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces angular.module:false */
import * as angular from 'angular';
import { LogService } from 'smarteditcommons';
import { ModuleUtils } from './ModuleUtils';

describe('ModuleUtils test', () => {
    let moduleUtils: ModuleUtils;
    let logService: jasmine.SpyObj<LogService>;

    beforeEach(() => {
        logService = jasmine.createSpyObj<LogService>('logService', ['debug', 'error', 'warn']);

        moduleUtils = new ModuleUtils(logService);

        angular.module('mainModule', []);
    });

    it('addModuleToAngularJSApp will attach module as a main module dependency if it exists in angular', () => {
        // GIVEN
        angular.module('ExistentApp', []);
        moduleUtils.addModuleToAngularJSApp('mainModule', 'ExistentApp');

        expect(angular.module('mainModule').requires).toContain('ExistentApp');
    });

    it('addModuleToAngularJSApp will log an error if the module does not exist in angular', () => {
        // WHEN
        moduleUtils.addModuleToAngularJSApp('mainModule', 'NonExistentApp');
        expect(logService.warn).toHaveBeenCalledWith(
            'Failed to load legacy AngularJS module NonExistentApp into mainModule; SmartEdit functionality may be compromised.'
        );
        expect(angular.module('mainModule').requires).not.toContain('NonExistentApp');
    });
});
