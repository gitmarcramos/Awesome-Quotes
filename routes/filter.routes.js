var express = require('express');
var router = express.Router();

router.get('/filter', function(req, res, next){
    res.render('filter')
  })

module.exports = router;