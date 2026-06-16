const { Certificate } = require('node:crypto');
const permissionService = require('../services/permission');

async function show(req, res) {
  const { domain_id, user_id } = req.body.params;
  const permission = await permissionService.find(domain_id, user_id);
  res.send(permission ?? {});
}

async function showUserPermissions(req, res) {
  const { user_id } = req.params;
  const permission = await permissionService.findUserPermissions(user_id);
  res.send(permission ?? {});
}

async function showDomainPermissions(req, res) {
  const { domain_id } = req.params;;
  const permission = await permissionService.findDomainPermissions(domain_id);
  res.send(permission ?? {});
}

async function create(req, res) {
  const { domain_id, user_id, role } = req.body.params;
  const permission = await permissionService.create(domain_id, user_id, role);
  res.send(permission ?? {});
}

async function update(req, res) {
  const { user_id } = req.params;
  const { role, domain_id } = req.body.params;
  const permission = await permissionService.update(role, domain_id, user_id);
  res.send(permission ?? {});
}

async function destroy(req, res) {
  const { user_id } = req.params;
  const { domain_id } = req.body.params;
  const permission = await permissionService.destroy(domain_id, user_id);
  res.send(permission ?? {});
}

module.exports = {
  show,
  showUserPermissions,
  showDomainPermissions,
  create,
  update,
  destroy
};
