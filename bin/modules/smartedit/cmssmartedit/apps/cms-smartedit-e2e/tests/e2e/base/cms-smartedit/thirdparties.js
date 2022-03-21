/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
if (!window.Zone) {
    /* tslint:disable-next-line */
    require('zone.js/dist/zone.js');
}

if (!window.smarteditJQuery && window.$ && window.$.noConflict) {
    window.smarteditJQuery = window.$.noConflict();
}
window.smarteditLodash = lodash.noConflict();
require('eonasdan-bootstrap-datetimepicker');
