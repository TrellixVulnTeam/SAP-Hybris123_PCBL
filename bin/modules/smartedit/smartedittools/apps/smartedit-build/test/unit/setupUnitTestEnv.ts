/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// necessary for registration of decorators and hence required by downstream teams that flag smarteditcommons as external
// without smarteditcommons flagged as external, import of functions, like decorators, in downstream extensions fail
import * as angular from 'angular';

beforeEach(
    (angular as any).mock.module(function($provide: any) {
        $provide.value('$log', console);
    })
);
