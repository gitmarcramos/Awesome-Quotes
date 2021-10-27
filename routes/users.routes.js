var express = require('express');
var router = express.Router();
const userModel = require("./../models/Users.model");

// GET users
router.get("/", (req, res, next) => {
  res.redirect('/home')
})

/* GET users/my-account */
router.get('/my-account', async (req, res, next) => {
  try{
  const user = await userModel.findOne({name: 'Paul'})
  res.render("my_account", user)
}catch(err){
  next(err)
}
})

router.get("/:pseudo", async (req, res, next) => {
  try {
    const user = await userModel.findOne({ pseudo: req.params.pseudo });
    console.log(user)
    res.render('users', {user});
  } catch {
    res.redirect('/home');
  }
})


module.exports = router;
