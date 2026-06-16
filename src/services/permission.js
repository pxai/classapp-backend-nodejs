
const permissionsRepository = require('../repositories/permissions');

function find (domain_id, user_id) {
  return permissionsRepository.find(domain_id, user_id);
}

function findUserPermissions (user_id) {
  return permissionsRepository.findUserPermissions(user_id);
}

function findDomainPermissions (domain_id) {
  return permissionsRepository.findDomainPermissions(domain_id);
}

function create (domain_id, user_id, role) {
  return permissionsRepository.create(domain_id, user_id, role);
}

function update (role, domain_id, user_id) {
  return permissionsRepository.update(role, domain_id, user_id);
}

function destroy (domain_id, user_id) {
  return permissionsRepository.destroy(domain_id, user_id);
}

module.exports = {
  find,
  findUserPermissions,
  findDomainPermissions,
  create,
  update,
  destroy,
}