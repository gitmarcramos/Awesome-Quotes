const express = require("express");
const router = express.Router();


// GET Create quote
router.get("/create-quote", (req, res, next) => {
    res.render("partials/quote_create")
})


module.exports = router