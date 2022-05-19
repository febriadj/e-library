const { Op: operator } = require('sequelize');
const BookCatalogModel = require('../database/models/bookCatalog');
const LoanModel = require('../database/models/loan');
const response = require('../helpers/response');
const pagination = require('../helpers/pagination');
const activities = require('../helpers/activities');

exports.insert = async (req, res) => {
  try {
    const bookCode = Math.floor(100000000000 + Math.random() * 900000000000).toString();

    const data = await BookCatalogModel.create({
      ...req.body,
      bookCode,
      userId: req.user.userId,
    }, {
      logging: false,
    });

    await activities({
      userId: req.user.userId,
      page: 'book',
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
      if (q.length < 3) {
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

    await activities({
      userId: req.user.userId,
      page: 'book',
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

exports.update = async (req, res) => {
  try {
    const loan = await LoanModel.findOne({
      where: {
        userId: req.user.userId,
        bookCode: req.body.bookCode,
      },
      logging: false,
    });

    if (loan) {
      await LoanModel.update({
        bookTitle: req.body.title,
      }, {
        where: {
          userId: req.user.userId,
          bookCode: req.body.bookCode,
        },
        logging: false,
      });
    }

    const book = await BookCatalogModel.update({
      ...req.body,
    }, {
      where: {
        userId: req.user.userId,
        bookCode: req.body.bookCode,
      },
      logging: false,
    });

    await activities({
      userId: req.user.userId,
      page: 'book',
    });

    response({
      res,
      message: 'Successfully updated the book',
      data: book,
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
