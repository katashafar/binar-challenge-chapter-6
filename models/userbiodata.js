"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {

    static associate(models) {

    }
  }
  UserBiodata.init(
    {
      UserGameId: DataTypes.INTEGER,
      DOB: DataTypes.DATE,
      POB: DataTypes.STRING,
      city: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female"),
    },
    {
      sequelize,
      modelName: "UserBiodata",
    }
  );
  return UserBiodata;
};
