/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { HttpClient } = require('protractor-http-client');
const backendDomain = 'http://localhost:3333/';
const modifyEndpoint = '$$$/modify';
const replaceEndpoint = '$$$/replace';
const deleteEndpoint = '$$$/fixture';

const setupMockBackend = () => {
    const http = new HttpClient(backendDomain);

    return {
        // Send information to the mock-backend regarding the fixture that requires modification
        modifyFixture: async function (regExpArray, data) {
            const payload = this.buildPayload(regExpArray, data);
            const response = await http.post(`${modifyEndpoint}`, payload);
            return response.body;
        },

        // Send information to the mock-backend regarding the fixture that requires replacement
        replaceFixture: async function (regExpArray, data) {
            const payload = this.buildPayload(regExpArray, data);
            const response = await http.post(`${replaceEndpoint}`, payload);
            return response.body;
        },

        // Notify mock-backend regarding the fixture that does not require any more changes
        removeFixture: function (fixtureID) {
            http.delete(`${deleteEndpoint}/${fixtureID}`);
        },

        // Clean up any information that persist in the mock-backend
        removeAllFixtures: function () {
            http.delete(`${deleteEndpoint}`);
        },

        // Refresh state of the fixture to remove any modifications
        refreshFixture: function (url) {
            http.post(url);
        },

        buildPayload: function (regExpArray, data) {
            return {
                url: regExpArray,
                replace: data
            };
        }
    };
};

module.exports = {
    setupMockBackend
};
