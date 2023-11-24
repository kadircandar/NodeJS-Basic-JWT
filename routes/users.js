var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/tasks', authController.loginRequired);

router.get('/profile', authController.profile);


module.exports = router;
