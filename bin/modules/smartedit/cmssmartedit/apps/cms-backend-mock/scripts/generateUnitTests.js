/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const mkdirp = util.promisify(require('fs-extra').mkdirp);

const backendMockPath = `${process.cwd()}`;
const testWorkspace = `${backendMockPath}/tests/unit`;
const contractsPath = `${backendMockPath}/fixtures/contracts`;
const config = require(`${backendMockPath}/config.json`);
const testsData = config.testsToGenerate;

(async () => {
    try {
        await mkdirp(`${testWorkspace}`);

        for (const yamlFile of Object.keys(testsData)) {
            const endpoints = testsData[yamlFile].toString();
            exec(
                `npx oatts generate -m http --host localhost:3333 --status-codes 200 -s ${contractsPath}/${yamlFile}.yaml -w ${testWorkspace} -p ${endpoints}`
            );
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
