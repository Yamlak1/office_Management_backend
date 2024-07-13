const express = require("express");
const router = express.Router();
const { addDisbursment } = require("../controllers/disbursmentController");
const {listDisbursements} = require("../controllers/disbursmentController");

const {checkAuthuser} =require('../controllers/checkAuthuser'); 
const {checkAuthadmin} =require('../controllers/checkAuthadmin'); 

router.post("/addDisbursment",checkAuthadmin, addDisbursment);
router.get("/listDisbursement",checkAuthuser, listDisbursements);

module.exports = router;
