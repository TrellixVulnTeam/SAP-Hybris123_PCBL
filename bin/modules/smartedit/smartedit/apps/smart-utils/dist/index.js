'use strict';

CacheConfigAnnotationFactory.$inject = ["logService"];
CachedAnnotationFactory.$inject = ["cacheService"];
InvalidateCacheAnnotationFactory.$inject = ["cacheService"];
OperationContextAnnotationFactory.$inject = ["injector", "operationContextService", "OPERATION_CONTEXT"];
Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('lodash');
var CryptoJS = require('crypto-js');
var core = require('@angular/core');
var http = require('@angular/common/http');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var core$1 = require('@ngx-translate/core');
var forms = require('@angular/forms');
var core$2 = require('@fundamental-ngx/core');
var common = require('@angular/common');

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc service
 * @name @smartutils.services:CloneableUtils
 *
 * @description
 * utility service around Cloneable objects
 */
var CloneableUtils = /** @class */ (function () {
    function CloneableUtils() {
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:CloneableUtils#makeCloneable
     * @methodOf @smartutils.services:CloneableUtils
     * @description
     * returns a "cloneable" version of an object.
     * Something is cloneable when it can be sent through W3C postMessage.
     * To this purpose, functions must be removed from the cloneable candidate.
     * @param {Object} json the object to be made cloneable
     * @returns {Cloneable} the cloneable copy of the object
     */
    CloneableUtils.prototype.makeCloneable = function (_json) {
        var _this = this;
        var json = lodash.cloneDeepWith(_json, function (value) {
            if (value !== undefined && value !== null && !_this.isPrimitive(json)) {
                // is a promise
                if (value.then) {
                    return null;
                }
                else if (typeof value === 'function') {
                    return null;
                }
                else if (lodash.isElement(value)) {
                    return null;
                    // is yjQuery
                }
                else if (typeof value !== 'string' &&
                    value.hasOwnProperty('length') &&
                    !value.forEach) {
                    return null;
                }
                else {
                    return value;
                }
            }
            else {
                return value;
            }
        });
        if (json === undefined || json === null || this.isPrimitive(json)) {
            return json;
        }
        else if (json.hasOwnProperty('length') || json.forEach) {
            // Array, already taken care of by yjQuery
            return json.map(function (arrayElement) { return _this.makeCloneable(arrayElement); });
        }
        else {
            // JSON
            return Object.keys(json).reduce(function (clone, directKey) {
                if (directKey.indexOf('$') !== 0) {
                    clone[directKey] = _this.makeCloneable(json[directKey]);
                }
                return clone;
            }, {});
        }
    };
    CloneableUtils.prototype.isPrimitive = function (value) {
        return typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean';
    };
    return CloneableUtils;
}());
var cloneableUtils = new CloneableUtils();

/**
 * @ngdoc service
 * @name @smartutils.services:StringUtils
 *
 * @description
 * utility service around Strings.
 */
var StringUtils = /** @class */ (function () {
    function StringUtils() {
        var _this = this;
        /**
         * @ngdoc service
         * @name @smartutils.services:StringUtils#sanitize
         * @methodOf @smartutils.services:StringUtils
         *
         * @description
         * <b>escapes any harmful scripting from a string, leaves innocuous HTML untouched/b>
         * @param {String} a string that needs to be sanitized.
         *
         * @returns {String} the sanitized string.
         *
         */
        this.sanitize = function (str) {
            /* The correct solution for this is to use Negative Lookbehind Regex expression which is available as part of ES2018. // str.replace(/(?:(?<!\\)([()]))/g, '\\$1')
            But in order to support cross browser compatibility, the string is reversed and negative lookahead is used instead. */
            return !_this.isBlank(str)
                ? str
                    .split('')
                    .reverse()
                    .join('')
                    .replace(/(?:(([()])(?!\\)))/g, '$1\\')
                    .split('')
                    .reverse()
                    .join('')
                : str;
        };
        /**
         * @ngdoc service
         * @name @smartutils.services:StringUtils#encode
         * @methodOf @smartutils.services:StringUtils
         *
         * @description
         * will return a encoded value for any JSON object passed as argument
         * @param {object} JSON object to be encoded
         */
        this.encode = function (object) {
            /* first we use encodeURIComponent to get percent-encoded UTF-8,
             * then we convert the percent encodings into raw bytes which
             * can be fed into btoa.
             * from https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
             */
            return btoa(encodeURIComponent(JSON.stringify(object)).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            }));
        };
        /**
         * @ngdoc service
         * @name @smartutils.services:StringUtils#replaceAll
         * @methodOf @smartutils.services:StringUtils
         *
         * @description
         * will return a string where all matches for the string regexps keys passed in the substitutionMap will have been substituted by correspoing values in the substitutionMap
         * @param {string} string the string to substitute keys in object to be encoded
         * @param {TypedMap<string>} substitutionMap the map of string regexp to string substitution values
         * @returns {string} the substituted string
         */
        this.replaceAll = function (str, substitutionMap) {
            var regex = new RegExp(Object.keys(substitutionMap).join('|'), 'g');
            return str.replace(regex, function (matched) {
                return substitutionMap[matched];
            });
        };
    }
    /**
     * @ngdoc service
     * @name @smartutils.services:StringUtils#isBlank
     * @methodOf @smartutils.services:StringUtils
     *
     * @description
     * <b>isBlank</b> will check if a given string is undefined or null or empty.
     * - returns TRUE for undefined / null/ empty string
     * - returns FALSE otherwise
     *
     * @param {String} inputString any input string.
     *
     * @returns {boolean} true if the string is null else false
     */
    StringUtils.prototype.isBlank = function (value) {
        return (typeof value === 'undefined' ||
            value === null ||
            value === 'null' ||
            value.toString().trim().length === 0);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:StringUtils#regExpFactory
     * @methodOf @smartutils.services:StringUtils
     *
     * @description
     * <b>regExpFactory</b> will convert a given pattern into a regular expression.
     * This method will prepend and append a string with ^ and $ respectively replaces
     * and wildcards (*) by proper regex wildcards.
     *
     * @param {String} pattern any string that needs to be converted to a regular expression.
     *
     * @returns {RegExp} a regular expression generated from the given string.
     *
     */
    StringUtils.prototype.regExpFactory = function (pattern) {
        var onlyAlphanumericsRegex = new RegExp(/^[a-zA-Z\d]+$/i);
        var antRegex = new RegExp(/^[a-zA-Z\d\*]+$/i);
        var regexpKey;
        if (onlyAlphanumericsRegex.test(pattern)) {
            regexpKey = ['^', '$'].join(pattern);
        }
        else if (antRegex.test(pattern)) {
            regexpKey = ['^', '$'].join(pattern.replace(/\*/g, '.*'));
        }
        else {
            regexpKey = pattern;
        }
        return new RegExp(regexpKey, 'g');
    };
    /*
     * formats HTML outputs typically from Node.outerHTML to easy string comparison by:
     * - remove empty lines
     * - remove spaces between tags
     * - normalize remainign spaces to a single one
     *
     */
    StringUtils.prototype.formatHTML = function (rawHTML) {
        return rawHTML
            .replace(/^\s*\n/gm, '')
            .replace(/\>[\t\s]+\</g, '><')
            .replace(/[\r\n\t\s]+/g, ' ');
    };
    return StringUtils;
}());
var stringUtils = new StringUtils();

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */
/**
 * @ngdoc service
 * @name @smartutils.services:UrlUtils#URIBuilder
 *
 * @description
 * builder or URIs, build() method must be invoked to actually retrieve a URI
 *
 * @param {Object} modalStack, the $modalStack service of angular-ui.
 */
var URIBuilder = /** @class */ (function () {
    function URIBuilder(uri) {
        this.uri = uri;
        this.wholeWordMatch = '[\\w]+';
    }
    URIBuilder.prototype.build = function () {
        return this.uri;
    };
    /**
     * @ngdoc method
     * @name  @smartutils.services:UrlUtils#URIBuilder#replaceParams
     * @methodOf  @smartutils.services:UrlUtils#URIBuilder
     *
     * @description
     * Substitute all ":" prefixed placeholders in the full url with the matching values in the given params
     * Substitute Non ":" prefixed placeholders containg "_"
     *
     * @param {Object} params a map of placeholder names / values
     */
    URIBuilder.prototype.replaceParams = function (params) {
        var _this = this;
        var clone = lodash.cloneDeep(this);
        if (params) {
            // order the keys by descending length
            clone.uri = Object.keys(params)
                .sort(function (a, b) {
                return b.length - a.length;
            })
                .reduce(function (tempURL, key) {
                return _this.substituteKeyForValue(tempURL, key, params[key]);
            }, clone.uri);
        }
        return clone;
    };
    /**
     * @ngdoc method
     * @name  @smartutils.services:UrlUtils#URIBuilder#sanitize
     * @methodOf  @smartutils.services:UrlUtils#URIBuilder
     *
     * @description
     * removes unresolved ":" prefixed placeholders from absolute path
     */
    URIBuilder.prototype.sanitize = function () {
        var clone = lodash.cloneDeep(this);
        var uriDomainAndPath = /(https?:\/\/[^\/]*)(\/.*)/.exec(clone.uri);
        clone.uri = uriDomainAndPath == null ? clone.uri : uriDomainAndPath[2];
        clone.uri = this.substituteKeyForValue(clone.uri, this.wholeWordMatch, '')
            .replace(/\/\//, '/') // to replace double slash (api/:identifier/data?param=true) if :identifier is removed
            .replace(/\/\?/, '?') // to replace slash question mark (api/:identifier?param=true) if :identifier is removed
            .replace(/\/$/, ''); // to remove trailing slash
        clone.uri = uriDomainAndPath == null ? clone.uri : uriDomainAndPath[1] + clone.uri;
        return clone;
    };
    URIBuilder.prototype.substituteKeyForValue = function (url, key, value) {
        url = url
            .replace(new RegExp(':' + key + '/'), (value || '') + "/")
            .replace(new RegExp(':' + key + '$'), "" + (value || ''))
            .replace(new RegExp(':' + key + '\\?'), (value || '') + "?")
            .replace(new RegExp(':' + key + '&'), (value || '') + "&");
        /*
         * to cater for special case of smartedit
         * where some non ":" prefixed placeholders must be resolved too
         * we limit it though to keys containing "_" (case for smartedit)
         * since it would otherwise breaks most APIs patterns
         */
        if (key !== this.wholeWordMatch && key.includes('_')) {
            var _uri = url.includes('?') ? url.substr(0, url.indexOf('?')) : url;
            var uri = _uri.replace(new RegExp('\\b' + key + '\\b'), "" + (value || ''));
            url = url.includes('?') ? uri + url.substr(url.indexOf('?')) : uri;
        }
        return url;
    };
    return URIBuilder;
}());
/**
 * @ngdoc service
 * @name @smartutils.services:UrlUtils
 *
 * @description
 * A collection of utility methods for manipulating URLs
 */
var UrlUtils = /** @class */ (function () {
    function UrlUtils() {
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:UrlUtils#getOrigin
     * @methodOf @smartutils.services:UrlUtils
     * @description
     * returns document location origin
     * Some browsers still do not support W3C document.location.origin, this function caters for gap.
     * @param {String =} url optional any url
     */
    UrlUtils.prototype.getOrigin = function (url) {
        if (url) {
            var link = document.createElement('a');
            link.setAttribute('href', url);
            var origin_1 = link.protocol + '//' + link.hostname + (link.port ? ':' + link.port : '');
            // @ts-ignore
            link = null; // GC
            return origin_1;
        }
        else {
            return (window.location.protocol +
                '//' +
                window.location.hostname +
                (window.location.port ? ':' + window.location.port : ''));
        }
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:UrlUtils#getURI
     * @methodOf @smartutils.services:UrlUtils
     *
     * @description
     * Will return the URI part of a URL
     * @param {String} url the URL the URI of which is to be returned
     */
    UrlUtils.prototype.getURI = function (url) {
        return url && url.indexOf('?') > -1 ? url.split('?')[0] : url;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:UrlUtils#updateUrlParameter
     * @methodOf @smartutils.services:UrlUtils
     *
     * @description
     * Updates a URL to contain the query param and value provided. If already exists then it is updated,
     * if it did not previously exist, then it will be added.
     *
     * @param {String} url The url to be updated (this param will not be modified)
     * @param {String} key The query param key
     * @param {String} value The query param value
     *
     * @returns {String} The url with updated key/value
     */
    UrlUtils.prototype.updateUrlParameter = function (url, key, value) {
        var i = url.indexOf('#');
        var hash = i === -1 ? '' : url.substr(i);
        url = i === -1 ? url : url.substr(0, i);
        var regex = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        var separator = url.indexOf('?') !== -1 ? '&' : '?';
        if (url.match(regex)) {
            url = url.replace(regex, '$1' + key + '=' + value + '$2');
        }
        else {
            url = url + separator + key + '=' + value;
        }
        return url + hash;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:UrlUtils#getQueryString
     * @methodOf @smartutils.services:UrlUtils
     *
     * @description
     * <b>getQueryString</b> will convert a given object into a query string.
     *
     * Below is the code snippet for sample input and sample output:
     *
     * <pre>
     * var params = {
     *  key1 : 'value1',
     *  key2 : 'value2',
     *  key3 : 'value3'
     *  }
     *
     *  var output = getQueryString(params);
     *
     *  // The output is '?&key1=value1&key2=value2&key3=value3'
     *
     * </pre>
     * @param {Object} params Object containing a list of params.
     *
     * @returns {String} a query string
     */
    UrlUtils.prototype.getQueryString = function (params) {
        var queryString = '';
        if (params) {
            var _loop_1 = function (param) {
                if (params.hasOwnProperty(param)) {
                    (lodash.isArray(params[param]) ? params[param] : [params[param]]).forEach(function (value) {
                        queryString +=
                            '&' + encodeURIComponent(param) + '=' + encodeURIComponent(value);
                    });
                }
            };
            for (var param in params) {
                _loop_1(param);
            }
        }
        return '?' + (!stringUtils.isBlank(queryString) ? queryString.substring(1) : queryString);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:UrlUtils#parseQuery
     * @methodOf @smartutils.services:UrlUtils
     *
     * @description
     * <b>parseQuery</b> will convert a given query string to an object.
     *
     * Below is the code snippet for sample input and sample output:
     *
     * <pre>
     * var query = '?key1=value1&key2=value2&key3=value3';
     *
     * var output = parseQuery(query);
     *
     * // The output is { key1 : 'value1', key2 : 'value2', key3 : 'value3' }
     *
     * </pre>
     * @param {String} query String that needs to be parsed.
     *
     * @returns {Object} an object containing all params of the given query
     */
    UrlUtils.prototype.parseQuery = function (str) {
        var objURL = {};
        str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), function ($0, $1, $2, $3) {
            objURL[$1] = $3;
        });
        return objURL;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:UrlUtils#getAbsoluteURL
     * @methodOf @smartutils.services:UrlUtils
     *
     * @description
     * Makes url absolute (with provided domain) if not yet
     *
     * @param {String} domain the domain with witch to prepend the url if it is not absolute
     * @param {String} url the url to test
     *
     * @returns {String} url
     */
    UrlUtils.prototype.getAbsoluteURL = function (domain, url) {
        // url regex
        // scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
        var re = new RegExp('([a-zA-Z0-9]+://)' + // scheme
            '([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?' + // user:password
            '([a-zA-Z0-9.-]+)' + // hostname
            '|([0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+)' + // or ip
            '(:[0-9]+)?' + // port
            '(/.*)?' // everything else
        );
        return re.exec(url) ? url : domain + url;
    };
    return UrlUtils;
}());
var urlUtils = new UrlUtils();

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc service
 * @name @smartutils.services:CryptographicUtils
 *
 * @description
 * utility service around Cryptographic operations.
 */
var CryptographicUtils = /** @class */ (function () {
    function CryptographicUtils() {
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:CryptographicUtils#sha1Hash
     * @methodOf @smartutils.services:CryptographicUtils
     *
     * @description
     * A utility function that takes an input string and provides a cryptographic SHA1 hash value.
     *
     * @param {String} data The input string to be encrypted.
     * @returns {String} the encrypted hashed result.
     */
    CryptographicUtils.prototype.sha1Hash = function (data) {
        return CryptoJS.SHA1(data).toString();
    };
    CryptographicUtils.prototype.aesBase64Encrypt = function (base64EncodedMessage, secretPassphrase) {
        return CryptoJS.AES.encrypt(CryptoJS.enc.Base64.parse(base64EncodedMessage), secretPassphrase).toString();
    };
    CryptographicUtils.prototype.aesDecrypt = function (encryptedMessage, secretPassphrase) {
        return CryptoJS.AES.decrypt(encryptedMessage, secretPassphrase).toString(CryptoJS.enc.Utf8);
    };
    return CryptographicUtils;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * @ngdoc service
 * @name @smartutils.services:FunctionsUtils
 *
 * @description
 * utility service around Functions.
 */
var FunctionsUtils = /** @class */ (function () {
    function FunctionsUtils() {
        /*
         * regexp matching function(a, $b){} and function MyFunction(a, $b){}
         */
        this.signatureArgsRegexp = /function[\s\w]*\(([\w\s\$,]*)\)[\s]*{/;
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:FunctionsUtils#isEmpty
     * @methodOf @smartutils.services:FunctionsUtils
     *
     * @description
     * Will determine whether a function body is empty or should be considered empty for proxying purposes
     *
     * @param {Function} func, the function to evaluate
     * @returns {Boolean} a boolean.
     */
    FunctionsUtils.prototype.isEmpty = function (func) {
        var match = func.toString().match(/\{([\s\S]*)\}/m);
        return (!match ||
            match[1].trim() === '' ||
            /(proxyFunction)/g.test(func.toString().replace(/\s/g, '')));
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:FunctionsUtils#getArguments
     * @methodOf @smartutils.services:FunctionsUtils
     *
     * @description
     * Returns the array of string arguments of the given function signature
     *
     * @param {Function} func the function to analyze
     * @returns {string[]} an array of string arguments
     */
    FunctionsUtils.prototype.getArguments = function (func) {
        var exec = this.signatureArgsRegexp.exec(func.toString());
        if (exec) {
            return exec[1].replace(/\s/g, '').split(',');
        }
        else {
            throw new Error("failed to retrieve arguments list of " + func);
        }
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:FunctionsUtils#hasArguments
     * @methodOf @smartutils.services:FunctionsUtils
     *
     * @description
     * Determines whether a given function (anonymous or not) has arguments in it signature
     *
     * @param {Function} func the function to analyze
     * @returns {boolean} true if the function has signature arguments
     */
    FunctionsUtils.prototype.hasArguments = function (func) {
        var exec = this.signatureArgsRegexp.exec(func.toString());
        if (exec) {
            return !lodash.isEmpty(exec[1]);
        }
        else {
            throw new Error("failed to retrieve arguments list of " + func);
        }
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:FunctionsUtils#getConstructorName
     * @methodOf @smartutils.services:FunctionsUtils
     *
     * @description
     * Returns the constructor name in a cross browser fashion
     *
     * @param {Function} func the function to analyze
     * @returns {string} the constructor name
     */
    FunctionsUtils.prototype.getConstructorName = function (func) {
        var name = func.name;
        if (!name) {
            // IE does not support constructor.name
            var exec = /function (\$?\w+)\s*\(/.exec(func.toString());
            if (exec) {
                name = exec[1];
            }
            else {
                throw new Error('[FunctionsUtils] - Cannot get name from invalid constructor.');
            }
        }
        return name;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:FunctionsUtils#getInstanceConstructorName
     * @methodOf @smartutils.services:FunctionsUtils
     *
     * @description
     * Returns the constructor name in a cross browser fashion of a class instance
     *
     * @param {Object} instance instance class to analyze
     * @returns {string} the constructor name of the instance
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    FunctionsUtils.prototype.getInstanceConstructorName = function (instance) {
        return this.getConstructorName(Object.getPrototypeOf(instance).constructor);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:FunctionsUtils#extendsConstructor
     * @methodOf @smartutils.services:FunctionsUtils
     *
     * @description
     * Overrides a given constructor with a new constructor body. The resulting constructor will share the same prototype as the original one.
     *
     * @param {(...args:any[]) => T} originalConstructor the original constructor to override
     * @returns {(...args:any[]) => T} newConstructorBody the new constructor body to execute in the override. It may or may not return an instance. Should it return an instance, the latter will be returned by the override.
     */
    FunctionsUtils.prototype.extendsConstructor = function (originalConstructor, newConstructorBody) {
        // the new constructor behaviour
        var newConstructor = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = newConstructorBody.apply(this, args);
            if (result) {
                return result;
            }
        };
        // copy prototype so intanceof operator still works
        newConstructor.prototype = originalConstructor.prototype;
        return newConstructor;
    };
    /** @internal */
    FunctionsUtils.prototype.isUnitTestMode = function () {
        /* forbiddenNameSpaces window._:false */
        return typeof window.__karma__ !== 'undefined';
    };
    /**
     * The helper for tests which use try / catch block.
     * When `try` block contains only `await` and `catch` block contains expects then,
     * when someone changes method and and `catch` block is never entered it should fail
     */
    FunctionsUtils.prototype.assertFail = function () {
        var spy = jasmine.createSpy('TestShouldNotReachThatPart-CheckYourTryCatchBlock');
        expect(spy).toHaveBeenCalled();
    };
    FunctionsUtils.prototype.convertToArray = function (obj) {
        return Object.keys(obj).reduce(function (acc, key) { return __spreadArrays((acc || []), [
            { key: key, value: obj[key] }
        ]); }, []);
    };
    return FunctionsUtils;
}());
var functionsUtils = new FunctionsUtils();

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var commonNgZone = new core.NgZone({ enableLongStackTrace: false });

/**
 * @ngdoc service
 * @name @smartutils.services:WindowUtils
 *
 * @description
 * A collection of utility methods for windows.
 */
var WindowUtils = /** @class */ (function () {
    function WindowUtils(ngZone) {
        var _this = this;
        this.ngZone = ngZone;
        /**
         * @ngdoc method
         * @name @smartutils.services:WindowUtils#isIframe
         * @methodOf @smartutils.services:WindowUtils
         * @description
         * <b>isIframe</b> will check if the current document is in an iFrame.
         * @returns {boolean} true if the current document is in an iFrame.
         */
        this.isIframe = function () { return _this.getWindow().top !== _this.getWindow(); };
        this.ngZone = this.ngZone || commonNgZone;
    }
    WindowUtils.prototype.getWindow = function () {
        return window;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:WindowUtils#runTimeoutOutsideAngular
     * @methodOf @smartutils.services:WindowUtils
     *
     * @description
     * Runs a given timeout outside Angular and attaches its callback to Angular
     * this is usefull in order not to be blocking from an e2e stand point
     *
     * @param {string} callback argument less callback to execute when timeout.
     * @param {number} timeout the delay in milliseconds until timeout
     */
    WindowUtils.prototype.runTimeoutOutsideAngular = function (callback, timeout) {
        var ngZone = this.ngZone;
        if (ngZone !== undefined) {
            return ngZone.runOutsideAngular(function () { return setTimeout(function () { return ngZone.run(callback); }, timeout); });
        }
        else {
            throw new Error('this instance of WindowUtils has not been instantiated through Angular 7 DI');
        }
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:WindowUtils#runIntervalOutsideAngular
     * @methodOf @smartutils.services:WindowUtils
     *
     * @description
     * Runs a given interval outside Angular and attaches its callback to Angular
     * this is usefull in order not to be blocking from an e2e stand point
     *
     * @param {string} callback argument less callback to execute when timeout.
     * @param {number} timeout the delay in milliseconds until timeout
     */
    WindowUtils.prototype.runIntervalOutsideAngular = function (callback, timeout) {
        var ngZone = this.ngZone;
        if (ngZone === undefined) {
            throw new Error('this instance of WindowUtils has not been instantiated through Angular 7 DI');
        }
        return ngZone.runOutsideAngular(function () { return setInterval(function () { return ngZone.run(callback); }, timeout); });
    };
    WindowUtils.SMARTEDIT_IFRAME_ID = 'ySmartEditFrame';
    return WindowUtils;
}());
var windowUtils = new WindowUtils();

/*
 * internal utility service to handle ES6 modules
 */
/* forbiddenNameSpaces angular.module:false */
/** @internal */
var ModuleUtils = /** @class */ (function () {
    function ModuleUtils() {
    }
    ModuleUtils.prototype.initialize = function (useFactory, deps) {
        if (deps === void 0) { deps = []; }
        return {
            provide: core.APP_INITIALIZER,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            useFactory: function () {
                useFactory.apply(undefined, Array.prototype.slice.call(arguments));
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                return function (component) {
                    // an initializer useFactory must return a function
                };
            },
            deps: deps,
            multi: true
        };
    };
    ModuleUtils.prototype.bootstrap = function (useFactory, deps) {
        if (deps === void 0) { deps = []; }
        return {
            provide: core.APP_BOOTSTRAP_LISTENER,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            useFactory: function () {
                useFactory.apply(undefined, Array.prototype.slice.call(arguments));
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                return function (component) {
                    // an initializer useFactory must return a function
                };
            },
            deps: deps,
            multi: true
        };
    };
    ModuleUtils.prototype.provideValues = function (_constants) {
        var constants = _constants || {};
        return Object.keys(constants).map(function (key) { return ({
            provide: key,
            useValue: constants[key]
        }); });
    };
    ModuleUtils = __decorate([
        core.Injectable()
    ], ModuleUtils);
    return ModuleUtils;
}());
var moduleUtils = new ModuleUtils();

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function (LogLevel) {
    LogLevel[LogLevel["log"] = 0] = "log";
    LogLevel[LogLevel["debug"] = 1] = "debug";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["warn"] = 3] = "warn";
    LogLevel[LogLevel["error"] = 4] = "error";
})(exports.LogLevel || (exports.LogLevel = {}));
var LogService = /** @class */ (function () {
    function LogService() {
        this.logLevel = exports.LogLevel.info;
    }
    LogService.prototype.log = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log(exports.LogLevel.log, msg);
    };
    LogService.prototype.debug = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log(exports.LogLevel.debug, msg);
    };
    LogService.prototype.info = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log(exports.LogLevel.info, msg);
    };
    LogService.prototype.warn = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log(exports.LogLevel.warn, msg);
    };
    LogService.prototype.error = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log(exports.LogLevel.error, msg);
    };
    LogService.prototype.setLogLevel = function (logLevel) {
        this.logLevel = logLevel;
    };
    LogService.prototype._log = function (requestLevel, msg) {
        var _a;
        if (requestLevel >= this.logLevel) {
            var method = exports.LogLevel[requestLevel];
            if (this._console() && this._console()[method]) {
                (_a = this._console())[method].apply(_a, msg);
            }
        }
    };
    LogService.prototype._console = function () {
        return console;
    };
    return LogService;
}());

/**
 * @ngdoc service
 * @name @smartutils.services:PromiseUtils
 *
 * @description
 * utility service around ES6 Promises.
 */
var PromiseUtils = /** @class */ (function () {
    function PromiseUtils() {
        var _this = this;
        this.WAIT_TIMEOUT = 4;
        this.FAILURE_TIMEOUT = 2000;
        this.handlePromiseRejections = function (promise) {
            var oldThen = promise.then;
            var defaultFailureCallback = _this.defaultFailureCallback;
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            promise.then = function (successCallback, _failureCallback) {
                var failureCallback = _failureCallback ? _failureCallback : defaultFailureCallback;
                return oldThen.call(this, successCallback, failureCallback);
            };
            return promise;
        };
        this.defaultFailureCallback = function (error) {
            if (undefined !== error && null !== error && 'canceled' !== error) {
                if (lodash.isPlainObject(error)) {
                    if (!_this.isAjaxError(error)) {
                        PromiseUtils_1.logService.error("exception caught in promise: " + JSON.stringify(error));
                    }
                }
                else if (!lodash.isBoolean(error)) {
                    PromiseUtils_1.logService.error(error);
                }
            }
            PromiseUtils_1.logService.error("defaultFailureCallback:", error);
            return Promise.reject(error);
        };
    }
    PromiseUtils_1 = PromiseUtils;
    PromiseUtils.prototype.toPromise = function (method, context) {
        return function () {
            try {
                return Promise.resolve(method.apply(context, Array.prototype.slice.call(arguments)));
            }
            catch (e) {
                PromiseUtils_1.logService.error('execution of a method that was turned into a promise failed');
                PromiseUtils_1.logService.error(e);
                return Promise.reject(e);
            }
        };
    };
    PromiseUtils.prototype.promise = function (executor) {
        return this.handlePromiseRejections(new Promise(executor));
    };
    PromiseUtils.prototype.defer = function () {
        var pResolve;
        var pReject;
        var deferred = {
            promise: this.promise(function (_resolve, _reject) {
                pResolve = _resolve;
                pReject = _reject;
            }),
            resolve: function (value) {
                pResolve(value);
            },
            reject: function (reason) {
                pReject(reason);
            }
        };
        return deferred;
    };
    PromiseUtils.prototype.sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    PromiseUtils.prototype.isAjaxError = function (error) {
        return error.hasOwnProperty('headers');
    };
    PromiseUtils.prototype.waitOnCondition = function (condition, callback, errorMessage, elapsedTime) {
        var _this = this;
        if (elapsedTime === void 0) { elapsedTime = 0; }
        setTimeout(function () {
            if (condition()) {
                callback();
            }
            else if (elapsedTime < _this.FAILURE_TIMEOUT) {
                _this.waitOnCondition(condition, callback, errorMessage, elapsedTime + _this.WAIT_TIMEOUT);
            }
            else {
                throw new Error("PromiseUtils: " + errorMessage);
            }
        }, this.WAIT_TIMEOUT);
    };
    PromiseUtils.prototype.resolveToCallbackWhenCondition = function (condition, callback, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.waitOnCondition(condition, function () { return resolve(callback()); }, errorMessage ? errorMessage : 'condition for promise resolution was never met');
                    })];
            });
        });
    };
    PromiseUtils.prototype.attempt = function (promise) {
        return promise
            .then(function (data) { return ({
            error: null,
            data: data
        }); })
            .catch(function (error) { return ({
            error: error,
            data: null
        }); });
    };
    var PromiseUtils_1;
    PromiseUtils.logService = new LogService();
    PromiseUtils = PromiseUtils_1 = __decorate([
        core.Injectable()
    ], PromiseUtils);
    return PromiseUtils;
}());
var promiseUtils = new PromiseUtils();

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
/**
 * @ngdoc service
 * @name @smartutils.services:BooleanUtils
 *
 * @description
 * utility service around booleans.
 */
var BooleanUtils = /** @class */ (function () {
    function BooleanUtils() {
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:BooleanUtils#areAllTruthy
     * @methodOf @smartutils.services:BooleanUtils
     * @description
     * Iterate on the given array of Functions, return true if each function returns true
     *
     * @param {Array} arguments the functions
     *
     * @return {Boolean} true if every function returns true
     */
    BooleanUtils.prototype.areAllTruthy = function () {
        var functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            functions[_i] = arguments[_i];
        }
        return function () {
            var args = arguments;
            return functions.every(function (f) { return f && f.apply(f, args); });
        };
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:BooleanUtils#isAnyTruthy
     * @methodOf @smartutils.services:BooleanUtils
     *
     * @description
     * Iterate on the given array of Functions, return true if at least one function returns true
     *
     * @param {Array} arguments the functions
     *
     * @return {Boolean} true if at least one function returns true
     */
    BooleanUtils.prototype.isAnyTruthy = function () {
        var functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            functions[_i] = arguments[_i];
        }
        return function () {
            var args = arguments;
            return functions.some(function (f) { return f && f.apply(f, args); });
        };
    };
    return BooleanUtils;
}());
var booleanUtils = new BooleanUtils();

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var HttpUtils = /** @class */ (function () {
    function HttpUtils() {
    }
    HttpUtils.prototype.isGET = function (request) {
        return request.method === 'GET';
    };
    HttpUtils.prototype.isRequestOfAccept = function (request, accept) {
        return (!!request.headers &&
            !!request.headers.get('Accept') &&
            (request.headers.get('Accept') || '').includes(accept));
    };
    HttpUtils.prototype.isResponseOfContentType = function (response, contentType) {
        return (!!response.headers &&
            !!response.headers.get('Content-type') &&
            (response.headers.get('Content-type') || '').indexOf(contentType) === 0);
    };
    HttpUtils.prototype.isHTMLRequest = function (request, response) {
        return (this.isGET(request) &&
            (this.isRequestOfAccept(request, 'text/html') ||
                /.+\.html$/.test(request.url) ||
                /.+\.html\?/.test(request.url)));
    };
    HttpUtils.prototype.isJSONRequest = function (request, response) {
        return (this.isGET(request) &&
            ((response && this.isResponseOfContentType(response, 'json')) ||
                /.+\.json$/.test(request.url)));
    };
    HttpUtils.prototype.isJSRequest = function (request) {
        return this.isGET(request) && /.+\.js$/.test(request.url);
    };
    HttpUtils.prototype.isCRUDRequest = function (request, response) {
        return (!this.isHTMLRequest(request, response) &&
            !this.isJSONRequest(request, response) &&
            !this.isJSRequest(request));
    };
    HttpUtils.prototype.transformHttpParams = function (params, substitutionMap) {
        return new http.HttpParams({
            fromObject: JSON.parse(stringUtils.replaceAll(JSON.stringify(this.copyHttpParamsOrHeaders(params)), substitutionMap))
        });
    };
    HttpUtils.prototype.copyHttpParamsOrHeaders = function (params) {
        var copy = {};
        params.keys().forEach(function (key) {
            var values = params.getAll(key);
            if (values !== null) {
                copy[key] = values.length > 1 ? values : values[0];
            }
        });
        return copy;
    };
    HttpUtils.prototype.buildHttpResponse = function (originalRequest, _statusAndPayload) {
        var statusAndPayloadPromise = Promise.resolve(_statusAndPayload);
        return rxjs.from(statusAndPayloadPromise).pipe(operators.switchMap(function (statusAndPayload) {
            var status = statusAndPayload[0];
            var body = statusAndPayload[1];
            var requestClone = originalRequest.clone({
                body: body
            });
            lodash.merge(requestClone, { status: status });
            if (200 <= status && status < 300) {
                return new rxjs.Observable(function (ob) {
                    ob.next(new http.HttpResponse(requestClone));
                });
            }
            else {
                return rxjs.throwError(new http.HttpErrorResponse(lodash.merge(requestClone, { error: body })));
            }
        }));
    };
    return HttpUtils;
}());
var httpUtils = new HttpUtils();

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
/**
 * @ngdoc object
 * @name utils.object:BaseValueAccessor
 * @description
 *
 * Class implementing {@link https://angular.io/api/forms/ControlValueAccessor ControlValueAccessor} interface used to create custom Angular inputs that
 * can be integrated with Angular Forms and.
 */
var BaseValueAccessor = /** @class */ (function () {
    function BaseValueAccessor() {
        this.disabled = false;
        this.value = null;
    }
    BaseValueAccessor.prototype.onChange = function (item) {
        // Is set by registerOnChange method
    };
    BaseValueAccessor.prototype.onTouched = function () {
        // Is set by registerOnTouched method
    };
    BaseValueAccessor.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    BaseValueAccessor.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    BaseValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    BaseValueAccessor.prototype.writeValue = function (item) {
        this.value = item;
    };
    return BaseValueAccessor;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/** @internal */
var annotationType;
(function (annotationType) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    annotationType["Class"] = "ClassAnnotation";
    annotationType["Method"] = "MethodAnnotation";
})(annotationType || (annotationType = {}));
/**
 * @ngdoc service
 * @name @smartutils.services:AnnotationService
 *
 * @description
 * Utility service to declare and consume method level and class level {@link https://www.typescriptlang.org/docs/handbook/decorators.html Typescript decorator factories}.
 * <br/>Since Decorator is a reserved word in Smartedit, Typescript Decorators are called as Annotations.
 */
var AnnotationService = /** @class */ (function () {
    function AnnotationService() {
        this.INJECTABLE_NAME_KEY = 'getInjectableName';
        this.ORIGINAL_CONSTRUCTOR_KEY = 'originalConstructor';
        /**
         * @ngdoc method
         * @name @smartutils.services:AnnotationService#getClassAnnotations
         * @methodOf @smartutils.services:AnnotationService
         *
         * @description
         * Retrieves an object with all the string-indexed annotations defined on the given class target
         * @param {any} target The typescript class on which class annotations are defined
         * @returns {[index: string]: any} an object contains string-indexed annotation name and payload
         */
        this.getClassAnnotations = lodash.memoize(this.getClassAnnotationsLogic);
        /**
         * @ngdoc method
         * @name @smartutils.services:AnnotationService#getMethodAnnotations
         * @methodOf @smartutils.services:AnnotationService
         *
         * @description
         * Retrieves an object with all the string indexed annotations defined on the given class method
         * @param {any} target The typescript class to the inspected
         * @param {string} propertyName The name of the method on which annotations are defined
         * @returns {[index: string]: any} an object contains string-indexed annotation name and payload
         */
        this.getMethodAnnotations = lodash.memoize(this.getMethodAnnotationsLogic, function (target, propertyName) {
            return JSON.stringify(target.prototype) + propertyName;
        });
        this.functionsUtils = new FunctionsUtils();
        this.annotationFactoryMap = {};
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#getClassAnnotation
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Retrieves arguments of class annotation under a given annotation name
     * @param {any} target The typescript class on which class annotation is defined
     * @param {(args?: any) => ClassDecorator} annotation The type of the class annotation
     * @returns {any} the payload passed to the annotation
     */
    AnnotationService.prototype.getClassAnnotation = function (target, annotation) {
        var annotationMap = this.getClassAnnotations(target);
        var annotationName = annotation.annotationName;
        if (annotationMap) {
            if (annotationName in annotationMap) {
                return annotationMap[annotationName];
            }
        }
        else {
            return null;
        }
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#getMethodAnnotation
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Retrieves arguments of method annotation for a given typescript class
     * @param {any} target The typescript class
     * @param {string} propertyName The name of the method on which annotation is defined
     * @param {(args?: any) => MethodDecorator)} annotation The type of the method annotation
     * @returns {any} the payload passed to the annotation
     */
    AnnotationService.prototype.getMethodAnnotation = function (target, propertyName, annotation) {
        var annotationMap = this.getMethodAnnotations(target, propertyName);
        var annotationName = annotation.annotationName;
        if (annotationMap) {
            if (annotationName in annotationMap) {
                return annotationMap[annotationName];
            }
        }
        else {
            return null;
        }
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#hasClassAnnotation
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Determines whether a given class target has given annotation name defined or not
     * @param {any} target The typescript class on which class annotation is defined
     * @param {(args?: any) => ClassDecorator} annotation The type of the class annotation
     * @returns {boolean} true if a given target has given annotation name. Otherwise false.
     */
    AnnotationService.prototype.hasClassAnnotation = function (target, annotation) {
        var annotationMap = this.getClassAnnotations(target);
        return annotation.annotationName in annotationMap ? true : false;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#hasMethodAnnotation
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Determines whether a given method name has given annotation name defined or not under a given typescript class
     * @param {any} target The typescript class object
     * @param {string} propertyName The name of the method on which annotation is defined
     * @param {(args?: any) => MethodDecorator} annotation The type of the method annotation
     * @returns {boolean} true if a given method name has given annotation name. Otherwise false.
     */
    AnnotationService.prototype.hasMethodAnnotation = function (target, propertyName, annotation) {
        var annotationMap = this.getMethodAnnotations(target, propertyName);
        return annotation.annotationName in annotationMap ? true : false;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#setClassAnnotationFactory
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Registers a {@link @smartutils.object:ClassAnnotationFactory ClassAnnotationFactory} under a given name.
     * <br/>Typically, in order for the ClassAnnotationFactory to benefit from Angular dependency injection, this method will be called within an Angular factory.
     * @param {string} name the name of the factory.
     * @returns {ClassAnnotationFactory} a {@link @smartutils.object:ClassAnnotationFactory ClassAnnotationFactory}
     */
    AnnotationService.prototype.setClassAnnotationFactory = function (name, annotationFactory) {
        this.annotationFactoryMap[name] = annotationFactory;
        return annotationFactory;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#getClassAnnotationFactory
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Retrieves a {@link @smartutils.object:ClassAnnotationFactory ClassAnnotationFactory}
     * previously registered under the given name:
     *
     * <pre>
     *   export const GatewayProxied = annotationService.getClassAnnotationFactory('GatewayProxied');
     * </pre>
     *
     * @param {string} name The name of the factory
     * @returns {ClassAnnotationFactory} a {@link @smartutils.object:ClassAnnotationFactory ClassAnnotationFactory}
     */
    AnnotationService.prototype.getClassAnnotationFactory = function (name) {
        var instance = this;
        var classAnnotationFactory = function () {
            var factoryArgument = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                factoryArgument[_i] = arguments[_i];
            }
            return function (originalConstructor) {
                var newConstructor = instance.functionsUtils.extendsConstructor(originalConstructor, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var annotationFactory = instance.annotationFactoryMap[name];
                    if (annotationFactory) {
                        // Note: Before we used to bind originalConstructor.bind(this). However, it had to be left up to the caller
                        // since that causes problems in IE; when a function is bound in IE, the browser wraps it in a function with
                        // native code, making it impossible to retrieve its name.
                        var result = annotationFactory(factoryArgument)(this, originalConstructor, args);
                        if (result) {
                            return result;
                        }
                    }
                    else {
                        throw new Error("annotation '" + name + "' is used on '" + originalConstructor.name + "' but its ClassAnnotationFactory may not have been added to the dependency injection");
                    }
                });
                /*
                 * enable Angular and AngularJS to inject this new constructor even though it has an empty signature
                 * by copying $inject property and DI related Angular metatdata
                 * For idempotency purposes we copy all properties anyways
                 */
                lodash.merge(newConstructor, originalConstructor);
                /*
                 * some properties set by Angular are not enumerable and yet contain
                 * such information as @Inject "metadata" necessary for DI
                 */
                newConstructor.__annotations__ = originalConstructor.__annotations__;
                newConstructor.__parameters__ = originalConstructor.__parameters__;
                newConstructor.__prop__metadata__ = originalConstructor.__prop__metadata__;
                /*
                 * copying such metadata as design:paramtypes necessary for DI
                 */
                Reflect.getMetadataKeys(originalConstructor).forEach(function (key) {
                    Reflect.defineMetadata(key, Reflect.getMetadata(key, originalConstructor), newConstructor);
                });
                var rootOriginalConstructor = instance.getOriginalConstructor(originalConstructor);
                Reflect.defineMetadata(instance.ORIGINAL_CONSTRUCTOR_KEY, rootOriginalConstructor, newConstructor);
                Reflect.defineMetadata(annotationType.Class + ':' + name, factoryArgument, rootOriginalConstructor);
                // override original constructor
                return newConstructor;
            };
        };
        classAnnotationFactory.annotationName = name;
        return classAnnotationFactory;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#setMethodAnnotationFactory
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Registers a {@link @smartutils.object:MethodAnnotationFactory MethodAnnotationFactory} under a given name.
     * <br/>Typically, in order for the MethodAnnotationFactory to benefit from Angular dependency injection, this method will be called within an Angular factory.
     * @param {string} name The name of the factory.
     * @returns {MethodAnnotationFactory} a {@link @smartutils.object:MethodAnnotationFactory MethodAnnotationFactory}
     */
    AnnotationService.prototype.setMethodAnnotationFactory = function (name, annotationFactory) {
        this.annotationFactoryMap[name] = annotationFactory;
        return annotationFactory;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#getMethodAnnotationFactory
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Retrieves a method level {@link @smartutils.object:MethodAnnotationFactory MethodAnnotationFactory}
     * previously registered under the given name:
     *
     * <pre>
     *   export const Cached = annotationService.getMethodAnnotationFactory('Cached');
     * </pre>
     *
     * @param {string} name the name of the factory.
     * @returns {MethodAnnotationFactory} a {@link @smartutils.object:MethodAnnotationFactory MethodAnnotationFactory}.
     */
    AnnotationService.prototype.getMethodAnnotationFactory = function (name) {
        var instance = this;
        var methodAnnotationFactory = function () {
            var factoryArgument = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                factoryArgument[_i] = arguments[_i];
            }
            /*
             * when decorating an abstract class, strangely enough target is an instance of the abstract class
             * we need pass "this" instead to the annotationFactory invocation
             */
            return function (target, propertyName, descriptor) {
                var originalMethod = descriptor.value;
                descriptor.value = function () {
                    var annotationFactory = instance
                        .annotationFactoryMap[name];
                    if (annotationFactory) {
                        return originalMethod
                            ? annotationFactory(factoryArgument)(this, propertyName, originalMethod.bind(this), arguments)
                            : undefined;
                    }
                    else {
                        throw new Error("annotation '" + name + "' is used but its MethodAnnotationFactory may not have been added to the dependency injection");
                    }
                };
                Reflect.defineMetadata(annotationType.Method + ':' + name, factoryArgument, target, propertyName);
            };
        };
        methodAnnotationFactory.annotationName = name;
        return methodAnnotationFactory;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AnnotationService#getOriginalConstructor
     * @methodOf @smartutils.services:AnnotationService
     *
     * @description
     * Given a class constructor, returns the original constructor of it prior to any class level
     * proxying by annotations declared through {@link @smartutils.services:AnnotationService AnnotationService}
     *
     * @param {Class} target the constructor
     */
    AnnotationService.prototype.getOriginalConstructor = function (target) {
        return Reflect.getMetadata(this.ORIGINAL_CONSTRUCTOR_KEY, target) || target;
    };
    AnnotationService.prototype.getClassAnnotationsLogic = function (target) {
        var originalConstructor = this.getOriginalConstructor(target);
        var annotationMap = {};
        Reflect.getMetadataKeys(originalConstructor)
            .filter(function (key) { return key.toString().startsWith(annotationType.Class); })
            .map(function (key) {
            annotationMap[key.split(':')[1]] = Reflect.getMetadata(key, originalConstructor);
        });
        return annotationMap;
    };
    AnnotationService.prototype.getMethodAnnotationsLogic = function (target, propertyName) {
        var annotationMap = {};
        Reflect.getMetadataKeys(target.prototype, propertyName)
            .filter(function (key) { return key.toString().startsWith(annotationType.Method); })
            .map(function (key) {
            annotationMap[key.split(':')[1]] = Reflect.getMetadata(key, target.prototype, propertyName);
        });
        return annotationMap;
    };
    return AnnotationService;
}());
var annotationService = new AnnotationService();

/// ////////////////////////////////////////////////////////////////////////////
/// ////////////////////////////// CACHE CONFIG ////////////////////////////////
/// ////////////////////////////////////////////////////////////////////////////
var cacheConfigAnnotationName = 'CacheConfig';
/**
 * @ngdoc object
 * @name @smartutils.object:@CacheConfig
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory} responsible for setting
 *  class level cache configuration to be merged into method specific {@link @smartutils.object:@Cached @Cached} and
 *  {@link @smartutils.object:@InvalidateCache @InvalidateCache} configurations.
 * @param {object} cacheConfig the configuration fo this cache
 * @param {cacheAction} cacheConfig.actions the list of {@link @smartutils.object:CacheAction CacheAction} characterizing this cache.
 * @param {EvictionTag[]} cacheConfig.tags a list of {@link @smartutils.object:EvictionTag EvictionTag} to control the eviction behaviour of this cache.
 */
var CacheConfig = annotationService.getClassAnnotationFactory(cacheConfigAnnotationName);
function CacheConfigAnnotationFactory(logService) {
    'ngInject';
    return annotationService.setClassAnnotationFactory(cacheConfigAnnotationName, function (factoryArguments) {
        return function (instance, originalConstructor, invocationArguments) {
            originalConstructor.call.apply(originalConstructor, __spreadArrays([instance], invocationArguments));
            instance.cacheConfig = factoryArguments[0];
            logService.debug("adding cache config " + JSON.stringify(instance.cacheConfig) + " to class " + functionsUtils.getInstanceConstructorName(instance), instance);
        };
    });
}
/// ////////////////////////////////////////////////////////////////////////////
/// ///////////////////////////////// CACHE ////////////////////////////////////
/// ////////////////////////////////////////////////////////////////////////////
var CachedAnnotationName = 'Cached';
/**
 * @ngdoc object
 * @name @smartutils.object:@Cached
 * @description
 * Method level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory} responsible for performing
 * invocation arguments sensitive method caching.
 * <br/> This annotation must only be used on methods returning promises.
 * @param {object} cacheConfig the configuration fo this cache
 * <br/> This configuration will be merged with a class level {@link @smartutils.object:@CacheConfig @acheConfig} if any.
 * @throws if no {@link @smartutils.object:CacheAction CacheAction} is found in the resulting merge
 * @param {cacheAction} cacheConfig.actions the list of {@link @smartutils.object:CacheAction CacheAction} characterizing this cache.
 * @param {EvictionTag[]} cacheConfig.tags a list of {@link @smartutils.object:EvictionTag EvictionTag} to control the eviction behaviour of this cache.
 */
var Cached = annotationService.getMethodAnnotationFactory(CachedAnnotationName);
function CachedAnnotationFactory(cacheService) {
    'ngInject';
    var result = annotationService.setMethodAnnotationFactory(CachedAnnotationName, function (factoryArguments) {
        return function (target, propertyName, originalMethod, invocationArguments) {
            var actions = [];
            var tags = [];
            if (factoryArguments[0]) {
                actions = factoryArguments[0].actions;
                tags = factoryArguments[0].tags;
            }
            if (target.cacheConfig) {
                if (target.cacheConfig.actions) {
                    actions = lodash.uniq(actions.concat(target.cacheConfig.actions));
                }
                if (target.cacheConfig.tags) {
                    tags = lodash.uniq(tags.concat(target.cacheConfig.tags));
                }
            }
            if (!actions.length) {
                var constructorName = functionsUtils.getInstanceConstructorName(target);
                throw new Error("method " + propertyName + " of " + constructorName + " is @Cached annotated but no CacheAction is specified either through @Cached or through class level @CacheConfig annotation");
            }
            return cacheService.handle(target, propertyName, originalMethod, Array.prototype.slice.apply(invocationArguments), actions, tags);
        };
    });
    return result;
}
/// ////////////////////////////////////////////////////////////////////////////
/// /////////////////////////// INVALIDATE CACHE ///////////////////////////////
/// ////////////////////////////////////////////////////////////////////////////
var InvalidateCacheName = 'InvalidateCache';
/**
 * @ngdoc object
 * @name @smartutils.object:@InvalidateCache
 * @description
 * Method level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory} responsible for
 * invalidating all caches either directly or indirectly declaring the {@link @smartutils.object:EvictionTag eviction tag} passed as argument.
 * if no eviction tag is passed as argument, defaults to the optional eviction tags passed to the class through {@link @smartutils.object:@CacheConfig @CacheConfig}.
 *
 * @param {EvictionTag} evictionTag the {@link @smartutils.object:EvictionTag eviction tag}.
 */
var InvalidateCache = function (tag) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return annotationService.getMethodAnnotationFactory(InvalidateCacheName)(tag);
};
function InvalidateCacheAnnotationFactory(cacheService) {
    'ngInject';
    return annotationService.setMethodAnnotationFactory(InvalidateCacheName, function (factoryArguments) {
        return function (target, propertyName, originalMethod, invocationArguments) {
            var tags = [];
            var tag = factoryArguments[0];
            if (!tag) {
                if (target.cacheConfig && target.cacheConfig.tags) {
                    tags = target.cacheConfig.tags;
                }
            }
            else {
                tags = [tag];
            }
            if (!tags.length) {
                throw new Error("method " + propertyName + " of " + target.constructor.name + " is @InvalidateCache annotated but no EvictionTag is specified either through @InvalidateCache or through class level @CacheConfig annotation");
            }
            // eslint-disable-next-line prefer-spread
            var returnedObject = originalMethod.apply(undefined, Array.prototype.slice.call(invocationArguments));
            if (returnedObject && returnedObject.then) {
                return returnedObject.then(function (value) {
                    cacheService.evict.apply(cacheService, tags);
                    return value;
                });
            }
            else {
                cacheService.evict.apply(cacheService, tags);
                return returnedObject;
            }
        };
    });
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
/**
 * @ngdoc object
 * @name @smartutils.object:CacheAction
 * @description
 * A {@link @smartutils.object:@Cached @Cached} annotation is associated to a CacheAction.
 */
var CacheAction = /** @class */ (function () {
    function CacheAction(name) {
        this.name = name;
    }
    return CacheAction;
}());

var _a, _b;
var LIBRARY_NAME = '@smart/utils';
/* TOKENS */
var WHO_AM_I_RESOURCE_URI_TOKEN = LIBRARY_NAME + "_WHO_AM_I_RESOURCE_URI";
var I18N_RESOURCE_URI_TOKEN = LIBRARY_NAME + "_I18N_RESOURCE_URI";
var EVENT_SERVICE = LIBRARY_NAME + "_EVENTSERVICE";
/* EVENTS */
var REAUTH_STARTED = 'REAUTH_STARTED';
var DEFAULT_AUTHENTICATION_ENTRY_POINT = '/authorizationserver/oauth/token';
/**
 * Root resource URI of i18n API
 */
var I18N_ROOT_RESOURCE_URI = '/smarteditwebservices/v1/i18n';
var DEFAULT_AUTHENTICATION_CLIENT_ID = 'smartedit';
var DEFAULT_AUTH_MAP = (_a = {},
    _a['^(?!' + I18N_ROOT_RESOURCE_URI + '/.*$).*$'] = DEFAULT_AUTHENTICATION_ENTRY_POINT,
    _a);
var DEFAULT_CREDENTIALS_MAP = (_b = {},
    _b[DEFAULT_AUTHENTICATION_ENTRY_POINT] = {
        client_id: DEFAULT_AUTHENTICATION_CLIENT_ID
    },
    _b);
var LANDING_PAGE_PATH = '/';
var SWITCH_LANGUAGE_EVENT = 'SWITCH_LANGUAGE_EVENT';
var SELECTED_LANGUAGE = 'SELECTED_LANGUAGE';
var EVENTS = {
    AUTHORIZATION_SUCCESS: 'AUTHORIZATION_SUCCESS',
    USER_HAS_CHANGED: 'USER_HAS_CHANGED',
    LOGOUT: 'SE_LOGOUT_EVENT',
    CLEAR_PERSPECTIVE_FEATURES: 'CLEAR_PERSPECTIVE_FEATURES',
    EXPERIENCE_UPDATE: 'experienceUpdate',
    PERMISSION_CACHE_CLEANED: 'PERMISSION_CACHE_CLEANED',
    PAGE_CHANGE: 'PAGE_CHANGE',
    PAGE_CREATED: 'PAGE_CREATED_EVENT',
    PAGE_UPDATED: 'PAGE_UPDATED_EVENT',
    PAGE_DELETED: 'PAGE_DELETED_EVENT',
    PAGE_SELECTED: 'PAGE_SELECTED_EVENT',
    PAGE_RESTORED: 'PAGE_RESTORED_EVENT',
    REAUTH_STARTED: 'REAUTH_STARTED'
};
var DEFAULT_LANGUAGE_ISO = 'en';
var LANGUAGE_SERVICE_CONSTANTS = new core.InjectionToken('LANGUAGE_SERVICE_CONSTANTS');
var LANGUAGE_SERVICE = new core.InjectionToken('LANGUAGE_SERVICE');

/** @internal */
var CacheEngine = /** @class */ (function () {
    function CacheEngine(windowUtils, promiseUtils, logService) {
        this.windowUtils = windowUtils;
        this.promiseUtils = promiseUtils;
        this.logService = logService;
        this.cachedItemsRegistry = [];
        this.startBackgroundMonitoringJob();
    }
    CacheEngine_1 = CacheEngine;
    CacheEngine.prototype.addItem = function (item, cacheTiming, refresh) {
        if (this.getItemIndex(item) === -1) {
            this.cachedItemsRegistry.push({
                item: item,
                cacheTiming: cacheTiming,
                refresh: refresh,
                completed: false,
                processing: false,
                defer: this.promiseUtils.defer()
            });
        }
        else {
            this.logService.warn("CacheEngine - item already exist for id: " + item.id);
        }
    };
    CacheEngine.prototype.getItemById = function (id) {
        var match = this.cachedItemsRegistry.find(function (obj) { return obj.item.id === id; });
        return match ? match.item : null;
    };
    CacheEngine.prototype.handle = function (item) {
        var obj = this.cachedItemsRegistry[this.getItemIndex(item)];
        if (obj.completed && !this.hasExpired(item)) {
            obj.defer.resolve(item.cache);
        }
        else if (!obj.processing) {
            obj.processing = true;
            this.refreshCache(obj);
        }
        return obj.defer.promise;
    };
    CacheEngine.prototype.evict = function () {
        var _this = this;
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        tags.forEach(function (tag) {
            _this.cachedItemsRegistry
                .filter(function (obj) { return obj.item.evictionTags.indexOf(tag) > -1; })
                .forEach(function (obj) { return _this.cachedItemsRegistry.splice(_this.getItemIndex(obj.item), 1); });
        });
    };
    // regularly go though cache data and call prebound methods to refresh data when needed.
    CacheEngine.prototype.startBackgroundMonitoringJob = function () {
        var _this = this;
        this.windowUtils.runIntervalOutsideAngular(function () {
            return Promise.all(_this.cachedItemsRegistry
                .filter(function (obj) { return _this.needRefresh(obj.item); })
                .map(function (obj) { return _this.refreshCache(obj); }));
        }, CacheEngine_1.BACKGROUND_REFRESH_INTERVAL);
    };
    CacheEngine.prototype.refreshCache = function (obj) {
        var _this = this;
        return obj.refresh().then(function (value) {
            // TODO: read value.metadata to refresh expiry/refresh ages.
            obj.cacheTiming.setAge(obj.item);
            obj.item.cache = value;
            obj.item.timestamp = new Date().getTime();
            obj.completed = true;
            obj.processing = false;
            obj.defer.resolve(value);
        }, function (e) {
            _this.logService.debug("CacheEngine - unable to refresh cache for id: " + obj.item.id, e);
            delete obj.item.cache;
            obj.defer.reject(e);
        });
    };
    CacheEngine.prototype.hasExpired = function (item) {
        return item.timestamp + item.expirationAge <= new Date().getTime();
    };
    CacheEngine.prototype.needRefresh = function (item) {
        return item.timestamp + item.refreshAge <= new Date().getTime();
    };
    CacheEngine.prototype.getItemIndex = function (item) {
        return this.cachedItemsRegistry.findIndex(function (o) { return o.item.id === item.id; });
    };
    var CacheEngine_1;
    CacheEngine.BACKGROUND_REFRESH_INTERVAL = 10000;
    CacheEngine = CacheEngine_1 = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [WindowUtils,
            PromiseUtils,
            LogService])
    ], CacheEngine);
    return CacheEngine;
}());

var DefaultCacheTiming = /** @class */ (function () {
    function DefaultCacheTiming(expirationAge, refreshAge) {
        // The cached response is discarded if it is older than the expiration age.
        this.expirationAge = expirationAge;
        // maximum age for the cached response to be considered "fresh."
        this.refreshAge = refreshAge;
    }
    DefaultCacheTiming.prototype.setAge = function (_item) {
        var item = __assign(__assign({}, _item), { expirationAge: this.expirationAge, refreshAge: this.refreshAge });
        return item;
    };
    return DefaultCacheTiming;
}());

/**
 * @ngdoc service
 * @name @smartutils.services:CacheService
 * @description
 * Service to which the {@link @smartutils.object:@Cached @Cached} and {@link @smartutils.object:@InvalidateCache @InvalidateCache} annotations delegate to perform service method level caching.
 * It is not handled explicitly except for its evict method.
 */
var CacheService = /** @class */ (function () {
    function CacheService(logService, stringUtils, functionsUtils, eventService, cacheEngine) {
        this.logService = logService;
        this.stringUtils = stringUtils;
        this.functionsUtils = functionsUtils;
        this.eventService = eventService;
        this.cacheEngine = cacheEngine;
        this.predicatesRegistry = [];
        this.eventListeners = [];
        this.defaultCacheTiming = new DefaultCacheTiming(24 * 60 * 60 * 1000, 12 * 60 * 60 * 1000);
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:CacheService#register
     * @methodOf @smartutils.services:CacheService
     *
     * @description
     * Register a new predicate with it's associated cacheTiming.
     * Each time the @Cache annotation is handled, the CacheService try to find a matching cacheTiming for the given cacheActions.
     *
     * @param {ICachePredicate} test This function takes the cacheActions {@link @smartutils.object:CacheAction CacheAction} argument, and must return a Boolean that is true if the given cacheActions match the predicate.
     * @param {ICacheTiming} cacheTiming This function is used to call setAge(item: ICacheItem<any>) on the cached item.
     *
     * @return {CacheService} CacheService The CacheService instance.
     *
     * @example
     * ```ts
     * export class CustomCacheTiming implements ICacheTiming {
     * 	private expirationAge: number;
     * 	private refreshAge: number;
     *  constructor(expirationAge: number, refreshAge: number) {
     * 		// The cached response is discarded if it is older than the expiration age.
     * 		this.expirationAge = expirationAge;
     * 		// maximum age for the cached response to be considered "fresh."
     * 		this.refreshAge = refreshAge;
     * 	}
     * 	setAge(item: ICacheItem<any>): void {
     * 		item.expirationAge = this.expirationAge;
     * 		item.refreshAge = this.refreshAge;
     * 	}
     * 	};
     * 	const customCacheTiming = new CustomCacheTiming(30 * 60000, 15 * 60000);
     * 	const customContentPredicate: ICachePredicate = (cacheActions: CacheAction[]) => {
     * 		return cacheActions.find((cacheAction) => cacheAction.name === 'CUSTOM_TAG') !== null;
     * 	};
     * this.register(customContentPredicate, customCacheTiming);
     * ```
     */
    CacheService.prototype.register = function (test, cacheTiming) {
        this.predicatesRegistry.unshift({
            test: test,
            cacheTiming: cacheTiming
        });
        return this;
    };
    /**
     * public method but only meant to be used by @Cache annotation
     */
    CacheService.prototype.handle = function (service, methodName, preboundMethod, invocationArguments, cacheActions, tags) {
        var constructorName = this.functionsUtils.getInstanceConstructorName(service);
        var cachedItemId = window.btoa(constructorName + methodName) +
            this.stringUtils.encode(invocationArguments);
        var _item = this.cacheEngine.getItemById(cachedItemId);
        var item;
        if (!_item) {
            var partialItem = _item || {
                id: cachedItemId,
                timestamp: new Date().getTime(),
                evictionTags: this.collectEventNamesFromTags(tags),
                cache: null
            };
            var cacheTiming = this.findCacheTimingByCacheActions(cacheActions);
            if (!cacheTiming) {
                throw new Error('CacheService::handle - No predicate match.');
            }
            item = cacheTiming.setAge(partialItem);
            this.cacheEngine.addItem(item, cacheTiming, preboundMethod.bind.apply(preboundMethod, __spreadArrays([undefined], Array.prototype.slice.call(invocationArguments))));
            this.listenForEvictionByTags(tags);
        }
        else {
            item = _item;
        }
        return this.cacheEngine.handle(item);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:CacheService#evict
     * @methodOf  @smartutils.services:CacheService
     * @description
     * Will evict the entire cache of all methods of all services referencing either directly or indirectly the given {@link @smartutils.object:EvictionTag EvictionTags}
     * @param {...EvictionTag[]} evictionTags the {@link @smartutils.object:EvictionTag EvictionTags}
     */
    CacheService.prototype.evict = function () {
        var _a;
        var _this = this;
        var evictionTags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            evictionTags[_i] = arguments[_i];
        }
        var tags = this.collectEventNamesFromTags(evictionTags);
        (_a = this.cacheEngine).evict.apply(_a, tags);
        tags.forEach(function (tag) { return _this.eventService.publish(tag); });
    };
    CacheService.prototype.listenForEvictionByTags = function (tags) {
        var _this = this;
        this.collectEventNamesFromTags(tags)
            .filter(function (eventId) { return _this.eventListeners.indexOf(eventId) === -1; })
            .forEach(function (eventId) {
            _this.logService.debug("registering event listener " + eventId);
            _this.eventListeners.push(eventId);
            _this.eventService.subscribe(eventId, function (evt, data) {
                _this.logService.debug("cleaning cache on event " + eventId);
                _this.cacheEngine.evict(eventId);
                return Promise.resolve({});
            });
        });
    };
    CacheService.prototype.collectEventNamesFromTags = function (tags) {
        var _this = this;
        if (tags && tags.length) {
            return lodash.union.apply(lodash, tags.map(function (t) { return _this.collectEventNamesFromTag(t); }));
        }
        else {
            return [];
        }
    };
    CacheService.prototype.collectEventNamesFromTag = function (tag) {
        var _this = this;
        return lodash.union.apply(lodash, __spreadArrays([[tag.event]], (tag.relatedTags ? tag.relatedTags.map(function (t) { return _this.collectEventNamesFromTag(t); }) : [])));
    };
    CacheService.prototype.findCacheTimingByCacheActions = function (cacheActions) {
        var predicate = this.predicatesRegistry.find(function (cacheTimingPredicate) {
            return cacheTimingPredicate.test(cacheActions);
        });
        return predicate ? predicate.cacheTiming : this.defaultCacheTiming;
    };
    CacheService = __decorate([
        core.Injectable(),
        __param(3, core.Inject(EVENT_SERVICE)),
        __metadata("design:paramtypes", [LogService,
            StringUtils,
            FunctionsUtils, Object, CacheEngine])
    ], CacheService);
    return CacheService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
/**
 * @ngdoc object
 * @name @smartutils.object:EvictionTag
 * @description
 * A {@link @smartutils.object:@Cached @Cached} annotation is tagged with 0 to n EvictionTag, each EvictionTag possibly referencing other evictionTags.
 * <br/>An EvictionTag enables a method cache to be evicted 2 different ways:
 * <ul>
 * <li> An event with the same name as the tag is raised.</li>
 * <li> {@link @smartutils.services:CacheService#methods_evict evict} method of {@link @smartutils.services:CacheService cacheService} is invoked with the tag.</li>
 * </ul>
 */
var EvictionTag = /** @class */ (function () {
    function EvictionTag(args) {
        this.event = args.event;
        this.relatedTags = args.relatedTags;
    }
    return EvictionTag;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var RarelyChangingContentName = 'RarelyChangingContent';
var rarelyChangingContent = new CacheAction(RarelyChangingContentName);

/**
 * @ngdoc service
 * @name @smartutils.services:BackendEntry
 * @description
 * Invocations of {@link @smartutils.services:HttpBackendService} when, whenGET, whenPOST, whenPUT, whenDELETE
 * all return an instance of {@link @smartutils.services:BackendEntry BackendEntry}
 * It is used to specify the mocked response for the given conditions.
 */
var BackendEntry = /** @class */ (function () {
    function BackendEntry(pattern, matchingPayload) {
        this.pattern = pattern;
        this.matchingPayload = matchingPayload;
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:BackendEntry#respond
     * @methodOf @smartutils.services:BackendEntry
     * @description
     * @param {BackendRespond} mock the {@link @smartutils.object:BackendRespond} to return for the given conditions
     */
    BackendEntry.prototype.respond = function (mock) {
        this.mock = mock;
        return this;
    };
    BackendEntry.prototype.passThrough = function () {
        //
    };
    return BackendEntry;
}());
/**
 * @ngdoc service
 * @name @smartutils.services:HttpBackendService
 * @description
 * Service aimed to provide mocked backend responses for given http request patterns.
 * It follows the API of {@link https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend $httpBackend}
 * minus a few limitations
 */
var HttpBackendService = /** @class */ (function () {
    function HttpBackendService() {
        this.matchLatestDefinition = false;
        this.backends = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: []
        };
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:HttpBackendService#whenGET
     * @methodOf @smartutils.services:HttpBackendService
     * @description
     * method similar to {@link https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend#whenGET $httpBackend#whenGET}
     * but with only the url pattern as parameter
     * @param {string | RegExp} pattern url end of the url pattern to match
     * @returns {BackendEntry} the {@link @smartutils.services:BackendEntry backenEntry}
     */
    HttpBackendService.prototype.whenGET = function (pattern) {
        return this._whenMethod('GET', pattern);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:HttpBackendService#whenPOST
     * @methodOf @smartutils.services:HttpBackendService
     * @description
     * method similar to {@link https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend#whenPOST $httpBackend#whenPOST}
     * but with only the first 2 arguments
     * @param {string | RegExp} pattern url end of the url pattern to match
     * @param {Cloenable=} matchingPayload HTTP request body to be matched
     * @returns {BackendEntry} the {@link @smartutils.services:BackendEntry backenEntry}
     */
    HttpBackendService.prototype.whenPOST = function (pattern, matchingPayload) {
        return this._whenMethod('POST', pattern, matchingPayload);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:HttpBackendService#whenPUT
     * @methodOf @smartutils.services:HttpBackendService
     * @description
     * method similar to {@link https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend#whenPUT $httpBackend#whenPUT}
     * but with only the first 2 arguments
     * @param {string | RegExp} pattern url end of the url pattern to match
     * @param {Cloenable=} matchingPayload HTTP request body to be matched
     * @returns {BackendEntry} the {@link @smartutils.services:BackendEntry backenEntry}
     */
    HttpBackendService.prototype.whenPUT = function (pattern, matchingPayload) {
        return this._whenMethod('PUT', pattern, matchingPayload);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:HttpBackendService#whenPUT
     * @methodOf @smartutils.services:HttpBackendService
     * @description
     * method similar to {@link https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend#whenPUT $httpBackend#whenPUT}
     * but with only the url pattern as parameter
     * @param {string | RegExp} pattern url end of the url pattern to match
     * @returns {BackendEntry} the {@link @smartutils.services:BackendEntry backenEntry}
     */
    HttpBackendService.prototype.whenDELETE = function (pattern) {
        return this._whenMethod('DELETE', pattern);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:HttpBackendService#when
     * @methodOf @smartutils.services:HttpBackendService
     * @description
     * method similar to {@link https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend#when $httpBackend#when}
     * @param {string} method GET, POST, PUT, or DELETE
     * @param {string | RegExp} pattern url end of the url pattern to match
     * @param {Cloenable=} matchingPayload HTTP request body to be matched
     * @returns {BackendEntry} the {@link @smartutils.services:BackendEntry backenEntry}
     */
    HttpBackendService.prototype.when = function (method, pattern, matchingPayload) {
        return this._whenMethod(method, pattern, matchingPayload);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:HttpBackendService#whenAsync
     * @methodOf @smartutils.services:HttpBackendService
     * @description
     * method similar to legacy $httpBackend#whenAsync, use {@link @smartutils.services:HttpBackendService#when HttpBackendService#when} instead
     * @param {string} method GET, POST, PUT, or DELETE
     * @param {string | RegExp} pattern url end of the url pattern to match
     * @param {Cloenable=} matchingPayload HTTP request body to be matched
     * @returns {BackendEntry} the {@link @smartutils.services:BackendEntry backenEntry}
     */
    HttpBackendService.prototype.whenAsync = function (method, pattern, matchingPayload) {
        return this._whenMethod(method, pattern, matchingPayload);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:HttpBackendService#matchLatestDefinitionEnabled
     * @methodOf @smartutils.services:HttpBackendService
     * @description
     * method similar to {@link https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend#matchLatestDefinitionEnabled $httpBackend#matchLatestDefinitionEnabled}
     * @param {boolean=false} matchLatestDefinitionEnabled if true, the last matching pattern will be picked. Otherwise the first is picked
     */
    HttpBackendService.prototype.matchLatestDefinitionEnabled = function (matchLatestDefinitionEnabled) {
        this.matchLatestDefinition = matchLatestDefinitionEnabled;
    };
    // whenAsync
    /// /////////////////////////////////
    HttpBackendService.prototype.findMatchingMock = function (request) {
        var _this = this;
        var backendEntry = (this.matchLatestDefinition
            ? this.backends[request.method].slice().reverse()
            : this.backends[request.method]).find(function (entry) {
            if (typeof entry.pattern === 'string') {
                return (request.urlWithParams.endsWith(entry.pattern) &&
                    _this.matchingPayloadRestriction(entry, request));
            }
            else {
                var test = entry.pattern.test(request.urlWithParams) &&
                    _this.matchingPayloadRestriction(entry, request);
                entry.pattern.lastIndex = 0;
                return test;
            }
        });
        return backendEntry ? backendEntry.mock : undefined;
    };
    HttpBackendService.prototype._whenMethod = function (method, pattern, matchingPayload) {
        var entry = new BackendEntry(pattern, matchingPayload);
        this.backends[method].push(entry);
        return entry;
    };
    HttpBackendService.prototype.matchingPayloadRestriction = function (entry, request) {
        return entry.matchingPayload ? lodash.isEqual(entry.matchingPayload, request.body) : true;
    };
    HttpBackendService = __decorate([
        core.Injectable()
    ], HttpBackendService);
    return HttpBackendService;
}());

/*
 * This is the place where the entries through HttpBackenService invocations are being used.
 * All outbound http requests are funneled through here, when a match from HttpBackenService entries
 * is found, the request is intercepted and the specified mock is returned with especified status code.
 * If no match is found, the http request is effectively sent over the wire
 */
var BackendInterceptor = /** @class */ (function () {
    function BackendInterceptor(httpBackendService, httpUtils, urlUtils, logService) {
        this.httpBackendService = httpBackendService;
        this.httpUtils = httpUtils;
        this.urlUtils = urlUtils;
        this.logService = logService;
    }
    BackendInterceptor.prototype.intercept = function (request, next) {
        var backendMockRespond = this.httpBackendService.findMatchingMock(request);
        if (!backendMockRespond) {
            return next.handle(request);
        }
        var response;
        if (typeof backendMockRespond === 'object') {
            response = [200, lodash.cloneDeep(backendMockRespond)];
        }
        else {
            // if (typeof backendMockRespond === 'function')
            var data = null;
            if (request.method === 'GET') {
                data = decodeURIComponent(this.urlUtils.getQueryString(this.httpUtils.copyHttpParamsOrHeaders(request.params)));
            }
            else if (request.headers.get('Content-Type') === 'application/x-www-form-urlencoded') {
                data = request.body; // it is a query string
            }
            else if (request.method === 'POST' || request.method === 'PUT') {
                data = JSON.stringify(request.body);
            }
            var headers = this.httpUtils.copyHttpParamsOrHeaders(request.headers);
            response = backendMockRespond(request.method, decodeURIComponent(request.urlWithParams), data, headers);
        }
        this.logService.debug("backend " + status + " response for " + request.url + ": ");
        return this.httpUtils.buildHttpResponse(request, response).pipe(operators.take(1));
    };
    BackendInterceptor = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [HttpBackendService,
            HttpUtils,
            UrlUtils,
            LogService])
    ], BackendInterceptor);
    return BackendInterceptor;
}());

/*
 * interceptor that will inject flaw into outbound and inbound http calls.
 * It is mainly used to validate reliability and consitency of test frameworks
 */
/** @internal */
var FlawInjectionInterceptor = /** @class */ (function () {
    function FlawInjectionInterceptor(httpUtils, logService) {
        this.httpUtils = httpUtils;
        this.logService = logService;
        this.flawWindow = window;
        this.flawWindow.allRequests = 0;
        this.flawWindow.flawedRequests = 0;
        this.flawWindow.allResponses = 0;
        this.flawWindow.flawedResponses = 0;
    }
    FlawInjectionInterceptor_1 = FlawInjectionInterceptor;
    FlawInjectionInterceptor.registerRequestFlaw = function (mutation) {
        this.requestMutations.push(mutation);
    };
    FlawInjectionInterceptor.registerResponseFlaw = function (mutation) {
        this.responseMutations.push(mutation);
    };
    FlawInjectionInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var result;
        if (FlawInjectionInterceptor_1.PROBABILITY !== 0 &&
            this.httpUtils.isCRUDRequest(request) &&
            !this._isGET(request)) {
            this.flawWindow.allRequests++;
            if (this._activateWithProbability(FlawInjectionInterceptor_1.PROBABILITY)) {
                this.flawWindow.flawedRequests++;
                var requestMutation = FlawInjectionInterceptor_1.requestMutations.find(function (mutation) {
                    return mutation.test(request);
                });
                if (requestMutation) {
                    this.logService.error("FLAWED REQUEST-\"" + request.url);
                    result = next.handle(requestMutation.mutate(request));
                }
            }
            result = next.handle(request);
            return result.pipe(operators.map(function (event) {
                if (event instanceof http.HttpResponse &&
                    _this._activateWithProbability(FlawInjectionInterceptor_1.PROBABILITY)) {
                    _this.flawWindow.flawedResponses++;
                    var responseMutation = FlawInjectionInterceptor_1.responseMutations.find(function (mutation) { return mutation.test(request); });
                    if (responseMutation && event instanceof http.HttpResponse) {
                        _this.logService.error("FLAWED RESPONSE-\"" + request.url);
                        return responseMutation.mutate(event);
                    }
                }
                return event;
            }));
        }
        else {
            return next.handle(request);
        }
    };
    FlawInjectionInterceptor.prototype._isGET = function (config) {
        return config.method === 'GET';
    };
    FlawInjectionInterceptor.prototype._activateWithProbability = function (probabilityTrue) {
        return Math.random() >= 1.0 - probabilityTrue;
    };
    var FlawInjectionInterceptor_1;
    FlawInjectionInterceptor.requestMutations = [];
    FlawInjectionInterceptor.responseMutations = [];
    /*
     * probability of flaw occurrence ranging from 0 to 1
     */
    FlawInjectionInterceptor.PROBABILITY = 0;
    FlawInjectionInterceptor = FlawInjectionInterceptor_1 = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [HttpUtils, LogService])
    ], FlawInjectionInterceptor);
    return FlawInjectionInterceptor;
}());

/** @internal */
var FlawInjectionInterceptorModule = /** @class */ (function () {
    function FlawInjectionInterceptorModule() {
    }
    FlawInjectionInterceptorModule = __decorate([
        core.NgModule({
            imports: [],
            providers: [
                {
                    provide: http.HTTP_INTERCEPTORS,
                    useClass: FlawInjectionInterceptor,
                    multi: true
                },
                {
                    provide: core.APP_INITIALIZER,
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    useFactory: function () {
                        FlawInjectionInterceptor.registerRequestFlaw({
                            test: function (request) { return /sites\/[\w-]+\//.test(request.url); },
                            mutate: function (request) {
                                return request.clone({
                                    url: request.url.replace(/sites\/([\w-]+)\//, 'sites/' + Math.random() + '/')
                                });
                            }
                        });
                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        return function (component) {
                            // an initializer useFactory must return a function
                        };
                    },
                    multi: true
                }
            ]
        })
    ], FlawInjectionInterceptorModule);
    return FlawInjectionInterceptorModule;
}());

(function (IAlertServiceType) {
    IAlertServiceType["INFO"] = "information";
    IAlertServiceType["SUCCESS"] = "success";
    IAlertServiceType["WARNING"] = "warning";
    IAlertServiceType["DANGER"] = "error";
})(exports.IAlertServiceType || (exports.IAlertServiceType = {}));
var IAlertService = /** @class */ (function () {
    function IAlertService() {
    }
    IAlertService.prototype.showAlert = function (alertConf) {
        'proxyFunction';
        return;
    };
    IAlertService.prototype.showInfo = function (alertConf) {
        'proxyFunction';
        return;
    };
    IAlertService.prototype.showDanger = function (alertConf) {
        'proxyFunction';
        return;
    };
    IAlertService.prototype.showWarning = function (alertConf) {
        'proxyFunction';
        return;
    };
    IAlertService.prototype.showSuccess = function (alertConf) {
        'proxyFunction';
        return;
    };
    return IAlertService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
/**
 * @ngdoc service
 * @name @smartutils.services:authenticationService
 *
 * @description
 * The authenticationService is used to authenticate and logout from SmartEdit.
 * It also allows the management of entry points used to authenticate the different resources in the application.
 *
 */
var IAuthenticationService = /** @class */ (function () {
    function IAuthenticationService() {
        this.reauthInProgress = {};
        this.initialized = false;
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:authenticationService#authenticate
     * @methodOf @smartutils.services:authenticationService
     *
     * @description
     * Authenticates the current SmartEdit user against the entry point assigned to the requested resource. If no
     * suitable entry point is found, the resource will be authenticated against the
     * {@link resourceLocationsModule.object:DEFAULT_AUTHENTICATION_ENTRY_POINT DEFAULT_AUTHENTICATION_ENTRY_POINT}
     *
     * @param {String} resource The URI identifying the resource to access.
     * @returns {Promise} A promise that resolves if the authentication is successful.
     */
    IAuthenticationService.prototype.authenticate = function (resource) {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:authenticationService#logout
     * @methodOf @smartutils.services:authenticationService
     *
     * @description
     * The logout method removes all stored authentication tokens and redirects to the
     * landing page.
     *
     */
    IAuthenticationService.prototype.logout = function () {
        'proxyFunction';
        return Promise.resolve();
    };
    // abstract onLogout(_onLogout: () => void): void;
    // abstract onUserHasChanged(_onUserHasChanged: () => void): void;
    IAuthenticationService.prototype.isReAuthInProgress = function (entryPoint) {
        'proxyFunction';
        return Promise.resolve(false);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:authenticationService#setReAuthInProgress
     * @methodOf @smartutils.services:authenticationService
     *
     * @description
     * Used to indicate that the user is currently within a re-authentication flow for the given entry point.
     * This flow is entered by default through authentication token expiry.
     *
     * @param {String} entryPoint The entry point which the user must be re-authenticated against.
     *
     */
    IAuthenticationService.prototype.setReAuthInProgress = function (entryPoint) {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:authenticationService#filterEntryPoints
     * @methodOf @smartutils.services:authenticationService
     *
     * @description
     * Will retrieve all relevant authentication entry points for a given resource.
     * A relevant entry point is an entry value of the authenticationMap found in {@link @smartutils.sharedDataService sharedDataService}.The key used in that map is a regular expression matching the resource.
     * When no entry point is found, the method returns the {@link resourceLocationsModule.object:DEFAULT_AUTHENTICATION_ENTRY_POINT DEFAULT_AUTHENTICATION_ENTRY_POINT}
     * @param {string} resource The URL for which a relevant authentication entry point must be found.
     */
    IAuthenticationService.prototype.filterEntryPoints = function (resource) {
        'proxyFunction';
        return Promise.resolve([]);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:authenticationService##isAuthEntryPoint
     * @methodOf @smartutils.services:authenticationService
     *
     * @description
     * Indicates if the resource URI provided is one of the registered authentication entry points.
     *
     * @param {String} resource The URI to compare
     * @returns {Boolean} Flag that will be true if the resource URI provided is an authentication entry point.
     */
    IAuthenticationService.prototype.isAuthEntryPoint = function (resource) {
        'proxyFunction';
        return Promise.resolve(false);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:authenticationService##isAuthenticated
     * @methodOf @smartutils.services:authenticationService
     *
     * @description
     * Indicates if the resource URI provided maps to a registered authentication entry point and the associated entry point has an authentication token.
     *
     * @param {String} resource The URI to compare
     * @returns {Boolean} Flag that will be true if the resource URI provided maps to an authentication entry point which has an authentication token.
     */
    IAuthenticationService.prototype.isAuthenticated = function (url) {
        'proxyFunction';
        return Promise.resolve(false);
    };
    return IAuthenticationService;
}());

/**
 * @ngdoc interface
 * @name @smartutils.interfaces:IStorageService
 * @description
 * Interface for StorageService
 */
var IStorageService = /** @class */ (function () {
    function IStorageService() {
    }
    /**
     * @ngdoc method
     * @name @smartutils.interfaces:IStorageService#isInitialized
     * @methodOf @smartutils.interfaces:IStorageService
     *
     * @description
     * This method is used to determine if the storage service has been initialized properly. It
     * makes sure that the smartedit-sessions cookie is available in the browser.
     *
     * @returns {Boolean} Indicates if the storage service was properly initialized.
     */
    IStorageService.prototype.isInitialized = function () {
        'proxyFunction';
        return Promise.resolve(false);
    };
    /**
     * @ngdoc method
     * @name @smartutils.interfaces:IStorageService#storeAuthToken
     * @methodOf @smartutils.interfaces:IStorageService
     *
     * @description
     * This method creates and stores a new key/value entry. It associates an authentication token with a
     * URI.
     *
     * @param {String} authURI The URI that identifies the resource(s) to be authenticated with the authToken. Will be used as a key.
     * @param {String} auth The token to be used to authenticate the user in the provided URI.
     */
    IStorageService.prototype.storeAuthToken = function (authURI, auth) {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name @smartutils.interfaces:IStorageService#getAuthToken
     * @methodOf @smartutils.interfaces:IStorageService
     *
     * @description
     * This method is used to retrieve the authToken associated with the provided URI.
     *
     * @param {String} authURI The URI for which the associated authToken is to be retrieved.
     * @returns {String} The authToken used to authenticate the current user in the provided URI.
     */
    IStorageService.prototype.getAuthToken = function (authURI) {
        'proxyFunction';
        return Promise.resolve(undefined);
    };
    /**
     * @ngdoc method
     * @name @smartutils.interfaces:IStorageService#removeAuthToken
     * @methodOf @smartutils.interfaces:IStorageService
     *
     * @description
     * Removes the authToken associated with the provided URI.
     *
     * @param {String} authURI The URI for which its authToken is to be removed.
     */
    IStorageService.prototype.removeAuthToken = function (authURI) {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name @smartutils.interfaces:IStorageService#removeAllAuthTokens
     * @methodOf @smartutils.interfaces:IStorageService
     *
     * @description
     * This method removes all authURI/authToken key/pairs from the storage service.
     */
    IStorageService.prototype.removeAllAuthTokens = function () {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name @smartutils.interfaces:IStorageService#getValueFromLocalStorage
     * @methodOf @smartutils.interfaces:IStorageService
     *
     * @description
     * Retrieves the value stored in the cookie identified by the provided name.
     */
    IStorageService.prototype.getValueFromLocalStorage = function (cookieName, isEncoded) {
        'proxyFunction';
        return Promise.resolve();
    };
    IStorageService.prototype.setValueInLocalStorage = function (cookieName, value, encode) {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name @smartutils.interfaces:IStorageService#setItem
     * @methodOf @smartutils.interfaces:IStorageService
     *
     * @description
     * This method is used to store the item.
     *
     * @param {String} key The key of the item.
     * @param {any} value The value of the item.
     */
    IStorageService.prototype.setItem = function (key, value) {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name @smartutils.interfaces:IStorageService#getItem
     * @methodOf @smartutils.interfaces:IStorageService
     *
     * @description
     * Retrieves the value for a given key.
     *
     * @param {String} key The key of the item.
     *
     * @returns {Promise<any>} A promise that resolves to the item value.
     */
    IStorageService.prototype.getItem = function (key) {
        'proxyFunction';
        return Promise.resolve();
    };
    return IStorageService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var TESTMODESERVICE = LIBRARY_NAME + "_TESTMODESERVICE";

(function (FundamentalModalButtonStyle) {
    FundamentalModalButtonStyle["Default"] = "light";
    FundamentalModalButtonStyle["Primary"] = "emphasized";
})(exports.FundamentalModalButtonStyle || (exports.FundamentalModalButtonStyle = {}));
(function (FundamentalModalButtonAction) {
    FundamentalModalButtonAction["Close"] = "close";
    FundamentalModalButtonAction["Dismiss"] = "dismiss";
    FundamentalModalButtonAction["None"] = "none";
})(exports.FundamentalModalButtonAction || (exports.FundamentalModalButtonAction = {}));
(function (ModalButtonActions) {
    /**
     * @ngdoc property
     * @name None
     * @propertyOf modalServiceModule.object:ModalButtonActions
     * @description none
     *
     */
    ModalButtonActions["None"] = "none";
    /**
     * @ngdoc property
     * @name Close
     * @propertyOf modalServiceModule.object:ModalButtonActions
     * @description close
     *
     */
    ModalButtonActions["Close"] = "close";
    /**
     * @ngdoc property
     * @name Dismiss
     * @propertyOf modalServiceModule.object:ModalButtonActions
     * @description dismiss
     *
     */
    ModalButtonActions["Dismiss"] = "dismiss";
})(exports.ModalButtonActions || (exports.ModalButtonActions = {}));
(function (ModalButtonStyles) {
    /**
     * @ngdoc property
     * @name Default
     * @propertyOf modalServiceModule.object:ModalButtonStyles
     * @description default
     */
    ModalButtonStyles["Default"] = "default";
    /**
     * @ngdoc property
     * @name Primary
     * @propertyOf modalServiceModule.object:ModalButtonStyles
     * @description primary
     */
    ModalButtonStyles["Primary"] = "primary";
})(exports.ModalButtonStyles || (exports.ModalButtonStyles = {}));

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:ISharedDataService
 *
 * @description
 * Provides an abstract extensible shared data service. Used to store any data to be used either the SmartEdit
 * application or the SmartEdit container.
 *
 * This class serves as an interface and should be extended, not instantiated.
 */
var ISharedDataService = /** @class */ (function () {
    function ISharedDataService() {
    }
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISharedDataService#get
     * @methodOf smarteditServicesModule.interface:ISharedDataService
     *
     * @description
     * Get the data for the given key.
     *
     * @param {String} key The key of the data to fetch
     */
    ISharedDataService.prototype.get = function (key) {
        'proxyFunction';
        return Promise.resolve({});
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISharedDataService#set
     * @methodOf smarteditServicesModule.interface:ISharedDataService
     *
     * @description
     * Set data for the given key.
     *
     * @param {String} key The key of the data to set
     * @param {object} value The value of the data to set
     */
    ISharedDataService.prototype.set = function (key, value) {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISharedDataService#update
     * @methodOf smarteditServicesModule.interface:ISharedDataService
     *
     * @description
     * Convenience method to retrieve and modify on the fly the content stored under a given key
     *
     * @param {String} key The key of the data to store
     * @param {Function} modifyingCallback callback fed with the value stored under the given key. The callback must return the new value of the object to update.
     */
    ISharedDataService.prototype.update = function (key, modifyingCallback) {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISharedDataService#remove
     * @methodOf smarteditServicesModule.interface:ISharedDataService
     *
     * @description
     * Remove the entry for the given key.
     *
     * @param {String} key The key of the data to remove.
     * @returns {Promise<Cloneable>} A promise which resolves to the removed data for the given key.
     */
    ISharedDataService.prototype.remove = function (key) {
        'proxyFunction';
        return Promise.resolve({});
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISharedDataService#containsKey
     * @methodOf smarteditServicesModule.interface:ISharedDataService
     *
     * @description
     * Checks the given key exists or not.
     *
     * @param {String} key The key of the data to check.
     * @returns {Promise<boolean>} A promise which resolves to true if the given key is found. Otherwise false.
     */
    ISharedDataService.prototype.containsKey = function (key) {
        'proxyFunction';
        return Promise.resolve(true);
    };
    return ISharedDataService;
}());

var ISettingsService = /** @class */ (function () {
    function ISettingsService() {
    }
    ISettingsService.prototype.load = function () {
        'proxyFunction';
        return Promise.resolve({ key: '' });
    };
    ISettingsService.prototype.get = function (key) {
        'proxyFunction';
        return Promise.resolve('');
    };
    ISettingsService.prototype.getBoolean = function (key) {
        'proxyFunction';
        return Promise.resolve(true);
    };
    ISettingsService.prototype.getStringList = function (key) {
        'proxyFunction';
        return Promise.resolve([]);
    };
    return ISettingsService;
}());

var IModalService = /** @class */ (function () {
    function IModalService() {
    }
    IModalService.prototype.dismissAll = function () {
        'proxyFunction';
    };
    IModalService.prototype.open = function (conf) {
        'proxyFunction';
        return {};
    };
    return IModalService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:ISessionService
 * @description
 * The ISessionService provides information related to the current session
 * and the authenticated user (including a user readable and writeable languages).
 */
var ISessionService = /** @class */ (function () {
    function ISessionService() {
    }
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISessionService#getCurrentUsername
     * @methodOf smarteditServicesModule.interface:ISessionService
     *
     * @description
     * Returns the username, previously mentioned as "principalUID",
     * associated to the authenticated user.
     *
     * @returns {Promise<string>} A promise resolving to the username,
     * previously mentioned as "principalUID", associated to the
     * authenticated user.
     */
    ISessionService.prototype.getCurrentUsername = function () {
        'proxyFunction';
        return Promise.resolve('');
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISessionService#getCurrentUserDisplayName
     * @methodOf smarteditServicesModule.interface:ISessionService
     *
     * @description
     * Returns the displayed name associated to the authenticated user.
     *
     * @returns {Promise<string>} A promise resolving to the displayed name
     * associated to the authenticated user.
     */
    ISessionService.prototype.getCurrentUserDisplayName = function () {
        'proxyFunction';
        return Promise.resolve('');
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISessionService#getCurrentUser
     * @methodOf smarteditServicesModule.interface:ISessionService
     *
     * @description
     * Returns the data of the current authenticated user.
     * Also note that as part of the User object returned by this method contains
     * the list of readable and writeable languages available to the user.
     *
     * @returns {Promise<User>} A promise resolving to the data of the current
     * authenticated user.
     */
    ISessionService.prototype.getCurrentUser = function () {
        'proxyFunction';
        return Promise.resolve({});
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISessionService#hasUserChanged
     * @methodOf smarteditServicesModule.interface:ISessionService
     *
     * @description
     * Returns boolean indicating whether the current user is different from
     * the last authenticated one.
     *
     * @returns {Promise<boolean>} Boolean indicating whether the current user is
     * different from the last authenticated one.
     */
    ISessionService.prototype.hasUserChanged = function () {
        'proxyFunction';
        return Promise.resolve(true);
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISessionService#resetCurrentUserData
     * @methodOf smarteditServicesModule.interface:ISessionService
     *
     * @description
     * Reset all data associated to the authenticated user.
     * to the authenticated user.
     *
     * @return {Promise<void>} returns an empty promise.
     */
    ISessionService.prototype.resetCurrentUserData = function () {
        'proxyFunction';
        return Promise.resolve();
    };
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:ISessionService#setCurrentUsername
     * @methodOf smarteditServicesModule.interface:ISessionService
     *
     * @description
     * Set the username, previously mentioned as "principalUID", associated
     * to the authenticated user.
     *
     * @return {Promise<void>} returns an empty promise.
     */
    ISessionService.prototype.setCurrentUsername = function () {
        'proxyFunction';
        return Promise.resolve();
    };
    return ISessionService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
var IAuthenticationManagerService = /** @class */ (function () {
    function IAuthenticationManagerService() {
    }
    return IAuthenticationManagerService;
}());

var SERVER_ERROR_PREDICATE_HTTP_STATUSES = [500, 502, 503, 504];
var CLIENT_ERROR_PREDICATE_HTTP_STATUSES = [429];
var TIMEOUT_ERROR_PREDICATE_HTTP_STATUSES = [408];
function serverErrorPredicate(request, response) {
    return response && lodash.includes(SERVER_ERROR_PREDICATE_HTTP_STATUSES, response.status);
}
function clientErrorPredicate(request, response) {
    return response && lodash.includes(CLIENT_ERROR_PREDICATE_HTTP_STATUSES, response.status);
}
function timeoutErrorPredicate(request, response) {
    return response && lodash.includes(TIMEOUT_ERROR_PREDICATE_HTTP_STATUSES, response.status);
}
function retriableErrorPredicate(request, response) {
    return (response &&
        booleanUtils.isAnyTruthy(serverErrorPredicate, clientErrorPredicate, timeoutErrorPredicate)(request, response));
}
function noInternetConnectionErrorPredicate(request, response) {
    return response && response.status === 0;
}

var HTTP_METHODS_UPDATE = ['PUT', 'POST', 'DELETE', 'PATCH'];
var HTTP_METHODS_READ = ['GET', 'OPTIONS', 'HEAD'];
function updatePredicate(request, response) {
    return lodash.includes(HTTP_METHODS_UPDATE, request.method);
}
function readPredicate(request, response) {
    return lodash.includes(HTTP_METHODS_READ, request.method);
}

/**
 * @ngdoc object
 * @name @smartutils.object:EXPONENTIAL_RETRY_DEFAULT_SETTING
 *
 * @description
 * The setting object to be used as default values for retry.
 */
var EXPONENTIAL_RETRY_DEFAULT_SETTING = {
    MAX_BACKOFF: 64000,
    MAX_ATTEMPT: 5,
    MIN_BACKOFF: 0
};
/**
 * @ngdoc service
 * @name @smartutils.services:exponentialRetry
 * @description
 * When used by a retry strategy, this service could provide an exponential delay time to be used by the strategy before the next request is sent. The service also provides functionality to check if it is possible to perform a next retry.
 */
var ExponentialRetry = /** @class */ (function () {
    function ExponentialRetry() {
    }
    ExponentialRetry.prototype.calculateNextDelay = function (attemptCount, maxBackoff, minBackoff) {
        maxBackoff = maxBackoff || EXPONENTIAL_RETRY_DEFAULT_SETTING.MAX_BACKOFF;
        minBackoff = minBackoff || EXPONENTIAL_RETRY_DEFAULT_SETTING.MIN_BACKOFF;
        var waveShield = minBackoff + Math.random();
        return Math.min(Math.pow(2, attemptCount) * 1000 + waveShield, maxBackoff);
    };
    ExponentialRetry.prototype.canRetry = function (attemptCount, maxAttempt) {
        maxAttempt = maxAttempt || EXPONENTIAL_RETRY_DEFAULT_SETTING.MAX_ATTEMPT;
        return attemptCount <= maxAttempt;
    };
    return ExponentialRetry;
}());

/**
 * @ngdoc object
 * @name @smartutils.object:LINEAR_RETRY_DEFAULT_SETTING
 *
 * @description
 * The setting object to be used as default values for retry.
 */
var LINEAR_RETRY_DEFAULT_SETTING = {
    MAX_ATTEMPT: 5,
    MAX_BACKOFF: 32000,
    MIN_BACKOFF: 0,
    RETRY_INTERVAL: 500
};
/**
 * @ngdoc service
 * @name @smartutils.services:linearRetry
 * @description
 * When used by a retry strategy, this service could provide a linear delay time to be used by the strategy before the next request is sent. The service also provides functionality to check if it is possible to perform a next retry.
 */
var LinearRetry = /** @class */ (function () {
    function LinearRetry() {
    }
    LinearRetry.prototype.calculateNextDelay = function (attemptCount, retryInterval, maxBackoff, minBackoff) {
        maxBackoff = maxBackoff || LINEAR_RETRY_DEFAULT_SETTING.MAX_BACKOFF;
        minBackoff = minBackoff || LINEAR_RETRY_DEFAULT_SETTING.MIN_BACKOFF;
        retryInterval = retryInterval || LINEAR_RETRY_DEFAULT_SETTING.RETRY_INTERVAL;
        var waveShield = minBackoff + Math.random();
        return Math.min(attemptCount * retryInterval + waveShield, maxBackoff);
    };
    LinearRetry.prototype.canRetry = function (attemptCount, maxAttempt) {
        maxAttempt = maxAttempt || LINEAR_RETRY_DEFAULT_SETTING.MAX_ATTEMPT;
        return attemptCount <= maxAttempt;
    };
    return LinearRetry;
}());

/**
 * @ngdoc object
 * @name @smartutils.object:SIMPLE_RETRY_DEFAULT_SETTING
 *
 * @description
 * The setting object to be used as default values for retry.
 */
var SIMPLE_RETRY_DEFAULT_SETTING = {
    MAX_ATTEMPT: 5,
    MIN_BACKOFF: 0,
    RETRY_INTERVAL: 500
};
/**
 * @ngdoc service
 * @name @smartutils.services:simpleRetry
 * @description
 * When used by a retry strategy, this service could provide a simple fixed delay time to be used by the strategy before the next request is sent. The service also provides functionality to check if it is possible to perform a next retry.
 */
var SimpleRetry = /** @class */ (function () {
    function SimpleRetry() {
    }
    SimpleRetry.prototype.calculateNextDelay = function (retryInterval, minBackoff) {
        minBackoff = minBackoff || SIMPLE_RETRY_DEFAULT_SETTING.MIN_BACKOFF;
        retryInterval = retryInterval || SIMPLE_RETRY_DEFAULT_SETTING.RETRY_INTERVAL;
        var waveShield = minBackoff + Math.random();
        return retryInterval + waveShield;
    };
    SimpleRetry.prototype.canRetry = function (attemptCount, _maxAttempt) {
        var maxAttempt = _maxAttempt || SIMPLE_RETRY_DEFAULT_SETTING.MAX_ATTEMPT;
        return attemptCount <= maxAttempt;
    };
    return SimpleRetry;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var DefaultRetryStrategy = new core.InjectionToken('DefaultRetryStrategy');
function defaultRetryStrategyFactory(simpleRetry) {
    return /** @class */ (function () {
        function class_1() {
            this.firstFastRetry = true;
            this.attemptCount = 0;
        }
        class_1.prototype.canRetry = function () {
            return simpleRetry.canRetry(this.attemptCount);
        };
        class_1.prototype.calculateNextDelay = function () {
            return simpleRetry.calculateNextDelay();
        };
        return class_1;
    }());
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var ExponentialRetryStrategy = new core.InjectionToken('ExponentialRetryStrategy');
function exponentialRetryStrategyFactory(exponentialRetry) {
    return /** @class */ (function () {
        function class_1() {
            this.firstFastRetry = true;
            this.attemptCount = 0;
        }
        class_1.prototype.canRetry = function () {
            return exponentialRetry.canRetry(this.attemptCount);
        };
        class_1.prototype.calculateNextDelay = function () {
            return exponentialRetry.calculateNextDelay(this.attemptCount);
        };
        return class_1;
    }());
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var LinearRetryStrategy = new core.InjectionToken('LinearRetryStrategy');
function linearRetryStrategyFactory(linearRetry) {
    return /** @class */ (function () {
        function class_1() {
            this.firstFastRetry = true;
            this.attemptCount = 0;
        }
        class_1.prototype.canRetry = function () {
            return linearRetry.canRetry(this.attemptCount);
        };
        class_1.prototype.calculateNextDelay = function () {
            return linearRetry.calculateNextDelay(this.attemptCount);
        };
        return class_1;
    }());
}

/**
 * @ngdoc service
 * @name @smartutils.services:OperationContextService
 * @description
 * This service provides the functionality to register a url with its associated operation contexts and also finds operation context given an url.
 */
var OperationContextService = /** @class */ (function () {
    function OperationContextService() {
        this.store = [];
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:OperationContextService#register
     * @methodOf @smartutils.services:OperationContextService
     *
     * @description
     * Register a new url with it's associated operationContext.
     *
     * @param {String} url The url that is associated to the operation context.
     * @param {String} operationContext The operation context name that is associated to the given url.
     *
     * @return {Object} operationContextService The operationContextService service
     */
    OperationContextService.prototype.register = function (url, operationContext) {
        if (typeof url !== 'string' || lodash.isEmpty(url)) {
            throw new Error('operationContextService.register error: url is invalid');
        }
        if (typeof operationContext !== 'string' || lodash.isEmpty(operationContext)) {
            throw new Error('operationContextService.register error: operationContext is invalid');
        }
        var regexIndex = this.store.findIndex(function (store) {
            return store.urlRegex.test(url) === true && store.operationContext === operationContext;
        });
        if (regexIndex !== -1) {
            return this;
        }
        var urlRegex = new RegExp(url.replace(/\/:[^\/]*/g, '/.*'));
        this.store.push({
            urlRegex: urlRegex,
            operationContext: operationContext
        });
        return this;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:OperationContextService#findOperationContext
     * @methodOf @smartutils.services:OperationContextService
     *
     * @description
     * Find the first matching operation context for the given url.
     *
     * @param {String} url The request url.
     *
     * @return {String} operationContext
     */
    OperationContextService.prototype.findOperationContext = function (url) {
        var regexIndex = this.store.findIndex(function (store) { return store.urlRegex.test(url) === true; });
        return ~regexIndex ? this.store[regexIndex].operationContext : null;
    };
    OperationContextService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [])
    ], OperationContextService);
    return OperationContextService;
}());

var operationContextName = 'OperationContextRegistered';
/**
 * @ngdoc object
 * @name @smartutils.object:@OperationContextRegistered
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory} is delegated to
 * {@link @smartutils.services:OperationContextService OperationContextService.register} and it provides the functionality
 * to register an url with  operation context(s).
 *
 * For example:
 * 1. @OperationContextRegistered('apiUrl', ['CMS', 'INTERACTIVE'])
 * 2. @OperationContextRegistered('apiUrl', 'TOOLING')
 *
 * @param {string} url
 * @param {string | string[]} operationContext
 */
var OperationContextRegistered = annotationService.getClassAnnotationFactory(operationContextName);
function OperationContextAnnotationFactory(injector, operationContextService, OPERATION_CONTEXT) {
    'ngInject';
    return annotationService.setClassAnnotationFactory(operationContextName, function (factoryArguments) {
        return function (instance, originalConstructor, invocationArguments) {
            originalConstructor.call.apply(originalConstructor, __spreadArrays([instance], invocationArguments));
            var url = injector.get(factoryArguments[0], factoryArguments[0]);
            if (typeof factoryArguments[1] === 'string') {
                var operationContext = OPERATION_CONTEXT[factoryArguments[1]];
                operationContextService.register(url, operationContext);
            }
            else if (Array.isArray(factoryArguments[1]) && factoryArguments[1].length > 0) {
                factoryArguments[1].forEach(function (element) {
                    operationContextService.register(url, OPERATION_CONTEXT[element]);
                });
            }
        };
    });
}

var OPERATION_CONTEXT_TOKEN = LIBRARY_NAME + "_OPERATION_CONTEXT";
/**
 * @ngdoc service
 * @name @smartutils.services:retryInterceptor
 *
 * @description
 * The retryInterceptor provides the functionality to register a set of predicates with their associated retry strategies.
 * Each time an HTTP request fails, the service try to find a matching retry strategy for the given response.
 */
var RetryInterceptor = /** @class */ (function () {
    function RetryInterceptor(httpClient, translate, operationContextService, alertService, booleanUtils, defaultRetryStrategy, exponentialRetryStrategy, linearRetryStrategy, OPERATION_CONTEXT) {
        this.httpClient = httpClient;
        this.translate = translate;
        this.operationContextService = operationContextService;
        this.alertService = alertService;
        this.OPERATION_CONTEXT = OPERATION_CONTEXT;
        this.TRANSLATE_NAMESPACE = 'se.gracefuldegradation.';
        this.predicatesRegistry = [];
        this.requestToRetryTegistry = {};
        this.register(noInternetConnectionErrorPredicate, exponentialRetryStrategy)
            .register(booleanUtils.isAnyTruthy(clientErrorPredicate, timeoutErrorPredicate), defaultRetryStrategy)
            .register(booleanUtils.areAllTruthy(readPredicate, retriableErrorPredicate), defaultRetryStrategy)
            .register(serverErrorPredicate, exponentialRetryStrategy);
    }
    RetryInterceptor.prototype.predicate = function (request, response) {
        return this.findMatchingStrategy(request, response) !== null;
    };
    RetryInterceptor.prototype.responseError = function (request, response) {
        var retryStrategy = this.retrieveRetryStrategy(request);
        if (!retryStrategy) {
            var StrategyHolder = this.findMatchingStrategy(request, response);
            if (StrategyHolder) {
                this.alertService.showWarning({
                    message: this.translate.instant(this.TRANSLATE_NAMESPACE + 'stillworking')
                });
                retryStrategy = new StrategyHolder();
                retryStrategy.attemptCount = 0;
                this.storeRetryStrategy(request, retryStrategy);
            }
            else {
                return Promise.reject(response);
            }
        }
        return this.handleRetry(retryStrategy, request, response);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:retryInterceptor#register
     * @methodOf @smartutils.services:retryInterceptor
     *
     * @description
     * Register a new predicate with it's associated strategyHolder.
     *
     * @param {Function} predicate This function takes the 'response' {Object} argument and an (optional) operationContext {String}. This function must return a Boolean that is true if the given response match the predicate.
     * @param {Function} retryStrategy This function will be instanciated at run-time. See {@link @smartutils.services:IRetryStrategy IRetryStrategy}.
     *
     * @return {Object} retryInterceptor The retryInterceptor service.
     *
     * @example
     * ```js
     *      var customPredicate = function(request, response, operationContext) {
     *          return response.status === 500 && operationContext === OPERATION_CONTEXT.TOOLING;
     *      };
     *      var StrategyHolder = function() {
     *          // set the firstFastRetry value to true for the retry made immediately only for the very first retry (subsequent retries will remain subject to the calculateNextDelay response)
     *          this.firstFastRetry = true;
     *      };
     *      StrategyHolder.prototype.canRetry = function() {
     *          // this function must return a {Boolean} if the given request must be retried.
     *          // use this.attemptCount value to determine if the function should return true or false
     *      };
     *      StrategyHolder.prototype.calculateNextDelay = function() {
     *          // this function must return the next delay time {Number}
     *          // use this.attemptCount value to determine the next delay value
     *      };
     *      retryInterceptor.register(customPredicate, StrategyHolder);
     * ```
     */
    RetryInterceptor.prototype.register = function (predicate, retryStrategy) {
        if (typeof predicate !== 'function') {
            throw new Error('retryInterceptor.register error: predicate must be a function');
        }
        if (typeof retryStrategy !== 'function') {
            throw new Error('retryInterceptor.register error: retryStrategy must be a function');
        }
        this.predicatesRegistry.unshift({
            predicate: predicate,
            retryStrategy: retryStrategy
        });
        return this;
    };
    /**
     * Find a matching strategy for the given response and (optional) operationContext
     * If not provided, the default operationContext is OPERATION_CONTEXT.INTERACTIVE
     *
     * @param {Object} response The http response object
     *
     * @return {Function} The matching retryStrategy
     */
    RetryInterceptor.prototype.findMatchingStrategy = function (request, response) {
        var operationContext = this.operationContextService.findOperationContext(request.url) ||
            this.OPERATION_CONTEXT.INTERACTIVE;
        var matchStrategy = this.predicatesRegistry.find(function (predicateObj) {
            return predicateObj.predicate(request, response, operationContext);
        });
        return matchStrategy ? matchStrategy.retryStrategy : null;
    };
    RetryInterceptor.prototype.handleRetry = function (retryStrategy, request, response) {
        var _this = this;
        retryStrategy.attemptCount++;
        if (retryStrategy.canRetry()) {
            var delay_1 = retryStrategy.firstFastRetry ? 0 : retryStrategy.calculateNextDelay();
            retryStrategy.firstFastRetry = false;
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    _this.httpClient
                        .request(request)
                        .toPromise()
                        .then(function (result) {
                        _this.removeRetryStrategy(request);
                        return resolve(result);
                    }, function (error) { return reject(error); });
                }, delay_1);
            });
        }
        else {
            this.alertService.showDanger({
                message: this.translate.instant(this.TRANSLATE_NAMESPACE + 'somethingwrong')
            });
            return Promise.reject(response);
        }
    };
    RetryInterceptor.prototype.storeRetryStrategy = function (request, retryStrategy) {
        this.requestToRetryTegistry[this.getRequestUUID(request)] = retryStrategy;
    };
    RetryInterceptor.prototype.removeRetryStrategy = function (request) {
        delete this.requestToRetryTegistry[this.getRequestUUID(request)];
    };
    RetryInterceptor.prototype.retrieveRetryStrategy = function (request) {
        return this.requestToRetryTegistry[this.getRequestUUID(request)];
    };
    RetryInterceptor.prototype.getRequestUUID = function (request) {
        return request.clone().toString();
    };
    RetryInterceptor = __decorate([
        core.Injectable(),
        __param(5, core.Inject(DefaultRetryStrategy)),
        __param(6, core.Inject(ExponentialRetryStrategy)),
        __param(7, core.Inject(LinearRetryStrategy)),
        __param(8, core.Inject(OPERATION_CONTEXT_TOKEN)),
        __metadata("design:paramtypes", [http.HttpClient,
            core$1.TranslateService,
            OperationContextService,
            IAlertService,
            BooleanUtils, Object, Object, Object, Object])
    ], RetryInterceptor);
    return RetryInterceptor;
}());

/**
 * @ngdoc service
 * @name permissionErrorInterceptorModule.service:permissionErrorInterceptor
 * @description
 * Used for HTTP error code 403. Displays the alert message for permission error.
 */
var PermissionErrorInterceptor = /** @class */ (function () {
    function PermissionErrorInterceptor(alertService) {
        this.alertService = alertService;
    }
    PermissionErrorInterceptor.prototype.predicate = function (request, response) {
        return response.status === 403;
    };
    PermissionErrorInterceptor.prototype.responseError = function (request, response) {
        var _this = this;
        if (response.error && response.error.errors) {
            response.error.errors
                .filter(function (error) { return error.type === 'TypePermissionError'; })
                .forEach(function (error) {
                _this.alertService.showDanger({
                    message: error.message,
                    duration: 10000
                });
            });
        }
        return Promise.reject(response);
    };
    PermissionErrorInterceptor = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [IAlertService])
    ], PermissionErrorInterceptor);
    return PermissionErrorInterceptor;
}());

// map used by HttpAuthInterceptor to avoid replay identical requests being held because of 401
var GET_REQUESTS_ON_HOLD_MAP = {};
/**
 * @ngdoc service
 * @name @smartutils.services:unauthorizedErrorInterceptor
 * @description
 * Used for HTTP error code 401 (Forbidden). It will display the login modal.
 */
var UnauthorizedErrorInterceptor = /** @class */ (function () {
    function UnauthorizedErrorInterceptor(httpClient, authenticationService, promiseUtils, httpUtils, WHO_AM_I_RESOURCE_URI, eventService) {
        this.httpClient = httpClient;
        this.authenticationService = authenticationService;
        this.promiseUtils = promiseUtils;
        this.httpUtils = httpUtils;
        this.eventService = eventService;
        this.promisesToResolve = {}; // key: auth entry point, value: array of deferred
        this.rejectedUrls = [/authenticate/];
        this.rejectedUrls.push(WHO_AM_I_RESOURCE_URI);
    }
    UnauthorizedErrorInterceptor.prototype.predicate = function (request, response) {
        return (response.status === 401 &&
            (request.url
                ? this.httpUtils.isCRUDRequest(request, response) &&
                    this.isUrlNotRejected(request.url)
                : true));
    };
    UnauthorizedErrorInterceptor.prototype.responseError = function (request, response) {
        var _this = this;
        var deferred = this.promiseUtils.defer();
        var deferredPromise = deferred.promise.then(function () {
            return _this.httpClient.request(request).toPromise();
        });
        this.authenticationService.isAuthEntryPoint(request.url).then(function (isAuthEntryPoint) {
            if (!isAuthEntryPoint) {
                _this.authenticationService
                    .filterEntryPoints(request.url)
                    .then(function (entryPoints) {
                    var entryPoint = entryPoints[0];
                    _this.promisesToResolve[entryPoint] =
                        _this.promisesToResolve[entryPoint] || [];
                    _this.promisesToResolve[entryPoint].push({
                        requestIdentifier: request.url,
                        deferred: deferred
                    });
                    if (_this.httpUtils.isGET(request)) {
                        GET_REQUESTS_ON_HOLD_MAP[request.url] = deferredPromise;
                    }
                    _this.authenticationService
                        .isReAuthInProgress(entryPoint)
                        .then(function (isReAuthInProgress) {
                        if (!isReAuthInProgress) {
                            _this.authenticationService
                                .setReAuthInProgress(entryPoint)
                                .then(function () {
                                var promisesToResolve = _this.promisesToResolve;
                                _this.eventService.publish(REAUTH_STARTED);
                                _this.authenticationService
                                    .authenticate(request.url)
                                    .then(function () {
                                    promisesToResolve[this].forEach(function (record) {
                                        delete GET_REQUESTS_ON_HOLD_MAP[record.requestIdentifier];
                                        record.deferred.resolve();
                                    });
                                    promisesToResolve[this] = [];
                                }.bind(entryPoint), function () {
                                    promisesToResolve[this].forEach(function (record) {
                                        delete GET_REQUESTS_ON_HOLD_MAP[record.requestIdentifier];
                                        record.deferred.reject();
                                    });
                                    promisesToResolve[this] = [];
                                }.bind(entryPoint));
                            });
                        }
                    });
                });
            }
            else {
                deferred.reject(response);
            }
        });
        return deferredPromise;
    };
    UnauthorizedErrorInterceptor.prototype.isUrlNotRejected = function (url) {
        return !this.rejectedUrls.some(function (rejectedUrl) {
            return typeof rejectedUrl === 'string' ? url.indexOf(rejectedUrl) === 0 : rejectedUrl.test(url);
        });
    };
    UnauthorizedErrorInterceptor = __decorate([
        core.Injectable(),
        __param(4, core.Inject(WHO_AM_I_RESOURCE_URI_TOKEN)),
        __param(5, core.Inject(EVENT_SERVICE)),
        __metadata("design:paramtypes", [http.HttpClient,
            IAuthenticationService,
            PromiseUtils,
            HttpUtils, String, Object])
    ], UnauthorizedErrorInterceptor);
    return UnauthorizedErrorInterceptor;
}());

/**
 * @ngdoc service
 * @name @smartutils.httpAuthInterceptor
 *
 * @description
 * Makes it possible to perform global authentication by intercepting requests before they are forwarded to the server
 * and responses before they are forwarded to the application code.
 *
 */
var HttpAuthInterceptor = /** @class */ (function () {
    function HttpAuthInterceptor(authenticationService, injector, httpUtils, I18N_RESOURCE_URI) {
        this.authenticationService = authenticationService;
        this.injector = injector;
        this.httpUtils = httpUtils;
        this.I18N_RESOURCE_URI = I18N_RESOURCE_URI;
    }
    /**
     * @ngdoc method
     * @name @smartutils.httpAuthInterceptor#request
     * @methodOf @smartutils.httpAuthInterceptor
     *
     * @description
     * Interceptor method which gets called with a http config object, intercepts any request made using httpClient service.
     * A call to any REST resource will be intercepted by this method, which then adds an authentication token to the request
     * and then forwards it to the REST resource.
     *
     */
    HttpAuthInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        if (!request.url.includes(this.I18N_RESOURCE_URI) &&
            this.httpUtils.isCRUDRequest(request)) {
            if (this.httpUtils.isGET(request) && GET_REQUESTS_ON_HOLD_MAP[request.url]) {
                return new rxjs.Observable(function (obj) {
                    GET_REQUESTS_ON_HOLD_MAP[request.url].then(function (body) {
                        obj.next(new http.HttpResponse({ status: 200, body: body }));
                    });
                });
            }
            return rxjs.from(this.authenticationService.filterEntryPoints(request.url)).pipe(operators.switchMap(function (entryPoints) {
                if (entryPoints && entryPoints.length) {
                    return rxjs.from(_this.injector.get(IStorageService).getAuthToken(entryPoints[0])).pipe(operators.switchMap(function (authToken) {
                        if (authToken) {
                            var authReq = request.clone({
                                headers: request.headers.set('Authorization', authToken.token_type + ' ' + authToken.access_token)
                            });
                            return next.handle(authReq);
                        }
                        else {
                            return next.handle(request);
                        }
                    }));
                }
                else {
                    return next.handle(request);
                }
            }));
        }
        else {
            return next.handle(request);
        }
    };
    HttpAuthInterceptor = __decorate([
        core.Injectable(),
        __param(3, core.Inject(I18N_RESOURCE_URI_TOKEN)),
        __metadata("design:paramtypes", [IAuthenticationService,
            core.Injector,
            HttpUtils, String])
    ], HttpAuthInterceptor);
    return HttpAuthInterceptor;
}());

/**
 * @ngdoc service
 * @name @smartutils.services:httpErrorInterceptorService
 *
 * @description
 * The httpErrorInterceptorService provides the functionality to add custom HTTP error interceptors.
 * An interceptor can be an {Object} or an Angular Factory and must be represented by a pair of functions:
 * - predicate(request, response) {Function} that must return true if the response is associated to the interceptor. Important: The predicate must be designed to fulfill a specific function. It must not be defined for generic use.
 * - responseError(request, response) {Function} function called if the current response error matches the predicate. It must return a {Promise} with the resolved or rejected response.
 *
 * Each time an HTTP request fails, the service iterates through all registered interceptors. It sequentially calls the responseError function for all interceptors that have a predicate returning true for the current response error. If an interceptor modifies the response, the next interceptor that is called will have the modified response.
 * The last interceptor added to the service will be the first interceptor called. This makes it possible to override default interceptors.
 * If an interceptor resolves the response, the service service stops the iteration.
 */
var HttpErrorInterceptorService = /** @class */ (function () {
    function HttpErrorInterceptorService(injector, promiseUtils) {
        this.injector = injector;
        this.promiseUtils = promiseUtils;
        this._errorInterceptors = [];
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:httpErrorInterceptorService#addInterceptor
     * @methodOf @smartutils.services:httpErrorInterceptorService
     *
     * @description
     * Add a new error interceptor
     *
     * @param {Object|String} interceptor The interceptor {Object} or angular Factory
     *
     * @returns {Function} Function to call to unregister the interceptor from the service
     *
     * @example
     * ```js
     *      // Add a new interceptor with an instance of IHttpErrorInterceptor:
     *      var unregisterCustomInterceptor = httpErrorInterceptorService.addInterceptor({
     *          predicate: function(request, response) {
     *              return response.status === 400;
     *          },
     *          responseError: function(request, response) {
     *              alertService.showDanger({
     *                  message: response.message
     *              });
     *              return Promise.reject(response);// FIXME: update doc
     *          }
     *      });
     *
     *      // Add an interceptor with a class of IHttpErrorInterceptor:
     *      var unregisterCustomInterceptor = httpErrorInterceptorService.addInterceptor(CustomErrorInterceptor);
     *
     *      // Unregister the interceptor:
     *      unregisterCustomInterceptor();
     * ```
     */
    HttpErrorInterceptorService.prototype.addInterceptors = function (interceptorClasses) {
        var _this = this;
        interceptorClasses.forEach(function (InterceptorClass) {
            _this.addInterceptor(InterceptorClass);
        });
    };
    HttpErrorInterceptorService.prototype.addInterceptor = function (_interceptor) {
        var _this = this;
        var interceptor;
        if (_interceptor.predicate ||
            _interceptor.responseError) {
            interceptor = _interceptor;
        }
        else {
            interceptor = this.injector.get(_interceptor);
        }
        this._validateInterceptor(interceptor);
        this._errorInterceptors.unshift(interceptor);
        return function () {
            _this._errorInterceptors.splice(_this._errorInterceptors.indexOf(interceptor), 1);
        };
    };
    HttpErrorInterceptorService.prototype.responseError = function (request, response) {
        var matchingErrorInterceptors = this._errorInterceptors.filter(function (errorInterceptor) { return errorInterceptor.predicate(request, response) === true; });
        var _interceptorsDeferred = this.promiseUtils.defer();
        if (matchingErrorInterceptors.length) {
            this._iterateErrorInterceptors(request.clone(), lodash.cloneDeep(response), matchingErrorInterceptors, _interceptorsDeferred);
        }
        else {
            _interceptorsDeferred.reject(response);
        }
        return rxjs.from(_interceptorsDeferred.promise);
    };
    HttpErrorInterceptorService.prototype._iterateErrorInterceptors = function (request, response, interceptors, _interceptorsDeferred, idx) {
        if (idx === void 0) { idx = 0; }
        if (idx === interceptors.length) {
            _interceptorsDeferred.reject(response);
        }
        else {
            var iterateFn_1 = this._iterateErrorInterceptors.bind(this);
            // FIXME: fully convert this part to Observable chaining
            Promise.resolve(interceptors[idx].responseError(request, response)).then(function (interceptedResponse) {
                _interceptorsDeferred.resolve(interceptedResponse);
            }, function (interceptedResponse) {
                iterateFn_1(request, interceptedResponse, interceptors, _interceptorsDeferred, ++idx);
            });
        }
    };
    /**
     * @ignore
     * Validate if the provided interceptor respects the Interface (predicate and responseError functions are mandatory).
     * @param {Object|String} interceptor The interceptor {Object} or angular Factory
     */
    HttpErrorInterceptorService.prototype._validateInterceptor = function (interceptor) {
        if (!interceptor.predicate || typeof interceptor.predicate !== 'function') {
            throw new Error('httpErrorInterceptorService.addInterceptor.error.interceptor.has.no.predicate');
        }
        if (!interceptor.responseError || typeof interceptor.responseError !== 'function') {
            throw new Error('httpErrorInterceptorService.addInterceptor.error.interceptor.has.no.responseError');
        }
    };
    HttpErrorInterceptorService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [core.Injector, PromiseUtils])
    ], HttpErrorInterceptorService);
    return HttpErrorInterceptorService;
}());

/**
 * @ngdoc overview
 * @name httpErrorInterceptorServiceModule
 *
 * @description
 * This module provides the functionality to add custom HTTP error interceptors.
 * Interceptors are used to execute code each time an HTTP request fails.
 */
var HttpErrorInterceptor = /** @class */ (function () {
    function HttpErrorInterceptor(httpErrorInterceptorService, httpUtils) {
        this.httpErrorInterceptorService = httpErrorInterceptorService;
        this.httpUtils = httpUtils;
    }
    HttpErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(operators.catchError(function (error, caught) {
            if (!_this.httpUtils.isHTMLRequest(request, error)) {
                return _this.httpErrorInterceptorService.responseError(request, error);
            }
            else {
                return rxjs.throwError(error);
            }
        }));
    };
    HttpErrorInterceptor = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [HttpErrorInterceptorService,
            HttpUtils])
    ], HttpErrorInterceptor);
    return HttpErrorInterceptor;
}());

/**
 * @ngdoc overview
 * @name httpInterceptorModule
 *
 * @description
 * This module provides the functionality to add custom HTTP error interceptors.
 * Interceptors are used to execute code each time an HTTP request fails.
 *
 */
var HttpInterceptorModule = /** @class */ (function () {
    function HttpInterceptorModule() {
    }
    HttpInterceptorModule_1 = HttpInterceptorModule;
    HttpInterceptorModule.forRoot = function () {
        var HttpErrorInterceptorClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            HttpErrorInterceptorClasses[_i] = arguments[_i];
        }
        return {
            ngModule: HttpInterceptorModule_1,
            providers: __spreadArrays(HttpErrorInterceptorClasses, [
                {
                    provide: http.HTTP_INTERCEPTORS,
                    useClass: HttpAuthInterceptor,
                    multi: true
                },
                {
                    provide: http.HTTP_INTERCEPTORS,
                    useClass: HttpErrorInterceptor,
                    multi: true
                },
                {
                    provide: http.HTTP_INTERCEPTORS,
                    useClass: BackendInterceptor,
                    multi: true
                },
                {
                    provide: core.APP_BOOTSTRAP_LISTENER,
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    useFactory: function (httpErrorInterceptorService) {
                        httpErrorInterceptorService.addInterceptors(HttpErrorInterceptorClasses);
                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        return function (component) {
                            // an initializer useFactory must return a function
                        };
                    },
                    deps: [HttpErrorInterceptorService],
                    multi: true
                }
            ])
        };
    };
    var HttpInterceptorModule_1;
    HttpInterceptorModule = HttpInterceptorModule_1 = __decorate([
        core.NgModule({
            imports: [FlawInjectionInterceptorModule],
            providers: [
                SimpleRetry,
                LinearRetry,
                ExponentialRetry,
                {
                    provide: DefaultRetryStrategy,
                    useFactory: defaultRetryStrategyFactory,
                    deps: [SimpleRetry]
                },
                {
                    provide: ExponentialRetryStrategy,
                    useFactory: exponentialRetryStrategyFactory,
                    deps: [ExponentialRetry]
                },
                {
                    provide: LinearRetryStrategy,
                    useFactory: linearRetryStrategyFactory,
                    deps: [SimpleRetry]
                },
                HttpErrorInterceptorService,
                HttpBackendService
            ]
        })
    ], HttpInterceptorModule);
    return HttpInterceptorModule;
}());

(function (StatusText) {
    StatusText["UNKNOW_ERROR"] = "Unknown Error";
})(exports.StatusText || (exports.StatusText = {}));

var HttpPaginationResponseAdapter = /** @class */ (function () {
    function HttpPaginationResponseAdapter() {
    }
    HttpPaginationResponseAdapter.transform = function (ev) {
        var event = ev;
        var isAdaptable = event && event.body && event.body.pagination;
        if (!isAdaptable) {
            return event;
        }
        var foundKey = Object.keys(event.body).find(function (key) { return key !== 'pagination' && Array.isArray(event.body[key]); });
        return foundKey
            ? event.clone({ body: __assign(__assign({}, event.body), { results: event.body[foundKey] }) })
            : event;
    };
    return HttpPaginationResponseAdapter;
}());

/**
 * @ngdoc service
 * @name @smartutils.services:responseAdapterInterceptor
 *
 * @description
 *
 * Interceptor used to normalize the response of paginated resources. Some API consumers select data with 'result' and 'response' key.
 * This interceptor purpose is to adapt such payload.
 */
var ResponseAdapterInterceptor = /** @class */ (function () {
    function ResponseAdapterInterceptor() {
    }
    ResponseAdapterInterceptor.prototype.intercept = function (request, next) {
        return next.handle(request).pipe(operators.map(HttpPaginationResponseAdapter.transform));
    };
    ResponseAdapterInterceptor = __decorate([
        core.Injectable()
    ], ResponseAdapterInterceptor);
    return ResponseAdapterInterceptor;
}());

/** @internal */
var RestClient = /** @class */ (function () {
    function RestClient(httpClient, url, identifierName) {
        var _this = this;
        this.httpClient = httpClient;
        this.url = url;
        this.identifierName = identifierName;
        this.DEFAULT_HEADERS = { 'x-requested-with': 'Angular' };
        this.DEFAULT_OPTIONS = { headers: {} };
        // will activate response headers appending
        this.metadataActivated = false;
        /// ////////////////////////////////////////
        /// INTERNAL METHODS NEEDED FOR GATEWAY ///
        /// ////////////////////////////////////////
        this.getMethodForSingleInstance = function (name) {
            switch (name) {
                case 'getById':
                    return function (id, options) {
                        if (options === void 0) { options = _this.DEFAULT_OPTIONS; }
                        return _this.getById(id, options);
                    };
                case 'get':
                    return function (searchParams, options) {
                        if (options === void 0) { options = _this.DEFAULT_OPTIONS; }
                        return _this.get(searchParams, options);
                    };
                case 'update':
                    return function (payload, options) {
                        if (options === void 0) { options = _this.DEFAULT_OPTIONS; }
                        return _this.update(payload, options);
                    };
                case 'save':
                    return function (payload, options) {
                        if (options === void 0) { options = _this.DEFAULT_OPTIONS; }
                        return _this.save(payload, options);
                    };
                case 'patch':
                    return function (payload, options) {
                        if (options === void 0) { options = _this.DEFAULT_OPTIONS; }
                        return _this.patch(payload, options);
                    };
                case 'remove':
                    return function (payload, options) {
                        if (options === void 0) { options = _this.DEFAULT_OPTIONS; }
                        return _this.remove(payload, options);
                    };
            }
        };
        this.getMethodForArray = function (name) {
            switch (name) {
                case 'query':
                    return function (params, options) {
                        if (options === void 0) { options = _this.DEFAULT_OPTIONS; }
                        return _this.query(params, options);
                    };
            }
        };
    }
    RestClient.prototype.getById = function (identifier, options) {
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        return this.addHeadersToBody(this.httpClient.get(this.url + "/" + identifier, {
            headers: this.buildRequestHeaders(options.headers || {}),
            observe: 'response'
        })).toPromise();
    };
    RestClient.prototype.get = function (searchParams, options) {
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        var params = this.convertToTypeMapOfString(searchParams);
        return this.addHeadersToBody(this.httpClient.get(this.interpolateParamsInURL(this.url, params), {
            params: this.formatQueryString(this.determineTrueQueryStringParams(this.url, searchParams)),
            headers: this.buildRequestHeaders(options.headers || {}),
            observe: 'response'
        })).toPromise();
    };
    RestClient.prototype.query = function (searchParams, options) {
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        var params = searchParams ? this.convertToTypeMapOfString(searchParams) : searchParams;
        return this.addHeadersToBody(this.httpClient.get(this.interpolateParamsInURL(this.url, params), {
            params: this.formatQueryString(this.determineTrueQueryStringParams(this.url, searchParams)),
            headers: this.buildRequestHeaders(options.headers || {}),
            observe: 'response'
        }))
            .pipe(operators.map(function (arr) { return arr || []; }))
            .toPromise();
    };
    RestClient.prototype.page = function (pageable, options) {
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        return (this.addHeadersToBody(this.httpClient.get(this.interpolateParamsInURL(this.url, pageable), {
            params: this.formatQueryString(this.determineTrueQueryStringParams(this.url, pageable)),
            headers: this.buildRequestHeaders(options.headers || {}),
            observe: 'response'
        }))
            // force typing to accept the fact that a page is never null
            .pipe(operators.map(function (arr) { return arr; }))
            .toPromise());
    };
    RestClient.prototype.update = function (payload, options) {
        var _this = this;
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        return this.performIdentifierCheck(payload)
            .then(function () { return _this.buildUrlWithIdentifier(payload); })
            .then(function (url) {
            return _this.httpClient
                .put(url, payload, {
                headers: _this.buildRequestHeaders(options.headers || {})
            })
                .toPromise();
        });
    };
    RestClient.prototype.save = function (payload, options) {
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        return this.httpClient
            .post(this.interpolateParamsInURL(this.url, payload), payload, {
            headers: this.buildRequestHeaders(options.headers || {})
        })
            .toPromise();
    };
    RestClient.prototype.patch = function (payload, options) {
        var _this = this;
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        return this.performIdentifierCheck(payload)
            .then(function () { return _this.buildUrlWithIdentifier(payload); })
            .then(function (url) {
            return _this.httpClient
                .patch(url, payload, {
                headers: _this.buildRequestHeaders(options.headers || {})
            })
                .toPromise();
        });
    };
    RestClient.prototype.remove = function (payload, options) {
        var _this = this;
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        return this.performIdentifierCheck(payload)
            .then(function () { return _this.buildUrlWithIdentifier(payload); })
            .then(function (url) {
            return _this.httpClient
                .delete(url, { headers: _this.buildRequestHeaders(options.headers || {}) })
                .toPromise();
        });
    };
    RestClient.prototype.queryByPost = function (payload, searchParams, options) {
        if (options === void 0) { options = this.DEFAULT_OPTIONS; }
        var params = this.convertToTypeMapOfString(searchParams);
        return this.httpClient
            .post(this.interpolateParamsInURL(this.url, params), payload, {
            params: this.formatQueryString(this.determineTrueQueryStringParams(this.url, searchParams)),
            headers: this.buildRequestHeaders(options.headers || {})
        })
            .toPromise();
    };
    RestClient.prototype.activateMetadata = function () {
        this.metadataActivated = true;
    };
    RestClient.prototype.convertToTypeMapOfString = function (searchParams) {
        return lodash.mapValues(searchParams, function (val) { return String(val); });
    };
    RestClient.prototype.formatQueryString = function (_params) {
        return this.sortByKeys(_params);
    };
    RestClient.prototype.addHeadersToBody = function (observable) {
        var _this = this;
        return observable.pipe(operators.map(function (response) {
            var data = response.body;
            if (_this.metadataActivated && data) {
                // used by @Cached annotation
                data.headers = response.headers;
            }
            return data;
        }));
    };
    /*
     * interpolation URL placeholders interpolation with potential matches in queryString
     */
    RestClient.prototype.interpolateParamsInURL = function (_url, payload) {
        // only keep params to be found in the URI or query params
        if (payload && typeof payload !== 'string') {
            return new URIBuilder(_url).replaceParams(payload).sanitize().build();
        }
        else {
            return _url;
        }
    };
    /*
     * remove from queryString any param needed for URL placeholders interpolation
     */
    RestClient.prototype.determineTrueQueryStringParams = function (url, payload) {
        return typeof payload === 'object'
            ? Object.keys(payload).reduce(function (prev, next) {
                if (!new RegExp(':' + next + '/').test(url) &&
                    !new RegExp(':' + next + '$').test(url) &&
                    !new RegExp(':' + next + '&').test(url) &&
                    !lodash.isNil(payload[next])) {
                    prev[next] = payload[next];
                }
                return prev;
            }, {})
            : {};
    };
    RestClient.prototype.sortByKeys = function (obj) {
        var keys = lodash.sortBy(lodash.keys(obj), function (key) { return key; });
        return lodash.zipObject(keys, lodash.map(keys, function (key) { return obj[key]; }));
    };
    RestClient.prototype.performIdentifierCheck = function (payload) {
        var identifier = typeof payload === 'string' ? payload : payload[this.identifierName];
        if (!identifier) {
            return Promise.reject('no data was found under the ' +
                identifier +
                ' field of object ' +
                JSON.stringify(payload) +
                ', it is necessary for update and remove operations');
        }
        return Promise.resolve();
    };
    RestClient.prototype.buildUrlWithIdentifier = function (payload) {
        var identifier = typeof payload === 'string' ? payload : payload[this.identifierName];
        var url = this.interpolateParamsInURL("" + this.url, payload);
        url =
            url.includes('?') || this.url.includes(':' + this.identifierName)
                ? url
                : url + "/" + identifier;
        return Promise.resolve(url);
    };
    RestClient.prototype.buildRequestHeaders = function (headers) {
        return new http.HttpHeaders(__assign(__assign({}, this.DEFAULT_HEADERS), headers));
    };
    return RestClient;
}());

/** @internal */
var RestServiceFactory = /** @class */ (function () {
    function RestServiceFactory(httpClient) {
        this.httpClient = httpClient;
        this.map = new Map();
        this.basePath = null;
        this.DOMAIN = null;
        this.IDENTIFIER = 'identifier';
    }
    RestServiceFactory_1 = RestServiceFactory;
    RestServiceFactory.setGlobalBasePath = function (globalBasePath) {
        if (!RestServiceFactory_1.globalBasePath) {
            RestServiceFactory_1.globalBasePath = globalBasePath;
        }
        else {
            RestServiceFactory_1.logService.warn('The value of a global base path was already set. ' +
                'Update is not possible, the value remained unchanged!');
        }
    };
    RestServiceFactory.getGlobalBasePath = function () {
        return RestServiceFactory_1.globalBasePath ? RestServiceFactory_1.globalBasePath : '';
    };
    RestServiceFactory.prototype.setDomain = function (DOMAIN) {
        this.DOMAIN = DOMAIN;
    };
    RestServiceFactory.prototype.setBasePath = function (basePath) {
        this.basePath = basePath;
    };
    RestServiceFactory.prototype.get = function (uri, identifier) {
        if (identifier === void 0) { identifier = this.IDENTIFIER; }
        if (this.map.has(uri + identifier)) {
            return this.map.get(uri + identifier);
        }
        if (!/^https?\:\/\//.test(uri)) {
            var newBasePath = this.getNewBasePath();
            var basePathURI = lodash.isEmpty(newBasePath)
                ? uri
                : newBasePath + (/^\//.test(uri) ? uri : "/" + uri);
            uri = this.shouldAppendDomain(uri) ? this.DOMAIN + "/" + uri : basePathURI;
        }
        var restClient = new RestClient(this.httpClient, uri, identifier);
        this.map.set(uri + identifier, restClient);
        return restClient;
    };
    RestServiceFactory.prototype.shouldAppendDomain = function (uri) {
        return !!this.DOMAIN && !/^\//.test(uri);
    };
    RestServiceFactory.prototype.getNewBasePath = function () {
        return this.basePath ? this.basePath : RestServiceFactory_1.globalBasePath;
    };
    var RestServiceFactory_1;
    RestServiceFactory.globalBasePath = null;
    RestServiceFactory.logService = new LogService();
    RestServiceFactory = RestServiceFactory_1 = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [http.HttpClient])
    ], RestServiceFactory);
    return RestServiceFactory;
}());

/**
 * @ngdoc service
 * @name @smartutils.service:AbstractCachedRestService
 *
 * @description
 * Base class to implement Cache enabled {@link @smartutils.interfaces:IRestService IRestServices}.
 * <br/>Implementing classes just need declare a class level {@link @smartutils.object:@CacheConfig @CacheConfig} annotation
 * with at least one {@link @smartutils.object:CacheAction CacheAction} and one {@link @smartutils.object:EvictionTag EvictionTag}.
 * <br/>Cache policies called by the set of {@link @smartutils.object:CacheAction CacheActions} will have access to
 * REST call response headers being added to the response under "headers" property.
 * <br/>Those headers are then stripped from the response.
 *
 * <h2>Usage</h2>
 * <pre>
 * &#64;CacheConfig({actions: [rarelyChangingContent], tags: [userEvictionTag]})
 * &#64;SeInjectable()
 * export class ProductCatalogRestService extends AbstractCachedRestService<IBaseCatalogs> {
 * 	constructor(restServiceFactory: IRestServiceFactory) {
 * 		super(restServiceFactory, '/productcatalogs');
 * 	}
 * }
 * </pre>
 */
var AbstractCachedRestService = /** @class */ (function () {
    function AbstractCachedRestService(restServiceFactory, uri, identifier) {
        this.innerRestService = restServiceFactory.get(uri, identifier);
        this.innerRestService.activateMetadata && this.innerRestService.activateMetadata();
    }
    AbstractCachedRestService.prototype.getById = function (identifier, options) {
        return this.innerRestService.getById(identifier, options);
    };
    AbstractCachedRestService.prototype.get = function (searchParams, options) {
        return this.innerRestService.get(searchParams, options);
    };
    AbstractCachedRestService.prototype.query = function (searchParams, options) {
        return this.innerRestService.query(searchParams, options);
    };
    AbstractCachedRestService.prototype.page = function (searchParams, options) {
        return this.innerRestService.page(searchParams, options);
    };
    AbstractCachedRestService.prototype.update = function (payload, options) {
        return this.innerRestService.update(payload, options);
    };
    AbstractCachedRestService.prototype.patch = function (payload, options) {
        return this.innerRestService.patch(payload, options);
    };
    AbstractCachedRestService.prototype.remove = function (payload, options) {
        return this.innerRestService.remove(payload, options);
    };
    AbstractCachedRestService.prototype.save = function (payload, options) {
        return this.innerRestService.save(payload, options);
    };
    AbstractCachedRestService.prototype.queryByPost = function (payload, searchParams, options) {
        return this.innerRestService.queryByPost(payload, searchParams, options);
    };
    __decorate([
        StripResponseHeaders,
        Cached(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "getById", null);
    __decorate([
        StripResponseHeaders,
        Cached(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "get", null);
    __decorate([
        StripResponseHeaders,
        Cached(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "query", null);
    __decorate([
        StripResponseHeaders,
        Cached(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "page", null);
    __decorate([
        StripResponseHeaders,
        InvalidateCache(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "update", null);
    __decorate([
        StripResponseHeaders,
        InvalidateCache(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "patch", null);
    __decorate([
        InvalidateCache(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "remove", null);
    __decorate([
        StripResponseHeaders,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "save", null);
    __decorate([
        StripResponseHeaders,
        Cached(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], AbstractCachedRestService.prototype, "queryByPost", null);
    return AbstractCachedRestService;
}());
function StripResponseHeaders(target, propertyName, descriptor) {
    var originalMethod = descriptor.value;
    if (originalMethod) {
        descriptor.value = function () {
            return originalMethod
                .apply(this, Array.prototype.slice.call(arguments))
                .then(function (response) {
                delete response.headers;
                return response;
            });
        };
    }
}

var SSO_DIALOG_MARKER = 'sso';
var SSO_PROPERTIES;
(function (SSO_PROPERTIES) {
    SSO_PROPERTIES["SSO_CLIENT_ID"] = "SSO_CLIENT_ID";
    SSO_PROPERTIES["SSO_AUTHENTICATION_ENTRY_POINT"] = "SSO_AUTHENTICATION_ENTRY_POINT";
    SSO_PROPERTIES["SSO_LOGOUT_ENTRY_POINT"] = "SSO_LOGOUT_ENTRY_POINT";
    SSO_PROPERTIES["SSO_OAUTH2_AUTHENTICATION_ENTRY_POINT"] = "SSO_OAUTH2_AUTHENTICATION_ENTRY_POINT";
})(SSO_PROPERTIES || (SSO_PROPERTIES = {}));
var CHILD_SMARTEDIT_SENDING_AUTHTOKEN = 'ssoAuthenticate';
var CHILD_SMARTEDIT_SENDING_AUTH_ERROR = 'ssoAuthenticateError';
var SSODIALOG_WINDOW = 'SSODIALOG_WINDOW';
/*
 * Helper to initiate a SAML /SSO autentication sequence through a pop-up
 * (because the sequence involves auto-submiting html form at some point that causes a redirect and hence would
 * loose app context if not executed in a different window)
 * that ultimately loads the app again which in turn will detect its context and do the following:
 * - will not continue loading
 * - wil post the loginToken to the /authenticate end point to retrieve oAuth access
 * - will send back to parent (through postMessage) the retrieved oAuth access
 * - will close;
 */
var SSOAuthenticationHelper = /** @class */ (function () {
    function SSOAuthenticationHelper(windowUtils, promiseUtils, httpClient, injector) {
        this.windowUtils = windowUtils;
        this.promiseUtils = promiseUtils;
        this.httpClient = httpClient;
        this.injector = injector;
        this.logoutIframeId = 'logoutIframe';
        this.deferred = null;
        this.listenForAuthTokenBeingSentBack();
    }
    SSOAuthenticationHelper_1 = SSOAuthenticationHelper;
    /*
     * Initiates the SSO dialog through a pop-up
     */
    SSOAuthenticationHelper.prototype.launchSSODialog = function () {
        this.deferred = this.promiseUtils.defer();
        var ssoAuthenticationEntryPoint = this.injector.get(SSO_PROPERTIES.SSO_AUTHENTICATION_ENTRY_POINT) +
            this.getSSOContextPath();
        this.window.open(ssoAuthenticationEntryPoint, SSODIALOG_WINDOW, 'toolbar=no,scrollbars=no,resizable=no,top=200,left=200,width=1000,height=800');
        return this.deferred.promise;
    };
    /*
     * SSO happen in a popup window launched by AuthenticationHelper#launchSSODialog().
     * Once SSO is successful, a 'LoginToken' cookie is present, this is a pre-requisite for doing a POST to the /authenticate
     * endpoint that will return the Authorization bearer token.
     * This bearer is then sent with postMessage to the opener window, i.e. the SmartEdit application that will resume the pending 401 request.
     */
    SSOAuthenticationHelper.prototype.completeDialog = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpClient
                .post(_this.injector.get(SSO_PROPERTIES.SSO_OAUTH2_AUTHENTICATION_ENTRY_POINT), { client_id: _this.injector.get(SSO_PROPERTIES.SSO_CLIENT_ID) })
                .subscribe(function (authToken) {
                _this.window.opener.postMessage({
                    eventId: CHILD_SMARTEDIT_SENDING_AUTHTOKEN,
                    authToken: authToken
                }, _this.document.location.origin);
                _this.window.close();
                resolve();
            }, function (httpErrorResponse) {
                var clonableHttpErrorResponse = {
                    error: httpErrorResponse.error,
                    status: httpErrorResponse.status
                };
                _this.window.opener.postMessage({
                    eventId: CHILD_SMARTEDIT_SENDING_AUTH_ERROR,
                    error: clonableHttpErrorResponse
                }, _this.document.location.origin);
                _this.window.close();
                reject();
            });
        });
    };
    /*
     * case of the App being a popup only meant for authentication and spun up buy the main app
     */
    SSOAuthenticationHelper.prototype.isSSODialog = function () {
        return (this.window.name === SSODIALOG_WINDOW &&
            new RegExp("[?&]" + SSO_DIALOG_MARKER).test(location.search));
    };
    /*
     * case of:
     * - the App called from another app in an SSO context and that should therefore auto-authenticate with SSO
     * - last manual authentication was with SSO
     */
    SSOAuthenticationHelper.prototype.isAutoSSOMain = function () {
        return (SSOAuthenticationHelper_1.lastAuthenticatedWithSSO ||
            (this.window.name !== SSODIALOG_WINDOW &&
                new RegExp("[?&]" + SSO_DIALOG_MARKER).test(location.search)));
    };
    SSOAuthenticationHelper.prototype.logout = function () {
        var logoutIframe = this.logoutIframe;
        if (!logoutIframe) {
            logoutIframe = this.document.createElement('iframe');
            logoutIframe.id = this.logoutIframeId;
            logoutIframe.style.display = 'none';
            this.document.body.appendChild(logoutIframe);
        }
        logoutIframe.src = this.injector.get(SSO_PROPERTIES.SSO_LOGOUT_ENTRY_POINT);
        SSOAuthenticationHelper_1.lastAuthenticatedWithSSO = false;
        this.document.location.href = this.document.location.href.replace(this.getSSOContextPath(), this.document.location.pathname);
    };
    // context path of app in an SSO mode
    SSOAuthenticationHelper.prototype.getSSOContextPath = function () {
        return this.document.location.pathname + "?" + SSO_DIALOG_MARKER;
    };
    SSOAuthenticationHelper.prototype.listenForAuthTokenBeingSentBack = function () {
        var _this = this;
        this.window.addEventListener('message', function (event) {
            if (event.origin !== document.location.origin) {
                return;
            }
            _this.logoutIframe && _this.logoutIframe.remove();
            if (event.data.eventId === CHILD_SMARTEDIT_SENDING_AUTHTOKEN) {
                SSOAuthenticationHelper_1.lastAuthenticatedWithSSO = true;
                _this.deferred && _this.deferred.resolve(event.data.authToken);
            }
            else if (event.data.eventId === CHILD_SMARTEDIT_SENDING_AUTH_ERROR) {
                _this.deferred && _this.deferred.reject(event.data.error);
            }
        }, false);
    };
    Object.defineProperty(SSOAuthenticationHelper.prototype, "window", {
        get: function () {
            return this.windowUtils.getWindow();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SSOAuthenticationHelper.prototype, "document", {
        get: function () {
            return this.window.document;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SSOAuthenticationHelper.prototype, "logoutIframe", {
        get: function () {
            return this.document.querySelector("iframe#" + this.logoutIframeId);
        },
        enumerable: false,
        configurable: true
    });
    var SSOAuthenticationHelper_1;
    // static in order to be shared by multiple instances
    SSOAuthenticationHelper.lastAuthenticatedWithSSO = false;
    SSOAuthenticationHelper = SSOAuthenticationHelper_1 = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [WindowUtils,
            PromiseUtils,
            http.HttpClient,
            core.Injector])
    ], SSOAuthenticationHelper);
    return SSOAuthenticationHelper;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var LoginDialogResourceProvider = new core.InjectionToken('LoginDialogResourceProvider');

var LoginDialogComponent = /** @class */ (function () {
    function LoginDialogComponent(modalRef, logService, httpClient, sessionService, storageService, urlUtils, ssoAuthenticationHelper, resource) {
        var _this = this;
        this.modalRef = modalRef;
        this.logService = logService;
        this.httpClient = httpClient;
        this.sessionService = sessionService;
        this.storageService = storageService;
        this.urlUtils = urlUtils;
        this.ssoAuthenticationHelper = ssoAuthenticationHelper;
        this.resource = resource;
        this.hostClass = true;
        this.data = null;
        this.authURIKey = '';
        this.authURI = '';
        this.isFullScreen = false;
        this.ssoEnabled = false;
        this.form = new forms.FormGroup({
            username: new forms.FormControl('', forms.Validators.required),
            password: new forms.FormControl('', forms.Validators.required)
        });
        this.signinWithSSO = function () {
            _this.form.setErrors(null);
            return _this.ssoAuthenticationHelper
                .launchSSODialog()
                .then(function (data) { return _this.storeAccessToken(data); }, function (error) { return _this.APIAuthenticationFailureReportFactory(error); })
                .then(function (userHasChanged) { return _this.acceptUser(userHasChanged); });
        };
        this.sendCredentials = function (payload) {
            return _this.httpClient
                .request('POST', _this.authURI, {
                headers: new http.HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
                body: _this.urlUtils.getQueryString(payload).replace('?', ''),
                observe: 'response'
            })
                .toPromise();
        };
    }
    LoginDialogComponent.prototype.ngOnInit = function () {
        this.data = this.modalRef.data || {};
        this.authURI = this.data.authURI;
        this.isFullScreen = this.data.isFullScreen;
        this.ssoEnabled = this.data.ssoEnabled && this.isMainEndPoint();
        this.storageService.removeAuthToken(this.authURI);
        this.authURIKey = btoa(this.authURI).replace(/=/g, '');
        if (this.ssoAuthenticationHelper.isAutoSSOMain()) {
            this.signinWithSSO();
        }
    };
    LoginDialogComponent.prototype.signinWithCredentials = function () {
        var _this = this;
        this.form.setErrors(null);
        if (this.hasRequiredCredentialsError()) {
            this.form.setErrors({
                credentialsRequiredError: 'se.logindialogform.username.and.password.required'
            });
            return Promise.reject();
        }
        var payload = __assign(__assign({}, (this.data.clientCredentials || {})), { username: this.form.get('username').value, password: this.form.get('password').value, grant_type: 'password' });
        return this.sendCredentials(payload)
            .then(function (response) {
            return _this.storeAccessToken(response);
        }, function (error) { return _this.APIAuthenticationFailureReportFactory(error); })
            .then(function (hasUserChanged) { return _this.acceptUser(hasUserChanged); });
    };
    LoginDialogComponent.prototype.isMainEndPoint = function () {
        return DEFAULT_AUTHENTICATION_ENTRY_POINT === this.authURI;
    };
    LoginDialogComponent.prototype.storeAccessToken = function (response) {
        var token = response instanceof http.HttpResponse ? response.body : response;
        this.storageService.storeAuthToken(this.authURI, token);
        this.logService.debug("API Authentication Success: " + this.authURI);
        return this.isMainEndPoint()
            ? this.sessionService.hasUserChanged()
            : Promise.resolve(false);
    };
    LoginDialogComponent.prototype.APIAuthenticationFailureReportFactory = function (error) {
        this.logService.debug("API Authentication Failure: " + this.authURI + " status: " + error.status);
        this.form.setErrors({
            asyncValidationError: (error.error && error.error.error_description) ||
                'se.logindialogform.oauth.error.default'
        });
        return Promise.reject(error);
    };
    LoginDialogComponent.prototype.acceptUser = function (userHasChanged) {
        this.modalRef.close({
            userHasChanged: userHasChanged
        });
        if (this.isMainEndPoint()) {
            this.sessionService.setCurrentUsername();
        }
        return Promise.resolve({ userHasChanged: userHasChanged });
    };
    LoginDialogComponent.prototype.hasRequiredCredentialsError = function () {
        var username = this.form.get('username');
        var password = this.form.get('password');
        return ((username.errors && username.errors.required) ||
            (password.errors && password.errors.required));
    };
    __decorate([
        core.HostBinding('class.su-login-dialog'),
        __metadata("design:type", Object)
    ], LoginDialogComponent.prototype, "hostClass", void 0);
    LoginDialogComponent = __decorate([
        core.Component({
            selector: 'su-login-dialog',
            styles: [".su-login{width:500px;min-height:440px;box-shadow:0 1px 4px 0 rgba(0,0,0,.1);background-color:#fff;border-radius:4px;border:1px solid rgba(0,0,0,.2);padding:20px;margin:0 auto}.su-login--wrapper{padding:40px 100px;width:100%}.su-login--form-group{margin-bottom:20px}.su-login--form-sso{margin-top:20px}.su-login--logo-wrapper{display:flex;justify-content:flex-start;align-items:center}.su-login--logo-wrapper.su-login--logo-wrapper_full{padding-bottom:45px}.su-login--logo{height:44px}.su-login--logo-text{font-family:\"72\",web,\"Open Sans\",sans-serif;font-size:1.7142857143rem;line-height:1.3333333333;font-weight:400;padding-left:16px;color:#32363a;font-weight:700}.su-login--logo__best-run{position:absolute;bottom:30px;left:30px}.su-login--btn{font-size:1rem;line-height:1.4285714286;font-weight:400;width:100%}.su-login--auth-message{padding-top:20px;padding-bottom:20px;font-size:1rem;line-height:1.4285714286;font-weight:400}.su-login--alert-error{margin-bottom:0;box-shadow:none}"],
            template: "<div class=\"su-login\"><div class=\"su-login--wrapper\"><div class=\"su-login--logo-wrapper\" [ngClass]=\"{ 'su-login--logo-wrapper_full': !isFullScreen }\"><img *ngIf=\"resource?.topLogoURL\" [src]=\"resource?.topLogoURL\" class=\"su-login--logo\"/> <span class=\"su-login--logo-text\" translate=\"se.application.name\"></span></div><form autocomplete=\"off\" novalidate [formGroup]=\"form\" (submit)=\"signinWithCredentials()\" class=\"su-login--form\"><div class=\"su-login--auth-message\" *ngIf=\"isFullScreen\"><div translate=\"se.logindialogform.reauth.message1\"></div><div translate=\"se.logindialogform.reauth.message2\"></div></div><div *ngIf=\"form.errors\" class=\"su-login--form-group\"><fd-alert type=\"error\" class=\"su-login--alert-error\" id=\"invalidError\" [dismissible]=\"false\"><ng-container *ngIf=\"form.errors?.credentialsRequiredError\">{{ form.errors.credentialsRequiredError | translate }}</ng-container><ng-container *ngIf=\"form.errors?.asyncValidationError\">{{ form.errors.asyncValidationError | translate }}</ng-container></fd-alert></div><div class=\"su-login--form-group\"><input fd-form-control type=\"text\" id=\"username_{{ authURIKey }}\" name=\"username\" formControlName=\"username\" placeholder=\"{{ 'se.authentication.form.input.username' | translate }}\" autofocus autocomplete=\"username\"/></div><div class=\"su-login--form-group\"><input fd-form-control type=\"password\" id=\"password_{{ authURIKey }}\" name=\"password\" placeholder=\"{{ 'se.authentication.form.input.password' | translate }}\" formControlName=\"password\" autocomplete=\"current-password\" required/></div><div class=\"su-login--form-group\"><su-language-dropdown class=\"su-login-language\"></su-language-dropdown></div><button fd-button options=\"emphasized\" class=\"su-login--btn\" id=\"submit_{{ authURIKey }}\" name=\"submit\" type=\"submit\" translate=\"se.authentication.form.button.submit\"></button></form><form *ngIf=\"ssoEnabled\" class=\"su-login--form-sso\" name=\"loginDialogFormSSO\" novalidate (submit)=\"signinWithSSO()\"><button fd-button options=\"emphasized\" class=\"fd-button--emphasized su-login--btn\" id=\"submitSSO_{{ authURIKey }}\" name=\"submitSSO\" type=\"submit\" translate=\"se.authentication.form.button.submit.sso\"></button></form></div></div><img *ngIf=\"resource?.bottomLogoURL\" [src]=\"resource?.bottomLogoURL\" class=\"su-login--logo__best-run\"/>"
        }),
        __param(7, core.Optional()), __param(7, core.Inject(LoginDialogResourceProvider)),
        __metadata("design:paramtypes", [core$2.ModalRef,
            LogService,
            http.HttpClient,
            ISessionService,
            IStorageService,
            UrlUtils,
            SSOAuthenticationHelper, Object])
    ], LoginDialogComponent);
    return LoginDialogComponent;
}());

/**
 * @module blabla
 */
var ITranslationsFetchService = /** @class */ (function () {
    function ITranslationsFetchService() {
    }
    return ITranslationsFetchService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function (SUPPORTED_BROWSERS) {
    SUPPORTED_BROWSERS[SUPPORTED_BROWSERS["IE"] = 0] = "IE";
    SUPPORTED_BROWSERS[SUPPORTED_BROWSERS["CHROME"] = 1] = "CHROME";
    SUPPORTED_BROWSERS[SUPPORTED_BROWSERS["FIREFOX"] = 2] = "FIREFOX";
    SUPPORTED_BROWSERS[SUPPORTED_BROWSERS["EDGE"] = 3] = "EDGE";
    SUPPORTED_BROWSERS[SUPPORTED_BROWSERS["SAFARI"] = 4] = "SAFARI";
    SUPPORTED_BROWSERS[SUPPORTED_BROWSERS["UNKNOWN"] = 5] = "UNKNOWN";
})(exports.SUPPORTED_BROWSERS || (exports.SUPPORTED_BROWSERS = {}));
var BrowserService = /** @class */ (function () {
    function BrowserService() {
        var _this = this;
        /*
            It is always better to detect a browser via features. Unfortunately, it's becoming really hard to identify
            Safari, since newer versions do not match the previous ones. Thus, we have to rely on User Agent as the last
            option.
        */
        this._isSafari = function () {
            // return this.getCurrentBrowser() === SUPPORTED_BROWSERS.SAFARI;
            var userAgent = window.navigator.userAgent;
            var vendor = window.navigator.vendor;
            var testFeature = /constructor/i.test(
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            function HTMLElementConstructor() {
                //
            }.toString());
            var testUserAgent = vendor && vendor.indexOf('Apple') > -1 && userAgent && !userAgent.match('CriOS');
            return testFeature || testUserAgent;
        };
        this.isIE = function () { return _this.getCurrentBrowser() === exports.SUPPORTED_BROWSERS.IE; };
        this.isFF = function () { return _this.getCurrentBrowser() === exports.SUPPORTED_BROWSERS.FIREFOX; };
        this.isSafari = function () { return _this.getCurrentBrowser() === exports.SUPPORTED_BROWSERS.SAFARI; };
    }
    BrowserService.prototype.getCurrentBrowser = function () {
        /* forbiddenNameSpaces window as any:false */
        var anyWindow = window;
        var browser = exports.SUPPORTED_BROWSERS.UNKNOWN;
        if (typeof anyWindow.InstallTrigger !== 'undefined') {
            browser = exports.SUPPORTED_BROWSERS.FIREFOX;
        }
        else if ( /* @cc_on!@*/ !!document.documentMode) {
            browser = exports.SUPPORTED_BROWSERS.IE;
        }
        else if (!!anyWindow.StyleMedia) {
            browser = exports.SUPPORTED_BROWSERS.EDGE;
        }
        else if (!!anyWindow.chrome && !!anyWindow.chrome.webstore) {
            browser = exports.SUPPORTED_BROWSERS.CHROME;
        }
        else if (this._isSafari()) {
            browser = exports.SUPPORTED_BROWSERS.SAFARI;
        }
        return browser;
    };
    BrowserService.prototype.getBrowserLocale = function () {
        var locale = window.navigator.language.split('-');
        return locale.length === 1 ? locale[0] : locale[0] + '_' + locale[1].toUpperCase();
    };
    return BrowserService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/** @internal */
var FingerPrintingService = /** @class */ (function () {
    function FingerPrintingService() {
        this._fingerprint = stringUtils.encode(this.getUserAgent() +
            this.getPlugins() +
            this.hasJava() +
            this.hasFlash() +
            this.hasLocalStorage() +
            this.hasSessionStorage() +
            this.hasCookie() +
            this.getTimeZone() +
            this.getLanguage() +
            this.getSystemLanguage() +
            this.hasCanvas());
    }
    /**
     * Get unique browser fingerprint information encoded in Base64.
     */
    FingerPrintingService.prototype.getFingerprint = function () {
        return this._fingerprint;
    };
    FingerPrintingService.prototype.getUserAgent = function () {
        return navigator.userAgent;
    };
    FingerPrintingService.prototype.getPlugins = function () {
        var plugins = [];
        for (var i = 0, l = navigator.plugins.length; i < l; i++) {
            if (navigator.plugins[i]) {
                plugins.push(navigator.plugins[i].name);
            }
        }
        return plugins.join(',');
    };
    FingerPrintingService.prototype.hasJava = function () {
        return navigator.javaEnabled();
    };
    FingerPrintingService.prototype.hasFlash = function () {
        return !!navigator.plugins.namedItem('Shockwave Flash');
    };
    FingerPrintingService.prototype.hasLocalStorage = function () {
        try {
            var hasLs = 'test-has-ls';
            localStorage.setItem(hasLs, hasLs);
            localStorage.removeItem(hasLs);
            return true;
        }
        catch (exception) {
            return false;
        }
    };
    FingerPrintingService.prototype.hasSessionStorage = function () {
        try {
            var hasSs = 'test-has-ss';
            sessionStorage.setItem(hasSs, hasSs);
            sessionStorage.removeItem(hasSs);
            return true;
        }
        catch (exception) {
            return false;
        }
    };
    FingerPrintingService.prototype.hasCookie = function () {
        return navigator.cookieEnabled;
    };
    FingerPrintingService.prototype.getTimeZone = function () {
        return String(String(new Date()).split('(')[1]).split(')')[0];
    };
    FingerPrintingService.prototype.getLanguage = function () {
        return navigator.language;
    };
    FingerPrintingService.prototype.getSystemLanguage = function () {
        return window.navigator.language;
    };
    FingerPrintingService.prototype.hasCanvas = function () {
        try {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }
        catch (e) {
            return false;
        }
    };
    return FingerPrintingService;
}());

/* @internal */
var TranslateHttpLoader = /** @class */ (function () {
    function TranslateHttpLoader(translationsFetchService) {
        this.translationsFetchService = translationsFetchService;
    }
    /**
     * Gets the translations from the server
     */
    TranslateHttpLoader.prototype.getTranslation = function (lang) {
        return rxjs.from(this.translationsFetchService.get(lang));
    };
    TranslateHttpLoader = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [ITranslationsFetchService])
    ], TranslateHttpLoader);
    return TranslateHttpLoader;
}());

var TranslationModule = /** @class */ (function () {
    function TranslationModule() {
    }
    TranslationModule_1 = TranslationModule;
    TranslationModule.forChild = function () {
        return core$1.TranslateModule.forChild({
            isolate: false,
            loader: {
                provide: core$1.TranslateLoader,
                useClass: TranslateHttpLoader
            }
        });
    };
    TranslationModule.forRoot = function (TranslationsFetchServiceClass) {
        return {
            ngModule: TranslationModule_1,
            providers: [
                {
                    provide: ITranslationsFetchService,
                    useClass: TranslationsFetchServiceClass
                },
                {
                    provide: core.APP_INITIALIZER,
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    useFactory: function (translate, storageService, browserService) {
                        storageService
                            .getValueFromLocalStorage('SELECTED_LANGUAGE', false)
                            .then(function (lang) {
                            return lang ? lang.isoCode : browserService.getBrowserLocale();
                        }, function () { return browserService.getBrowserLocale(); })
                            .then(function (lang) {
                            translate.setDefaultLang(lang);
                            translate.use(lang);
                        });
                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        return function (component) {
                            // an initializer useFactory must return a function
                        };
                    },
                    deps: [core$1.TranslateService, IStorageService, BrowserService],
                    multi: true
                }
            ]
        };
    };
    var TranslationModule_1;
    TranslationModule = TranslationModule_1 = __decorate([
        core.NgModule({
            imports: [
                core$1.TranslateModule.forRoot({
                    isolate: false,
                    loader: {
                        provide: core$1.TranslateLoader,
                        useClass: TranslateHttpLoader
                    }
                })
            ],
            exports: [core$1.TranslateModule]
        })
    ], TranslationModule);
    return TranslationModule;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
var LanguageDropdownAdapter = /** @class */ (function () {
    function LanguageDropdownAdapter() {
    }
    LanguageDropdownAdapter.transform = function (item, id) {
        return {
            id: id,
            label: item.name,
            value: item
        };
    };
    return LanguageDropdownAdapter;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:LANGUAGE_RESOURCE_URI
 *
 * @description
 * Resource URI of the languages REST service.
 */
/**
 * @ngdoc service
 * @name @smartutils.services:LanguageService
 */
var LanguageService = /** @class */ (function () {
    function LanguageService(logService, translateService, promiseUtils, eventService, browserService, storageService, injector, languageServiceConstants) {
        this.logService = logService;
        this.translateService = translateService;
        this.promiseUtils = promiseUtils;
        this.eventService = eventService;
        this.browserService = browserService;
        this.storageService = storageService;
        this.injector = injector;
        this.languageServiceConstants = languageServiceConstants;
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#getToolingLanguages
     * @methodOf @smartutils.services:LanguageService
     *
     * @description
     * Retrieves a list of language descriptors using REST calls to the i18n API.
     *
     * @returns {Promise<IToolingLanguage[]>} A promise that resolves to an array of IToolingLanguage.
     */
    LanguageService.prototype.getToolingLanguages = function () {
        var _this = this;
        return this.i18nLanguageRestService
            .get({})
            .then(function (response) { return response.languages; })
            .catch(function (error) {
            _this.logService.error('LanguageService.getToolingLanguages() - Error loading tooling languages');
            return Promise.reject(error);
        });
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#getBrowserLanguageIsoCode
     * @methodOf @smartutils.services:LanguageService
     *
     * @deprecated since 1808
     *
     * @description
     * Uses the browser's current locale to determine the selected language ISO code.
     *
     * @returns {String} The language ISO code of the browser's currently selected locale.
     */
    LanguageService.prototype.getBrowserLanguageIsoCode = function () {
        return window.navigator.language.split('-')[0];
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#getBrowserLocale
     * @methodOf @smartutils.services:LanguageService
     *
     * @deprecated since 1808 - use browserService instead.
     *
     * @description
     * determines the browser locale in the format en_US
     *
     * @returns {string} the browser locale
     */
    LanguageService.prototype.getBrowserLocale = function () {
        return this.browserService.getBrowserLocale();
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#getResolveLocale
     * @methodOf @smartutils.services:LanguageService
     *
     * @description
     * Resolve the user preference tooling locale. It determines in the
     * following order:
     *
     * 1. Check if the user has previously selected the language
     * 2. Check if the user browser locale is supported in the system
     *
     * @returns {Promise<string>} the locale
     */
    LanguageService.prototype.getResolveLocale = function () {
        return this._getDefaultLanguage();
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#getResolveLocaleIsoCode
     * @methodOf @smartutils.services:LanguageService
     *
     * @description
     * Resolve the user preference tooling locale ISO code. i.e.: If the selected tooling language is 'en_US',
     * the resolved value will be 'en'.
     *
     * @returns {Promise<string>} A promise that resolves to the isocode of the tooling language.
     */
    LanguageService.prototype.getResolveLocaleIsoCode = function () {
        var _this = this;
        return this.getResolveLocale().then(function (resolveLocale) { return _this.convertBCP47TagToJavaTag(resolveLocale).split('_')[0]; });
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#setSelectedToolingLanguage
     * @methodOf @smartutils.services:LanguageService
     *
     * @description
     * Set the user preference language in the storage service
     *
     * @param {IToolingLanguage} language the language object to be saved.
     */
    LanguageService.prototype.setSelectedToolingLanguage = function (language) {
        this.storageService.setValueInLocalStorage(SELECTED_LANGUAGE, language, false);
        this.translateService.use(language.isoCode);
        this.setApplicationTitle();
        this.eventService.publish(SWITCH_LANGUAGE_EVENT, {
            isoCode: language.isoCode
        });
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#registerSwitchLanguage
     * @methodOf @smartutils.services:LanguageService
     *
     * @description
     * Register a callback function to the gateway in order to switch the tooling language
     */
    LanguageService.prototype.registerSwitchLanguage = function () {
        var _this = this;
        this.eventService.subscribe(SWITCH_LANGUAGE_EVENT, function (eventId, language) {
            if (_this.translateService.currentLang !== language.isoCode) {
                _this.translateService.use(language.isoCode);
            }
        });
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#convertBCP47TagToJavaTag
     * @methodOf @smartutils.services:LanguageService
     *
     * @description
     * Method converts the BCP47 language tag representing the locale to the default java representation.
     * For example, method converts "en-US" to "en_US".
     *
     * @param {string} languageTag the language tag to be converted.
     *
     * @returns {string} the languageTag in java representation
     */
    LanguageService.prototype.convertBCP47TagToJavaTag = function (languageTag) {
        return !!languageTag ? languageTag.replace(/-/g, '_') : languageTag;
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:LanguageService#convertJavaTagToBCP47Tag
     * @methodOf @smartutils.services:LanguageService
     *
     * @description
     * Method converts the default java language tag representing the locale to the BCP47 representation.
     * For example, method converts "en_US" to "en-US".
     *
     * @param {string} languageTag the language tag to be converted.
     *
     * @returns {string} the languageTag in BCP47 representation
     */
    LanguageService.prototype.convertJavaTagToBCP47Tag = function (languageTag) {
        return !!languageTag ? languageTag.replace(/_/g, '-') : languageTag;
    };
    LanguageService.prototype._getDefaultLanguage = function () {
        var _this = this;
        return this.storageService.getValueFromLocalStorage(SELECTED_LANGUAGE, false).then(function (lang) {
            return lang ? lang.isoCode : _this.browserService.getBrowserLocale();
        }, function () { return _this.browserService.getBrowserLocale(); });
    };
    LanguageService.prototype.setApplicationTitle = function () {
        this.translateService.get('se.application.name').subscribe(function (pageTitle) {
            document.title = pageTitle;
        });
    };
    Object.defineProperty(LanguageService.prototype, "i18nLanguageRestService", {
        get: function () {
            return this.injector
                .get(RestServiceFactory)
                .get(this.languageServiceConstants.I18N_LANGUAGES_RESOURCE_URI);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Cached({ actions: [rarelyChangingContent] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], LanguageService.prototype, "getToolingLanguages", null);
    LanguageService = __decorate([
        core.Injectable(),
        __param(3, core.Inject(EVENT_SERVICE)),
        __param(7, core.Inject(LANGUAGE_SERVICE_CONSTANTS)),
        __metadata("design:paramtypes", [LogService,
            core$1.TranslateService,
            PromiseUtils, Object, BrowserService,
            IStorageService,
            core.Injector, Object])
    ], LanguageService);
    return LanguageService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var LanguageSortStrategy;
(function (LanguageSortStrategy) {
    LanguageSortStrategy["Default"] = "default";
    LanguageSortStrategy["None"] = "none";
})(LanguageSortStrategy || (LanguageSortStrategy = {}));
// @dynamic
var LanguageDropdownHelper = /** @class */ (function () {
    function LanguageDropdownHelper() {
    }
    LanguageDropdownHelper.findSelectLanguageWithIsoCodePredicate = function (isoCode) {
        return function (item) { return item.value.isoCode === isoCode; };
    };
    /**
     * Finds the language with a specified isoCode.
     *
     * @param {string} isoCode
     * @param {IToolingLanguage[]} languages
     * @returns {IToolingLanguage}
     */
    LanguageDropdownHelper.findLanguageWithIsoCode = function (isoCode, languages) {
        return languages.find(function (language) { return language.isoCode === isoCode; });
    };
    /**
     * Returns an ordered language array by name and sets the selected language at the beginning.
     *
     * @param {IToolingLanguage} selectedLanguage
     * @param {IToolingLanguage[]} languages
     * @param {ILanguageSortConfig} config
     * @returns {IToolingLanguage[]}
     */
    LanguageDropdownHelper.order = function (selectedLanguage, languages, config) {
        if (config === void 0) { config = { strategy: LanguageSortStrategy.Default }; }
        switch (config.strategy) {
            case LanguageSortStrategy.Default:
                var orderedLanguages = languages
                    .filter(function (language) { return language.isoCode !== selectedLanguage.isoCode; })
                    .sort(function (a, b) { return a.isoCode.localeCompare(b.isoCode); });
                return __spreadArrays([selectedLanguage], orderedLanguages);
            case LanguageSortStrategy.None:
                return languages;
        }
    };
    return LanguageDropdownHelper;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var LanguageDropdown = /** @class */ (function () {
    function LanguageDropdown(languageService, eventService) {
        this.languageService = languageService;
        this.eventService = eventService;
        this.languageSortStrategy = LanguageSortStrategy.Default;
        this.selectedLanguage = null;
        this.items = [];
        this.initialLanguage = null;
        this.languages = [];
        this.unRegisterEventService = null;
    }
    LanguageDropdown.prototype.ngOnInit = function () {
        var _this = this;
        Promise.all([
            this.languageService.getResolveLocale(),
            this.languageService.getToolingLanguages()
        ]).then(function (_a) {
            var isoCode = _a[0], languages = _a[1];
            _this.items = languages.map(LanguageDropdownAdapter.transform);
            _this.languages = languages;
            _this.setSelectedLanguage(isoCode);
            _this.setInitialLanguage(isoCode);
        });
        this.unRegisterEventService = this.eventService.subscribe(SWITCH_LANGUAGE_EVENT, function () {
            return _this.handleLanguageChange();
        });
    };
    LanguageDropdown.prototype.ngOnDestroy = function () {
        this.unRegisterEventService();
    };
    /**
     * Triggered when an user selects a language.
     * @param {IToolingLanguage} language
     */
    LanguageDropdown.prototype.onSelectedLanguage = function (item) {
        this.languageService.setSelectedToolingLanguage(item.value);
    };
    /**
     * Set initial language to be displayed in dropdown
     *
     * @param {string} isoCode
     */
    LanguageDropdown.prototype.setInitialLanguage = function (isoCode) {
        this.initialLanguage =
            this.items.find(LanguageDropdownHelper.findSelectLanguageWithIsoCodePredicate(isoCode)) ||
                this.items.find(LanguageDropdownHelper.findSelectLanguageWithIsoCodePredicate(DEFAULT_LANGUAGE_ISO));
    };
    /**
     * Triggered onInit and when language service sets a new language.
     *
     * @param {IToolingLanguage[]} languages
     * @param {string} isoCode
     */
    LanguageDropdown.prototype.setSelectedLanguage = function (isoCode) {
        var _this = this;
        this.selectedLanguage = LanguageDropdownHelper.findLanguageWithIsoCode(isoCode, this.languages);
        if (this.selectedLanguage) {
            var sortedLanguages = LanguageDropdownHelper.order(this.selectedLanguage, this.languages, { strategy: this.languageSortStrategy });
            this.items = sortedLanguages.map(LanguageDropdownAdapter.transform);
            return;
        }
        // In case the iso code is too specific, it will use the more generic iso code to set the language.
        this.languageService.getResolveLocaleIsoCode().then(function (code) {
            _this.selectedLanguage = LanguageDropdownHelper.findLanguageWithIsoCode(code, _this.languages);
            var sortedLanguages = LanguageDropdownHelper.order(_this.selectedLanguage, _this.languages, { strategy: _this.languageSortStrategy });
            _this.items = sortedLanguages.map(LanguageDropdownAdapter.transform);
        });
    };
    /**
     * Callback for setting the selected language.
     */
    LanguageDropdown.prototype.handleLanguageChange = function () {
        var _this = this;
        this.languageService.getResolveLocale().then(function (isoCode) {
            _this.setSelectedLanguage(isoCode);
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], LanguageDropdown.prototype, "languageSortStrategy", void 0);
    return LanguageDropdown;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc component
 * @name  @smartutils.components:LanguageDropdownComponent
 *
 * @description
 * A component responsible for displaying and selecting application language. Uses {@link @smartutils.components:SelectComponent SelectComponent} to show language items
 *
 */
var LanguageDropdownComponent = /** @class */ (function (_super) {
    __extends(LanguageDropdownComponent, _super);
    function LanguageDropdownComponent(languageService, eventService) {
        var _this = _super.call(this, languageService, eventService) || this;
        _this.eventService = eventService;
        return _this;
    }
    LanguageDropdownComponent = __decorate([
        core.Component({
            selector: 'su-language-dropdown',
            template: "\n        <su-select\n            class=\"su-language-selector\"\n            [items]=\"items\"\n            [initialValue]=\"initialLanguage\"\n            (onItemSelected)=\"onSelectedLanguage($event)\"\n        >\n        </su-select>\n    "
        }),
        __param(0, core.Inject(LANGUAGE_SERVICE)),
        __param(1, core.Inject(EVENT_SERVICE)),
        __metadata("design:paramtypes", [LanguageService, Object])
    ], LanguageDropdownComponent);
    return LanguageDropdownComponent;
}(LanguageDropdown));

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
var ISelectAdapter = /** @class */ (function () {
    function ISelectAdapter() {
    }
    ISelectAdapter.transform = function (item, id) {
        return {};
    };
    return ISelectAdapter;
}());

/**
 * Directive for marking list item for 'ListKeyboardControlDirective' to allow for navigating with keyboard.
 */
var ListItemKeyboardControlDirective = /** @class */ (function () {
    function ListItemKeyboardControlDirective(hostElement, renderer) {
        this.hostElement = hostElement;
        this.renderer = renderer;
        /** @internal */
        this.activeClassName = 'is-active';
    }
    /** @internal */
    ListItemKeyboardControlDirective.prototype.ngOnInit = function () {
        this.setTabIndex();
    };
    ListItemKeyboardControlDirective.prototype.getElement = function () {
        return this.hostElement.nativeElement;
    };
    ListItemKeyboardControlDirective.prototype.setActive = function () {
        var elm = this.getElement();
        this.renderer.addClass(elm, this.activeClassName);
        elm.scrollIntoView({ block: 'nearest' });
    };
    ListItemKeyboardControlDirective.prototype.setInactive = function () {
        this.renderer.removeClass(this.getElement(), this.activeClassName);
    };
    /** @internal */
    ListItemKeyboardControlDirective.prototype.setTabIndex = function () {
        this.renderer.setAttribute(this.getElement(), 'tabindex', '-1');
    };
    ListItemKeyboardControlDirective = __decorate([
        core.Directive({
            selector: '[suListItemKeyboardControl]'
        }),
        __metadata("design:paramtypes", [core.ElementRef, core.Renderer2])
    ], ListItemKeyboardControlDirective);
    return ListItemKeyboardControlDirective;
}());

var KeyboardKey;
(function (KeyboardKey) {
    KeyboardKey["ArrowDown"] = "ArrowDown";
    KeyboardKey["ArrowUp"] = "ArrowUp";
    KeyboardKey["Enter"] = "Enter";
    KeyboardKey["Esc"] = "Escape";
})(KeyboardKey || (KeyboardKey = {}));
/**
 * Directive that manages the active option in a list of items based on keyboard interaction.
 * For disabled options, a predicate must be passed with `suListKeyboardControlDisabledPredicate`
 * which will prevent that option from navigating with arrow up / down key.
 *
 * Note: It will include only direct children having the `suListItemKeyboardControl` directive.
 *
 * @example
 * ```
 * items = [
 *   {
 *     id: 1,
 *     label: 'item 1'
 *   },
 *   {
 *     id: 2,
 *     label: 'item 2'
 *   },
 *   {
 *     id: 3,
 *     label: 'item 3'
 *   }
 * ]
 * <ul suListKeyboardControl>
 *   <li suListItemKeyboardControl *ngFor="let item of items">
 *     {{ item.label }}
 *   </li>
 * </ul>
 * ```
 */
var ListKeyboardControlDirective = /** @class */ (function () {
    function ListKeyboardControlDirective() {
        /** Whether the keyboard interaction is enabled */
        this.suListKeyboardControlEnabled = true;
        this.suListKeyboardControlEnterKeydown = new core.EventEmitter();
        this.suListKeyboardControlEscKeydown = new core.EventEmitter();
        /** @internal */
        this.didNgAfterContentInit = false;
        /** @internal */
        this.activeItem = null;
        /** @internal */
        this.activeItemIndex = null;
    }
    /** @internal */
    ListKeyboardControlDirective.prototype.onKeyDown = function (event) {
        if (!this.suListKeyboardControlEnabled || this.items.length === 0) {
            return;
        }
        // For ArrowDown and ArrowUp prevent from scrolling the container.
        // Focus event is called when setting an active item so it will also scroll if needed.
        switch (event.key) {
            case KeyboardKey.ArrowDown:
                event.preventDefault();
                this.handleArrowDown();
                return;
            case KeyboardKey.ArrowUp:
                event.preventDefault();
                this.handleArrowUp();
                return;
            case KeyboardKey.Enter:
                event.preventDefault();
                this.handleEnter();
                return;
            case KeyboardKey.Esc:
                this.handleEsc();
                return;
        }
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.items.changes.subscribe(function () { return _this.onItemsChange(); });
        // Items may be cached by wrapper component e.g. <fd-popover> so items.changes subscription will not receive an event.
        // Ensure that whenever a dropdown is opened, subscription will receive an event
        this.items.notifyOnChanges();
        this.didNgAfterContentInit = true;
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.ngOnChanges = function (changes) {
        if (!this.didNgAfterContentInit) {
            return;
        }
        var enabledChange = changes.suListKeyboardControlEnabled;
        var predicateChange = changes.suListKeyboardControlDisabledPredicate;
        var shouldSetActive = enabledChange && enabledChange.currentValue && !enabledChange.previousValue;
        var shouldUnsetActive = enabledChange && !enabledChange.currentValue && enabledChange.previousValue;
        var shouldSetActiveForPredicate = predicateChange && predicateChange.currentValue && !!this.suListKeyboardControlEnabled;
        var shouldUnsetActiveForPredicate = predicateChange &&
            !predicateChange.currentValue &&
            predicateChange.previousValue &&
            !!this.suListKeyboardControlEnabled;
        if (this.items.length === 0) {
            return;
        }
        if (shouldSetActive || shouldSetActiveForPredicate) {
            this.setFirstItemActive();
        }
        if (shouldUnsetActive || shouldUnsetActiveForPredicate) {
            this.unsetActiveItem();
        }
    };
    /**
     * Handler for dynamic content change.
     * Sets or unsets active item.
     * @internal
     */
    ListKeyboardControlDirective.prototype.onItemsChange = function () {
        if (this.items.length === 0) {
            this.clearActiveItem();
            return;
        }
        if (this.suListKeyboardControlEnabled) {
            if (!this.isActiveItemSet()) {
                // if no active item then set the first one as active
                this.setActiveItemByIndex(0, 1);
            }
            else if (!this.itemExistsByIndex(this.activeItemIndex)) {
                // clear active item if the active item no longer exists
                this.clearActiveItem();
            }
        }
        else {
            // keyboard control is not enabled
            this.clearActiveItem();
        }
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.handleArrowUp = function () {
        this.setPreviousItemActive();
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.handleArrowDown = function () {
        this.setNextItemActive();
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.handleEnter = function () {
        this.suListKeyboardControlEnterKeydown.emit(this.activeItemIndex);
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.handleEsc = function () {
        this.suListKeyboardControlEscKeydown.emit();
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.getItemByIndex = function (index) {
        var items = this.getItemsArray();
        return items[index];
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.getItemsArray = function () {
        return this.items.toArray();
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.setActiveItemByIndex = function (index, delta) {
        var items = this.getItemsArray();
        if (this.suListKeyboardControlDisabledPredicate) {
            while (this.suListKeyboardControlDisabledPredicate(items[index], index)) {
                index += delta;
                if (!items[index]) {
                    return;
                }
            }
        }
        var item = this.getItemByIndex(index);
        this.setActiveItem(item);
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.setActiveItem = function (item) {
        var items = this.getItemsArray();
        var index = items.indexOf(item);
        if (this.activeItem) {
            this.activeItem.setInactive();
        }
        if (items.length > 0) {
            this.activeItem = items[index];
            this.activeItem.setActive();
            this.activeItemIndex = index;
        }
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.unsetActiveItem = function () {
        if (!this.activeItem) {
            return;
        }
        this.activeItem.setInactive();
        this.activeItemIndex = null;
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.setFirstItemActive = function () {
        this.setActiveItemByIndex(0, 1);
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.setNextItemActive = function () {
        if (this.activeItemIndex === null) {
            this.setFirstItemActive();
            return;
        }
        if (this.activeItemIndex < this.items.length - 1) {
            this.setActiveItemByIndex(this.activeItemIndex + 1, 1);
        }
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.setPreviousItemActive = function () {
        if (this.activeItemIndex === null) {
            this.setFirstItemActive();
            return;
        }
        if (this.activeItemIndex > 0) {
            this.setActiveItemByIndex(this.activeItemIndex - 1, -1);
        }
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.itemExistsByIndex = function (index) {
        if (index === null) {
            return false;
        }
        return !!this.getItemByIndex(index);
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.clearActiveItem = function () {
        this.activeItem = null;
        this.activeItemIndex = null;
    };
    /** @internal */
    ListKeyboardControlDirective.prototype.isActiveItemSet = function () {
        return !!this.activeItem;
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], ListKeyboardControlDirective.prototype, "suListKeyboardControlEnabled", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], ListKeyboardControlDirective.prototype, "suListKeyboardControlDisabledPredicate", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], ListKeyboardControlDirective.prototype, "suListKeyboardControlEnterKeydown", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], ListKeyboardControlDirective.prototype, "suListKeyboardControlEscKeydown", void 0);
    __decorate([
        core.ContentChildren(ListItemKeyboardControlDirective),
        __metadata("design:type", core.QueryList)
    ], ListKeyboardControlDirective.prototype, "items", void 0);
    __decorate([
        core.HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ListKeyboardControlDirective.prototype, "onKeyDown", null);
    ListKeyboardControlDirective = __decorate([
        core.Directive({
            selector: '[suListKeyboardControl]'
        })
    ], ListKeyboardControlDirective);
    return ListKeyboardControlDirective;
}());

var ListKeyboardControlModule = /** @class */ (function () {
    function ListKeyboardControlModule() {
    }
    ListKeyboardControlModule = __decorate([
        core.NgModule({
            declarations: [ListKeyboardControlDirective, ListItemKeyboardControlDirective],
            exports: [ListKeyboardControlDirective, ListItemKeyboardControlDirective]
        })
    ], ListKeyboardControlModule);
    return ListKeyboardControlModule;
}());

var SelectComponent = /** @class */ (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.initialValue = null;
        _this.placeholder = '';
        _this.isKeyboardControlEnabled = true;
        _this.hasCustomTrigger = false;
        _this.onItemSelected = new core.EventEmitter();
        _this.isOpen = false;
        return _this;
    }
    SelectComponent_1 = SelectComponent;
    SelectComponent.prototype.selectItem = function (id) {
        var item = this.items.find(function (selected) { return selected.id === id; });
        this.setValue(item);
        this.isOpen = false;
        this.onItemSelected.emit(item);
    };
    SelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.initialValue && changes.initialValue.currentValue && !this.value) {
            this.setInitialValue(changes.initialValue.currentValue);
        }
    };
    SelectComponent.prototype.setInitialValue = function (value) {
        if (typeof value === 'number') {
            this.setValueById(value);
        }
        else {
            this.setValue(value);
        }
    };
    SelectComponent.prototype.setValue = function (item) {
        this.writeValue(item);
        this.onChange(item);
    };
    SelectComponent.prototype.setValueById = function (id) {
        this.setValue(this.items.find(function (item) { return item.id === id; }));
    };
    var SelectComponent_1;
    __decorate([
        core.Input(),
        __metadata("design:type", Array)
    ], SelectComponent.prototype, "items", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "initialValue", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "placeholder", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "isKeyboardControlEnabled", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "hasCustomTrigger", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], SelectComponent.prototype, "onItemSelected", void 0);
    SelectComponent = SelectComponent_1 = __decorate([
        core.Component({
            selector: 'su-select',
            encapsulation: core.ViewEncapsulation.None,
            providers: [
                { provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return SelectComponent_1; }), multi: true }
            ],
            styles: [".su-select,.su-select__popover-control,.su-select__popover-control .fd-dropdown{width:100%}.su-select__popover-control .fd-dropdown__control{overflow:hidden;color:#51555a;text-align:left}.su-select__popover-control .fd-dropdown__control::after{position:absolute;top:0;right:0;display:flex;justify-content:center;align-items:center;padding:0;height:36px;width:36px;margin-top:0;font-size:14px}.su-select__menu .fd-menu__list{max-height:200px;overflow:auto}.su-select__menu .fd-menu__item[select-highlighted]{background:rgba(10,110,209,.07)}.su-select__menu .fd-menu__item[select-highlighted]:focus{outline:0}"],
            template: "\n        <fd-popover [(isOpen)]=\"isOpen\" fillControlMode=\"equal\" class=\"su-select\">\n            <fd-popover-control class=\"su-select__popover-control\">\n                <button\n                    class=\"fd-dropdown__control fd-button\"\n                    type=\"button\"\n                    *ngIf=\"!hasCustomTrigger; else customTrigger\"\n                >\n                    {{ (value && value.label) || placeholder | translate }}\n                </button>\n\n                <ng-template #customTrigger>\n                    <ng-content select=\"[su-select-custom-trigger]\"></ng-content>\n                </ng-template>\n            </fd-popover-control>\n            <fd-popover-body>\n                <fd-menu class=\"su-select__menu\">\n                    <ul\n                        fd-menu-list\n                        suListKeyboardControl\n                        [suListKeyboardControlEnabled]=\"isKeyboardControlEnabled && isOpen\"\n                        (suListKeyboardControlEnterKeydown)=\"selectItem($event)\"\n                    >\n                        <li\n                            fd-menu-item\n                            suListItemKeyboardControl\n                            [ngClass]=\"item.listItemClassName\"\n                            *ngFor=\"let item of items\"\n                            (click)=\"selectItem(item.id)\"\n                            [attr.tabindex]=\"-1\"\n                            [attr.data-select-id]=\"item.id\"\n                        >\n                            {{ item.label | translate }}\n                        </li>\n                    </ul>\n                </fd-menu>\n            </fd-popover-body>\n        </fd-popover>\n    "
        })
    ], SelectComponent);
    return SelectComponent;
}(BaseValueAccessor));

var SelectModule = /** @class */ (function () {
    function SelectModule() {
    }
    SelectModule = __decorate([
        core.NgModule({
            imports: [
                core$2.FundamentalNgxCoreModule,
                common.CommonModule,
                ListKeyboardControlModule,
                TranslationModule.forChild()
            ],
            declarations: [SelectComponent],
            entryComponents: [SelectComponent],
            exports: [SelectComponent]
        })
    ], SelectModule);
    return SelectModule;
}());

var LanguageDropdownModule = /** @class */ (function () {
    function LanguageDropdownModule() {
    }
    LanguageDropdownModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, SelectModule],
            declarations: [LanguageDropdownComponent],
            entryComponents: [LanguageDropdownComponent],
            exports: [LanguageDropdownComponent]
        })
    ], LanguageDropdownModule);
    return LanguageDropdownModule;
}());

var LoginDialogModule = /** @class */ (function () {
    function LoginDialogModule() {
    }
    LoginDialogModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                LanguageDropdownModule,
                forms.FormsModule,
                forms.ReactiveFormsModule,
                core$2.AlertModule,
                TranslationModule.forChild(),
                core$2.ButtonModule,
                core$2.FormModule
            ],
            declarations: [LoginDialogComponent],
            entryComponents: [LoginDialogComponent],
            exports: [LanguageDropdownModule]
        })
    ], LoginDialogModule);
    return LoginDialogModule;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var AuthenticationService = /** @class */ (function (_super) {
    __extends(AuthenticationService, _super);
    function AuthenticationService(translationsFetchService, modalService, sharedDataService, storageService, eventService, ssoAuthenticationHelper, settingsService, authenticationManager) {
        var _this = _super.call(this) || this;
        _this.translationsFetchService = translationsFetchService;
        _this.modalService = modalService;
        _this.sharedDataService = sharedDataService;
        _this.storageService = storageService;
        _this.eventService = eventService;
        _this.ssoAuthenticationHelper = ssoAuthenticationHelper;
        _this.settingsService = settingsService;
        _this.authenticationManager = authenticationManager;
        return _this;
    }
    AuthenticationService.prototype.filterEntryPoints = function (resource) {
        return this.sharedDataService.get('authenticationMap').then(function (authenticationMap) {
            return functionsUtils
                .convertToArray(__assign(__assign({}, (authenticationMap || {})), DEFAULT_AUTH_MAP))
                .filter(function (entry) {
                return new RegExp(entry.key, 'g').test(resource);
            })
                .map(function (element) { return element.value; });
        });
    };
    AuthenticationService.prototype.isAuthEntryPoint = function (resource) {
        return this.sharedDataService.get('authenticationMap').then(function (authenticationMap) {
            var authEntryPoints = functionsUtils
                .convertToArray(authenticationMap || {})
                .map(function (element) { return element.value; });
            return (authEntryPoints.indexOf(resource) > -1 ||
                resource === DEFAULT_AUTHENTICATION_ENTRY_POINT);
        });
    };
    AuthenticationService.prototype.authenticate = function (resource) {
        var _this = this;
        return this._findLoginData(resource).then(function (loginData) {
            return _this._launchAuth(loginData).then(function (modalFeedback) {
                Promise.resolve(_this.eventService.publish(EVENTS.AUTHORIZATION_SUCCESS, {
                    userHasChanged: modalFeedback.userHasChanged
                })).then(function () {
                    if (modalFeedback.userHasChanged) {
                        _this.eventService.publish(EVENTS.USER_HAS_CHANGED);
                    }
                    /**
                     * We only need to reload when the user has changed and all authentication forms were closed.
                     * There can be many authentication forms if some modules use different (from default one) end points.
                     */
                    var reauthInProcess = lodash.values(_this.reauthInProgress)
                        .some(function (inProcess) { return inProcess; });
                    if (modalFeedback.userHasChanged &&
                        !reauthInProcess &&
                        _this.authenticationManager &&
                        _this.authenticationManager.onUserHasChanged) {
                        _this.authenticationManager.onUserHasChanged();
                    }
                });
                _this.reauthInProgress[loginData.authURI] = false;
            });
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        // First, indicate the services that SmartEdit is logging out. This should give them the opportunity to clean up.
        // NOTE: This is not synchronous since some clean-up might be lengthy, and logging out should be fast.
        return this.eventService.publish(EVENTS.LOGOUT).then(function () {
            _this.storageService.removeAllAuthTokens();
            if (_this.ssoAuthenticationHelper.isAutoSSOMain()) {
                _this.ssoAuthenticationHelper.logout();
            }
            else if (_this.authenticationManager && _this.authenticationManager.onLogout) {
                _this.authenticationManager.onLogout();
            }
        });
    };
    AuthenticationService.prototype.isReAuthInProgress = function (entryPoint) {
        return Promise.resolve(this.reauthInProgress[entryPoint] === true);
    };
    AuthenticationService.prototype.setReAuthInProgress = function (entryPoint) {
        this.reauthInProgress[entryPoint] = true;
        return Promise.resolve();
    };
    AuthenticationService.prototype.isAuthenticated = function (url) {
        var _this = this;
        return this.filterEntryPoints(url).then(function (entryPoints) {
            var authURI = entryPoints && entryPoints[0];
            return Promise.resolve(_this.storageService.getAuthToken(authURI)).then(function (authToken) { return !!authToken; });
        });
    };
    /*
     * will try determine first relevant authentication entry point from authenticationMap and retrieve potential client credentials to be added on top of user credentials
     */
    AuthenticationService.prototype._findLoginData = function (resource) {
        var _this = this;
        return this.filterEntryPoints(resource).then(function (entryPoints) {
            return Promise.resolve(_this.sharedDataService.get('credentialsMap').then(function (credentialsMap) {
                var map = __assign(__assign({}, (credentialsMap || {})), DEFAULT_CREDENTIALS_MAP);
                var authURI = entryPoints[0];
                return {
                    authURI: authURI,
                    clientCredentials: map[authURI]
                };
            }));
        });
    };
    AuthenticationService.prototype._launchAuth = function (loginData) {
        var _this = this;
        return this.translationsFetchService
            .waitToBeReady()
            .then(function () {
            return Promise.all([
                _this.storageService.isInitialized(),
                _this.settingsService.getBoolean('smartedit.sso.enabled')
            ]);
        })
            .then(function (_a) {
            var isFullScreen = _a[0], ssoEnabled = _a[1];
            var modalRef = _this.modalService.open({
                component: LoginDialogComponent,
                data: __assign(__assign({}, loginData), { isFullScreen: isFullScreen,
                    ssoEnabled: ssoEnabled }),
                config: {
                    modalPanelClass: 'su-login-dialog-container',
                    hasBackdrop: false
                }
            });
            _this.reauthInProgress = {};
            return new Promise(function (resolve, reject) {
                modalRef.afterClosed.subscribe(resolve, reject);
            });
        });
    };
    AuthenticationService = __decorate([
        __param(4, core.Inject(EVENT_SERVICE)),
        __param(7, core.Optional()),
        __metadata("design:paramtypes", [ITranslationsFetchService,
            IModalService,
            ISharedDataService,
            IStorageService, Object, SSOAuthenticationHelper,
            ISettingsService,
            IAuthenticationManagerService])
    ], AuthenticationService);
    return AuthenticationService;
}(IAuthenticationService));

/**
 * Allows to perform operations on a Modal Component such as adding the buttons or getting the modal data.
 * It must be injected into a Custom Modal Component.
 *
 * The Custom Modal Component is rendered by {@link FundamentalModalTemplateComponent}.
 * A Service or a Component that opens the Modal Component must provide
 * [component]{@link IFundamentalModalConfig#component} and [templateConfig]{@link IFundamentalModalConfig#templateConfig}.
 *
 *
 * ### Example of a Service or Component that opens the modal
 *
 *      this.modalService.open({
 *           component: YourCustomModalComponent,
 *               templateConfig: {
 *               title: 'se.cms.synchronization.pagelist.modal.title.prefix',
 *               titleSuffix: 'se.cms.pageeditormodal.editpagetab.title'
 *           },
 *           data: {
 *               propA: 'valA'
 *           }
 *      });
 *
 * ### Example of YourCustomModalComponent
 *
 *      export class YourCustomModalComponent implements OnInit {
 *          constructor(private modalManager: FundamentalModalManagerService) {}
 *
 *          ngOnInit(): void {
 *              this.modalManager.addButtons([]);
 *              this.modalManager.getModalData().pipe(take(1)).subscribe(({propA}) => { console.log(propA) });
 *          }
 *      }
 *
 */
var FundamentalModalManagerService = /** @class */ (function () {
    function FundamentalModalManagerService(modalRef) {
        this.modalRef = modalRef;
        this.title = new rxjs.BehaviorSubject('');
        this.titleSuffix = new rxjs.BehaviorSubject('');
        this.modalData = new rxjs.BehaviorSubject({});
        this.component = new rxjs.BehaviorSubject(undefined);
        this.isDismissButtonVisible = new rxjs.BehaviorSubject(false);
        this.buttons = new rxjs.BehaviorSubject([]);
    }
    FundamentalModalManagerService.prototype.init = function () {
        this.modalData.next(this.modalRef.data.modalData);
        this.component.next(this.modalRef.data.component);
        this.buttons.next(this.modalRef.data.templateConfig.buttons || []);
        this.title.next(this.modalRef.data.templateConfig.title || '');
        this.titleSuffix.next(this.modalRef.data.templateConfig.titleSuffix || '');
        this.isDismissButtonVisible.next(this.modalRef.data.templateConfig.isDismissButtonVisible);
    };
    // getters
    FundamentalModalManagerService.prototype.getComponent = function () {
        return this.component.asObservable();
    };
    FundamentalModalManagerService.prototype.getTitle = function () {
        return this.title.asObservable();
    };
    FundamentalModalManagerService.prototype.getTitleSuffix = function () {
        return this.titleSuffix.asObservable();
    };
    FundamentalModalManagerService.prototype.getButtons = function () {
        return this.buttons.asObservable();
    };
    FundamentalModalManagerService.prototype.getModalData = function () {
        return this.modalData.asObservable();
    };
    FundamentalModalManagerService.prototype.getIsDismissButtonVisible = function () {
        return this.isDismissButtonVisible.asObservable();
    };
    // header dismiss button
    FundamentalModalManagerService.prototype.setDismissButtonVisibility = function (isVisible) {
        this.isDismissButtonVisible.next(isVisible);
    };
    FundamentalModalManagerService.prototype.setTitle = function (title) {
        this.title.next(title);
    };
    /**
     * Use this method for adding only one button.
     *
     * NOTE: For multiple buttons use `addButtons`.
     */
    FundamentalModalManagerService.prototype.addButton = function (button) {
        var _this = this;
        this.getButtonsValue().subscribe(function (buttons) {
            var payload = __spreadArrays(buttons, [button]);
            _this.buttons.next(payload);
        });
    };
    FundamentalModalManagerService.prototype.addButtons = function (buttons) {
        var _this = this;
        this.getButtonsValue().subscribe(function (currentButtons) {
            var payload = __spreadArrays(currentButtons, buttons);
            _this.buttons.next(payload);
        });
    };
    FundamentalModalManagerService.prototype.removeButton = function (id) {
        var _this = this;
        this.getButtonsValue().subscribe(function (buttons) {
            var payload = buttons.filter(function (button) { return button.id !== id; });
            _this.buttons.next(payload);
        });
    };
    FundamentalModalManagerService.prototype.removeAllButtons = function () {
        this.buttons.next([]);
    };
    FundamentalModalManagerService.prototype.disableButton = function (id) {
        var _this = this;
        this.getButtonsValue().subscribe(function (buttons) {
            var payload = buttons.map(function (button) {
                return button.id === id ? __assign(__assign({}, button), { disabled: true }) : button;
            });
            _this.buttons.next(payload);
        });
    };
    FundamentalModalManagerService.prototype.setDismissCallback = function (callback) {
        this.dismissCallback = callback;
    };
    FundamentalModalManagerService.prototype.enableButton = function (id) {
        var _this = this;
        this.getButtonsValue().subscribe(function (buttons) {
            var payload = buttons.map(function (button) {
                return button.id === id ? __assign(__assign({}, button), { disabled: false }) : button;
            });
            _this.buttons.next(payload);
        });
    };
    FundamentalModalManagerService.prototype.onButtonClicked = function (button) {
        var _this = this;
        var callbackReturnedObservable = button.callback
            ? button.callback()
            : rxjs.of(null);
        if (button.action !== exports.FundamentalModalButtonAction.None) {
            callbackReturnedObservable.subscribe(function (data) {
                return button.action === exports.FundamentalModalButtonAction.Close
                    ? _this.close(data)
                    : _this.dismiss(data);
            });
        }
    };
    FundamentalModalManagerService.prototype.close = function (data) {
        this.modalRef.close(data);
    };
    FundamentalModalManagerService.prototype.dismiss = function (data) {
        var _this = this;
        this.dismissCallback()
            .then(function () { return _this.modalRef.dismiss(data); })
            .catch(lodash.noop);
    };
    FundamentalModalManagerService.prototype.getButtonsValue = function () {
        return this.buttons.pipe(operators.take(1));
    };
    FundamentalModalManagerService.prototype.dismissCallback = function () {
        return Promise.resolve();
    };
    FundamentalModalManagerService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [core$2.ModalRef])
    ], FundamentalModalManagerService);
    return FundamentalModalManagerService;
}());

var FundamentalModalTemplateComponent = /** @class */ (function () {
    function FundamentalModalTemplateComponent(modalManager, cdr) {
        this.modalManager = modalManager;
        this.cdr = cdr;
        this.component$ = this.modalManager.getComponent();
        this.title$ = this.modalManager.getTitle();
        this.titleSuffix$ = this.modalManager.getTitleSuffix();
        this.isDismissButtonVisible$ = this.modalManager.getIsDismissButtonVisible();
        this.buttons$ = this.modalManager.getButtons();
    }
    FundamentalModalTemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modalManager.init();
        this.buttonsSubscription = this.buttons$.subscribe(function (value) {
            _this.buttons = value;
            // For some consumere, adding buttons can result in not properly rendered view
            _this.cdr.detectChanges();
        });
    };
    FundamentalModalTemplateComponent.prototype.ngOnDestroy = function () {
        if (this.buttonsSubscription) {
            this.buttonsSubscription.unsubscribe();
        }
    };
    FundamentalModalTemplateComponent.prototype.onButtonClicked = function (button) {
        this.modalManager.onButtonClicked(button);
    };
    FundamentalModalTemplateComponent.prototype.dismiss = function () {
        this.modalManager.dismiss();
    };
    FundamentalModalTemplateComponent = __decorate([
        core.Component({
            selector: 'fundamental-modal-template',
            encapsulation: core.ViewEncapsulation.None,
            providers: [FundamentalModalManagerService],
            styles: [
                "\n            .fd-modal__title {\n                min-height: 20px;\n            }\n        "
            ],
            template: "\n        <fd-modal-header>\n            <h1 fd-modal-title id=\"fd-modal-title-{{ (title$ | async) || '' }}\">\n                {{ (title$ | async) || '' | translate }}\n                {{ (titleSuffix$ | async) || '' | translate }}\n            </h1>\n            <button\n                fd-modal-close-btn\n                *ngIf=\"isDismissButtonVisible$ | async\"\n                (click)=\"dismiss()\"\n            ></button>\n        </fd-modal-header>\n        <fd-modal-body>\n            <ng-container *ngIf=\"component$ | async as component\">\n                <ng-container *ngComponentOutlet=\"component\"></ng-container>\n            </ng-container>\n        </fd-modal-body>\n        <fd-modal-footer *ngIf=\"buttons && buttons.length > 0\">\n            <button\n                *ngFor=\"let button of buttons\"\n                [disabled]=\"button.disabledFn ? button.disabledFn!() : button.disabled\"\n                [options]=\"button.style\"\n                [attr.id]=\"button.id\"\n                (click)=\"onButtonClicked(button)\"\n                fd-button\n            >\n                {{ button.label | translate }}\n            </button>\n        </fd-modal-footer>\n    "
        }),
        __metadata("design:paramtypes", [FundamentalModalManagerService,
            core.ChangeDetectorRef])
    ], FundamentalModalTemplateComponent);
    return FundamentalModalTemplateComponent;
}());

var FundamentalModalTemplateModule = /** @class */ (function () {
    function FundamentalModalTemplateModule() {
    }
    FundamentalModalTemplateModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, core$2.ModalModule, core$2.ButtonModule, TranslationModule.forChild()],
            declarations: [FundamentalModalTemplateComponent],
            entryComponents: [FundamentalModalTemplateComponent],
            exports: [FundamentalModalTemplateComponent]
        })
    ], FundamentalModalTemplateModule);
    return FundamentalModalTemplateModule;
}());

var ModalService = /** @class */ (function () {
    function ModalService(fundamentalModalService) {
        this.fundamentalModalService = fundamentalModalService;
    }
    ModalService.prototype.open = function (options) {
        var templateConfig = options.templateConfig;
        return !!templateConfig
            ? this.openWithTemplate(options)
            : this.openStandalone(options);
    };
    ModalService.prototype.openStandalone = function (options) {
        var _a = options.config, config = _a === void 0 ? {} : _a, component = options.component, data = options.data;
        return this.fundamentalModalService.open(component, __assign(__assign({}, config), { data: data }));
    };
    ModalService.prototype.openWithTemplate = function (options) {
        var _a = options.config, config = _a === void 0 ? {} : _a, _b = options.templateConfig, templateConfig = _b === void 0 ? {} : _b, component = options.component, data = options.data;
        var settings = __assign(__assign({}, config), { data: {
                templateConfig: templateConfig,
                component: component,
                modalData: data
            } });
        return this.fundamentalModalService.open(FundamentalModalTemplateComponent, settings);
    };
    ModalService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [core$2.ModalService])
    ], ModalService);
    return ModalService;
}());

var Alert = /** @class */ (function () {
    function Alert(_alertConf, ALERT_CONFIG_DEFAULTS, fundamentalAlertService, translateService) {
        this._alertConf = _alertConf;
        this.fundamentalAlertService = fundamentalAlertService;
        this.translateService = translateService;
        this._displayed = false;
        lodash.defaultsDeep(this._alertConf, lodash.cloneDeep(ALERT_CONFIG_DEFAULTS));
    }
    Object.defineProperty(Alert.prototype, "alertConf", {
        get: function () {
            return this._alertConf;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "message", {
        get: function () {
            return this._alertConf.message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "type", {
        get: function () {
            return this._alertConf.type;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Displays the alert to the user.
     */
    Alert.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, content;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isDisplayed()) {
                            return [2 /*return*/];
                        }
                        if (!this._alertConf.message) return [3 /*break*/, 2];
                        _a = this._alertConf;
                        return [4 /*yield*/, this.translateService
                                .get(this._alertConf.message, this._alertConf.messagePlaceholders)
                                .toPromise()];
                    case 1:
                        _a.message = _b.sent();
                        _b.label = 2;
                    case 2:
                        content = typeof this._alertConf.message !== 'undefined'
                            ? this._alertConf.message
                            : this._alertConf.component || '';
                        this._alertRef = this.fundamentalAlertService.open(content, this._alertConf);
                        this._alertRef.afterDismissed.subscribe(function () { return (_this._displayed = false); });
                        this._displayed = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Hides the alert if it is currently being displayed to the user.
     */
    Alert.prototype.hide = function () {
        if (!this.isDisplayed()) {
            return;
        }
        this._alertRef.dismiss();
    };
    Alert.prototype.isDisplayed = function () {
        return this._displayed;
    };
    return Alert;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var ALERT_CONFIG_DEFAULTS_TOKEN = new core.InjectionToken('alertConfigToken');
var ALERT_CONFIG_DEFAULTS = {
    data: {},
    type: exports.IAlertServiceType.INFO,
    dismissible: true,
    duration: 3000,
    width: '500px'
};

/**
 * @ngdoc service
 * @name @smartutils.services:AlertFactory
 *
 * @description
 * The alertFactory allows you to create an instances of type Alert.<br />
 * When possible, it is better to use {@link @smartutils.services:AlertService AlertService} to show alerts.<br />
 * This factory is useful when one of the Alert class methods is needed, like
 * hide() or isDisplayed(), or if you want to create a single instance and hide/show when necessary.
 */
var AlertFactory = /** @class */ (function () {
    function AlertFactory(fundamentalAlertService, translateService, ALERT_CONFIG_DEFAULTS) {
        this.fundamentalAlertService = fundamentalAlertService;
        this.translateService = translateService;
        this.ALERT_CONFIG_DEFAULTS = ALERT_CONFIG_DEFAULTS;
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertFactory#createAlert
     * @methodOf @smartutils.services:AlertFactory
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance
     */
    AlertFactory.prototype.createAlert = function (alertConf) {
        var config = this.getAlertConfig(alertConf);
        return this.createAlertObject(config);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertFactory#createInfo
     * @methodOf @smartutils.services:AlertFactory
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance with type set to INFO
     */
    AlertFactory.prototype.createInfo = function (alertConf) {
        var config = this.getAlertConfig(alertConf, exports.IAlertServiceType.INFO);
        return this.createAlertObject(config);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertFactory#createDanger
     * @methodOf @smartutils.services:AlertFactory
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance with type set to DANGER
     */
    AlertFactory.prototype.createDanger = function (alertConf) {
        var config = this.getAlertConfig(alertConf, exports.IAlertServiceType.DANGER);
        return this.createAlertObject(config);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertFactory#createWarning
     * @methodOf @smartutils.services:AlertFactory
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance with type set to WARNING
     */
    AlertFactory.prototype.createWarning = function (alertConf) {
        var config = this.getAlertConfig(alertConf, exports.IAlertServiceType.WARNING);
        return this.createAlertObject(config);
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertFactory#createSuccess
     * @methodOf @smartutils.services:AlertFactory
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance with type set to SUCCESS
     */
    AlertFactory.prototype.createSuccess = function (alertConf) {
        var config = this.getAlertConfig(alertConf, exports.IAlertServiceType.SUCCESS);
        return this.createAlertObject(config);
    };
    AlertFactory.prototype.getAlertConfig = function (strOrConf, type) {
        if (typeof strOrConf === 'string') {
            return {
                message: strOrConf,
                type: type || exports.IAlertServiceType.INFO
            };
        }
        if (!strOrConf.type) {
            strOrConf.type = type || exports.IAlertServiceType.INFO;
        }
        return strOrConf;
    };
    AlertFactory.prototype.createAlertObject = function (alertConf) {
        return new Alert(alertConf, this.ALERT_CONFIG_DEFAULTS, this.fundamentalAlertService, this.translateService);
    };
    AlertFactory = __decorate([
        core.Injectable(),
        __param(2, core.Inject(ALERT_CONFIG_DEFAULTS_TOKEN)),
        __metadata("design:paramtypes", [core$2.AlertService,
            core$1.TranslateService,
            core$2.AlertConfig])
    ], AlertFactory);
    return AlertFactory;
}());

/**
 * @ngdoc service
 * @name @smartutils.services:AlertService
 */
var AlertService = /** @class */ (function () {
    function AlertService(alertFactory) {
        this.alertFactory = alertFactory;
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertService#showAlert
     * @methodOf @smartutils.services:AlertService
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @description
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
    AlertService.prototype.showAlert = function (alertConf) {
        var alert = this.alertFactory.createAlert(alertConf);
        alert.show();
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertService#showInfo
     * @methodOf @smartutils.services:AlertService
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @description
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
    AlertService.prototype.showInfo = function (alertConf) {
        var alert = this.alertFactory.createInfo(alertConf);
        alert.show();
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertService#showDanger
     * @methodOf @smartutils.services:AlertService
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @description
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
    AlertService.prototype.showDanger = function (alertConf) {
        var alert = this.alertFactory.createDanger(alertConf);
        alert.show();
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertService#showWarning
     * @methodOf @smartutils.services:AlertService
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @description
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
    AlertService.prototype.showWarning = function (alertConf) {
        var alert = this.alertFactory.createWarning(alertConf);
        alert.show();
    };
    /**
     * @ngdoc method
     * @name @smartutils.services:AlertService#showSuccess
     * @methodOf @smartutils.services:AlertService
     * @param {string | Object} alertConf The alert's configuration {@link @smartutils.interfaces:IAlertConfig IAlertConfig}
     * @description
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
    AlertService.prototype.showSuccess = function (alertConf) {
        var alert = this.alertFactory.createSuccess(alertConf);
        alert.show();
    };
    AlertService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [AlertFactory])
    ], AlertService);
    return AlertService;
}());

var AlertModule = /** @class */ (function () {
    function AlertModule() {
    }
    AlertModule = __decorate([
        core.NgModule({
            imports: [core$2.AlertModule, TranslationModule],
            providers: [
                {
                    provide: ALERT_CONFIG_DEFAULTS_TOKEN,
                    useValue: ALERT_CONFIG_DEFAULTS
                },
                AlertService,
                AlertFactory
            ]
        })
    ], AlertModule);
    return AlertModule;
}());

var FileReaderService = /** @class */ (function () {
    function FileReaderService() {
    }
    FileReaderService.prototype.read = function (file, config) {
        var fileReader = new FileReader();
        if (config === null || config === void 0 ? void 0 : config.onError) {
            fileReader.onerror = config.onError;
        }
        if (config === null || config === void 0 ? void 0 : config.onLoadEnd) {
            fileReader.onloadend = config.onLoadEnd;
        }
        fileReader.readAsArrayBuffer(file);
        return fileReader;
    };
    FileReaderService = __decorate([
        core.Injectable()
    ], FileReaderService);
    return FileReaderService;
}());

var FileMimeTypeService = /** @class */ (function () {
    function FileMimeTypeService(fileReaderService, settingsService) {
        this.fileReaderService = fileReaderService;
        this.settingsService = settingsService;
    }
    FileMimeTypeService.prototype.isFileMimeTypeValid = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, mimeTypesError, mimeTypes;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, promiseUtils.attempt(this.settingsService.getStringList('smartedit.validImageMimeTypeCodes'))];
                    case 1:
                        _a = _b.sent(), mimeTypesError = _a.error, mimeTypes = _a.data;
                        if (mimeTypesError) {
                            reject(false);
                            return [2 /*return*/];
                        }
                        this.fileReaderService.read(file, {
                            onLoadEnd: function (ev) {
                                if (!_this.validateMimeTypeFromFile(ev.target.result, mimeTypes)) {
                                    reject();
                                    return;
                                }
                                resolve(true);
                            },
                            onError: function () {
                                reject();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     *  Mimetype is valid when starting bytes of the file are matching the Mimetype byte pattern.
     *  For example. 89 50 4E 47 is a png file, so if the first 4 bytes are 89504E47 it is recognized as a png file.
     *
     *  Read more on File Signatures and Image Type Pattern Matching
     *  - https://en.wikipedia.org/wiki/List_of_file_signatures
     *  - https://mimesniff.spec.whatwg.org/#image-type-pattern-matching-algorithm
     */
    FileMimeTypeService.prototype.validateMimeTypeFromFile = function (loadedFile, mimeTypes) {
        var fileAsBytes = new Uint8Array(loadedFile).subarray(0, 8);
        var header = fileAsBytes.reduce(function (head, byte) {
            var byteAsStr = byte.toString(16);
            if (byteAsStr.length === 1) {
                byteAsStr = '0' + byteAsStr;
            }
            head += byteAsStr;
            return head;
        }, '');
        return mimeTypes.some(function (mimeTypeCode) { return header.toLowerCase().indexOf(mimeTypeCode.toLowerCase()) === 0; });
    };
    FileMimeTypeService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [FileReaderService,
            ISettingsService])
    ], FileMimeTypeService);
    return FileMimeTypeService;
}());

/** Used to build a validator for a specified list of file validator. */
var FileValidatorFactory = /** @class */ (function () {
    function FileValidatorFactory() {
    }
    /**
     * Builds a new validator for a specified list of validator objects.
     * Each validator object must consist of a parameter to validate, a predicate function to run against the value and
     * a message to associate with this predicate function's fail case.
     *
     * For example, the resulting Object Validator has a validate method that takes two parameters:
     * an Object to validate against and an optional Contextual Error List to append errors to.
     *
     * ```
     *      const validators = [{
     *          subject: 'code',
     *          validate: function(code) {
     *              return code !== 'Invalid';
     *          },
     *          message: 'Code must not be "Invalid"'
     *      }]
     *
     *      const validator = fileValidatorFactory.build(validators);
     *      const errorsContext = []
     *      const objectUnderValidation = {
     *          code: 'Invalid'
     *      };
     *      const isValid = validator.validate(objectUnderValidation, errorsContext);
     * ```
     *
     * The result of the above code block would be that isValid is false because it failed the predicate function of
     * the single validator in the validator list and the errorsContext would be as follows:
     *
     * ```
     *      [{
     *          subject: 'code',
     *          message: 'Code must not be "Invalid"'
     *      }]
     * ```
     *
     * @param validators A list of validator objects as specified above.
     * @returns A validator that consists of a validate function.
     */
    FileValidatorFactory.prototype.build = function (validators) {
        var _this = this;
        return {
            validate: function (objectUnderValidation, errorsContext) {
                return _this.validate(validators, objectUnderValidation, errorsContext);
            }
        };
    };
    FileValidatorFactory.prototype.validate = function (validators, objectUnderValidation, errorsContext) {
        errorsContext = errorsContext || [];
        validators.forEach(function (validator) {
            var valueToValidate = objectUnderValidation[validator.subject];
            if (!validator.validate(valueToValidate)) {
                errorsContext.push({
                    subject: validator.subject,
                    message: validator.message
                });
            }
        });
        return errorsContext.length === 0;
    };
    return FileValidatorFactory;
}());

var FILE_VALIDATION_CONFIG = {
    /** A list of file types supported by the platform. */
    ACCEPTED_FILE_TYPES: ['jpeg', 'jpg', 'gif', 'bmp', 'tiff', 'tif', 'png'],
    /** The maximum size, in bytes, for an uploaded file. */
    MAX_FILE_SIZE_IN_BYTES: 20 * 1024 * 1024,
    /** A map of all the internationalization keys used by the file validation service. */
    I18N_KEYS: {
        FILE_TYPE_INVALID: 'se.upload.file.type.invalid',
        FILE_SIZE_INVALID: 'se.upload.file.size.invalid'
    }
};
/**
 * Validates if a specified file meets the required file type and file size constraints of SAP Hybris Commerce.
 */
var FileValidationService = /** @class */ (function () {
    function FileValidationService(fileMimeTypeService, fileValidatorFactory) {
        this.fileMimeTypeService = fileMimeTypeService;
        this.fileValidatorFactory = fileValidatorFactory;
        this.validators = [
            {
                subject: 'size',
                message: FILE_VALIDATION_CONFIG.I18N_KEYS.FILE_SIZE_INVALID,
                validate: function (size) {
                    return size <= FILE_VALIDATION_CONFIG.MAX_FILE_SIZE_IN_BYTES;
                }
            }
        ];
    }
    /**
     * Transforms the supported file types into a comma separated list of file type extensions.
     *
     * @returns A comma-separated list of supported file type extensions
     */
    FileValidationService.prototype.buildAcceptedFileTypesList = function () {
        return FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES.map(function (fileType) { return "." + fileType; }).join(',');
    };
    /**
     * Validates the specified file object against custom validator and its mimetype.
     * It appends the errors to the error context array provided or it creates a new error context array.
     *
     * @param file The web API file object to be validated.
     * @param context The contextual error array to append the errors to. It is an output parameter.
     * @returns A promise that resolves if the file is valid otherwise it rejects with a list of errors.
     */
    FileValidationService.prototype.validate = function (file, errorsContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.fileValidatorFactory.build(this.validators).validate(file, errorsContext);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fileMimeTypeService.isFileMimeTypeValid(file)];
                    case 2:
                        _b.sent();
                        if (errorsContext.length > 0) {
                            return [2 /*return*/, Promise.reject(errorsContext)];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        errorsContext.push({
                            subject: 'type',
                            message: FILE_VALIDATION_CONFIG.I18N_KEYS.FILE_TYPE_INVALID
                        });
                        return [2 /*return*/, Promise.reject(errorsContext)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileValidationService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [FileMimeTypeService,
            FileValidatorFactory])
    ], FileValidationService);
    return FileValidationService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */
/**
 * Event payload when a property changes.
 */
var InputPropertyChange = /** @class */ (function () {
    function InputPropertyChange(key, value) {
        this.key = key;
        this.value = value;
    }
    return InputPropertyChange;
}());
/**
 * Used for storing component input values for the dynamic component. The values
 * are set onto the dynamic component's properties that are decorated by the @DynamicInput()
 * decorator. Values can be retrieved or set programmatically by the form element's 'input'
 * property.
 */
var InputProperties = /** @class */ (function () {
    function InputProperties(object) {
        if (object === void 0) { object = {}; }
        this.changes = new rxjs.Subject();
        this._map = new Map(lodash.toPairs(object));
    }
    /**
     * Get a property.
     *
     * @param {keyof T} key
     * @returns {T[keyof T] | undefined} value
     */
    InputProperties.prototype.get = function (key) {
        return this._map.get(key);
    };
    /**
     * Setting a property.
     *
     * @param {keyof T} key
     * @param {T[keyof T]} value
     * @param {boolean} emit If emit is set to false. It will not emit changes to the
     * the component for those observing for property changes.
     */
    InputProperties.prototype.set = function (key, value, emit) {
        if (emit === void 0) { emit = true; }
        this._map.set(key, value);
        if (emit) {
            this.changes.next(new InputPropertyChange(key, value));
        }
    };
    return InputProperties;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * ValidatorParameters holds data to the synchronous and
 * asynchronous validators configuration for a FormField.
 */
var ValidatorParameters = /** @class */ (function () {
    function ValidatorParameters(validators, asyncValidators) {
        if (validators === void 0) { validators = {}; }
        if (asyncValidators === void 0) { asyncValidators = {}; }
        this.validators = {};
        this.asyncValidators = {};
        this.validators = this._omitUndefinedValues(validators);
        this.asyncValidators = this._omitUndefinedValues(asyncValidators);
    }
    /**
     * Determines if synchronous validator exists.
     *
     * @param name The name of the synchronous validator.
     * @returns A boolean if it has that parameter.
     */
    ValidatorParameters.prototype.has = function (name) {
        return this.validators.hasOwnProperty(name);
    };
    /**
     * Returns parameters of the synchronous validator.
     *
     * @param name The name of the synchronous validator.
     * @returns The param of the validator.
     */
    ValidatorParameters.prototype.get = function (name) {
        if (!this.has(name)) {
            return null;
        }
        return this.validators[name];
    };
    /**
     * Determines if asynchronous validator exists.
     *
     * @param name The name of the asynchronous validator.
     * @returns A boolean if it has that parameter.
     */
    ValidatorParameters.prototype.hasAsync = function (name) {
        return this.asyncValidators.hasOwnProperty(name);
    };
    /**
     * Returns parameters of the asynchronous validator.
     *
     * @param name The name of the asynchronous validator.
     * @returns The param of the validator.
     */
    ValidatorParameters.prototype.getAsync = function (name) {
        if (!this.hasAsync(name)) {
            return null;
        }
        return this.asyncValidators[name];
    };
    /**
     * @internal
     * Returns a object with all those keys that have
     * undefined values.
     */
    ValidatorParameters.prototype._omitUndefinedValues = function (object) {
        return lodash.omitBy(object, lodash.isUndefined);
    };
    return ValidatorParameters;
}());

/**
 * A leaf node of forms.
 */
var FormField = /** @class */ (function (_super) {
    __extends(FormField, _super);
    function FormField(value, validatorOrOpts, _a) {
        if (value === void 0) { value = {}; }
        if (validatorOrOpts === void 0) { validatorOrOpts = {}; }
        var component = _a.component, _b = _a.inputs, inputs = _b === void 0 ? new InputProperties() : _b, _c = _a.validatorParams, validatorParams = _c === void 0 ? new ValidatorParameters() : _c, _d = _a.persist, persist = _d === void 0 ? true : _d;
        var _this = _super.call(this, value, validatorOrOpts) || this;
        _this.component = component;
        _this.inputs = inputs;
        _this.inputChanges = inputs.changes;
        _this.validatorParams = validatorParams;
        _this.persist = persist;
        return _this;
    }
    /**
     * @inheritdoc
     * @param key
     * @param value
     */
    FormField.prototype.setInput = function (key, value) {
        this.inputs.set(key, value);
    };
    /**
     * @inheritdoc
     * @param key
     */
    FormField.prototype.getInput = function (key) {
        return this.inputs.get(key);
    };
    /**
     * @inheritdoc
     * @return any
     */
    FormField.prototype.getPersistedValue = function () {
        if (!this.persist) {
            return undefined;
        }
        return this.value === undefined ? null : this.value;
    };
    return FormField;
}(forms.FormControl));

/**
 * A FormGrouping is used to encapsulate form data
 * of objects.
 */
var FormGrouping = /** @class */ (function (_super) {
    __extends(FormGrouping, _super);
    function FormGrouping(controls, validatorOrOpts, _a) {
        if (validatorOrOpts === void 0) { validatorOrOpts = {}; }
        var component = _a.component, _b = _a.inputs, inputs = _b === void 0 ? new InputProperties() : _b, _c = _a.validatorParams, validatorParams = _c === void 0 ? new ValidatorParameters() : _c, _d = _a.persist, persist = _d === void 0 ? true : _d;
        var _this = _super.call(this, controls, validatorOrOpts) || this;
        _this.component = component;
        _this.inputs = inputs;
        _this.inputChanges = inputs.changes;
        _this.validatorParams = validatorParams;
        _this.persist = persist;
        return _this;
    }
    /**
     * @inheritdoc
     * @param {keyof T} key
     * @param {T[keyof T]} value
     */
    FormGrouping.prototype.setInput = function (key, value) {
        this.inputs.set(key, value);
    };
    /**
     * @inheritdoc
     * @param {keyof T} key
     * @returns {T[keyof T] | undefined}
     */
    FormGrouping.prototype.getInput = function (key) {
        return this.inputs.get(key);
    };
    /**
     * Manually sets nested errors to each FormControl.
     *
     * Note: Method should be called on the next rendering cycle and not on the initialization of the form. Should be
     * used to enforce backend validation.
     *
     * @param errors
     */
    FormGrouping.prototype.setNestedErrors = function (errors) {
        var _this = this;
        if (errors === void 0) { errors = []; }
        errors.forEach(function (_a) {
            var path = _a[0], validationErrors = _a[1];
            var form = _this.get(path);
            /**
             * Fail if the form does not exist.
             */
            if (!form) {
                throw new Error("FormGrouping - Path not found when setting nested error: " + path);
            }
            form.setErrors(validationErrors);
        });
    };
    /**
     * @inheritdoc
     * @return any
     */
    FormGrouping.prototype.getPersistedValue = function () {
        var _this = this;
        return Object.keys(this.controls).reduce(function (acc, key) {
            var child = _this.controls[key];
            /**
             * Look ahead and if nested does not want to be mapped, merge the nested object with
             * the current object.
             *
             * If it's a field, then it's undefined.
             *
             * If it's a group, then it will be merged.
             */
            if (!child.persist) {
                return __assign(__assign({}, acc), child.getPersistedValue());
            }
            acc[key] = child.getPersistedValue();
            return acc;
        }, {});
    };
    return FormGrouping;
}(forms.FormGroup));

var FormList = /** @class */ (function (_super) {
    __extends(FormList, _super);
    function FormList(controls, validatorOrOpts, _a) {
        if (validatorOrOpts === void 0) { validatorOrOpts = {}; }
        var component = _a.component, _b = _a.inputs, inputs = _b === void 0 ? new InputProperties() : _b, _c = _a.validatorParams, validatorParams = _c === void 0 ? new ValidatorParameters() : _c, _d = _a.persist, persist = _d === void 0 ? true : _d;
        var _this = _super.call(this, controls, validatorOrOpts) || this;
        _this.component = component;
        _this.inputs = inputs;
        _this.inputChanges = inputs.changes;
        _this.validatorParams = validatorParams;
        _this.persist = persist;
        return _this;
    }
    /**
     * @inheritdoc
     * @param key
     * @param value
     */
    FormList.prototype.setInput = function (key, value) {
        this.inputs.set(key, value);
    };
    /**
     * @inheritdoc
     * @param key
     */
    FormList.prototype.getInput = function (key) {
        return this.inputs.get(key);
    };
    /**
     * @inheritdoc
     * @override
     */
    FormList.prototype.getPersistedValue = function () {
        return this.controls.reduce(function (acc, child) {
            if (!child.persist) {
                /**
                 * Look ahead and merge the values of the
                 * nested group, array or field.
                 *
                 * If it's a field, the values of the field
                 * would be an empty array, because it's not an object.
                 */
                return acc.concat(lodash.values(child.getPersistedValue()));
            }
            acc.push(child.getPersistedValue());
            return acc;
        }, []);
    };
    /**
     * The size of the list.
     */
    FormList.prototype.size = function () {
        return this.controls.length;
    };
    /**
     * Swaps a form element in the array.
     *
     * @param a The index of form a.
     * @param b The index of form b.
     */
    FormList.prototype.swapFormElements = function (a, b) {
        if (!this._isInBounds(a) || !this._isInBounds(b) || a === b) {
            return;
        }
        /**
         * Swapping control's array.
         */
        var control = this.at(a);
        this.insert(a, this.at(b));
        this.insert(b, control);
    };
    /**
     * Moves a form element in the array to a new position.
     *
     * @param from The previous index.
     * @param to The targeted index.
     */
    FormList.prototype.moveFormElement = function (from, to) {
        if (!this._isInBounds(from) || !this._isInBounds(to) || from === to) {
            return;
        }
        var delta = to < from ? -1 : 1;
        var tempControl = this.at(from);
        for (var i = from; i !== to; i += delta) {
            var position = i + delta;
            this.setControl(i, this.at(position));
        }
        this.setControl(to, tempControl);
    };
    /**
     * Checks of the index is in bounds.
     *
     * @internal
     * @param index
     */
    FormList.prototype._isInBounds = function (index) {
        return index < this.controls.length && index >= 0;
    };
    return FormList;
}(forms.FormArray));

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @internal
 * Internal property on the constructor used for adding decorator metadata
 * so that it can be later picked up after component compilation.
 */
var FORM_PROP = Symbol('_form_prop_');
/**
 * Base data PropDecorator.
 * @internal
 */
var PropDecorator = /** @class */ (function () {
    function PropDecorator(property) {
        this.property = property;
    }
    return PropDecorator;
}());
/**
 * @internal
 */
var InputPropDecorator = /** @class */ (function (_super) {
    __extends(InputPropDecorator, _super);
    function InputPropDecorator(property, alias) {
        var _this = _super.call(this, property) || this;
        _this.alias = alias ? alias : _this.property;
        return _this;
    }
    return InputPropDecorator;
}(PropDecorator));
/**
 * @internal
 */
var FormPropDecorator = /** @class */ (function (_super) {
    __extends(FormPropDecorator, _super);
    function FormPropDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FormPropDecorator;
}(PropDecorator));
/**
 * Used for tagging dynamic inputs and adding them to the FORM_PROP property
 * of the target constructor.
 */
function makePropertyDecorator(factory) {
    return function (target, key) {
        var ctor = target.constructor;
        if (!ctor[FORM_PROP]) {
            ctor[FORM_PROP] = [];
        }
        ctor[FORM_PROP].push(factory(key));
    };
}
/**
 * Injects the AbstractForm for the dynamic form component.
 */
function DynamicForm() {
    return makePropertyDecorator(function (key) { return new FormPropDecorator(key); });
}
/**
 * Injects a property of the AbstractForm for the dynamic form component.
 * Inputs are assigned from the FormSchema's 'inputs' property.
 * NOTE:
 * Property values are only available ngOnInit or onDynamicInputChange.
 * @param alias Use this alias to target a property of the AbstractForm. Defaults
 * to the assigned class property.
 * @example
 * <pre>
 *     @Component({ ... })
 *     export class DynamicFormComponent {
 *         @DynamicInput()
 *         property: string
 *     }
 * <pre>
 */
var DynamicInput = function (alias) {
    if (alias === void 0) { alias = null; }
    return makePropertyDecorator(function (key) { return new InputPropDecorator(key, alias); });
};

var FormListerComponent = /** @class */ (function () {
    function FormListerComponent() {
    }
    Object.defineProperty(FormListerComponent.prototype, "forms", {
        get: function () {
            return lodash.values(this.form.controls);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        DynamicForm(),
        __metadata("design:type", FormGrouping)
    ], FormListerComponent.prototype, "form", void 0);
    FormListerComponent = __decorate([
        core.Component({
            selector: 'form-lister',
            styles: [
                "\n            :host {\n                display: block;\n            }\n        "
            ],
            template: "<ng-template [formRenderer]=\"form\" *ngFor=\"let form of forms\"></ng-template>"
        })
    ], FormListerComponent);
    return FormListerComponent;
}());

/**
 * @internal
 * Trigger property changes for the component and mark for check
 * for those components that have onPush change detection strategy.
 *
 * @param {ComponentRef<any>} componentRef
 */
var onChange = function (_a) {
    var changeDetectorRef = _a.changeDetectorRef, instance = _a.instance;
    instance.onDynamicInputChange && instance.onDynamicInputChange();
    changeDetectorRef.markForCheck();
};
/**
 * @internal
 * Decorates the components with the decorators that were put into places.
 * The idea is made similar to how Angular decorates their properties with inputs.
 */
var decorate = function (componentRef, form) {
    var instance = componentRef.instance;
    var decorators = instance.constructor[FORM_PROP];
    if (!Array.isArray(decorators)) {
        return new rxjs.Subscription();
    }
    var props = new Map();
    decorators.forEach(function (decorator) {
        var property = decorator.property;
        if (decorator instanceof InputPropDecorator) {
            var alias = decorator.alias;
            if (form.getInput(alias) === undefined && instance[property] !== undefined) {
                form.setInput(alias, instance[property]);
            }
            instance[property] = form.getInput(alias);
            props.set(alias, decorator);
        }
        else if (decorator instanceof FormPropDecorator) {
            instance[property] = form;
        }
    });
    onChange(componentRef);
    return form.inputChanges.subscribe(function (_a) {
        var key = _a.key, value = _a.value;
        var decorator = props.get(key);
        if (!decorator) {
            return;
        }
        instance[decorator.property] = value;
        onChange(componentRef);
    });
};

var FormRendererDirective = /** @class */ (function () {
    function FormRendererDirective(componentFactoryResolver, viewContainerRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(FormRendererDirective.prototype, "form", {
        set: function (form) {
            this._dispose();
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(form.component);
            // Create and decorate the component's inputs.
            var componentRef = this.viewContainerRef.createComponent(componentFactory);
            this._subscription = decorate(componentRef, form);
        },
        enumerable: false,
        configurable: true
    });
    FormRendererDirective.prototype.ngOnDestroy = function () {
        this._dispose();
    };
    /**
     * @internal
     * Clear all views and unsubscribe to streams.
     */
    FormRendererDirective.prototype._dispose = function () {
        this._subscription && this._subscription.unsubscribe();
        this.viewContainerRef.clear();
    };
    __decorate([
        core.Input('formRenderer'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FormRendererDirective.prototype, "form", null);
    FormRendererDirective = __decorate([
        core.Directive({
            selector: '[formRenderer]'
        }),
        __metadata("design:paramtypes", [core.ComponentFactoryResolver,
            core.ViewContainerRef])
    ], FormRendererDirective);
    return FormRendererDirective;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var COMPONENT_MAP = new core.InjectionToken('COMPONENT_MAP');
var ASYNC_VALIDATOR_MAP = new core.InjectionToken('ASYNC_VALIDATOR_MAP');
var VALIDATOR_MAP = new core.InjectionToken('VALIDATOR_MAP');

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var FormBuilderModule = /** @class */ (function () {
    function FormBuilderModule() {
    }
    FormBuilderModule_1 = FormBuilderModule;
    FormBuilderModule.forRoot = function (option) {
        return {
            ngModule: FormBuilderModule_1,
            providers: [
                {
                    provide: core.ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: [option.types],
                    multi: true
                },
                {
                    provide: COMPONENT_MAP,
                    useValue: option.types
                },
                {
                    provide: VALIDATOR_MAP,
                    useValue: option.validators
                },
                {
                    provide: ASYNC_VALIDATOR_MAP,
                    useValue: option.asyncValidators
                }
            ]
        };
    };
    var FormBuilderModule_1;
    FormBuilderModule = FormBuilderModule_1 = __decorate([
        core.NgModule({
            imports: [common.CommonModule, forms.ReactiveFormsModule],
            declarations: [FormRendererDirective, FormListerComponent],
            entryComponents: [FormListerComponent],
            exports: [FormRendererDirective]
        })
    ], FormBuilderModule);
    return FormBuilderModule;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @internal
 *
 * Generic registry for mapping keys to items.
 */
var Registry = /** @class */ (function () {
    function Registry(items) {
        if (items === void 0) { items = {}; }
        this._map = new Map(lodash.toPairs(items));
    }
    /**
     * Adds a item to the registry.
     *
     * @param {string} name
     * @param {T} item
     */
    Registry.prototype.add = function (name, item) {
        if (this._map.has(name)) {
            throw new Error(this._service + ": is overriding an element named '" + name + "' in its registry.");
        }
        this._map.set(name, item);
    };
    /**
     * Gets an a item in the registry.
     *
     * @param {string} name
     * @returns {T}
     */
    Registry.prototype.get = function (name) {
        if (!this._map.has(name)) {
            throw new Error(this._service + ": does not have '" + name + "' in its registry.");
        }
        return this._map.get(name);
    };
    Object.defineProperty(Registry.prototype, "_service", {
        /**
         * @internal
         */
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: true
    });
    return Registry;
}());

/**
 * A registry for form components.
 */
var ComponentRegistryService = /** @class */ (function (_super) {
    __extends(ComponentRegistryService, _super);
    function ComponentRegistryService(types) {
        return _super.call(this, types) || this;
    }
    ComponentRegistryService = __decorate([
        core.Injectable({
            providedIn: 'root'
        }),
        __param(0, core.Optional()),
        __param(0, core.Inject(COMPONENT_MAP)),
        __metadata("design:paramtypes", [Object])
    ], ComponentRegistryService);
    return ComponentRegistryService;
}(Registry));

/**
 * A registry for asynchronous validators.
 */
var AsyncValidatorRegistryService = /** @class */ (function (_super) {
    __extends(AsyncValidatorRegistryService, _super);
    function AsyncValidatorRegistryService(asyncValidators) {
        return _super.call(this, asyncValidators) || this;
    }
    AsyncValidatorRegistryService = __decorate([
        core.Injectable({
            providedIn: 'root'
        }),
        __param(0, core.Optional()),
        __param(0, core.Inject(ASYNC_VALIDATOR_MAP)),
        __metadata("design:paramtypes", [Object])
    ], AsyncValidatorRegistryService);
    return AsyncValidatorRegistryService;
}(Registry));

/**
 * A registry for synchronous validators.
 */
var ValidatorRegistryService = /** @class */ (function (_super) {
    __extends(ValidatorRegistryService, _super);
    function ValidatorRegistryService(validators) {
        return _super.call(this, validators) || this;
    }
    ValidatorRegistryService = __decorate([
        core.Injectable({
            providedIn: 'root'
        }),
        __param(0, core.Optional()),
        __param(0, core.Inject(VALIDATOR_MAP)),
        __metadata("design:paramtypes", [Object])
    ], ValidatorRegistryService);
    return ValidatorRegistryService;
}(Registry));

/**
 * Schema compilers service is used for compiling a schema to concrete classes for use
 * by the FormRendererDirective.
 */
var SchemaCompilerService = /** @class */ (function () {
    function SchemaCompilerService(types, validators, asyncValidators) {
        this.types = types;
        this.validators = validators;
        this.asyncValidators = asyncValidators;
    }
    /**
     * Compile a schema group.
     *
     * @param value
     * @param schema
     * @returns
     */
    SchemaCompilerService.prototype.compileGroup = function (value, schema, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var abstractForms = Object.keys(schema.schemas).reduce(function (acc, key) {
            acc[key] = _this._toAbstractForm(value ? value[key] : null, schema.schemas[key], options);
            return acc;
        }, {});
        return new FormGrouping(abstractForms, this._getValidators(schema, options), {
            component: schema.component
                ? this._getComponent(schema.component, options.components)
                : FormListerComponent,
            inputs: new InputProperties(schema.inputs),
            validatorParams: new ValidatorParameters(schema.validators, schema.asyncValidators),
            persist: this._toPersist(schema.persist)
        });
    };
    /**
     * Compiles a list of values with a schema.
     *
     * @param values An array of values.
     * @param listSchema
     */
    SchemaCompilerService.prototype.compileList = function (values, schema, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        /**
         * The schema list for each value since each value can have different
         * schemas. Or they can have the same schema for all values in the list.
         */
        var schemaList = Array.isArray(schema.schema) ? schema.schema : [schema.schema];
        if (!schemaList.length) {
            throw Error('SchemaCompilerService - One or more schemas must be provided to compile a form list.');
        }
        var list = (Array.isArray(values) ? values : []).map(function (value, index) {
            var childSchema = schemaList[index]
                ? /**
                   * Get the schema one to one for the value, or get the last schema
                   * which may be repeated for all values.
                   */
                    schemaList[index]
                : schemaList[schemaList.length - 1];
            return _this._toAbstractForm(value, childSchema, options);
        });
        return new FormList(list, this._getValidators(schema, options), {
            component: this._getComponent(schema.component, options.components),
            inputs: new InputProperties(schema.inputs),
            validatorParams: new ValidatorParameters(schema.validators, schema.asyncValidators),
            persist: this._toPersist(schema.persist)
        });
    };
    /**
     * Compiles a schema field.
     *
     * @param value
     * @param {FormFieldSchema} schema
     * @returns {FormField}
     */
    SchemaCompilerService.prototype.compileField = function (value, schema, options) {
        if (options === void 0) { options = {}; }
        return new FormField({ value: value, disabled: schema.disabled }, this._getValidators(schema, options), {
            component: this._getComponent(schema.component, options.components),
            inputs: new InputProperties(schema.inputs),
            validatorParams: new ValidatorParameters(schema.validators, schema.asyncValidators),
            persist: this._toPersist(schema.persist)
        });
    };
    /**
     * @internal
     * Returns form validators and ayncValidators
     * @param schema
     * @param options
     */
    SchemaCompilerService.prototype._getValidators = function (schema, options) {
        if (options === void 0) { options = {}; }
        var validators = [];
        var asyncValidators = [];
        if (schema.validators) {
            validators = this._mapValidator(schema.validators, this.validators, options.validators);
        }
        if (schema.asyncValidators) {
            asyncValidators = this._mapValidator(schema.asyncValidators, this.asyncValidators, options.asyncValidators);
        }
        return {
            validators: validators,
            asyncValidators: asyncValidators
        };
    };
    /**
     * @internal
     * @param value
     * @param schema
     */
    SchemaCompilerService.prototype._toAbstractForm = function (value, schema, options) {
        if (schema.type === 'field') {
            return this.compileField(value, schema, options);
        }
        if (schema.type === 'group') {
            return this.compileGroup(value, schema, options);
        }
        return this.compileList(value, schema, options);
    };
    /**
     * @internal
     *
     * Maps schema validators to actual validators in the registry and passes custom params to a validator.
     * If params are undefined then the validator isn't added to the array of validators. Validators
     * that are found the inline registry will take precedence of those in registries.
     */
    SchemaCompilerService.prototype._mapValidator = function (validators, registry, inline) {
        var _this = this;
        if (inline === void 0) { inline = {}; }
        return Object.keys(validators).reduce(function (acc, name) {
            var params = validators[name];
            if (params !== undefined) {
                var fn = inline[name] ? inline[name] : registry.get(name);
                if (!fn) {
                    throw new Error("SchemaCompilerService - Validator not found in " + _this.validators.constructor.name + " for: " + name + ".");
                }
                acc.push(fn(params));
            }
            return acc;
        }, []);
    };
    /**
     * @internal
     * Sets default to true if parameter persist is undefined.
     */
    SchemaCompilerService.prototype._toPersist = function (persist) {
        if (persist === void 0) { persist = true; }
        return persist;
    };
    /**
     * @internal
     * Decides if should get the type from the inline map or registry.
     * If no component is found, it would throw an error.
     *
     * @param name The name of the component in the registry.
     * @param components An component type name, used for inline components.
     */
    SchemaCompilerService.prototype._getComponent = function (name, components) {
        if (components === void 0) { components = {}; }
        var comp = components[name] ? components[name] : this.types.get(name);
        if (!comp) {
            throw new Error("SchemaCompilerService - Did not find component for: " + name + ".");
        }
        return comp;
    };
    SchemaCompilerService = __decorate([
        core.Injectable({
            providedIn: FormBuilderModule
        }),
        __metadata("design:paramtypes", [ComponentRegistryService,
            ValidatorRegistryService,
            AsyncValidatorRegistryService])
    ], SchemaCompilerService);
    return SchemaCompilerService;
}());

/**
 * Get an address book of persisting fields to the actual form path.
 * Example:
 * {
 *   'property': ['tab', 'property']
 *   ...
 * }
 * Where tab is not a persisting property of the model.
 */
var getPersistenceMap = function (form, map, from, to) {
    if (map === void 0) { map = {}; }
    if (from === void 0) { from = []; }
    if (to === void 0) { to = []; }
    if (form instanceof FormField) {
        if (form.persist) {
            map[from.join('.')] = to;
        }
        return map;
    }
    if (form instanceof FormList || form instanceof FormGrouping) {
        if (form.persist && from.length) {
            map[from.join('.')] = to;
        }
        Object.keys(form.controls).forEach(function (current) {
            var child = form.controls[current];
            var toActual = __spreadArrays(to, [current]);
            if (child.persist) {
                return getPersistenceMap(child, map, __spreadArrays(from, [current]), toActual);
            }
            return getPersistenceMap(child, map, from, toActual);
        });
    }
    return map;
};

/**
 * Recursively explore schema to return a form data structure
 * which is used to generated dynamic forms.
 *
 * If a schema is a field, simply return the related data
 *
 * If a schema is a group or list, explore its inner
 * schemas and return equivalent value
 *
 * @param data persisted data object
 * @param schema related schema
 */
var toFormValue = function (data, schema) {
    if (schema.type === 'field') {
        // Return related value
        return data;
    }
    if (schema.type === 'group') {
        return processGroupSchema(data, schema);
    }
    return processListSchema(data, schema);
};
/**
 * Process schemas of type FormGroupSchema.
 *
 * @param data persisted data object
 * @param schema related schema
 */
var processGroupSchema = function (data, schema) {
    var value = {};
    // Populate fields of value based on inner schemas
    Object.keys(schema.schemas).forEach(function (key) {
        // Create inner data object with only data related to the inner schema
        var innerData = getInnerData(data, key, schema.schemas[key].type);
        value[key] = toFormValue(innerData, schema.schemas[key]);
    });
    return value;
};
/**
 * Process schemas of type FormListSchema.
 *
 * @param data persisted data object
 * @param schema related schema
 */
var processListSchema = function (data, schema) {
    // If schema is a list, related data must also be a list
    var listSchema = schema;
    var listValue = [];
    var listData = Array.isArray(data) ? data : [];
    // If there is only one inner schema, treat it as an array of 1
    var innerSchemas = Array.isArray(listSchema.schema) ? listSchema.schema : [listSchema.schema];
    listData.forEach(function (el, i) {
        // If there is more data than schemas, use the last one.
        if (i > innerSchemas.length - 1) {
            i = innerSchemas.length - 1;
        }
        listValue.push(toFormValue(el, innerSchemas[i]));
    });
    return listValue;
};
/**
 * Return inner field of persisted data.
 *
 * If inner field is found, then it is returned
 * If the schema is a field, and the data field wasn't found, return null
 * Otherwise, the data object itself is returned.
 *
 * @param data persisted data object
 * @param key name of the value to retrieve from data
 * @param schemaType type of the related schema
 */
var getInnerData = function (data, key, schemaType) {
    // If data is null or undefined, return null
    if (data == null) {
        return null;
    }
    var value = data[key];
    if (value !== undefined) {
        return value;
    }
    else if (schemaType === 'field') {
        return null;
    }
    return data;
};

exports.ALERT_CONFIG_DEFAULTS = ALERT_CONFIG_DEFAULTS;
exports.ALERT_CONFIG_DEFAULTS_TOKEN = ALERT_CONFIG_DEFAULTS_TOKEN;
exports.AbstractCachedRestService = AbstractCachedRestService;
exports.Alert = Alert;
exports.AlertFactory = AlertFactory;
exports.AlertModule = AlertModule;
exports.AlertService = AlertService;
exports.AnnotationService = AnnotationService;
exports.AsyncValidatorRegistryService = AsyncValidatorRegistryService;
exports.AuthenticationService = AuthenticationService;
exports.BackendEntry = BackendEntry;
exports.BackendInterceptor = BackendInterceptor;
exports.BaseValueAccessor = BaseValueAccessor;
exports.BooleanUtils = BooleanUtils;
exports.BrowserService = BrowserService;
exports.CacheAction = CacheAction;
exports.CacheConfig = CacheConfig;
exports.CacheConfigAnnotationFactory = CacheConfigAnnotationFactory;
exports.CacheEngine = CacheEngine;
exports.CacheService = CacheService;
exports.Cached = Cached;
exports.CachedAnnotationFactory = CachedAnnotationFactory;
exports.CloneableUtils = CloneableUtils;
exports.ComponentRegistryService = ComponentRegistryService;
exports.CryptographicUtils = CryptographicUtils;
exports.DEFAULT_AUTHENTICATION_CLIENT_ID = DEFAULT_AUTHENTICATION_CLIENT_ID;
exports.DEFAULT_AUTHENTICATION_ENTRY_POINT = DEFAULT_AUTHENTICATION_ENTRY_POINT;
exports.DEFAULT_AUTH_MAP = DEFAULT_AUTH_MAP;
exports.DEFAULT_CREDENTIALS_MAP = DEFAULT_CREDENTIALS_MAP;
exports.DEFAULT_LANGUAGE_ISO = DEFAULT_LANGUAGE_ISO;
exports.DefaultCacheTiming = DefaultCacheTiming;
exports.DefaultRetryStrategy = DefaultRetryStrategy;
exports.DynamicForm = DynamicForm;
exports.DynamicInput = DynamicInput;
exports.EVENTS = EVENTS;
exports.EVENT_SERVICE = EVENT_SERVICE;
exports.EXPONENTIAL_RETRY_DEFAULT_SETTING = EXPONENTIAL_RETRY_DEFAULT_SETTING;
exports.EvictionTag = EvictionTag;
exports.ExponentialRetry = ExponentialRetry;
exports.ExponentialRetryStrategy = ExponentialRetryStrategy;
exports.FILE_VALIDATION_CONFIG = FILE_VALIDATION_CONFIG;
exports.FORM_PROP = FORM_PROP;
exports.FileMimeTypeService = FileMimeTypeService;
exports.FileReaderService = FileReaderService;
exports.FileValidationService = FileValidationService;
exports.FileValidatorFactory = FileValidatorFactory;
exports.FingerPrintingService = FingerPrintingService;
exports.FlawInjectionInterceptorModule = FlawInjectionInterceptorModule;
exports.FormBuilderModule = FormBuilderModule;
exports.FormField = FormField;
exports.FormGrouping = FormGrouping;
exports.FormList = FormList;
exports.FormListerComponent = FormListerComponent;
exports.FormPropDecorator = FormPropDecorator;
exports.FormRendererDirective = FormRendererDirective;
exports.FunctionsUtils = FunctionsUtils;
exports.FundamentalModalManagerService = FundamentalModalManagerService;
exports.FundamentalModalTemplateComponent = FundamentalModalTemplateComponent;
exports.FundamentalModalTemplateModule = FundamentalModalTemplateModule;
exports.GET_REQUESTS_ON_HOLD_MAP = GET_REQUESTS_ON_HOLD_MAP;
exports.HTTP_METHODS_READ = HTTP_METHODS_READ;
exports.HTTP_METHODS_UPDATE = HTTP_METHODS_UPDATE;
exports.HttpBackendService = HttpBackendService;
exports.HttpErrorInterceptorService = HttpErrorInterceptorService;
exports.HttpInterceptorModule = HttpInterceptorModule;
exports.HttpUtils = HttpUtils;
exports.I18N_RESOURCE_URI_TOKEN = I18N_RESOURCE_URI_TOKEN;
exports.I18N_ROOT_RESOURCE_URI = I18N_ROOT_RESOURCE_URI;
exports.IAlertService = IAlertService;
exports.IAuthenticationManagerService = IAuthenticationManagerService;
exports.IAuthenticationService = IAuthenticationService;
exports.IModalService = IModalService;
exports.ISelectAdapter = ISelectAdapter;
exports.ISessionService = ISessionService;
exports.ISettingsService = ISettingsService;
exports.ISharedDataService = ISharedDataService;
exports.IStorageService = IStorageService;
exports.ITranslationsFetchService = ITranslationsFetchService;
exports.InputPropDecorator = InputPropDecorator;
exports.InputProperties = InputProperties;
exports.InputPropertyChange = InputPropertyChange;
exports.InvalidateCache = InvalidateCache;
exports.InvalidateCacheAnnotationFactory = InvalidateCacheAnnotationFactory;
exports.LANDING_PAGE_PATH = LANDING_PAGE_PATH;
exports.LANGUAGE_SERVICE = LANGUAGE_SERVICE;
exports.LANGUAGE_SERVICE_CONSTANTS = LANGUAGE_SERVICE_CONSTANTS;
exports.LIBRARY_NAME = LIBRARY_NAME;
exports.LINEAR_RETRY_DEFAULT_SETTING = LINEAR_RETRY_DEFAULT_SETTING;
exports.LanguageDropdown = LanguageDropdown;
exports.LanguageDropdownAdapter = LanguageDropdownAdapter;
exports.LanguageDropdownComponent = LanguageDropdownComponent;
exports.LanguageDropdownHelper = LanguageDropdownHelper;
exports.LanguageDropdownModule = LanguageDropdownModule;
exports.LanguageService = LanguageService;
exports.LinearRetry = LinearRetry;
exports.LinearRetryStrategy = LinearRetryStrategy;
exports.ListItemKeyboardControlDirective = ListItemKeyboardControlDirective;
exports.ListKeyboardControlDirective = ListKeyboardControlDirective;
exports.ListKeyboardControlModule = ListKeyboardControlModule;
exports.LogService = LogService;
exports.LoginDialogComponent = LoginDialogComponent;
exports.LoginDialogModule = LoginDialogModule;
exports.LoginDialogResourceProvider = LoginDialogResourceProvider;
exports.ModalService = ModalService;
exports.ModuleUtils = ModuleUtils;
exports.OPERATION_CONTEXT_TOKEN = OPERATION_CONTEXT_TOKEN;
exports.OperationContextAnnotationFactory = OperationContextAnnotationFactory;
exports.OperationContextRegistered = OperationContextRegistered;
exports.OperationContextService = OperationContextService;
exports.PermissionErrorInterceptor = PermissionErrorInterceptor;
exports.PromiseUtils = PromiseUtils;
exports.PropDecorator = PropDecorator;
exports.REAUTH_STARTED = REAUTH_STARTED;
exports.RarelyChangingContentName = RarelyChangingContentName;
exports.ResponseAdapterInterceptor = ResponseAdapterInterceptor;
exports.RestClient = RestClient;
exports.RestServiceFactory = RestServiceFactory;
exports.RetryInterceptor = RetryInterceptor;
exports.SELECTED_LANGUAGE = SELECTED_LANGUAGE;
exports.SIMPLE_RETRY_DEFAULT_SETTING = SIMPLE_RETRY_DEFAULT_SETTING;
exports.SSOAuthenticationHelper = SSOAuthenticationHelper;
exports.SWITCH_LANGUAGE_EVENT = SWITCH_LANGUAGE_EVENT;
exports.SchemaCompilerService = SchemaCompilerService;
exports.SelectComponent = SelectComponent;
exports.SelectModule = SelectModule;
exports.SimpleRetry = SimpleRetry;
exports.StringUtils = StringUtils;
exports.StripResponseHeaders = StripResponseHeaders;
exports.TESTMODESERVICE = TESTMODESERVICE;
exports.TranslationModule = TranslationModule;
exports.URIBuilder = URIBuilder;
exports.UnauthorizedErrorInterceptor = UnauthorizedErrorInterceptor;
exports.UrlUtils = UrlUtils;
exports.ValidatorParameters = ValidatorParameters;
exports.ValidatorRegistryService = ValidatorRegistryService;
exports.WHO_AM_I_RESOURCE_URI_TOKEN = WHO_AM_I_RESOURCE_URI_TOKEN;
exports.WindowUtils = WindowUtils;
exports.annotationService = annotationService;
exports.booleanUtils = booleanUtils;
exports.clientErrorPredicate = clientErrorPredicate;
exports.cloneableUtils = cloneableUtils;
exports.commonNgZone = commonNgZone;
exports.defaultRetryStrategyFactory = defaultRetryStrategyFactory;
exports.exponentialRetryStrategyFactory = exponentialRetryStrategyFactory;
exports.functionsUtils = functionsUtils;
exports.getPersistenceMap = getPersistenceMap;
exports.httpUtils = httpUtils;
exports.linearRetryStrategyFactory = linearRetryStrategyFactory;
exports.moduleUtils = moduleUtils;
exports.noInternetConnectionErrorPredicate = noInternetConnectionErrorPredicate;
exports.promiseUtils = promiseUtils;
exports.rarelyChangingContent = rarelyChangingContent;
exports.readPredicate = readPredicate;
exports.retriableErrorPredicate = retriableErrorPredicate;
exports.serverErrorPredicate = serverErrorPredicate;
exports.stringUtils = stringUtils;
exports.timeoutErrorPredicate = timeoutErrorPredicate;
exports.toFormValue = toFormValue;
exports.updatePredicate = updatePredicate;
exports.urlUtils = urlUtils;
exports.windowUtils = windowUtils;
