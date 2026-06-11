const fs = require('fs');
const path = require('path');
const { getPool } = require('../db');

const findAllUsersSql = fs.readFileSync(
  path.join(__dirname, 'sql/users/findAllUsers.sql'),
  'utf8'
);
const findUserByIdSql = fs.readFileSync(
  path.join(__dirname, 'sql/users/findUserById.sql'),
  'utf8'
);

const createUserSql = fs.readFileSync(
  path.join(__dirname, 'sql/users/createUser.sql'),
  'utf8'
);

const updateUserSql = fs.readFileSync(
  path.join(__dirname, 'sql/users/updateUser.sql'),
  'utf8'
);

const deleteUserSql = fs.readFileSync(
  path.join(__dirname, 'sql/users/deleteUser.sql'),
  'utf8'
);

async function find(id) {
  const [rows] = await getPool().query(findUserByIdSql, [id]);
  return rows[0] ?? null;
}

async function findAll() {
  const [rows] = await getPool().query(findAllUsersSql);
  return rows;
}

async function create (email, password, description) {
  const id = Math.random();
  const row = await getPool.query(createUserSql, [id, email, password, description])
  return row;
}

async function update (id, email, password, description) {
  const row = await getPool.query(updateUserSql, [id, email, password, description])
  return row;
}

async function destroy (id) {
  const row = await getPool.query(deleteUserSql, [id])
  return row;
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
};
