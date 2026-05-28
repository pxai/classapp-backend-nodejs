const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');

function splitStatements(sql) {
  return sql
    .split(';')
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);
}

async function seed() {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  const files = (await fs.readdir('./db/seeds'))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = await fs.readFile(path.join('./db/seeds', file), 'utf8');

    console.log('Running seed', file);

    await db.beginTransaction();
    try {
      for (const statement of splitStatements(sql)) {
        await db.query(statement);
      }
      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    }
  }

  await db.end();
  console.log('Seed complete');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
