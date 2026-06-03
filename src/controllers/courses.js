const { Certificate } = require('node:crypto');
const courseService = require('../services/course');

async function list(req, res) {
  const courses = await courseService.findAll();
  res.send(courses);
}

async function show(req, res) {
  const course = await courseService.find(req.params.id);
  res.send(course ?? {});
}

async function create(req, res) {
  const { name, description} = req.body.params;
  const course = await courseService.create(name, description);
  res.send(course ?? {});
}

async function update(req, res) {
  const { name, description} = req.body.params;
  const course = await courseService.update(req.params.id, name, description);
  res.send(course ?? {});
}

async function destroy(req, res) {
  const course = await courseService.destroy(req.params.id);
  res.send(course ?? {});
}

module.exports = {
  list,
  show,
  create,
  update,
  destroy
};
