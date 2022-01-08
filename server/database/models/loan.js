const { DataTypes } = require('sequelize');
const conn = require('../connect');

const UserModel = require('./user');
const BookCatalogModel = require('./bookCatalog');

const LoanModel = conn.define('loans', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  bookCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  memberId: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'loans',
});

const obj = {
  onUpdate: 'cascade',
  onDelete: 'cascade',
}

LoanModel.belongsTo(UserModel, obj);

LoanModel.belongsTo(BookCatalogModel, {
  ...obj,
  foreignKey: 'bookCode',
});

module.exports = LoanModel;
