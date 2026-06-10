INSERT INTO lessons (course_id, name, description)
VALUES
  ((SELECT id FROM courses WHERE name = 'Node.js Basics'), 'Intro to Node', 'What Node.js is'),
  ((SELECT id FROM courses WHERE name = 'Node.js Basics'), 'Modules', 'Understanding imports and exports'),

  ((SELECT id FROM courses WHERE name = 'Express 5 API'), 'Express Setup', 'Creating an Express app'),
  ((SELECT id FROM courses WHERE name = 'Express 5 API'), 'Routing', 'Working with routes'),

  ((SELECT id FROM courses WHERE name = 'MySQL Fundamentals'), 'Tables', 'Creating tables'),
  ((SELECT id FROM courses WHERE name = 'MySQL Fundamentals'), 'Indexes', 'Understanding indexes');