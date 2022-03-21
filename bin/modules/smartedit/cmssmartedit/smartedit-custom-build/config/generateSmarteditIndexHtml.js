/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        targets: ['e2eSetup'],
        config: function(data, conf) {
            conf.e2eSetup = {
                // base smartedit files
                headerContent: `
        <script src="/jsTests/e2e/util/commonMockedModule/generated_outerI18nMock.js"></script>
        <script src="/jsTests/e2e/util/commonMockedModule/generated_outerGlobalBasePathFetchMock.js"></script>
        <script src="/jsTests/e2e/util/generated_outerBackendMocksUtils.js"></script>
        <script src="/jsTests/e2e/util/commonMockedModule/synchronizationMocks.js"></script>
        <script src="/jsTests/e2e/util/commonMockedModule/configurationMocks.js"></script>
        <script src="/jsTests/e2e/util/commonMockedModule/componentMocks.js"></script>     
        <script src="/jsTests/e2e/util/commonMockedModule/perspectivesMocks.js"></script>
        <script src="/jsTests/e2e/util/commonMockedModule/dragAndDropAndRemoveMocks.js"></script>
        <script src="/jsTests/e2e/util/commonMockedModule/goToCustomView.js"></script>
        <style>
            .offset{
                margin-top:50px
            }
            .y-add-btn {
                height: inherit !important;
            }
        </style>`,

                // path and file to output to
                // the path must be either absolute or relative to the root of the extension
                dest: smartedit.bundlePaths.test.e2e.applicationPath
            };

            return conf;
        }
    };
};
