
const coursesRepository = require('../repositories/courses');

function find (id) {
  return coursesRepository.find(id);
}

function findAll () {
  return coursesRepository.findAll();
}

function create (name, description) {
  return coursesRepository.create(name, description);
}

function update (id, name, description) {
  return coursesRepository.update(id, name, description);
}

function destroy (id) {
  return coursesRepository.destroy(id);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
}