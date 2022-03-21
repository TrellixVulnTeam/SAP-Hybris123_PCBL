/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const decoratorsToTest = [
    'Injectable',
    'Component',
    'SeInjectable',
    'SeDirective',
    'SeComponent',
    'SeDecorator',
    'SeDowngradeService',
    'SeDowngradeComponent',
    'SeModule',
    'Injectable'
];

const {
    SeInjectable,
    SeDirective,
    SeComponent,
    SeDecorator,
    SeDowngradeService,
    SeDowngradeComponent,
    SeModule,
    Injectable,
    Component
} = decoratorsToTest.reduce((acc: any, current: string) => {
    acc[current] = function(providedConstructor: any) {
        return providedConstructor;
    };
}, {});

@Injectable({
    data: 'some data'
})
export class InjectableTest {
    constructor($log: any) {}
}

@Component({
    data: 'other data'
})
export class ComponentTest {
    constructor($log: any) {}
}

@SeInjectable()
export class SeInjectableTest {
    constructor($log: any) {}
}

@SeDirective()
export class SeDirectiveTest {
    constructor($log: any) {}
}

@SeComponent()
export class SeComponentTest {
    constructor($log: any) {}
}

@SeDecorator()
export class SeDecoratorTest {
    constructor($log: any) {}
}

@SeDowngradeService()
export class SeDowngradeServiceTest {
    constructor($log: any) {}
}

@SeDowngradeComponent()
export class SeDowngradeComponentTest {
    constructor($log: any) {}
}

@SeModule()
export class SeModuleTest {
    constructor($log: any) {}
}
