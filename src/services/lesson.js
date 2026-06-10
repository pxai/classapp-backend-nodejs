
const lessonsRepository = require('../repositories/lessons');

function find (id) {
  return lessonsRepository.find(id);
}

function findAll () {
  return lessonsRepository.findAll();
}

function create (name, description) {
  return lessonsRepository.create(name, description);
}

function update (id, name, description) {
  return lessonsRepository.update(id, name, description);
}

function destroy (id) {
  return lessonsRepository.destroy(id);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
}