var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
const otpGenerator = require('otp-generator');
const productHelpers = require('../helpers/productHelpers');
const { Db } = require('mongodb');
const checkUser = require('../middleware/checkUser');

// Global variables
let OTP, wrong = '';
//Global varible

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let user = req.session.user
  if (user) {
    productHelpers.getProductForHomePageCards(req.session.userLoggedIn, req.session.user._id).then((products) => {
      productHelpers.getProductForCart(user._id).then((cart) => {
        cart = cart.length
        res.render('user/home', { admin: false, user, products,cart })
      })
    })
  } else {
    productHelpers.getProductForHomePageCards().then((products) => {
      res.render('user/home', { admin: false, user, products })
    })
  }

});

//signup

router.get('/signup', (req, res) => {
  res.render('user/signup', { loginOrSignupPage: true });
})
router.post('/signup', (req, res) => {
  delete req.body.confirmPassword;
  userHelpers.doSignup(req.body).then((signUpDetails) => {
    req.session.user = signUpDetails;
    req.session.userLoggedIn = true;
    res.json({ status: true })
  })
})
router.get('/products', (req, res) => {
  console.log(req.query.category);
  productHelpers.getProductByCategory(req.query.category).then((products) => {
    if (products.length == 0) {
      res.render('user/product-page')
    } else {
      res.render('user/product-page', { products })
    }
  })
})
router.get('/login', (req, res) => {
  if (req.session.userLoggedIn) {
    res.redirect('/')
  } else {
    res.render('user/login', { "loginErr": req.session.loginErr, loginOrSignupPage: true })
    req.session.loginErr = false
  }
})
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.userLoggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr = true
      res.redirect('/login')
    }
  })
})
router.get('/product-details/:id',(req,res) =>{
  productHelpers.getProductById(req.params.id).then((product)=>{
    productHelpers.getProductByCategory(product.category).then((productByCategory) => {
      res.render('user/product-details-page',{product,productByCategory})
    })
  })
})
router.get('/wishlist',(req,res) => {
  let user = req.session.user
  productHelpers.getProductByWishlist(req.session.user._id).then((products) =>{
    res.render('user/wishlist-page',{products,user})
  })
})
router.get('/add-to-cart/:id',checkUser.checkUserAvailability,(req,res) => {
  let user = req.session.user
  console.log('userid ',user._id);
  userHelpers.addToCart(user._id,req.params.id).then((data)=>{
    res.redirect('/go-to-cart')
  })
})
router.get('/go-to-cart',(req,res) => {
  let user = req.session.user
  productHelpers.getProductForCart(user._id).then((cartData) => {
    res.render('user/cart-page',{user,cartData})
  })
})

// --------------------------------------Ajax-------------------------------------------------------------

router.post('/check-mobile', (req, res) => {
  console.log(req.body);
  userHelpers.checkMobile(req.body).then((data) => {
    res.json(data)
  })
})
router.post('/check-email', (req, res) => {
  console.log(req.body);
  userHelpers.checkEmail(req.body).then((data) => {
    res.json(data)
  })
})
//signup ends
router.get('/otp-verify', (req, res) => {
  if (req.session.userLoggedIn) {
    let mobile = req.session.user.mobile
    if (wrong == '') {
      OTP = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
      console.log(OTP);
    }
    res.render('user/otp-form', { mobile, loginOrSignupPage: true, wrong })
  } else {
    res.redirect('/')
  }
})
router.post('/otp-verify', (req, res) => {
  if (OTP == req.body.otp) {
    res.redirect('/');
  } else {
    wrong = 'Wrong OTP!'
    res.redirect('/otp-verify')
  }
})
//otp verification
router.post('/add-or-remove-wishlist',(req, res) => {
  if(req.session.userLoggedIn) {
    userHelpers.updateuserWishlist(req.session.user._id, req.body.product).then((data) => {
      res.json({ status: data })
    })
  }else{ 
    res.json({status:false})
  }
})
// --------------------------------------Ajax-------------------------------------------------------------
module.exports = router;
