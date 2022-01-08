const { DataTypes } = require('sequelize');
const conn = require('../connect');
const UserModel = require('./user');

const MemberModel = conn.define('members', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  documentId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'members',
});

MemberModel.belongsTo(UserModel, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

module.exports = MemberModel;
