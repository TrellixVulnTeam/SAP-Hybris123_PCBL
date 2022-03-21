/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var ACC = {};

window.smartedit = window.smartedit || {};
ACC.global = ACC.global || {};

ACC.global.reprocessImages = function() {};
window.smartedit.reprocessPage = function() {
    ACC.global.reprocessImages();
};
