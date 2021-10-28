const express = require("express");
const router = express.Router();
const quoteModel = require("./../models/Quotes.model");

/* GET index page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    script: ["index-time.js"],
  });
});

// GET home page
router.get("/home", async function (req, res, next) {
  try {
    const listQuotes = await quoteModel
      .find()
      .sort({ dateCreatedAt: -1 })
      .populate("publisher");

    res.render("home", {
      listQuotes,
      script: ["animation.js", "format-date.js"],
      css: ["quote-card.css"],
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/filter", function (req, res, next) {
  res.render("filter", {
    script: ["format-date.js"]
  });
});

//GET About Page
router.get("/about", function (req, res, next) {
  res.render("about");
});

module.exports = router;
