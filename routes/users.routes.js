var express = require("express");
const quoteModel = require("../models/Quotes.model");
var router = express.Router();
const userModel = require("./../models/Users.model");
const protectUserRoute = require("./../middlewares/protectUserRoute");
const fileUploader = require('./../config/cloudinary');

// GET users
router.get("/", (req, res, next) => {
  res.redirect("/home", {
    css: ["user-profil.css"],
  });
});

/* GET users/my-account */
router.get("/my-account", protectUserRoute, async (req, res, next) => {
  try {
    res.render("my_account", {
      css: ["user-profil.css", "quote-card.css"],
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:pseudo", async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      pseudo: { $regex: new RegExp(req.params.pseudo, "i") },
    });
    const listQuotes = await quoteModel
      .find({ publisher: user._id })
      .sort({ dateCreatedAt: -1 })
      .populate("publisher");
    console.log(user, listQuotes);
    res.render("users", {
      user,
      listQuotes,
      script: ["animation.js", "format-date.js"],
      css: ["user-profil.css", "quote-card.css"],
    });
  } catch (error) {
    next(error);
  }
});

//GET update USER INFOS route
router.get("/:pseudo/edit", protectUserRoute, async (req, res, next) => {
  try {
    const foundUser = await userModel.findOne({ pseudo: req.params.pseudo });

    res.render("auth/update-account", {
      foundUser,
      css: ["user-profil.css", "quote-card.css"],
    });
  } catch (err) {
    console.log(err, "There was an error finding the user to update");
  }
});

// POST update USER INFOS route
router.post("/:pseudo/edit", protectUserRoute, fileUploader.single('profilePic'), async (req, res, next) => {
  try {

    if(req.file){
      updateUser.profilePic = req.file.path
    }

    const updateUser = await userModel.findOneAndUpdate(
      req.params.pseudo,
      req.body,
      { new: true }
    );
    res.redirect("/users/my-account");
  } catch (err) {
    console.log(err, "There was an error updating your account");
  }
});

router.get("/:pseudo/delete", protectUserRoute, async (req, res, next) => {
  try {
    await userModel.findOneAndDelete({ _id: req.session.currentUser._id });
    res.redirect("/auth/logout");
  } catch (err) {
    console.log(err, "There was an error finding the user to delete");
  }
});

module.exports = router;