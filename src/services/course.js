
const coursesRepository = require('../repositories/courses');

function find (id) {
  return coursesRepository.find(id);
}

function findAll () {
  return coursesRepository.findAll()
}

module.exports = {
  find,
  findAll
}