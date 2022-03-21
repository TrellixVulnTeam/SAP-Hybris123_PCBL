/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint undef:false */
(function() {
    var map = {
        components: {
            slot1: 2000,
            comp1: 2000
        },
        content: {
            layersSlot: 2000
        }
    };

    sfConfigManager.registerDelayStrategy(sfConfigManager.ALIASES.DEMO_DELAY_ALIAS, {
        getComponentDelay: function(componentId) {
            return map.components[componentId] ? map.components[componentId] : 0;
        },
        getContentDelay: function(componentId) {
            return map.content[componentId] ? map.content[componentId] : 0;
        }
    });
})();
