/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    /**
     * @ngdoc overview
     * @name tsformatter(C)
     * @description
     * # tsformatter Configuration
     * The default {@link https://github.com/vvakame/typescript-formatter tsformatter} configuration is defined in a
     * template file.
     * See bundlePaths.build.tsfmt for more details.
     *
     * To override this configuration, modify the **options** property from your extension.
     */

    return {
        config: function(data, conf) {
            return {
                options: {
                    // https://github.com/vvakame/typescript-formatter
                    tsfmt: true,
                    tsfmtFile: global.smartedit.bundlePaths.build.tsfmt,
                    replace: true,
                    tsconfig: false,
                    tslint: true,
                    verbose: false
                }
            };
        }
    };
};
