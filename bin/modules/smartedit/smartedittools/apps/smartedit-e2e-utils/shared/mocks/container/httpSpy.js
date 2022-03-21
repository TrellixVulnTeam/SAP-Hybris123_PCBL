/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function(angular) {
    angular
        .module('httpSpyInterceptorModule', [])
        .constant('HTTP_SPY_MAX_XHR_REQUESTS', 50)
        /**
         * This http interceptor is meant to be used in e2e tests. Each time an e2e spec is executed, a page is loaded, and this
         * interceptor will monitor http requests. If more than `HTTP_SPY_MAX_XHR_REQUESTS` are made to the same uri, an Error is logged in the console.
         */
        .provider('httpSpy', function(HTTP_SPY_MAX_XHR_REQUESTS) {
            this.requests = {};

            this.$get = function() {
                this.track = function(method, url) {
                    if (isTemplate(url)) {
                        return;
                    }

                    var requestKey = '[' + method + '] ' + url;
                    if (!this.requests[requestKey]) {
                        this.requests[requestKey] = {
                            total: 0
                        };
                    }
                    this.requests[requestKey].total++;
                    Object.keys(this.requests).forEach(
                        function(key) {
                            var total = this.requests[key].total;
                            if (total >= HTTP_SPY_MAX_XHR_REQUESTS) {
                                console.error(
                                    'WARNING: too much xhr calls to ' +
                                        url +
                                        ' - method:' +
                                        method +
                                        ' - total:' +
                                        total +
                                        ' calls in the current test alone, please fix it before committing.'
                                );
                                return;
                            }
                        }.bind(this)
                    );
                };
                return {
                    track: this.track.bind(this)
                };
            }.bind(this);
        })
        .factory('httpSpyInterceptor', function(httpSpy) {
            return {
                request: function(config) {
                    httpSpy.track(config.method, config.url);
                    return config;
                }
            };
        })
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('httpSpyInterceptor');
        });

    function isTemplate(url) {
        return url.includes('.html');
    }

    angular.module('smarteditcontainer').requires.push('httpSpyInterceptorModule');
})(angular);
