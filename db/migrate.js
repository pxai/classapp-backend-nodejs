const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');

function splitStatements(sql) {
  return sql
    .split(';')
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);
}

async function migrate() {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  await db.execute(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [rows] = await db.query(
    'SELECT version FROM schema_migrations'
  );

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
  console.log('Done');
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
