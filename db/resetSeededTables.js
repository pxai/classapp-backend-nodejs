const mysql = require('mysql2/promise');
const { getDbConfig } = require('./config');

async function resetSeededTables(config = getDbConfig()) {
  const db = await mysql.createConnection(config);

  await db.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.query('TRUNCATE TABLE lessons');
  await db.query('TRUNCATE TABLE courses');
  await db.query('TRUNCATE TABLE users');
  await db.query('TRUNCATE TABLE domains');
  await db.query('SET FOREIGN_KEY_CHECKS = 1');
  await db.end();
}

module.exports = { resetSeededTables };
