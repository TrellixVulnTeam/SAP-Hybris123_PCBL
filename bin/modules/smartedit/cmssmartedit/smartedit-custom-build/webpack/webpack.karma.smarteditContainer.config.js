/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('../../smartedit-build/config/webpack/webpack.ext.karma.smartedit.config');

const { compose, unset } = require('../../smartedit-build/builders');

const { smarteditContainerKarma } = require('./webpack.shared.config');

module.exports = compose(
    smarteditContainerKarma(),
    unset('output.library')
)(base);
