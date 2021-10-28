var express = require('express');
const quoteModel = require('../models/Quotes.model');
var router = express.Router();
const userModel = require("./../models/Users.model");

// GET users
router.get("/", (req, res, next) => {
  res.redirect("/home");
});

/* GET users/my-account */
router.get("/my-account", async (req, res, next) => {
  try {
    const user = await userModel.findOne({ name: "Paul" });
    console.log(user);
    res.render("my_account", user);
  } catch (err) {
    next(err);
  }
});

router.get("/:pseudo", async (req, res, next) => {
  try {
    const user = await userModel.findOne({pseudo: { $regex : new RegExp(req.params.pseudo, "i") } });
    const listQuotes = await quoteModel.find({ publisher: user._id}).sort({dateCreatedAt: -1}).populate('publisher');
    console.log(user , listQuotes);
    res.render("users", {user , listQuotes});
  } catch (error) {
    next(error);
  }
});

//GET update USER INFOS route
router.get("/:pseudo/edit", async (req, res, next) => {
  try {
    const foundUser = await userModel.findOne({ pseudo: req.params.pseudo });

    res.render("auth/update-account", { foundUser });
  } catch (err) {
    console;
    log(err, "There was an error finding the user to update");
  }
});

// POST update USER INFOS route
router.post("/:pseudo/edit", async (req, res, next) => {
  try {
    const updateUser = await userModel.findOneAndUpdate(
      req.params.pseudo,
      req.body,
      {new: true}
    );

    console.log(updateUser);

    res.redirect('/users/my-account')
  } catch (err) {
    console.log(err, "There was an error updating your account");
  }
});

module.exports = router;
