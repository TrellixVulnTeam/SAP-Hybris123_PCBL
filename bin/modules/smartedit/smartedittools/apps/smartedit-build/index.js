/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * This is so that Gruntfile.js in extensions don't need to know where the loader is
 */
module.exports = function(grunt) {
    return require('./config/grunt-utils/loader')(grunt);
};
