/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-set';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';
import 'core-js/es6/typed';
import 'core-js/es6/promise';
import 'core-js/es7/reflect';
import 'intersection-observer';

if (!(window as any).Zone) {
    require('zone.js/dist/zone.js');
}

import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js';

import * as lodash from 'lodash';

declare global {
    interface Window {
        smarteditLodash: lodash.LoDashStatic;
    }
}

const $: any = (window as any).$;

if (!window.smarteditJQuery && $ && $.noConflict) {
    (window.smarteditJQuery as any) = $.noConflict();
}

window.smarteditLodash = lodash.noConflict();
