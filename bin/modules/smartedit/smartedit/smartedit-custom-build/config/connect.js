/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        config: function(data, bundleConfig) {
            bundleConfig.docs.options.port = 9091;
            return bundleConfig;
        }
    };
};
