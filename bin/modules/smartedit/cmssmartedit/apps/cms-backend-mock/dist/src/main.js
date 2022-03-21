"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
const contractsBasepath = `${process.cwd()}/fixtures/contracts`;
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const executeContractTesting = false;
    if (executeContractTesting) {
        await loadContractsAndInitSwagger(app);
    }
    const port = process.env.port || 3333;
    await app.listen(port, () => {
        console.log('Listening at http://localhost:' + port);
    });
}
async function getContractsList() {
    const contracts = await readdir(contractsBasepath);
    return contracts
        .filter((file) => file.endsWith('.yaml'))
        .map((file) => path.join(contractsBasepath, file));
}
async function loadContractsAndInitSwagger(app) {
    var e_1, _a;
    const contracts = await getContractsList();
    try {
        for (var contracts_1 = tslib_1.__asyncValues(contracts), contracts_1_1; contracts_1_1 = await contracts_1.next(), !contracts_1_1.done;) {
            const contract = contracts_1_1.value;
            console.log(`Loading Swagger contract: ${contract}...`);
            const yml = require('js-yaml').safeLoad(fs.readFileSync(contract), 'utf8');
            await swagger_1.initializeSwagger(app, yml);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (contracts_1_1 && !contracts_1_1.done && (_a = contracts_1.return)) await _a.call(contracts_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
bootstrap();
//# sourceMappingURL=main.js.map