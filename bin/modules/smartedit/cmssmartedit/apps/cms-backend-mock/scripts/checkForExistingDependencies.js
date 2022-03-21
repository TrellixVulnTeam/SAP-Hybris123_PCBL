/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const utils = require('util');
const exists = utils.promisify(fs.exists);

const backendMockPath = `${process.cwd()}`;
const NODE_MODULES_PATH = 'node_modules';

async function isNodeModulesDirPresent() {
    return exists(path.join(backendMockPath, NODE_MODULES_PATH));
}

async function getDependenciesIfAbsent() {
    const nodeModulesDirExists = await isNodeModulesDirPresent();
    if (!nodeModulesDirExists) {
        const npmInstall = childProcess.spawn('npm', ['install'], {
            cwd: `${backendMockPath}`
        });

        npmInstall.on('error', (err) => {
            console.error('Failed to start subprocess.');
            process.exit(1);
        });

        npmInstall.stdout.on('close', () => process.exit(0));
    }
}

(async function() {
    await getDependenciesIfAbsent();
})();
