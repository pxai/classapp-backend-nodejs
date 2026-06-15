const { Certificate } = require('node:crypto');
const domainService = require('../services/domain');

async function list(req, res) {
  const domains = await domainService.findAll();
  res.send(domains);
}

async function show(req, res) {
  const domain = await domainService.find(req.params.id);
  res.send(domain ?? {});
}

async function create(req, res) {
  const { name, description} = req.body.params;
  const domain = await domainService.create(name, description);
  res.send(domain ?? {});
}

async function update(req, res) {
  const { name, description} = req.body.params;
  const domain = await domainService.update(req.params.id, name, description);
  res.send(domain ?? {});
}

async function destroy(req, res) {
  const domain = await domainService.destroy(req.params.id);
  res.send(domain ?? {});
}

module.exports = {
  list,
  show,
  create,
  update,
  destroy
};
