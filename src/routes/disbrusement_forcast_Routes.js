const express = require("express");
const router = express.Router();

const { checkAuthuser } = require("../controllers/checkAuthuser");
const { checkAuthadmin } = require("../controllers/checkAuthadmin");

const {
  CreateDisbrusmentForcast,
} = require("../controllers/disbrusement_forecast_Controller");

const {
  viewDisbursementForecast,
} = require("../controllers/disbrusement_forecast_Controller");

router.post(
  "/addDisbursmentForecast",

  CreateDisbrusmentForcast
);
router.get("/viewDisbursementForecast/:userId", viewDisbursementForecast);

module.exports = router;
