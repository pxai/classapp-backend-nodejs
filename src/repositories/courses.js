const fs = require('fs');
const path = require('path');
const { getPool } = require('../db');

const findAllCoursesSql = fs.readFileSync(
  path.join(__dirname, 'sql/courses/findAllCourses.sql'),
  'utf8'
);
const findCourseByIdSql = fs.readFileSync(
  path.join(__dirname, 'sql/courses/findCourseById.sql'),
  'utf8'
);

const createCourseSql = fs.readFileSync(
  path.join(__dirname, 'sql/courses/createCourse.sql'),
  'utf8'
);

const updateCourseSql = fs.readFileSync(
  path.join(__dirname, 'sql/courses/updateCourse.sql'),
  'utf8'
);

const deleteCourseSql = fs.readFileSync(
  path.join(__dirname, 'sql/courses/deleteCourse.sql'),
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

async function create (name, description) {
  const id = Math.random();
  const row = await getPool.query(createCourseSql, [id, name, description])
  return row;
}

async function update (id, name, description) {
  const row = await getPool.query(updateCourseSql, [id, name, description])
  return row;
}

async function destroy (id) {
  const row = await getPool.query(deleteCourseSql, [id])
  return row;
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
};
