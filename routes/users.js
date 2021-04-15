var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/home',{admin:false})
});
router.get('/signup',(req,res) => {
  res.render('user/signup',{loginOrSignupPage:true});
})

router.post('/signup',(req,res) => {
  console.log(req.body);
  
})

module.exports = router;
