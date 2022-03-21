/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// Define REST Client for communication with mock-backend storage
module.exports = function(ns) {
    const HttpClient = require('protractor-http-client').HttpClient;
    const backendDomain = 'http://localhost:3333/';
    const modifyEndpoint = '$$$/modify';
    const replaceEndpoint = '$$$/replace';
    const deleteEndpoint = '$$$/fixture';
    const http = new HttpClient(backendDomain);

    client = {
        // Send information to the mock-backend regarding the fixture that requires modification
        modifyFixture: async function(regExpArray, data) {
            payload = this.buildPayload(regExpArray, data);
            http.post(`${modifyEndpoint}`, payload);
        },

        // Send information to the mock-backend regarding the fixture that requires replacement
        replaceFixture: function(regExpArray, data) {
            payload = this.buildPayload(regExpArray, data);
            http.post(`${replaceEndpoint}`, payload);
        },

        // Notify mock-backend regarding the fixture that does not require any more changes
        removeFixture: function(fixtureID) {
            http.delete(`${deleteEndpoint}/${fixtureID}`);
        },

        // Clean up any information that persist in the mock-backend
        removeAllFixtures: function() {
            http.delete(`${deleteEndpoint}`);
        },

        // Refresh state of the fixture to remove any modifications
        refreshFixture: function(url) {
            http.post(url);
        },

        buildPayload: function(regExpArray, data) {
            return {
                url: regExpArray,
                replace: data
            };
        }
    };

    ns.mockBackendClient = this.client;
};
