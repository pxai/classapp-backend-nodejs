jest.mock('../../../src/services/course');

const courseService = require('../../../src/services/course');
const coursesController = require('../../../src/controllers/courses');

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('coursesController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('sends courses from the service', async () => {
      const courses = [{ id: 1, name: 'Node.js Basics' }];
      courseService.findAll.mockResolvedValue(courses);

      const req = {};
      const res = mockResponse();

      await coursesController.list(req, res);

      expect(courseService.findAll).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(courses);
    });
  });

  describe('show', () => {
    it('sends the course from the service', async () => {
      const course = { id: 1, name: 'Node.js Basics' };
      courseService.find.mockResolvedValue(course);

      const req = { params: { id: '1' } };
      const res = mockResponse();

      await coursesController.show(req, res);

      expect(courseService.find).toHaveBeenCalledWith('1');
      expect(res.send).toHaveBeenCalledWith(course);
    });

    it('sends an empty object when the course is missing', async () => {
      courseService.find.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = mockResponse();

      await coursesController.show(req, res);

      expect(res.send).toHaveBeenCalledWith({});
    });
  });
});
