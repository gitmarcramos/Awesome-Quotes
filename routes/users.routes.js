var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next){
  res.send('index');
})

router.get('/login', function(req, res, next){
  res.render('partials/login/signin.hbs');
})

router.get('/signup', function(req, res, next){
  res.render('partials/login/signup');
})

module.exports = router;
