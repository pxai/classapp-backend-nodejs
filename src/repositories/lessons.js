const fs = require('fs');
const path = require('path');
const { getPool } = require('../db');

const findAllLessonsSql = fs.readFileSync(
  path.join(__dirname, 'sql/lessons/findAllLessons.sql'),
  'utf8'
);
const findLessonByIdSql = fs.readFileSync(
  path.join(__dirname, 'sql/lessons/findLessonById.sql'),
  'utf8'
);

const createLessonSql = fs.readFileSync(
  path.join(__dirname, 'sql/lessons/createLesson.sql'),
  'utf8'
);

const updateLessonSql = fs.readFileSync(
  path.join(__dirname, 'sql/lessons/updateLesson.sql'),
  'utf8'
);

const deleteLessonSql = fs.readFileSync(
  path.join(__dirname, 'sql/lessons/deleteLesson.sql'),
  'utf8'
);

async function find(id) {
  const [rows] = await getPool().query(findLessonByIdSql, [id]);
  return rows[0] ?? null;
}

async function findAll() {
  const [rows] = await getPool().query(findAllLessonsSql);
  return rows;
}

async function create (name, description, courseId) {
  const id = Math.random();
  const row = await getPool.query(createLessonSql, [id, name, description, courseId])
  return row;
}

async function update (id, name, description, courseId) {
  const row = await getPool.query(updateLessonSql, [id, name, description, courseId])
  return row;
}

async function destroy (id) {
  const row = await getPool.query(deleteLessonSql, [id])
  return row;
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
};
