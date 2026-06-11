
const usersRepository = require('../repositories/users');

function find (id) {
  return usersRepository.find(id);
}

function findAll () {
  return usersRepository.findAll();
}

function create (email, password, description) {
  return usersRepository.create(email, password, description);
}

function update (id, email, password, description) {
  return usersRepository.update(id, email, password, description);
}

function destroy (id) {
  return usersRepository.destroy(id);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
}