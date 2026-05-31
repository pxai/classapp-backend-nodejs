const { prepareTestDatabase } = require('../helpers/prepareTestDatabase');

module.exports = async () => {
  await prepareTestDatabase();
};
