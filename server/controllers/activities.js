const ActivitiesModel = require('../database/models/activities');
const response = require('../helpers/response');

exports.find = async (req, res) => {
  try {
    const activities = await ActivitiesModel.findAll({
      where: {
        userId: req.user.userId,
      },
      order: [['createdAt', 'DESC']],
      logging: false,
    });

    response({
      res,
      message: 'Client request has been successfully responded',
      data: activities,
    });
  }
  catch (error0) {
    response({
      success: false,
      res,
      message: error0.message,
      statusCode: 400,
    });
  }
};
