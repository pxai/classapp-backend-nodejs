const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const coursesRoutes = require('./routes/courses');
const lessonsRoutes = require('./routes/lessons');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.send({status: 'ok'});
});

app.use('/courses', coursesRoutes);
app.use('/lessons', lessonsRoutes);

if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

module.exports = app;
