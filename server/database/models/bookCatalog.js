const { DataTypes } = require('sequelize');
const conn = require('../connect');
const UserModel = require('./user');

const BookCatalogModel = conn.define('bookCatalogs', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  bookCode: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  publicationDate: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'bookCatalogs',
  timestamps: true,
});

BookCatalogModel.belongsTo(UserModel, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

module.exports = BookCatalogModel;
