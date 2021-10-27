const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./../models/Users.model");
const protectAuthRoute = require("./../middlewares/protectAuthRoute");

// router.use(protectAuthRoute);
// DEBUG has to be removed


// GET login page
router.get("/login", function (req, res, next) {
  res.render("auth/login");
});


// GET auth page
router.get("/", function (req, res, next) {
  res.redirect("/auth/login");
});


// POST login page
router.post("/login", async function (req, res, next) {
  const { mail, password } = req.body;
  const foundUser = await userModel.findOne({ mail: mail });


  //! NEED TO CREATE FLASH MESSAGES 
  if (!foundUser) {
    res.redirect("/auth/login");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      res.redirect("/auth/login");
    } else {
      const userObject = foundUser.toObject(); // needed to convert mongoose object to classic js object
      delete userObject.password; // remove password before saving user in session

      req.session.currentUser = userObject;
      // above: Store the user in the session (data server side + a cookie is sent client side)

      res.redirect("/home");
    }
  }
});



//GET create-account page
router.get("/create-account", function (req, res, next) {
  res.render("auth/create-account");
});


// POST create-account page
router.post("/create-account", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await userModel.findOne({ mail: newUser.mail });

    console.log(newUser);
    if (foundUser) {
      console.error("account already exist")
      res.redirect("/auth/create-account");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      newUser.creationDate = new Date(Date.now());
      console.log(newUser);
      await userModel.create(newUser);
      res.redirect("/auth/login");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/auth/create-account");
  }
});






module.exports = router;
