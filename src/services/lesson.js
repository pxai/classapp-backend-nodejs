
const lessonsRepository = require('../repositories/lessons');

function find (id) {
  return lessonsRepository.find(id);
}

function findAll () {
  return lessonsRepository.findAll();
}

function create (name, description, courseId) {
  return lessonsRepository.create(name, description, courseId);
}

function update (id, name, description, course_id) {
  return lessonsRepository.update(id, name, description, course_id);
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