const express = require("express")
const router = express.Router()

router.get('/auth/login' , function(req, res, next){
    res.render('partials/auth/signin');
  })
  
  router.get('/auth/create-account', function(req, res, next){
    res.render('partials/auth/signup');
  })