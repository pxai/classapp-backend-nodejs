jest.mock('../../../src/services/user');

const userService = require('../../../src/services/user');
const usersController = require('../../../src/controllers/users');

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('usersController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('sends users from the service', async () => {
      const users = [{ id: 1, email: 'test@example.com', password: 'password', description: 'Test user' }];
      userService.findAll.mockResolvedValue(users);

      const req = {};
      const res = mockResponse();

      await usersController.list(req, res);

      expect(userService.findAll).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(users);
    });
  });

  describe('show', () => {
    it('sends the user from the service', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'password', description: 'Test user' };
      userService.find.mockResolvedValue(user);

      const req = { params: { id: '1' } };
      const res = mockResponse();

      await usersController.show(req, res);

      expect(userService.find).toHaveBeenCalledWith('1');
      expect(res.send).toHaveBeenCalledWith(user);
    });

    it('sends an empty object when the user is missing', async () => {
      userService.find.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = mockResponse();

      await usersController.show(req, res);

      expect(res.send).toHaveBeenCalledWith({});
    });
  });

  describe('create', () => {
    it('creates a user from the service', async () => {
      const user = { email: 'test@example.com', password: 'password', description: 'Test user' };
      userService.create.mockResolvedValue(user);

      const req = { body: { params: { email: user.email, password: user.password, description: user.description } } };
      const res = mockResponse();

      await usersController.create(req, res);

      expect(userService.create).toHaveBeenCalledWith(user.email, user.password, user.description);
      expect(res.send).toHaveBeenCalledWith(user);
    });
  });

  describe('update', () => {
    it('updates a user from the service', async () => {
      const user = { name: 'Node.js Basics changed', description: 'Introduction to Node.js changed' };
      const id = '1';
      userService.update.mockResolvedValue(user);

      const req = { body: { params: { email: user.email, password: user.password, description: user.description } }, params: { id } };
      const res = mockResponse();

      await usersController.update(req, res);

      expect(userService.update).toHaveBeenCalledWith(id, user.email, user.password, user.description);
      expect(res.send).toHaveBeenCalledWith(user);
    });
  });

  describe('delete', () => {
    it('deletes a user from the service', async () => {
      const id = '1';
      const user = { id: 1, email: 'test@example.com', password: 'password', description: 'Test user' };
      userService.destroy.mockResolvedValue(user);

      const req = { params: { id } };
      const res = mockResponse();

      await usersController.destroy(req, res);

      expect(userService.destroy).toHaveBeenCalledWith(id);
      expect(res.send).toHaveBeenCalledWith(user);
    });

    it('sends an empty object when the user is missing', async () => {
      userService.destroy.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = mockResponse();

      await usersController.destroy(req, res);

      expect(res.send).toHaveBeenCalledWith({});
    });
  });
});
