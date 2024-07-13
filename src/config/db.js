// Import required modules
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    port: "25060",
    dialect: "mysql",
    logging: false,
  }
);

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // await sequelize.sync({ force: true });
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Export Sequelize instance and testConnection function
module.exports = { sequelize, testConnection };