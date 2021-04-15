var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/home',{admin:false})
});
router.get('/signup',(req,res) => {
  res.render('user/signup',{loginOrSignupPage:true});
})
router.post('/signup',(req,res) => {
  delete req.body.confirmPassword;
  console.log(req.body);
  userHelpers.doSignup(req.body).then((data) => {
    console.log(data.ops[0]);
  })
})
router.post('/check-mobile',(req,res)=> {
  console.log(req.body);
  userHelpers.checkMobile(req.body).then((data) => {
    res.json(data)
  })
})
router.post('/check-email',(req,res) => {
  console.log(req.body);
  userHelpers.checkEmail(req.body).then((data) => {
    res.json(data)
  })
})

module.exports = router;