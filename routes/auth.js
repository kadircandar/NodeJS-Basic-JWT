var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");


router.post('/register', authController.register);
router.post('/sign_in', authController.sign_in);


module.exports = router;