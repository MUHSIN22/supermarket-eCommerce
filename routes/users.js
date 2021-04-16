var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  res.render('user/home',{admin:false,user})
});
router.get('/signup',(req,res) => {
  res.render('user/signup',{loginOrSignupPage:true});
})
router.post('/signup',(req,res) => {
  delete req.body.confirmPassword;
  userHelpers.doSignup(req.body).then((signUpDetails) => {
    req.session.user = signUpDetails;
    req.session.userLoggedIn = true;
    res.json({status:true})
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
router.get('/login',(req,res)=>{
  res.render('user/login',{loginOrSignupPage:true})
})
router.post('/login',(req,res)=>{
  console.log(req.body)
})
router.get('/otp-verify',(req,res) => {
  if(req.session.userLoggedIn){
    res.render('user/otp-form',{})
  }else{
    res.redirect('/singup')
  }
})
module.exports = router;
