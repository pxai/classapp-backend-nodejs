const mysql = require('mysql2/promise');
const { getDbConfig, getTestDatabaseName } = require('../db/config');

describe('test database', () => {
  it('connects to the test database', async () => {
    const db = await mysql.createConnection(getDbConfig());
    const [rows] = await db.query('SELECT DATABASE() AS name');
    await db.end();

    expect(rows[0].name).toBe(getTestDatabaseName());
  });

  it('has migrated tables', async () => {
    const db = await mysql.createConnection(getDbConfig());
    const [rows] = await db.query('SHOW TABLES LIKE ?', ['courses']);
    await db.end();

    expect(rows.length).toBe(1);
  });
});
