const courseService = require('../services/course');

async function list(req, res) {
  const courses = await courseService.findAll();
  res.send(courses);
}

async function show(req, res) {
  const course = await courseService.find(req.params.id);
  res.send(course ?? {});
}

module.exports = {
  list,
  show,
};
