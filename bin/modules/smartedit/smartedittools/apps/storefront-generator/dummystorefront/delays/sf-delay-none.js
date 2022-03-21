/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint undef:false */
sfConfigManager.registerDelayStrategy(sfConfigManager.ALIASES.DEFAULT_DELAY_ALIAS, {
    getComponentDelay: function() {
        return 0;
    },
    getContentDelay: function() {
        return 0;
    }
});
