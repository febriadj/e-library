const { DataTypes } = require('sequelize');
const conn = require('../connect');
const UserModel = require('./user');

const BookCatalogModel = conn.define('bookCatalogs', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  bookCode: {
    type: DataTypes.CHAR(12),
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING,
    defaultValue: null,
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
  foreignKey: 'userId',
});

module.exports = BookCatalogModel;
