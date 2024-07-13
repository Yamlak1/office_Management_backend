const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const DisbursementForecast = sequelize.define("disbursement_forecast", {
  expected_date: { type: Sequelize.DATE, allowNull: false },
  expected_amount: { type: Sequelize.STRING, allowNull: false },
  milestone: { type: Sequelize.STRING, allowNull: false },
  deliverables: { type: Sequelize.TEXT, allowNull: false },
});
module.exports = DisbursementForecast;
