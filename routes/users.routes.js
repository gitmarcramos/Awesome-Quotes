var express = require('express');
var router = express.Router();


// GET users
router.get("/", (req, res, next) => {
  res.render('user')
})

/* GET users/my-account */
router.get('/my-account', function(req, res, next){
  res.render('my_account');
})


module.exports = router;
