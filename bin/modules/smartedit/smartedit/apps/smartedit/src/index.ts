/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import '../styling/less/styling.less';
import '../styling/sass/styles.scss';
import { enableProdMode } from '@angular/core';

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

export { SmarteditFactory } from './smartedit';
export * from './services';
