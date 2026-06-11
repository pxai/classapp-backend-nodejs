const { Certificate } = require('node:crypto');
const userService = require('../services/user');

async function list(req, res) {
  const users = await userService.findAll();
  res.send(users);
}

async function show(req, res) {
  const user = await userService.find(req.params.id);
  if (!user) {
    return res.status(404).send({});
  }
  res.send(user);
}

async function create(req, res) {
  const { email, password, description} = req.body.params;
  const user = await userService.create(email, password, description);
  res.send(user ?? {});
}

async function update(req, res) {
  const { email, password, description } = req.body.params;
  const user = await userService.update(req.params.id, email, password, description);
  res.send(user ?? {});
}

async function destroy(req, res) {
  const user = await userService.destroy(req.params.id);
  res.send(user ?? {});
}

module.exports = {
  list,
  show,
  create,
  update,
  destroy
};
