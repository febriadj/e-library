const { Op } = require('sequelize');
const moment = require('moment');
const ActivitiesModel = require('../database/models/activities');
const response = require('../helpers/response');

exports.find = async (req, res) => {
  try {
    const today = new Date();

    await ActivitiesModel.destroy({
      where: {
        userId: req.user.userId,
        createdAt: {
          [Op.lt]: new Date(new Date(today.getTime()).setDate(today.getDate() - 6)),
        },
      },
      logging: false,
    });

    const activities = await ActivitiesModel.findAll({
      where: {
        userId: req.user.userId,
      },
      logging: false,
    });

    const n = {
      members: [],
      books: [],
      loans: [],
    }

    for (let i = 0; i < activities.length; i += 1) {
      switch (activities[i].page) {
        case 'member':
          n.members.push(activities[i]);
          break;
        case 'book':
          n.books.push(activities[i]);
          break;
        default:
          n.loans.push(activities[i]);
      }
    }

    const days = [];
    for (let i = 0; i < 7; i += 1) {
      days.push(new Date(today.getTime()).setDate(today.getDate() - i));
    }

    const datasets = (args) => {
      const arr = [];

      for (let i = 0; i < 7; i += 1) {
        arr.push(
          args.filter(({ createdAt }) => (
            moment(createdAt).format('L') === moment(days[i]).format('L')
          )).length,
        )
      }

      return arr;
    }

    response({
      res,
      message: 'Client request has been successfully responded',
      data: {
        days: days.reverse(),
        payload: {
          books: datasets(n.books),
          loans: datasets(n.loans),
          members: datasets(n.members),
        },
      },
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
