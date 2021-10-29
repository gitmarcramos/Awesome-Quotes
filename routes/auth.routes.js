const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./../models/Users.model");
const protectAuthRoute = require("./../middlewares/protectAuthRoute");
const fileUploader = require('./../config/cloudinary');



// GET login page
router.get("/login", protectAuthRoute, function (req, res, next) {
  res.render("auth/login");
});

// GET logout
router.get("/logout", async (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/auth/login");
  });
});

// GET auth page
router.get("/", function (req, res, next) {
  res.redirect("/auth/login");
});


// POST login page
router.post("/login", protectAuthRoute, async function (req, res, next) {
  const { mail, password } = req.body;
  const foundUser = await userModel.findOne({ mail: mail });


  if (!foundUser) {
    req.flash("error", "Invalid credentials");
    res.redirect("/auth/login");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/login");
    } else {
      const userObject = foundUser.toObject(); // needed to convert mongoose object to classic js object
      delete userObject.password; // remove password before saving user in session

      req.session.currentUser = userObject;
      // above: Store the user in the session (data server side + a cookie is sent client side)
      req.flash("success", "Successfully logged in...");
      res.redirect("/home");
    }
  }
});


//GET create-account page
router.get("/create-account", protectAuthRoute, function (req, res, next) {
  res.render("auth/create-account");
});


// POST create-account page
router.post("/create-account", protectAuthRoute, fileUploader.single('profilePic'), async (req, res, next) => {
  try {
    const newUser = { ...req.body };

    // check if profil pic is uploaded by user
    if(req.file){
      newUser.profilePic = req.file.path
    }

    const foundUser = await userModel.findOne({ mail: newUser.mail });

    console.log(newUser);
    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/auth/create-account");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password[0], 10);
      newUser.password = hashedPassword;
      newUser.creationDate = new Date(Date.now());
      console.log(newUser);
      await userModel.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/auth/login");
    }
  } catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    req.flash("error", errorMessage);
    res.redirect("/auth/create-account");
  }
});








module.exports = router;
