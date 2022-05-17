const randomId = require('./randomId');
const ActivitiesModel = require('../database/models/activities');

module.exports = async ({
  userId,
  page,
}) => {
  await ActivitiesModel.create({
    id: randomId(16),
    userId,
    page,
  }, {
    logging: false,
  });
};
