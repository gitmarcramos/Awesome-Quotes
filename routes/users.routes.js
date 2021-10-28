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
    const user = await userModel.findOne({pseudo: { $regex : new RegExp(req.params.pseudo, "i") } });
    const listQuotes = await quoteModel.find({ publisher: user._id}).sort({dateCreatedAt: -1}).populate('publisher');
    console.log(user , listQuotes);
    res.render("users", {user , listQuotes});
  } catch (error) {
    next(error);
  }
})


module.exports = router;
