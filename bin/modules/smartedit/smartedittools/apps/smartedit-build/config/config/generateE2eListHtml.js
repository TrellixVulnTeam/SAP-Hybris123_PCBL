/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    /**
     * @ngdoc overview
     * @name generateE2eListHtml(C)
     * @description
     * # generateE2eListHtml Configuration
     * The default generateE2eListHtml configuration is configured with a default template located in the bundle.
     *
     */
    return {
        config: function(data, conf) {
            return {
                root: global.smartedit.bundlePaths.test.e2e.root,
                tpl: global.smartedit.bundlePaths.test.e2e.listTpl,
                dest: global.smartedit.bundlePaths.test.e2e.listDest
            };
        }
    };
};
