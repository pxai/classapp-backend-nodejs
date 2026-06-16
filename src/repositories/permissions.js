const fs = require('fs');
const path = require('path');
const { getPool } = require('../db');

const findPermissionSql = fs.readFileSync(
  path.join(__dirname, 'sql/permissions/findPermission.sql'),
  'utf8'
);
const findUserPermissionsSql = fs.readFileSync(
  path.join(__dirname, 'sql/permissions/findUserPermissions.sql'),
  'utf8'
);

const findDomainermissionsSql = fs.readFileSync(
  path.join(__dirname, 'sql/permissions/findDomainPermissions.sql'),
  'utf8'
);

const createPermissionSql = fs.readFileSync(
  path.join(__dirname, 'sql/permissions/createPermission.sql'),
  'utf8'
);

const updatePermissionSql = fs.readFileSync(
  path.join(__dirname, 'sql/permissions/updatePermission.sql'),
  'utf8'
);

const deletePermissionSql = fs.readFileSync(
  path.join(__dirname, 'sql/permissions/deletePermission.sql'),
  'utf8'
);

async function find(domain_id, user_id) {
  const [rows] = await getPool().query(findPermissionSql, [domain_id, user_id]);
  return rows[0] ?? null;
}

async function findUserPermissions(user_id) {
  const [rows] = await getPool().query(findUserPermissionsSql, [user_id]);
  return rows;
}

async function findDomainPermissions(domain_id) {
  const [rows] = await getPool().query(findDomainermissionsSql, [domain_id]);
  return rows;
}

async function create (domain_id, user_id, role)  {
  const id = Math.random();
  const row = await getPool.query(createPermissionSql, [domain_id, user_id, role])
  return row;
}

async function update (role, domain_id, user_id)  {
  const row = await getPool.query(updatePermissionSql, [role, domain_id, user_id])
  return row;
}

async function destroy (domain_id, user_id) {
  const row = await getPool.query(deletePermissionSql, [domain_id, user_id])
  return row;
}

module.exports = {
  find,
  findUserPermissions,
  findDomainPermissions,
  create,
  update,
  destroy,
};
