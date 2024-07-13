const express = require("express");
const router = express.Router();
const { addReport, fetchReport } = require("../controllers/reportsController");

const { checkAuthuser } = require('../controllers/checkAuthuser');
const { checkAuthadmin } = require('../controllers/checkAuthadmin');


router.post("/addReport",checkAuthuser, addReport);
router.get("/:userId",checkAuthadmin, fetchReport);

module.exports = router;
