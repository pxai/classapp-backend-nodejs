jest.mock('../../../src/services/domain');

const domainService = require('../../../src/services/domain');
const domainsController = require('../../../src/controllers/domains');

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('domainsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('sends domains from the service', async () => {
      const domains = [{ id: 1, name: 'Node.js Basics' }];
      domainService.findAll.mockResolvedValue(domains);

      const req = {};
      const res = mockResponse();

      await domainsController.list(req, res);

      expect(domainService.findAll).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(domains);
    });
  });

  describe('show', () => {
    it('sends the domain from the service', async () => {
      const domain = { id: 1, name: 'Node.js Basics' };
      domainService.find.mockResolvedValue(domain);

      const req = { params: { id: '1' } };
      const res = mockResponse();

      await domainsController.show(req, res);

      expect(domainService.find).toHaveBeenCalledWith('1');
      expect(res.send).toHaveBeenCalledWith(domain);
    });

    it('sends an empty object when the domain is missing', async () => {
      domainService.find.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = mockResponse();

      await domainsController.show(req, res);

      expect(res.send).toHaveBeenCalledWith({});
    });
  });

  describe('create', () => {
    it('creates a domain from the service', async () => {
      const domain = { name: 'Node.js Basics', description: 'Introduction to Node.js' };
      domainService.create.mockResolvedValue(domain);

      const req = { body: { params: { name: domain.name, description: domain.description } } };
      const res = mockResponse();

      await domainsController.create(req, res);

      expect(domainService.create).toHaveBeenCalledWith(domain.name, domain.description);
      expect(res.send).toHaveBeenCalledWith(domain);
    });
  });

  describe('update', () => {
    it('updates a domain from the service', async () => {
      const domain = { name: 'Node.js Basics changed', description: 'Introduction to Node.js changed' };
      const id = '1';
      domainService.update.mockResolvedValue(domain);

      const req = { body: { params: { name: domain.name, description: domain.description } }, params: { id } };
      const res = mockResponse();

      await domainsController.update(req, res);

      expect(domainService.update).toHaveBeenCalledWith(id, domain.name, domain.description);
      expect(res.send).toHaveBeenCalledWith(domain);
    });
  });

  describe('delete', () => {
    it('deletes a domain from the service', async () => {
      const id = '1';
      const domain = { id: 1, name: 'Node.js Basics', description: 'Introduction to Node.js' };
      domainService.destroy.mockResolvedValue(domain);

      const req = { params: { id } };
      const res = mockResponse();

      await domainsController.destroy(req, res);

      expect(domainService.destroy).toHaveBeenCalledWith(id);
      expect(res.send).toHaveBeenCalledWith(domain);
    });

    it('sends an empty object when the domain is missing', async () => {
      domainService.destroy.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = mockResponse();

      await domainsController.destroy(req, res);

      expect(res.send).toHaveBeenCalledWith({});
    });
  });
});
