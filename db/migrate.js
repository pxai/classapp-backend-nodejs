const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');
const { getDbConfig } = require('./config');
const { splitStatements } = require('./sql');

async function runMigrations(config = getDbConfig()) {
  const db = await mysql.createConnection(config);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [rows] = await db.query('SELECT version FROM schema_migrations');

  const applied = new Set(rows.map((r) => r.version));

  const files = (await fs.readdir('./db/migrations')).sort();

  for (const file of files) {
    if (applied.has(file)) continue;

    const sql = await fs.readFile(
      path.join('./db/migrations', file),
      'utf8'
    );

    console.log('Applying', file);

    await db.beginTransaction();
    try {
      for (const statement of splitStatements(sql)) {
        await db.query(statement);
      }

      await db.execute(
        'INSERT INTO schema_migrations(version) VALUES (?)',
        [file]
      );

      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    }
  }

  await db.end();
}

if (require.main === module) {
  runMigrations()
    .then(() => console.log('Done'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { runMigrations };
