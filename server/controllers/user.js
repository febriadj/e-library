const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../database/models/user');
const response = require('../helpers/response');

exports.register = async (req, res) => {
  try {
    const { name: { first, last }, email, password } = req.body;
    // password encryption
    const encrypt = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const data = await UserModel.create({
      id: uuidv4(),
      firstname: first,
      lastname: last,
      email,
      // save encrypted password
      password: encrypt,
    });

    response({
      res,
      message: 'Account registration successful',
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      // conditions if the username or email is not found
      const newError = {
        message: 'User with this Email does not exist',
      }
      throw newError;
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      // condition if password doesn't match
      const newError = {
        message: 'Password doesn\'t match',
      }
      throw newError;
    }

    // create jwt token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_PRIVATE_TOKEN);

    response({
      res,
      message: 'User successfully logged in',
      data: token,
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

exports.findOne = async (req, res) => {
  try {
    const data = await UserModel.findOne({
      where: {
        id: req.user.userId,
      },
      logging: false,
    });

    response({
      res,
      message: 'User successfully logged in',
      data,
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
