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
  delete req.body.confirmPassword;
  console.log(req.body);
  
})

router.get('/login',(req,res)=>{
  res.render('user/login',{loginOrSignupPage:true})
})
router.post('/login',(req,res)=>{
  console.log(req.body)
})

module.exports = router;
