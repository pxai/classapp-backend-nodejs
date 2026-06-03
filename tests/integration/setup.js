const { setTestEnvDefaults } = require('../helpers/prepareTestDatabase');
const { closePool } = require('../../src/db');

setTestEnvDefaults();
jest.setTimeout(30000);

afterAll(async () => {
  await closePool();
});
