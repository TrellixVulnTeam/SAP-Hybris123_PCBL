/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const decoratorsToTest = ['Injectable', 'Component'];

const { Injectable, Component } = decoratorsToTest.reduce((acc: any, current: string) => {
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
