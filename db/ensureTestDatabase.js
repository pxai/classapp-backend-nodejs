const mysql = require('mysql2/promise');
const { getAdminConfig, getTestDatabaseName } = require('./config');

async function ensureTestDatabase() {
  const database = getTestDatabaseName();
  const connection = await mysql.createConnection(getAdminConfig());

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  await connection.end();
}

module.exports = { ensureTestDatabase };
