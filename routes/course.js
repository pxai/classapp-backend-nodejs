
const course = (app) => {
	app.get('/course', (req, res) => {
    	res.send([{name: 'Sample1', description: 'Sample1 Course'}, {name: 'Sample2', description: 'Sample2 Course'}]);
	});
};

module.exports = course;
