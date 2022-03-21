/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        config: function(data, previousConf) {
            previousConf.options = previousConf.options || {};
            previousConf.options.separator = '\n';
            return previousConf;
        }
    };
};
