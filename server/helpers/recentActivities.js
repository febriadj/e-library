const randomId = require('./randomId');
const ActivitiesModel = require('../database/models/activities');

module.exports = async ({
  req,
  description,
  action,
}) => {
  await ActivitiesModel.create({
    id: randomId(16),
    userId: req.user.userId,
    action,
    description,
  }, {
    logging: false,
  });
};
