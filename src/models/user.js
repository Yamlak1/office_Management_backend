const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("users", {
  email: { type: Sequelize.TEXT, allowNull: false },
  password: { type: Sequelize.TEXT, allowNull: false },
  user_type: { type: Sequelize.TEXT, allowNull: false },
  full_name: { type: Sequelize.TEXT, allowNull: true},
});
module.exports = User;
