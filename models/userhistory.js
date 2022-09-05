'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistory extends Model {

    static associate(models) {

    }
  }
  UserHistory.init({
    UserGameId: DataTypes.INTEGER,
    time: DataTypes.DATE,
    score: DataTypes.ENUM('win', 'draw', 'lose')
  }, {
    sequelize,
    modelName: 'UserHistory',
  });
  return UserHistory;
};