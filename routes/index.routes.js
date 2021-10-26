const express = require('express');
const router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// GET home page
router.get('/home', function(req, res, next) {
  res.render('home', {
    script: ["animation.js"]
  })
})
module.exports = router;
