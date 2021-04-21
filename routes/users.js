var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
const otpGenerator = require('otp-generator');
const productHelpers = require('../helpers/productHelpers');
const { Db } = require('mongodb');

// Global variables
let OTP,wrong = '';
//Global varible

/* GET users listing. */
router.get('/', async (req, res, next)=> {
  let user = req.session.user 
  productHelpers.getProductForHomePageCards().then((products) => {
    res.render('user/home',{admin:false,user,products})
  })
});

//signup

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
//signup ends
router.get('/login',(req,res)=>{
 if(req.session.userlogin) {
  res.redirect('/')
 }else{res.render('user/login',{"loginErr":req.session.loginErr,loginOrSignupPage:true})
    req.session.loginErr=false
}
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.userlogin=true
      req.session.user=response.user
      res.redirect('/')

    }else{
      req.session.loginErr=true
      res.redirect('/login')
    }
  })
})
router.get('/otp-verify',(req,res) => {
  if(req.session.userLoggedIn){
    let mobile = req.session.user.mobile
    if(wrong == ''){
      OTP = otpGenerator.generate(6, { upperCase: false, specialChars: false ,alphabets:false});
      console.log(OTP);
    }
    res.render('user/otp-form',{mobile,loginOrSignupPage:true,wrong})
  }else{
    res.redirect('/')
  }
})
router.post('/otp-verify',(req,res) => {
  if(OTP == req.body.otp){
    res.redirect('/');
  }else{
    wrong = 'Wrong OTP!'
    res.redirect('/otp-verify')
  }
})
//otp verification

router.get('/products',(req,res)=> {
  console.log(req.query.category);
  productHelpers.getProductByCategory(req.query.category).then((products) => {
    if(products.length==0){
      res.render('user/product-page')
    }else{
      res.render('user/product-page',{products})
    }
  })
  
})
module.exports = router;
