var express = require('express');
var router = express.Router();

/* GET users */
router.get('/my-account', function(req, res, next){
  res.render('my_account');
})

module.exports = router;
