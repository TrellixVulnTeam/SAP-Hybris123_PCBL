/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        config: function(data, conf) {
            conf.dest = 'apps/smartedit-e2e/generated/pages/storefront.html';
            return conf;
        }
    };
};
