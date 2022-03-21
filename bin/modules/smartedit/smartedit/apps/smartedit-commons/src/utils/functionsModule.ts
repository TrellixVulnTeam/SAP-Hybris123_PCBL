/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-classes-per-file */
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import {
    booleanUtils,
    urlUtils,
    BooleanUtils,
    CloneableUtils,
    CryptographicUtils,
    FunctionsUtils,
    LogService,
    PromiseUtils,
    UrlUtils,
    URIBuilder
} from '@smart/utils';
import * as angular from 'angular';
import { SeModule } from 'smarteditcommons/di/SeModule';
import { SeFactory } from 'smarteditcommons/di/types';
import { JQueryUtilsService } from '../services';
import { apiUtils } from './ApiUtils';
import { dateUtils } from './DateUtils';
import { DiscardablePromiseUtils } from './DiscardablePromiseUtils';
import { Errors } from './errors';
import { ModuleUtils } from './ModuleUtils';
import { nodeUtils, NodeUtils } from './NodeUtils';
import { objectUtils } from './ObjectUtils';
import { scriptUtils } from './ScriptUtils';
import { EXTENDED_VIEW_PORT_MARGIN } from './smarteditconstants';
import { stringUtils, StringUtils } from './StringUtils';
import { windowUtils } from './WindowUtils';

/**
 * Provides a list of useful functions that can be used as part of the SmartEdit framework.
 */
@SeModule({
    providers: [
        BooleanUtils,
        CloneableUtils,
        UrlUtils,
        CryptographicUtils,
        FunctionsUtils,
        LogService,
        ModuleUtils,
        NodeUtils,
        PromiseUtils,
        StringUtils,
        DiscardablePromiseUtils,
        {
            provide: 'ParseError',
            useFactory: () => Errors.ParseError
        },
        /**
         * **Deprecated since 2005, use `import { urlUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'getAbsoluteURL',
            useFactory: () => urlUtils.getAbsoluteURL
        },
        /**
         * **Deprecated since 2005, use `import { urlUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'getOrigin',
            useFactory: () => urlUtils.getOrigin
        },
        /**
         * **Deprecated since 1905, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'isBlank',
            useFactory: () => stringUtils.isBlank
        },
        /**
         * Pprovides a convenience to either default a new child or "extend" an existing child with the prototype of the parent
         *
         * @param ParentClass which has a prototype you wish to extend.
         * @param ChildClass will have its prototype set.
         *
         * @returns ChildClass which has been extended
         */
        {
            provide: 'extend',
            useFactory: () => (ParentClass: SeFactory, ChildClass?: SeFactory) => {
                if (!ChildClass) {
                    ChildClass = function () {
                        return;
                    };
                }
                ChildClass.prototype = Object.create(ParentClass.prototype);
                return ChildClass;
            }
        },
        /**
         * Will call the javascrit's native setTimeout method to execute a given function after a specified period of time.
         * This method is better than using $timeout since it is difficult to assert on $timeout during end-to-end testing.
         *
         * @param func function that needs to be executed after the specified duration.
         * @param duration time in milliseconds.
         */
        {
            provide: 'customTimeout',
            useFactory: () => (func: SeFactory, duration: number) => {
                setTimeout(function () {
                    func();
                }, duration);
            }
        },
        /**
         * **Deprecated since 1905, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'copy',
            useFactory: () => objectUtils.copy
        },
        /**
         * **Deprecated since 1905, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'merge',
            useFactory: () => objectUtils.merge
        },
        /**
         * **Deprecated since 1905, use `import { urlUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'getQueryString',
            useFactory: () => urlUtils.getQueryString
        },
        /**
         * **Deprecated since 1905, use `import { urlUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'getURI',
            useFactory: () => urlUtils.getURI
        },
        /**
         * **Deprecated since 1905, use `import { urlUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'parseQuery',
            useFactory: () => urlUtils.parseQuery
        },
        /**
         * **Deprecated since 2005, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'trim',
            useFactory: () => stringUtils.trim
        },
        /**
         * **Deprecated since 2005, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'convertToArray',
            useFactory: () => objectUtils.convertToArray
        },
        /**
         * **Deprecated since 2005, use `import { scriptUtils } from 'smarteditcommons'`.**
         *
         * Inject script tags into html for a given set of sources.
         *
         * @deprecated
         */
        {
            provide: 'injectJS',
            useFactory: () => scriptUtils.injectJS()
        },
        /**
         * **Deprecated since 2005, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * Returns the first Array argument supplemented with new entries from the second Array argument.
         *
         * @deprecated
         */
        {
            provide: 'uniqueArray',
            useFactory: () => objectUtils.uniqueArray
        },
        /**
         * **Deprecated since 1811, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * Converts a given pattern into a regular expression.
         * This method will prepend and append a string with ^ and $ respectively replaces
         * and wildcards (*) by proper regex wildcards.
         *
         * @param pattern Any string that needs to be converted to a regular expression.
         *
         * @returns A regular expression generated from the given string.
         *
         * @deprecated
         */
        {
            provide: 'regExpFactory',
            useFactory: () => stringUtils.regExpFactory
        },
        /**
         * **Deprecated since 2005, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * <b>generateIdentifier</b> will generate a unique string based on system time and a random generator.
         * @returns a unique identifier.
         *
         * @deprecated
         */
        {
            provide: 'generateIdentifier',
            useFactory: () => stringUtils.generateIdentifier
        },
        /**
         * **Deprecated since 2005, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * <b>escapeHtml</b> will escape &, <, >, " and ' characters .
         *
         * @param str A string that needs to be escaped.
         * @returns The escaped string.
         *
         * @deprecated
         *
         */
        {
            provide: 'escapeHtml',
            useFactory: () => stringUtils.escapeHtml
        },
        /**
         * **Deprecated since 1905, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * <b>escapes any harmful scripting from a string, leaves innocuous HTML untouched/b>
         * @param str A string that needs to be sanitized.
         * @returns the sanitized string.
         *
         * @deprecated
         */
        {
            provide: 'sanitize',
            useFactory: () => stringUtils.sanitize
        },
        /**
         * **Deprecated since 1905, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * <b>sanitizeHTML</b> will remove breaks and space .
         *
         * @param text A string that needs to be escaped.
         * @returns the sanitized HTML.
         *
         * @deprecated
         */
        {
            provide: 'sanitizeHTML',
            useFactory: () => stringUtils.sanitizeHTML
        },
        /**
         * <b>toPromise</> transforms a function into a function that is guaranteed to return a Promise that resolves to the
         * original return value of the function, rejects with the rejected return value and rejects with an exception object when the invocation fails
         */
        {
            provide: 'toPromise',
            useFactory: ($q: angular.IQService, $log: angular.ILogService) => (
                method: any,
                context: any
            ) =>
                function () {
                    try {
                        return $q.when(method.apply(context, arguments));
                    } catch (e) {
                        $log.error('execution of a method that was turned into a promise failed');
                        $log.error(e);
                        return $q.reject(e);
                    }
                },
            deps: ['$q', '$log']
        },
        /**
         * **Deprecated since 2005, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * Returns `true` if the `value` is a function, else `false`.
         *
         * @deprecated
         */
        {
            provide: 'isFunction',
            useFactory: () => objectUtils.isFunction
        },
        /**
         * **Deprecated since 2005, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * Checks if the value is the ECMAScript language type of Object.
         *
         * @deprecated
         */
        {
            provide: 'isObject',
            useFactory: () => objectUtils.isObject
        },
        {
            provide: 'debounce',
            useFactory: (isFunction: any, isObject: any) => {
                class TypeError {}

                return function (func: any, wait: any, options: any) {
                    let args: any;
                    let maxTimeoutId: any;
                    let result: any;
                    let stamp: any;
                    let thisArg: any;
                    let timeoutId: any;
                    let trailingCall: any;
                    let leading: any;
                    let lastCalled = 0;
                    let maxWait: any = false;
                    let trailing = true;
                    let isCalled: any;

                    if (!isFunction(func)) {
                        throw new TypeError();
                    }
                    wait = Math.max(0, wait) || 0;
                    if (options === true) {
                        leading = true;
                        trailing = false;
                    } else if (isObject(options)) {
                        leading = options.leading;
                        maxWait = 'maxWait' in options && (Math.max(wait, options.maxWait) || 0);
                        trailing = 'trailing' in options ? options.trailing : trailing;
                    }
                    const delayed = function () {
                        const remaining = wait - (Date.now() - stamp);
                        if (remaining <= 0) {
                            if (maxTimeoutId) {
                                clearTimeout(maxTimeoutId);
                            }
                            isCalled = trailingCall;
                            maxTimeoutId = timeoutId = trailingCall = undefined;
                            if (isCalled) {
                                lastCalled = Date.now();
                                result = func.apply(thisArg, args);
                                if (!timeoutId && !maxTimeoutId) {
                                    args = thisArg = null;
                                }
                            }
                        } else {
                            timeoutId = setTimeout(delayed, remaining);
                        }
                    };

                    const maxDelayed = function () {
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        maxTimeoutId = timeoutId = trailingCall = undefined;
                        if (trailing || maxWait !== wait) {
                            lastCalled = Date.now();
                            result = func.apply(thisArg, args);
                            if (!timeoutId && !maxTimeoutId) {
                                args = thisArg = null;
                            }
                        }
                    };

                    return function () {
                        args = arguments;
                        stamp = Date.now();
                        thisArg = this;
                        trailingCall = trailing && (timeoutId || !leading);
                        let leadingCall;

                        if (maxWait === false) {
                            leadingCall = leading && !timeoutId;
                        } else {
                            if (!maxTimeoutId && !leading) {
                                lastCalled = stamp;
                            }
                            const remaining = maxWait - (stamp - lastCalled);
                            isCalled = remaining <= 0;

                            if (isCalled) {
                                if (maxTimeoutId) {
                                    maxTimeoutId = clearTimeout(maxTimeoutId);
                                }
                                lastCalled = stamp;
                                result = func.apply(thisArg, args);
                            } else if (!maxTimeoutId) {
                                maxTimeoutId = setTimeout(maxDelayed, remaining);
                            }
                        }
                        if (isCalled && timeoutId) {
                            timeoutId = clearTimeout(timeoutId);
                        } else if (!timeoutId && wait !== maxWait) {
                            timeoutId = setTimeout(delayed, wait);
                        }
                        if (leadingCall) {
                            isCalled = true;
                            result = func.apply(thisArg, args);
                        }
                        if (isCalled && !timeoutId && !maxTimeoutId) {
                            args = thisArg = null;
                        }
                        return result;
                    };
                };
            },
            deps: ['isFunction', 'isObject']
        },
        {
            provide: 'throttle',
            useFactory: (debounce: any, isFunction: any, isObject: any) =>
                function (func: any, wait: any, options: any) {
                    let leading = true;
                    let trailing = true;

                    if (!isFunction(func)) {
                        throw new TypeError();
                    }
                    if (options === false) {
                        leading = false;
                    } else if (isObject(options)) {
                        leading = 'leading' in options ? options.leading : leading;
                        trailing = 'trailing' in options ? options.trailing : trailing;
                    }
                    options = {};
                    options.leading = leading;
                    options.maxWait = wait;
                    options.trailing = trailing;

                    return debounce(func, wait, options);
                },
            deps: ['debounce', 'isFunction', 'isObject']
        },
        /**
         * **Deprecated since 2005, use `@Inject(YJQUERY_TOKEN) private yjQuery: JQueryStatic`.**
         *
         * Parses a string HTML into a queriable DOM object, stripping any JavaScript from the HTML.
         *
         * @param stringHTML The string representation of the HTML to parse
         *
         * @deprecated
         */
        {
            provide: 'parseHTML',
            useFactory: (yjQuery: any) =>
                function (stringHTML: any) {
                    return yjQuery.parseHTML(stringHTML);
                },
            deps: ['yjQuery']
        },
        /**
         * **Deprecated since 2005, use [unsafeParseHTML]{@link JQueryUtilsService#unsafeParseHTML}.**
         *
         * @deprecated
         */
        {
            provide: 'unsafeParseHTML',
            useFactory: (jQueryUtilsService: JQueryUtilsService) =>
                jQueryUtilsService.unsafeParseHTML,
            deps: ['jQueryUtilsService']
        },
        /**
         * **Deprecated since 2005, use [extractFromElement]{@link JQueryUtilsService#extractFromElement}.**
         *
         * @deprecated
         */
        {
            provide: 'extractFromElement',
            useFactory: (jQueryUtilsService: JQueryUtilsService) =>
                jQueryUtilsService.extractFromElement,
            deps: ['jQueryUtilsService']
        },
        /**
         * **Deprecated since 2005.**
         *
         * Close any open modal window when a user clicks browser back button
         *
         * @param $uibModalStack The $modalStack service of angular-ui.
         *
         * @deprecated
         */
        {
            provide: 'closeOpenModalsOnBrowserBack',
            useFactory: ($uibModalStack: any) =>
                function () {
                    if ($uibModalStack.getTop()) {
                        $uibModalStack.dismissAll();
                    }
                },
            deps: ['$uibModalStack']
        },
        /**
         * **Deprecated since 1905, use `import { URIBuilder } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'URIBuilder',
            useFactory: () => URIBuilder
        },
        /**
         * **Deprecated since 2005, use `import { apiUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'getDataFromResponse',
            useFactory: () => apiUtils.getDataFromResponse
        },
        /**
         * **Deprecated since 2005, use `import { apiUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'getKeyHoldingDataFromResponse',
            useFactory: () => apiUtils.getKeyHoldingDataFromResponse
        },
        /**
         * **Deprecated since 2005, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'resetObject',
            useFactory: () => objectUtils.resetObject
        },
        /**
         * **Deprecated since 2005, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'isObjectEmptyDeep',
            useFactory: () => objectUtils.isObjectEmptyDeep
        },
        /**
         * **Deprecated since 1905, use `import { booleanUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'areAllTruthy',
            useFactory: () => booleanUtils.areAllTruthy
        },
        /**
         * **Deprecated since 1905, use `import { booleanUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'isAnyTruthy',
            useFactory: () => booleanUtils.isAnyTruthy
        },
        /**
         * **Deprecated since 2005, use `import { dateUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'formatDateAsUtc',
            useFactory: () => dateUtils.formatDateAsUtc
        },
        /**
         * **Deprecated since 2005, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'getEncodedString',
            useFactory: () => stringUtils.encode
        },
        /**
         * **Deprecated since 1905, use `import { stringUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'encode',
            useFactory: () => stringUtils.encode
        },
        /**
         * **Deprecated since 2005, use `import { nodeUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'compareHTMLElementsPosition',
            useFactory: () => nodeUtils.compareHTMLElementsPosition
        },
        /**
         * **Deprecated since 1905, use `import { windowUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'isIframe',
            useFactory: () => windowUtils.isIframe
        },
        /**
         * **Deprecated since 2005, use `import { nodeUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'isPointOverElement',
            useFactory: () => nodeUtils.isPointOverElement
        },
        /**
         * **Deprecated since 2005, use `import { nodeUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'areIntersecting',
            useFactory: () => nodeUtils.areIntersecting
        },
        {
            provide: 'EXTENDED_VIEW_PORT_MARGIN',
            useValue: EXTENDED_VIEW_PORT_MARGIN
        },
        /**
         * **Deprecated since 2005, use [isInExtendedViewPort]{@link JQueryUtilsService#isInExtendedViewPort}.**
         *
         * @deprecated
         */
        {
            provide: 'isInExtendedViewPort',
            useFactory: (jQueryUtilsService: JQueryUtilsService) =>
                jQueryUtilsService.isInExtendedViewPort,
            deps: ['jQueryUtilsService']
        },
        {
            provide: 'deepIterateOverObjectWith',
            useFactory: () => objectUtils.deepIterateOverObjectWith
        },
        /**
         * **Deprecated since 2005, use `import { objectUtils } from 'smarteditcommons'`.**
         *
         * @deprecated
         */
        {
            provide: 'deepObjectPropertyDiff',
            useFactory: () => objectUtils.deepObjectPropertyDiff
        },
        /**
         * **Deprecated since 2005.**
         *
         * @deprecated
         */
        {
            provide: 'isInDOM',
            useFactory: ($document: any, yjQuery: any) =>
                function (component: any) {
                    return yjQuery.contains($document[0], component);
                },
            deps: ['$document', 'yjQuery']
        },
        /**
         * **Deprecated since 2005, use `import { objectUtils } from 'smarteditcommons'`.**
         * `objectUtils.readObjectStructure`
         *
         * @deprecated
         */
        {
            provide: 'readObjectStructureFactory',
            useValue: () => objectUtils.readObjectStructure
        }
    ]
})
export class FunctionsModule {}
