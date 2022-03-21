/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const lodash = require('lodash');
/**
 * @deprecated Deprecated since 1905. Please use the base Karma configuration in 'smartedit-build/config/karma/shared/karma.base.conf.js'.
 */
module.exports = (function() {
    return {
        /**
         * @deprecated Deprecated since 1905. Please use the Karma configuration in 'smartedit-build/config/karma/shared/karma.base.conf.js'.
         */
        base: lodash.cloneDeep(require('../karma/shared/karma.base.conf'))
    };
})();
