const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Report = sequelize.define("reports", {
  report: { type: Sequelize.TEXT, allowNull: false },
});
module.exports = Report;
