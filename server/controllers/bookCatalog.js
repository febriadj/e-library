const { Op: operator } = require('sequelize');
const BookCatalogModel = require('../database/models/bookCatalog');
const response = require('../helpers/response');
const pagination = require('../helpers/pagination');

exports.insert = async (req, res) => {
  try {
    const data = await BookCatalogModel.create({
      ...req.body,
      bookCode: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      userId: req.user.userId,
    });

    response({
      res,
      message: 'Successfully added a new book to the library',
      data,
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

exports.find = async (req, res) => {
  try {
    const { q, page, limit } = req.query;
    const paramExists = Object.keys(req.query).length > 0;
    let books;

    if (!paramExists) {
      books = await BookCatalogModel.findAll({
        where: {
          userId: req.user.userId,
        },
        order: [['createdAt', 'DESC']],
        logging: false,
      });
    }

    if (paramExists) {
      if (q.length === 0) {
        books = await BookCatalogModel.findAll({
          where: {
            userId: req.user.userId,
          },
          order: [['createdAt', 'DESC']],
          logging: false,
        });
      } else {
        books = await BookCatalogModel.findAll({
          where: {
            userId: req.user.userId,
            title: {
              [operator.like]: `%${q}%`,
            },
          },
          order: [['createdAt', 'DESC']],
          logging: false,
        });
      }
    }

    const data = pagination(books, page, limit);

    response({
      res,
      message: 'Client request allowed',
      data: paramExists ? data : books,
    });
  }
  catch (error0) {
    response({
      success: false,
      res,
      message: error0.message,
      statusCode: 401,
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const data = await BookCatalogModel.destroy({
      where: {
        userId: req.user.userId,
        bookCode: req.body.bookCode,
      },
      logging: false,
    });

    response({
      res,
      message: 'Managed to delete the book',
      data,
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
