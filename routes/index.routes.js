const express = require('express');
const router = express.Router();
const quoteModel = require("./../models/Quotes.model");

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// GET home page
router.get('/home', async function(req, res, next) {
  try {
    const listQuotes = await quoteModel.find().sort({ dateCreatedAt: -1});

    res.render('home', {
      listQuotes, 
      script: ["animation.js"]
    })
  } catch (err) {
    console.error(err);
  }
});

router.get('/filter', function(req, res, next){
  res.render('filter')
})

module.exports = router;
