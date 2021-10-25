const express = require("express");
const router = express.Router();

router.get('/login' , function(req, res, next){
    res.render('auth/login.hbs');
  })
  
  router.get('/create-account', function(req, res, next){
    res.render('auth/create-account');
  })


  module.exports = router;
