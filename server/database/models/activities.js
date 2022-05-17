const { DataTypes } = require('sequelize');
const conn = require('../connect');
const UserModel = require('./user');

const ActivitiesModel = conn.define('activities', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  page: {
    type: DataTypes.ENUM(['member', 'book', 'loan']),
    allowNull: false,
  },
}, {
  tableName: 'activities',
  timestamps: true,
});

ActivitiesModel.belongsTo(UserModel, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  foreignKey: 'userId',
});

module.exports = ActivitiesModel;
