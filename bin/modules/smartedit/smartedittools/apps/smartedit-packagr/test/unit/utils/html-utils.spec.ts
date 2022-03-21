/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'jasmine';

const rewireMock = require('rewiremock/node').default;

describe('HTML Utils', () => {
    let minifyHtml: any;
    let minifyTool: jasmine.SpyObj<any>;

    beforeEach(() => {
        minifyTool = jasmine.createSpyObj('minify-html', ['minify']);
        rewireMock('html-minifier').with(minifyTool);
        rewireMock.enable();

        minifyHtml = require('../../../src/utils').minifyHtml;
    });

    afterAll(() => {
        rewireMock.disable();
    });

    it('GIVEN an html string WHEN minifyHtml is called THEN it delegates to html minifier', () => {
        // GIVEN
        const html = 'Some html to minify';
        const expectedReturnValue = 'Some minified html';
        minifyTool.minify.and.returnValue(expectedReturnValue);

        // WHEN
        const returnValue = minifyHtml(html);

        // THEN
        expect(minifyTool.minify).toHaveBeenCalledWith(html, {
            collapseWhitespace: true,
            caseSensitive: true,
            keepClosingSlash: true,
            removeComments: true
        });
        expect(returnValue).toBe(expectedReturnValue);
    });
});
