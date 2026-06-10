const lessonService = require('../services/lesson')

async function list(req, res) {
  const lessons = await lessonService.findAll();
  res.send(lessons);
}

async function show(req, res) {
  const lesson = await lessonService.find(req.params.id);
  res.send(lesson ?? {});
}

async function create(req, res) {
  const { name, description} = req.body.params;
  const lesson = await lessonService.create(name, description);
  res.send(lesson ?? {});
}

async function update(req, res) {
  const { name, description} = req.body.params;
  const lesson = await lessonService.update(req.params.id, name, description);
  res.send(lesson ?? {});
}

async function destroy(req, res) {
  const lesson = await lessonService.destroy(req.params.id);
  res.send(lesson ?? {});
}

module.exports = {
  list,
  show,
  create,
  update,
  destroy
};
