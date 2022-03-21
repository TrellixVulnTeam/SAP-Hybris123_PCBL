/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// @ts-ignore
import 'testhelpers';

function importAll(requireContext: any) {
    requireContext.keys().forEach(function(key: string) {
        requireContext(key);
    });
}
importAll(require.context('./features', true, /Test\.(js|ts)$/));