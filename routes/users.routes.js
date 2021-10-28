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

router.get("/:pseudo", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.pseudo)
    const listQuotes = await quoteModel.find({publisher: user})
    res.render("users", {user , listQuotes})
  } catch (err){
    console.log(err)
  }
})


module.exports = router;
