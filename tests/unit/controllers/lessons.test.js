jest.mock('../../../src/services/lesson');

const lessonService = require('../../../src/services/lesson');
const lessonsController = require('../../../src/controllers/lessons');

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('lessonsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('sends lessons from the service', async () => {
      const lessons = [{ id: 1, name: 'Node.js Basics' }];
      lessonService.findAll.mockResolvedValue(lessons);

      const req = {};
      const res = mockResponse();

      await lessonsController.list(req, res);

      expect(lessonService.findAll).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(lessons);
    });
  });

  describe('show', () => {
    it('sends the lesson from the service', async () => {
      const lesson = { id: 1, name: 'Node.js Basics' };
      lessonService.find.mockResolvedValue(lesson);

      const req = { params: { id: '1' } };
      const res = mockResponse();

      await lessonsController.show(req, res);

      expect(lessonService.find).toHaveBeenCalledWith('1');
      expect(res.send).toHaveBeenCalledWith(lesson);
    });

    it('sends an empty object when the lesson is missing', async () => {
      lessonService.find.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = mockResponse();

      await lessonsController.show(req, res);

      expect(res.send).toHaveBeenCalledWith({});
    });
  });

  describe('create', () => {
    it('creates a lesson from the service', async () => {
      const lesson = { name: 'Node.js Basics', description: 'Introduction to Node.js', courseId: 1 };
      lessonService.create.mockResolvedValue(lesson);

      const req = { body: { params: { name: lesson.name, description: lesson.description, courseId: lesson.courseId } } };
      const res = mockResponse();

      await lessonsController.create(req, res);

      expect(lessonService.create).toHaveBeenCalledWith(lesson.name, lesson.description, lesson.courseId);
      expect(res.send).toHaveBeenCalledWith(lesson);
    });
  });

  describe('update', () => {
    it('updates a lesson from the service', async () => {
      const lesson = { name: 'Node.js Basics changed', description: 'Introduction to Node.js changed', courseId: 1 };
      const id = '1';
      lessonService.update.mockResolvedValue(lesson);

      const req = { body: { params: { name: lesson.name, description: lesson.description, courseId: lesson.courseId } }, params: { id } };
      const res = mockResponse();

      await lessonsController.update(req, res);

      expect(lessonService.update).toHaveBeenCalledWith(id, lesson.name, lesson.description, lesson.courseId);
      expect(res.send).toHaveBeenCalledWith(lesson);
    });
  });

  describe('delete', () => {
    it('deletes a lesson from the service', async () => {
      const id = '1';
      const lesson = { id: 1, name: 'Node.js Basics', description: 'Introduction to Node.js', courseId: 1 };
      lessonService.destroy.mockResolvedValue(lesson);

      const req = { params: { id } };
      const res = mockResponse();

      await lessonsController.destroy(req, res);

      expect(lessonService.destroy).toHaveBeenCalledWith(id);
      expect(res.send).toHaveBeenCalledWith(lesson);
    });

    it('sends an empty object when the lesson is missing', async () => {
      lessonService.destroy.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = mockResponse();

      await lessonsController.destroy(req, res);

      expect(res.send).toHaveBeenCalledWith({});
    });
  });
});
