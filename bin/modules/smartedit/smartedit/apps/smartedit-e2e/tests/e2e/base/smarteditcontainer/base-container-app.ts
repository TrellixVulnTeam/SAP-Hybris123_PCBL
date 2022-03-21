/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/weak-set';
import 'core-js/es/weak-map';
import 'core-js/es/set';
import 'core-js/es/typed-array';
import 'core-js/es/promise';
import 'core-js/es/reflect';
import 'core-js/proposals/reflect-metadata';
import 'resize-observer-polyfill';
import 'whatwg-fetch';

import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';

import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js';

import './thirdparties';

// since styles.css of smarteditloader is empty, import smarteditcommons here
require('smarteditcommons/dist/styles.css');
require('smarteditcontainer/dist/styles.css');
import 'smarteditcontainer';
require('smarteditloader/dist/styles.css');
import 'smarteditloader';
