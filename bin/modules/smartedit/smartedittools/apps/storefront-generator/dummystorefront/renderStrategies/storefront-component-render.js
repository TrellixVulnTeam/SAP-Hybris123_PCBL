/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint undef:false */
sfConfigManager.registerRenderStrategy(sfConfigManager.ALIASES.JS_RENDERED_ALIAS, function(
    componentId,
    componentType,
    slotId
) {
    if (componentId === 'staticDummySlot') {
        return false;
    } else {
        return sfBuilder.rerender(componentId, componentType, slotId);
    }
});
