
const domainsRepository = require('../repositories/domains');

function find (id) {
  return domainsRepository.find(id);
}

function findAll () {
  return domainsRepository.findAll();
}

function create (name, description) {
  return domainsRepository.create(name, description);
}

function update (id, name, description) {
  return domainsRepository.update(id, name, description);
}

function destroy (id) {
  return domainsRepository.destroy(id);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
}