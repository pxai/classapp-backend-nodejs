const mysql = require('mysql2/promise');
const { getDbConfig, getTestDatabaseName } = require('../../db/config');

describe('test database', () => {
  it('connects to the test database', async () => {
    const db = await mysql.createConnection(getDbConfig());
    const [rows] = await db.query('SELECT DATABASE() AS name');
    await db.end();

    expect(rows[0].name).toBe(getTestDatabaseName());
  });

  it('has migrated and seeded courses', async () => {
    const db = await mysql.createConnection(getDbConfig());
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM courses');
    await db.end();

    expect(Number(rows[0].count)).toBeGreaterThan(0);
  });
});
