const mysql = require('mysql2/promise');
const { getDbConfig } = require('../db/config');

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...getDbConfig(),
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  return pool;
}

module.exports = { getPool };
