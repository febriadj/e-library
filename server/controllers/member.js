const { Op: operator } = require('sequelize');
const MemberModel = require('../database/models/member');
const response = require('../helpers/response');
const pagination = require('../helpers/pagination');
const activities = require('../helpers/activities');

exports.insert = async (req, res) => {
  try {
    let memberId = '';
    const str = '0123456789ABCDEFGHIJ0123456789KLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 9; i += 1) {
      const random = Math.floor(Math.random() * str.length);
      memberId += str.charAt(random);
    }

    const member = await MemberModel.create({
      ...req.body,
      userId: req.user.userId,
      id: memberId,
    }, {
      logging: false,
    });

    await activities({
      userId: req.user.userId,
      page: 'member',
    });

    response({
      res,
      message: 'Successfully added member',
      data: member,
    });
  }
  catch (error0) {
    response({
      success: false,
      res,
      message: 'Document ID already used',
      statusCode: 400,
    });
  }
}

exports.find = async (req, res) => {
  try {
    const { q, page, limit } = req.query;
    const paramExists = Object.keys(req.query).length > 0;
    let member;

    if (!paramExists) {
      member = await MemberModel.findAll({
        where: {
          userId: req.user.userId,
        },
        order: [['createdAt', 'DESC']],
        logging: false,
      });
    }

    if (paramExists) {
      if (q.length < 3) {
        member = await MemberModel.findAll({
          where: {
            userId: req.user.userId,
          },
          order: [['createdAt', 'DESC']],
          logging: false,
        });
      } else {
        member = await MemberModel.findAll({
          where: {
            userId: req.user.userId,
            [operator.or]: [
              {
                id: {
                  [operator.like]: `${q}%`,
                },
              },
              {
                fullname: {
                  [operator.like]: `%${q}%`,
                },
              },
            ],
          },
          order: [['createdAt', 'DESC']],
          logging: false,
        });
      }
    }

    const data = pagination(member, page, limit);

    response({
      res,
      message: 'The request was successfully received by the server',
      data: paramExists ? data : member,
    });
  }
  catch (error0) {
    response({
      success: false,
      res,
      message: error0.message,
      statusCode: 403,
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const member = await MemberModel.destroy({
      where: {
        id: req.body.id,
        userId: req.user.userId,
      },
      logging: false,
    });

    await activities({
      userId: req.user.userId,
      page: 'member',
    });

    response({
      res,
      message: 'Successfully deleted member',
      data: member,
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
}

exports.update = async (req, res) => {
  try {
    const member = await MemberModel.update({
      ...req.body,
    }, {
      where: {
        id: req.body.id,
        userId: req.user.userId,
      },
      logging: false,
    });

    await activities({
      userId: req.user.userId,
      page: 'member',
    });

    response({
      res,
      message: 'Successfully updated member data',
      data: member,
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
}
