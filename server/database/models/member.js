const { DataTypes } = require('sequelize');
const conn = require('../connect');
const UserModel = require('./user');

const MemberModel = conn.define('members', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
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
