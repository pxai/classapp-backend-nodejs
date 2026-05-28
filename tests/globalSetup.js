const { ensureTestDatabase } = require('../db/ensureTestDatabase');
const { runMigrations } = require('../db/migrate');
const { resetSeededTables } = require('../db/resetSeededTables');
const { runSeeds } = require('../db/seed');
const { getDbConfig } = require('../db/config');

module.exports = async () => {
  process.env.NODE_ENV = 'test';

  process.env.MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
  process.env.MYSQL_PORT = process.env.MYSQL_PORT || '3306';
  process.env.MYSQL_USER = process.env.MYSQL_USER || 'app';
  process.env.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'app';
  process.env.MYSQL_DATABASE_TEST =
    process.env.MYSQL_DATABASE_TEST || 'classapp_test';
  process.env.MYSQL_ROOT_PASSWORD =
    process.env.MYSQL_ROOT_PASSWORD || 'root';

  await ensureTestDatabase();

  const config = getDbConfig();
  await runMigrations(config);
  await resetSeededTables(config);
  await runSeeds(config);
};
