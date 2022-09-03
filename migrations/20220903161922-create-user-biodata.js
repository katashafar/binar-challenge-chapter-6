"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserBiodata", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserGameID: {
        type: Sequelize.INTEGER,
      },
      DOB: {
        type: Sequelize.DATEONLY,
      },
      POB: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserBiodata");
  },
};
