/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import 'jasmine';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as lodash from 'lodash';
import { of } from 'rxjs';
import { Page, Pageable, Payload } from '../../dtos';
import { matchers } from '../../unit/custom-matchers';
import { SearchParams } from './i-rest-service';
import { RestClient } from './rest-client';

describe('test restClient ', () => {
    class DTO {}

    const object = new DTO();
    const array = [new DTO(), new DTO()];
    const page = {} as Page<DTO>;

    let restClient: RestClient<DTO>;
    const uri = 'theuri';
    const identifier = 'customidentifier';

    let httpClient: jasmine.SpyObj<HttpClient>;

    const DEFAULT_HEADERS = { 'x-requested-with': 'Angular' };

    const responseHeaders = new HttpHeaders().set('someKey', 'somweValue');

    beforeEach(() => {
        httpClient = jasmine.createSpyObj<HttpClient>('httpClient', [
            'get',
            'post',
            'put',
            'delete',
            'patch'
        ]);

        restClient = new RestClient(httpClient, uri, identifier);

        jasmine.addMatchers(matchers);
    });

    // FIXME: test ordering and metadata activation and encoding

    function mockResponse(method: 'get', body: any) {
        const observable = of(new HttpResponse({ body, headers: responseHeaders }));
        httpClient[method].and.returnValue(observable);
    }
    function mockBody(method: 'post' | 'put' | 'delete' | 'patch', body: any) {
        httpClient[method].and.returnValue(of(body));
    }

    it('getById delegates to httpClient.get and appends identifier in params object with expected key', async () => {
        mockResponse('get', object);

        const result = await restClient.getById('someId');

        expect(result).toBe(object);

        expect(httpClient.get).toHaveBeenCalled();
        expect(httpClient.get.calls.mostRecent().args[0]).toEqual(`${uri}/someId`);
        expect(httpClient.get.calls.mostRecent().args[1]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS),
            observe: 'response'
        });
    });

    it('getById appends headers', async () => {
        mockResponse('get', object);

        restClient.activateMetadata();

        const result = await restClient.getById('someId');

        expect({ ...result }).toEqual({ ...object, headers: responseHeaders });
    });

    it('get delegates to httpClient.get and passes passes copy of payload as params', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value'
        } as SearchParams;

        mockResponse('get', object);

        const result = await restClient.get(search);

        expect(result).toBe(object);

        expect(httpClient.get).toHaveBeenCalled();
        expect(httpClient.get.calls.mostRecent().args[0]).toEqual('someAPI/ph1Value/ph2Value');
        expect(httpClient.get.calls.mostRecent().args[1]).toJsonEqual({
            params: {
                key1: 'key1Value',
                key2: 'key2Value'
            },
            headers: new HttpHeaders(DEFAULT_HEADERS),
            observe: 'response'
        });
    });

    it('get delegates to httpClient.get and passes passes copy of payload as params and passes custom headers', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value'
        } as SearchParams;

        mockResponse('get', object);

        const customHeaders = { key: 'value' };
        const result = await restClient.get(search, { headers: customHeaders });

        expect(result).toBe(object);

        expect(httpClient.get).toHaveBeenCalled();
        expect(httpClient.get.calls.mostRecent().args[0]).toEqual('someAPI/ph1Value/ph2Value');
        expect(httpClient.get.calls.mostRecent().args[1]).toJsonEqual({
            params: {
                key1: 'key1Value',
                key2: 'key2Value'
            },
            headers: new HttpHeaders({ ...DEFAULT_HEADERS, ...customHeaders }),
            observe: 'response'
        });
    });

    it('get delegates appends response headers to return body', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value'
        } as SearchParams;

        mockResponse('get', object);

        restClient.activateMetadata();

        const result = await restClient.get(search);

        expect({ ...result }).toEqual({ ...object, headers: responseHeaders });
    });

    it('query delegates to httpClient.get and passes passes copy of payload as params', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value'
        } as SearchParams;

        mockResponse('get', array);

        const result = await restClient.query(search);

        expect(result).toBe(array);

        expect(httpClient.get).toHaveBeenCalled();
        expect(httpClient.get.calls.mostRecent().args[0]).toEqual('someAPI/ph1Value/ph2Value');
        expect(httpClient.get.calls.mostRecent().args[1]).toJsonEqual({
            params: {
                key1: 'key1Value',
                key2: 'key2Value'
            },
            headers: new HttpHeaders(DEFAULT_HEADERS),
            observe: 'response'
        });
    });

    it('query delegates to httpClient.get and passes passes copy of payload as params and passes custom headers', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value'
        } as SearchParams;

        mockResponse('get', array);

        const customHeaders = { key: 'value' };
        const result = await restClient.query(search);

        expect(result).toBe(array);

        expect(httpClient.get).toHaveBeenCalled();
        expect(httpClient.get.calls.mostRecent().args[0]).toEqual('someAPI/ph1Value/ph2Value');
        expect(httpClient.get.calls.mostRecent().args[1]).toJsonEqual({
            params: {
                key1: 'key1Value',
                key2: 'key2Value'
            },
            headers: new HttpHeaders({ ...DEFAULT_HEADERS, ...customHeaders }),
            observe: 'response'
        });
    });

    it('query delegates appends responde headers to body', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value'
        } as SearchParams;

        mockResponse('get', array);

        restClient.activateMetadata();

        const result = await restClient.query(search);

        expect(result).toBeDefined();
        expect(result ? result.headers : undefined).toBe(responseHeaders);
    });

    it('page delegates to httpClient.get and passes passes copy of payload as params', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value',
            currentPage: 5
        } as Pageable;

        mockResponse('get', page);

        const result = await restClient.page(search);

        expect(result).toBe(page);

        expect(httpClient.get).toHaveBeenCalled();
        expect(httpClient.get.calls.mostRecent().args[0]).toEqual('someAPI/ph1Value/ph2Value');
        expect(httpClient.get.calls.mostRecent().args[1]).toJsonEqual({
            params: {
                currentPage: 5,
                key1: 'key1Value',
                key2: 'key2Value'
            },
            headers: new HttpHeaders(DEFAULT_HEADERS),
            observe: 'response'
        });
    });

    it('page delegates appends response headers to body', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value',
            currentPage: 5
        } as Pageable;

        mockResponse('get', page);

        restClient.activateMetadata();

        const result = await restClient.page(search);

        expect(result).toBeDefined();
        expect(result ? result.headers : undefined).toBe(responseHeaders);
    });

    it('save delegates to httpClient.post and extract from payload identifier and placeholders to feed params', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('post', object);

        const result = await restClient.save(payload);

        expect(result).toEqual(object);
        expect(httpClient.post).toHaveBeenCalled();
        expect(httpClient.post.calls.mostRecent().args[0]).toEqual('someAPI/ph1Value/ph2Value');
        expect(httpClient.post.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        });
        expect(httpClient.post.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });

    it('save delegates to httpClient.post and extract from payload identifier and placeholders to feed params and passes custom headers', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('post', object);

        const customHeaders = { key: 'value' };
        const result = await restClient.save(payload, { headers: customHeaders });

        expect(result).toEqual(object);
        expect(httpClient.post).toHaveBeenCalled();
        expect(httpClient.post.calls.mostRecent().args[0]).toEqual('someAPI/ph1Value/ph2Value');
        expect(httpClient.post.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        });
        expect(httpClient.post.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders({ ...DEFAULT_HEADERS, ...customHeaders })
        });
    });

    it('given url with placeholder followed by query params when processed it should remove trailing slash before question mark', async () => {
        restClient = new RestClient<DTO>(
            httpClient,
            'someAPI/:customidentifier?param=true',
            identifier
        );
        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value'
        } as Payload;

        mockBody('post', object);

        await restClient.save(payload);

        expect(httpClient.post).toHaveBeenCalled();
        expect(httpClient.post.calls.mostRecent().args[0]).toEqual(`someAPI?param=true`);
        expect(httpClient.post.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value'
        });
        expect(httpClient.post.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });

    it('given url with placeholder followed by another path when processed it should remove double slash', async () => {
        restClient = new RestClient<DTO>(
            httpClient,
            'someAPI/:customidentifier/data?param=true',
            identifier
        );
        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value'
        } as Payload;

        mockBody('post', object);

        await restClient.save(payload);

        expect(httpClient.post).toHaveBeenCalled();
        expect(httpClient.post.calls.mostRecent().args[0]).toEqual(`someAPI/data?param=true`);
        expect(httpClient.post.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value'
        });
        expect(httpClient.post.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });

    it('update is rejected if identifier is missing from payload', (done) => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value'
        } as Payload;

        mockBody('put', object);

        restClient.update(payload).then(
            () => {
                fail('should have rejected');
            },
            () => {
                expect(httpClient.put).not.toHaveBeenCalled();
                done();
            }
        );
    });

    it('update delegates to httpClient.put and extract from payload identifier and placeholders to feed params', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('put', object);

        const result = await restClient.update(payload);

        expect(result).toBe(object);

        expect(httpClient.put).toHaveBeenCalled();
        expect(httpClient.put.calls.mostRecent().args[0]).toEqual(`someAPI/ph1Value/ph2Value/myId`);
        expect(httpClient.put.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        });
        expect(httpClient.put.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });

    it('update delegates to httpClient.put and extract from payload identifier and placeholders to feed params and passes custom headers', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('put', object);

        const customHeaders = { key: 'value' };
        const result = await restClient.update(payload, { headers: customHeaders });

        expect(result).toBe(object);

        expect(httpClient.put).toHaveBeenCalled();
        expect(httpClient.put.calls.mostRecent().args[0]).toEqual(`someAPI/ph1Value/ph2Value/myId`);
        expect(httpClient.put.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        });
        expect(httpClient.put.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders({ ...DEFAULT_HEADERS, ...customHeaders })
        });
    });
    it('patch is rejected if identifier is missing from payload', (done) => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value'
        } as Payload;

        mockBody('patch', object);

        restClient.patch(payload).then(
            () => {
                fail('should have rejected');
            },
            () => {
                expect(httpClient.patch).not.toHaveBeenCalled();
                done();
            }
        );
    });

    it('patch delegates to httpClient.patch and extract from payload identifier and placeholders to feed params', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('patch', object);

        const result = await restClient.patch(payload);

        expect(result).toBe(object);

        expect(httpClient.patch).toHaveBeenCalled();
        expect(httpClient.patch.calls.mostRecent().args[0]).toEqual(
            `someAPI/ph1Value/ph2Value/myId`
        );
        expect(httpClient.patch.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        });
        expect(httpClient.patch.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });

    it('patch delegates to httpClient.patch and extract from payload identifier and placeholders to feed params and passes custom headers', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('patch', object);

        const customHeaders = { key: 'value' };
        const result = await restClient.patch(payload, { headers: customHeaders });

        expect(result).toBe(object);

        expect(httpClient.patch).toHaveBeenCalled();
        expect(httpClient.patch.calls.mostRecent().args[0]).toEqual(
            `someAPI/ph1Value/ph2Value/myId`
        );
        expect(httpClient.patch.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        });
        expect(httpClient.patch.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders({ ...DEFAULT_HEADERS, ...customHeaders })
        });
    });

    it('given url with identifier when update delegates to httpClient.put it replaces identifier with value and never adds second identifier to url', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:customidentifier', identifier);
        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('put', object);

        await restClient.update(payload);

        expect(httpClient.put).toHaveBeenCalled();
        expect(httpClient.put.calls.mostRecent().args[0]).toEqual(`someAPI/myId`);
        expect(httpClient.put.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        });
        expect(httpClient.put.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });

    it('update delegates to httpClient.put and extract from payload identifier, query params and placeholders to feed params', async () => {
        restClient = new RestClient<DTO>(
            httpClient,
            'someAPI/:ph1/someResource?key1=:key1&key2=:key2',
            identifier
        );

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('put', object);

        const result = await restClient.update(payload);

        expect(result).toBe(object);

        expect(httpClient.put).toHaveBeenCalled();
        expect(httpClient.put.calls.mostRecent().args[0]).toEqual(
            `someAPI/ph1Value/someResource?key1=key1Value&key2=key2Value`
        );
        expect(httpClient.put.calls.mostRecent().args[1]).toEqual({
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        });
        expect(httpClient.put.calls.mostRecent().args[2]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });

    it('remove is rejected if identifier is missing from payload', (done) => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value'
        } as Payload;

        mockBody('delete', object);

        restClient.remove(payload).then(
            () => {
                fail('should have rejected');
            },
            () => {
                expect(httpClient.delete).not.toHaveBeenCalled();
                done();
            }
        );
    });

    it('remove delegates to httpClient.delete and extract from payload identifier and placeholders to feed params and empties payload', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;

        mockBody('delete', object);

        await restClient.remove(payload);

        expect(httpClient.delete).toHaveBeenCalled();
        expect(httpClient.delete.calls.mostRecent().args[0]).toEqual(
            `someAPI/ph1Value/ph2Value/myId`
        );
        expect(httpClient.delete.calls.mostRecent().args[1]).toJsonEqual({
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });

    it('remove delegates to httpClient.delete and extract from payload identifier and placeholders to feed params and empties payload and passes custom headers', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value',
            ph1: 'ph1Value',
            key2: 'key2Value',
            ph2: 'ph2Value',
            customidentifier: 'myId'
        } as Payload;
        const customHeaders = { key: 'value' };

        mockBody('delete', object);

        await restClient.remove(payload, { headers: customHeaders });

        expect(httpClient.delete).toHaveBeenCalled();
        expect(httpClient.delete.calls.mostRecent().args[0]).toEqual(
            `someAPI/ph1Value/ph2Value/myId`
        );
        expect(httpClient.delete.calls.mostRecent().args[1]).toJsonEqual({
            headers: new HttpHeaders({ ...DEFAULT_HEADERS, ...customHeaders })
        });
    });

    it('querybypost delegates to httpClient.post and passes passes copy of payload as params', async () => {
        restClient = new RestClient<DTO>(httpClient, 'someAPI/:ph1/:ph2', identifier);

        const payload = {
            key1: 'key1Value'
        } as Payload;

        const search = {
            ph1: 'ph1Value',
            ph2: 'ph2Value',
            key1: 'key1Value',
            key2: 'key2Value'
        } as SearchParams;

        mockBody('post', object);

        const result = await restClient.queryByPost(payload, search);

        expect(result).toBe(object);

        expect(httpClient.post).toHaveBeenCalled();
        expect(httpClient.post.calls.mostRecent().args[0]).toEqual('someAPI/ph1Value/ph2Value');
        expect(httpClient.post.calls.mostRecent().args[1]).toEqual(payload);
        expect(httpClient.post.calls.mostRecent().args[2]).toJsonEqual({
            params: {
                key1: 'key1Value',
                key2: 'key2Value'
            },
            headers: new HttpHeaders(DEFAULT_HEADERS)
        });
    });
});
