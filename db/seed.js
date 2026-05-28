const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');
const { getDbConfig } = require('./config');
const { splitStatements } = require('./sql');

async function runSeeds(config = getDbConfig()) {
  const db = await mysql.createConnection(config);

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
}

if (require.main === module) {
  runSeeds()
    .then(() => console.log('Seed complete'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { runSeeds };
