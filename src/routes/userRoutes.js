const express = require('express');
const router = express.Router();
const {loginUser} = require('../controllers/userController');
const {createAccount} =require('../controllers/userController');
const {listUsers} =require('../controllers/userController'); 

const {checkAuthadmin} =require('../controllers/checkAuthadmin'); 

router.post('/login', loginUser);




router.post('/createAccount', checkAuthadmin,createAccount);
router.get('/listUser',checkAuthadmin, listUsers);

module.exports = router;
