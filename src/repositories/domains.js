const fs = require('fs');
const path = require('path');
const { getPool } = require('../db');

const findAllDomainsSql = fs.readFileSync(
  path.join(__dirname, 'sql/domains/findAllDomains.sql'),
  'utf8'
);
const findDomainByIdSql = fs.readFileSync(
  path.join(__dirname, 'sql/domains/findDomainById.sql'),
  'utf8'
);

const createDomainSql = fs.readFileSync(
  path.join(__dirname, 'sql/domains/createDomain.sql'),
  'utf8'
);

const updateDomainSql = fs.readFileSync(
  path.join(__dirname, 'sql/domains/updateDomain.sql'),
  'utf8'
);

const deleteDomainSql = fs.readFileSync(
  path.join(__dirname, 'sql/domains/deleteDomain.sql'),
  'utf8'
);

async function find(id) {
  const [rows] = await getPool().query(findDomainByIdSql, [id]);
  return rows[0] ?? null;
}

async function findAll() {
  const [rows] = await getPool().query(findAllDomainsSql);
  return rows;
}

async function create (name, description) {
  const id = Math.random();
  const row = await getPool.query(createDomainSql, [id, name, description])
  return row;
}

async function update (id, name, description) {
  const row = await getPool.query(updateDomainSql, [id, name, description])
  return row;
}

async function destroy (id) {
  const row = await getPool.query(deleteDomainSql, [id])
  return row;
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
};
