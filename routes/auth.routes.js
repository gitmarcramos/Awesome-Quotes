const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("./../models/Users.model");

router.get("/login", function (req, res, next) {
  res.render("partials/auth/signin");
});

router.get("/create-account", function (req, res, next) {
  res.render("partials/auth/signup");
});

module.exports = router;