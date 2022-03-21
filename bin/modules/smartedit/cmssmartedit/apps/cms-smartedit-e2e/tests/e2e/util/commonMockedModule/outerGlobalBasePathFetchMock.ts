/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fetchMock from 'fetch-mock';

fetchMock.mock('path:/smartedit/settings', {
    'smartedit.globalBasePath': 'http://localhost:3333'
});
