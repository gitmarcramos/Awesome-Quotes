var express = require('express');
const quoteModel = require('../models/Quotes.model');
var router = express.Router();
const userModel = require("./../models/Users.model");

// GET users
router.get("/", (req, res, next) => {
  res.redirect('/home')
})

/* GET users/my-account */
router.get('/my-account', async (req, res, next) => {
  try{
  const user = await userModel.findOne({name: 'Paul'})
  res.render("my_account", user)
}catch(err){
  next(err)
}
})

router.get("/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    const listQuotes = await quoteModel.find({ publisher: req.params.id})
    res.render("users", {user , listQuotes})
  } catch {
    next(error);
  }
})


module.exports = router;
