var express = require('express');
var router = express.Router();
const userModel = require("./../models/Users.model");

// GET users
router.get("/", (req, res, next) => {
  res.redirect('/home')
})

/* GET users/my-account */
router.get('/my-account', function(req, res, next){
  res.render('my_account');
})


router.get("/:pseudo", async (req, res, next) => {
  try {
    const user = await userModel.findOne({ pseudo: req.params.pseudo });
    res.render('users', {user});
  } catch {
    res.redirect('/home');
  }
})


module.exports = router;
