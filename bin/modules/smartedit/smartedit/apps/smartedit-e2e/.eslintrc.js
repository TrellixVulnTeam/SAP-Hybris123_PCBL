/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = {
    extends: './node_modules/smartedit-build/config/.eslintrc.js',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.lint.json'
    },
    // See https://github.com/typescript-eslint/typescript-eslint/issues/955
    // TLDR: Typescript ignores files with the same name
    // We have Page.ts and Page.js next to each other which causes linting errors (file not included in project)
    ignorePatterns: [
        'tests/utils/components/Page.js',
        'tests/utils/components/Storefront.js',
        'tests/utils/components/Perspectives.js',
        'tests/utils/components/alertsComponentObject.js'
    ],
    rules: {
        'arrow-body-style': 'off',
        'max-classes-per-file': 'off',
        'no-empty': 'off',
        'no-inner-declarations': 'off',
        'no-var': 'off',
        'object-shorthand': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off']
    },
    overrides: [
        {
            files: 'tests/**/*Test.{js,ts}',
            rules: {
                'arrow-body-style': 'off',
                'no-inner-declarations': 'off',
                'prefer-spread': 'off',
                'spaced-comment': 'off',
                '@typescript-eslint/await-thenable': 'off',
                '@typescript-eslint/no-empty-function': 'off',
                '@typescript-eslint/no-floating-promises': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/unbound-method': 'off',
                '@typescript-eslint/restrict-plus-operands': 'off'
            }
        }
    ]
};
