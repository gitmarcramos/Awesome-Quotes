var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/index', function(req, res, next){
  res.send('partials/index');
})

router.get('/login' , function(req, res, next){
  res.render('partials/login/signin');
})

router.get('/signup', function(req, res, next){
  res.render('partials/login/signup');
})

module.exports = router;
