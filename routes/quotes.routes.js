const express = require("express");
const router = express.Router();
const quoteModel = require("./../models/Quotes.model");
const userModel = require("./../models/Users.model");

// GET Create quote
router.get("/create-quote", (req, res, next) => {
  res.render("partials/quote_create", {
    script: ["add-person.js"],
  });
});

router.post("/create-quote", async (req, res, next) => {
  try {
    const userDebug = await userModel.find({name: 'Paul'});
    const {user, text} = req.body;
    const quotes = [];
    for (let i = 0; i < user.length; i++) {
      quotes.push({user: user[i], text: text[i]});
    }
    const newQuote = {
      ...req.body,
      dateCreatedAt: new Date(Date.now()),
      quotes: quotes,
      publisher: userDebug[0]._id // to change to req.locals.currentUser._id
     };
    await quoteModel.create(newQuote);
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.redirect('/quotes/create-quote');
  }
});

router.get("/:id([a-z0-9]{24})", async (req, res, next) => {
  try {
    const quote = await quoteMode.findById(req.params.id);
    res.render("partials/quote_card", {quote});
  } catch {
    res.redirect('/home');
  }
})

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
