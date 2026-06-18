jest.mock('../../../src/services/permission');

const permissionService = require('../../../src/services/permission');
const permissionsController = require('../../../src/controllers/permissions');

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('permissionsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('show', () => {
    it('sends permissions from the service', async () => {
      const permissions = { user_id: 1, domain_id: 1, role: 0 };
      permissionService.find.mockResolvedValue(permissions);

      const req = { params: { user_id: 1, domain_id: 1 } };
      const res = mockResponse();

      await permissionsController.show(req, res);

      expect(permissionService.find).toHaveBeenCalledWith(permissions.domain_id, permissions.user_id);
      expect(res.send).toHaveBeenCalledWith(permissions);
    });

    it('sends an empty object when the permission is missing', async () => {
      permissionService.find.mockResolvedValue(null);

      const req = { params: { id: 999 } };
      const res = mockResponse();

      await permissionsController.show(req, res);

      expect(res.send).toHaveBeenCalledWith({});
    });
  });

    describe('showUserPermissions', () => {
    it('sends user permissions from the service', async () => {
      const permissions = { user_id: 1, domain_id: 1, role: 1 };
      permissionService.findUserPermissions.mockResolvedValue(permissions);

      const req = { params: { user_id: 1 } };
      const res = mockResponse();

      await permissionsController.showUserPermissions(req, res);

      expect(permissionService.findUserPermissions).toHaveBeenCalledWith(permissions.user_id);
      expect(res.send).toHaveBeenCalledWith(permissions);
    });
  });

  describe('showDomainPermissions', () => {
    it('sends domain permissions from the service', async () => {
      const permissions = { user_id: 1, domain_id: 1, role: 1 };
      permissionService.findDomainPermissions.mockResolvedValue(permissions);

      const req = { params: { domain_id: 1 } };
      const res = mockResponse();

      await permissionsController.showDomainPermissions(req, res);

      expect(permissionService.findDomainPermissions).toHaveBeenCalledWith(permissions.domain_id);
      expect(res.send).toHaveBeenCalledWith(permissions);
    });
  });

    describe('create', () => {
      it('creates a permission from the service', async () => {
        const permission = { user_id: 1, domain_id: 2, role: 0 };
        permissionService.create.mockResolvedValue(permission);

        const req = { body: { params: { user_id: permission.user_id, domain_id: permission.domain_id, role: permission.role } } };
        const res = mockResponse();

        await permissionsController.create(req, res);

        expect(permissionService.create).toHaveBeenCalledWith( permission.domain_id, permission.user_id, permission.role );
        expect(res.send).toHaveBeenCalledWith(permission);
      });
    });

    describe('update', () => {
      it('updates a permission from the service', async () => {
        const permission = { user_id: 1, domain_id: 1, role: 2 };
        permissionService.update.mockResolvedValue(permission);

        const req = { body: { params: { domain_id: permission.domain_id, role: permission.role }}, params: { user_id: permission.user_id}  };
        const res = mockResponse();

        await permissionsController.update(req, res);

        expect(permissionService.update).toHaveBeenCalledWith(permission.role, permission.domain_id, permission.user_id);
        expect(res.send).toHaveBeenCalledWith(permission);
      });
    });

    describe('delete', () => {
      it('deletes a permission from the service', async () => {
        const permission = { user_id: 1, domain_id: 1, role: 1 };
        permissionService.destroy.mockResolvedValue(permission);

        const req = { body: { params: { domain_id: permission.domain_id} }, params: { user_id: permission.user_id } };
        const res = mockResponse();

        await permissionsController.destroy(req, res);

        expect(permissionService.destroy).toHaveBeenCalledWith(permission.domain_id, permission.user_id);
        expect(res.send).toHaveBeenCalledWith(permission);
      });

      it('sends an empty object when the permission is missing', async () => {
        permissionService.destroy.mockResolvedValue(null);

        const req = { body: { params: {}}, params: { user_id: 999 } };
        const res = mockResponse();

        await permissionsController.destroy(req, res);

        expect(res.send).toHaveBeenCalledWith({});
      });
    });
});