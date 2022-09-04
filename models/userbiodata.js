"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
