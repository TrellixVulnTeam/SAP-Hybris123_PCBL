/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const fse = require('fs-extra');
const mkdirp = promisify(fse.mkdirp);
const readdir = promisify(fse.readdir);

const backendMockPath = `${process.cwd()}`;
const contractWorkspace = `${backendMockPath}/fixtures/contracts/`;
const config = require(`${backendMockPath}/config.json`);

const contractsArePresent = async () => {
    const backendMockPath = `${process.cwd()}`;
    const contractsPath = `${backendMockPath}/fixtures/contracts`;

    let isEmpty = true;
    const exists = fse.existsSync(contractsPath);

    if (exists) {
        isEmpty = (await readdir(contractsPath)).length === 0;
    }

    return exists && !isEmpty;
};

// This command was previously run when npm install finishes (postinstall hook)
// As we now use rush.js and the npm modules are rather linked than installed the postinstall hook is never triggered
// That's why it has been moved to contract-testing command (see package.json)
// Info taken from here: https://github.com/microsoft/rushstack/issues/1793

// Download Swagger contracts
(async () => {
    try {
        if (await contractsArePresent()) {
            console.log('[ContractPrepare]: Contracts are present, skipping downloading.');
            return;
        }

        const contractConfig = config.contractTestConfig;

        await mkdirp(`${contractWorkspace}`);

        await exec(
            `${__dirname}/getSmarteditAPIs.sh ${contractConfig.repositoryUrl} ${contractConfig.mavenArtifact} ${contractConfig.version} "${contractConfig.contracts}" ${contractWorkspace}`
        );
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
