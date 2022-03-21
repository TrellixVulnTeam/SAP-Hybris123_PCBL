/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable */

/**
 * Entry file for unit tests.
 */

import 'zone.js';
import 'core-js/es7/reflect';

function importAll(requireContext: any) {
    requireContext.keys().forEach(function (key: string) {
        requireContext(key);
    });
}

importAll(require.context('./', true, /spec.ts$/));
