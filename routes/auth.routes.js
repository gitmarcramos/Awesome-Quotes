const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./../models/Users.model");
const protectAuthRoute = require("./../middlewares/protectAuthRoute");

// router.use(protectAuthRoute);
// DEBUG has to be removed

router.get("/login", function (req, res, next) {
  res.render("/auth/signin.hbs");
});

router.get("/create-account", function (req, res, next) {
  res.render("/auth/signup");
});

router.get("/", function (req, res, next) {
  res.redirect("/auth/signin");
});

router.post("/login", async function (req, res, next) {
  const { mail, password } = req.body;
  const foundUser = await userModel.findOne({ mail: mail });

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

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ mail: newUser.mail });

    if (foundUser) {
      res.redirect("/auth/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await userModel.create(newUser);
      res.redirect("/auth/login");
    }
  } catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    console.error(errorMessage);
    res.redirect("/auth/signup");
  }
});

module.exports = router;
