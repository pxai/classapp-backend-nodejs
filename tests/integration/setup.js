const { setTestEnvDefaults } = require('../helpers/prepareTestDatabase');

setTestEnvDefaults();
jest.setTimeout(30000);
