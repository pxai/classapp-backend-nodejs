const { closePool } = require('../../src/db');

module.exports = async () => {
  await closePool();
};
