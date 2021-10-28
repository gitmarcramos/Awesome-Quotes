var express = require('express');
var router = express.Router();
const quoteModel = require("./../models/Quotes.model");

router.get('/recent', async function(req, res, next){
  res.redirect('/home', {
    css: ["quote-card.css"]
  });
});


router.get('/oldest', async function(req, res, next){
  try {
    const listQuotes = await quoteModel.find().sort({ dateCreatedAt: 1});
    res.render('home', {listQuotes,script: ["format-date.js"], css: ["quote-card.css"]})
  } catch (err) {
    console.error(err);
  }
});

router.get('/most-liked', async function(req, res, next){
  try {
    const listQuotes = await quoteModel.find().sort({ likes: -1 });
    res.render('home', {listQuotes,script: ["format-date.js"], css: ["quote-card.css"]})
  } catch (err) {
    console.error(err);
  }
});

router.get('/most-saved', async function(req, res, next){
  try {
    const listQuotes = await quoteModel.find().sort({ favorites: -1});
    res.render('home', {listQuotes,script: ["format-date.js"], css: ["quote-card.css"]})
  } catch (err) {
    console.error(err);
  }
});

router.get('/tag/:hashtag', async function(req, res, next){
  try {
    const listQuotes = await quoteModel.find({hashtags: req.params.hashtag}).sort({ dateCreatedAt: -1});
    res.render('home', {listQuotes,script: ["format-date.js"], css: ["quote-card.css"]})
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;