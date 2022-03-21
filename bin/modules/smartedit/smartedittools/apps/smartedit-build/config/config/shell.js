/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        targets: ['prettierCheck'],
        config: function() {
            return {
                prettierCheck: {
                    command: 'exit 0'
                },
                prettierWrite: {
                    command: 'prettier --write "**/*.+(js|ts|less|scss|html)"'
                },
                prettierRun: {
                    command: 'pretty-quick --branch=develop'
                },
                startMockBackend: {
                    command: 'npm run start --prefix ./backend-mock &',
                    options: {
                        async: true
                    }
                },
                contractTest: {
                    command: 'npm run contract-testing --prefix ./backend-mock &'
                }
            };
        }
    };
};
