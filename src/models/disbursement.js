const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Disbursement = sequelize.define("disbursement", {
  name: { type: Sequelize.TEXT, allowNull: false },
});
module.exports = Disbursement;