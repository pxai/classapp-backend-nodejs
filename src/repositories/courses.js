const fs = require('fs');
const path = require('path');
const { getPool } = require('../db');

const findAllCoursesSql = fs.readFileSync(
  path.join(__dirname, 'sql/findAllCourses.sql'),
  'utf8'
);
const findCourseByIdSql = fs.readFileSync(
  path.join(__dirname, 'sql/findCourseById.sql'),
  'utf8'
);

async function find(id) {
  const [rows] = await getPool().query(findCourseByIdSql, [id]);
  return rows[0] ?? null;
}

async function findAll() {
  const [rows] = await getPool().query(findAllCoursesSql);
  return rows;
}

module.exports = {
  find,
  findAll,
};
