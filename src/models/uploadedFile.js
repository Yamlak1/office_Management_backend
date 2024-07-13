const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Files = sequelize.define("uploadedFile", {
  file_name: { type: Sequelize.TEXT, allowNull: false },
  fileLink: { type: Sequelize.TEXT, allowNull: false },
});

module.exports = Files;
