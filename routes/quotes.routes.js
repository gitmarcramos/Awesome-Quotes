const express = require("express");
const router = express.Router();
const quoteModel = require("./../models/Quotes.model");
const userModel = require("./../models/Users.model");

// GET Create quote
router.get("/create-quote", (req, res, next) => {
    res.render("partials/quote_create");
})

router.post("/create-quote", async (req, res, next) => {
  try {
    const newQuote = { ...req.body };
    await quoteModel.create(newQuote);
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.redirect('/create-quote');
  }
});

router.post("/:id/like", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.locals.currentUser._id);
    const quote = await quoteModel.findById(req.params.id);
    let index = user.likes.indexOf(quote._id);
    if (index > -1) {
      user.likes.splice(index, 1);
      quote.likes--;
    } else {
      user.likes.push(quote._id);
      quote.likes++;
    }
    await userModel.findByIdAndUpdate(req.locals.currentUser._id, user);
    await quoteModel.findByIdAndUpdate(req.params.id, quote);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;