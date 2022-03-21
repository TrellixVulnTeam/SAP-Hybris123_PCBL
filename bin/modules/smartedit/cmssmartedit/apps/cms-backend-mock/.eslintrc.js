/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = {
    extends: './node_modules/smartedit-build/config/.eslintrc.js',
    parserOptions: {
        tsconfigRootDir: __dirname
    },
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off']
    }
};
