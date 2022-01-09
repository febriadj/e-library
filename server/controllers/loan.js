const { v4: uuidv4 } = require('uuid');
const LoanModel = require('../database/models/loan');
const BookCatalogModel = require('../database/models/bookCatalog');
const MemberModel = require('../database/models/member');
const response = require('../helpers/response');

exports.insert = async (req, res) => {
  try {
    const { stock, bookCode } = req.body;

    const book = await BookCatalogModel.findOne({
      where: {
        userId: req.user.userId,
        bookCode,
      },
      logging: false,
    });

    const member = await MemberModel.findOne({
      where: {
        userId: req.user.userId,
        id: req.body.memberId,
      },
      logging: false,
    });

    if (!member) {
      const newError = {
        message: 'The user with this document ID is not registered',
      }
      throw newError;
    }

    if (book.stock - stock < 0) {
      const newError = {
        message: 'Not enough stock',
      }
      throw newError;
    }

    const loan = await LoanModel.create({
      ...req.body,
      userId: req.user.userId,
      id: uuidv4(),
      bookTitle: book.title,
    }, {
      logging: false,
    });

    await BookCatalogModel.update({
      stock: book.stock - stock,
    }, {
      where: {
        userId: req.user.userId,
        bookCode,
      },
      logging: false,
    });

    response({
      res,
      message: 'Your loan application was successful',
      data: loan,
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
    const loan = await LoanModel.findAll({
      where: {
        userId: req.user.userId,
      },
      order: [['createdAt', 'DESC']],
      logging: false,
    });

    response({
      res,
      message: 'The request was successfully received by the server',
      data: loan,
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
    const loanConfig = {
      where: {
        id: req.body.id,
        userId: req.user.userId,
      },
      logging: false,
    }

    const loan = await LoanModel.findOne(loanConfig);
    await LoanModel.destroy(loanConfig);

    await BookCatalogModel.increment({
      stock: +loan.stock,
    }, {
      where: {
        userId: req.user.userId,
        bookCode: loan.bookCode,
      },
      logging: false,
    });

    response({
      res,
      message: 'Successfully deleted loan data',
      data: loan,
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
