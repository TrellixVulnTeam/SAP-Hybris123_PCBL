/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        config: function(data, conf) {
            return {
                options: {
                    // BUNDLE_LOCATION will be replaced in the custom task with a relative path from DEST to
                    // the smartedit bundle directory of the given extension

                    preSmarteditContent: `<!--3rd prty libs-->    
        <script src="BUNDLE_LOCATION/webroot/static-resources/dist/smarteditcontainer/js/thirdparties.js"></script>
        <script src="BUNDLE_LOCATION/webroot/static-resources/dist/smarteditcommons/js/vendor_chunk.js"></script>
        <script src="BUNDLE_LOCATION/webroot/static-resources/thirdparties/ckeditor/ckeditor.js"></script>`,

                    smarteditContent: `<!--libs-->
        <script src="BUNDLE_LOCATION/webroot/static-resources/dist/smarteditcommons/js/smarteditcommons.js"></script>
        <script src="BUNDLE_LOCATION/webroot/static-resources/dist/smarteditcontainer/js/smarteditcontainer.js"></script>`,
                    // Extension specific html content to be inserted into the <head> of the generated index.html
                    // This content will be inserted AFTER the smartedit content

                    headerContent: '',

                    bundleContent:
                        '<script src="BUNDLE_LOCATION/test/e2e/mocks/configurationMocks.js"></script>',

                    // Destination path and file relative to the extension root
                    dest: ''
                }
            };
        }
    };
};
