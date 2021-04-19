var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let heading = 'Dashboard'
  res.render('admin/admin-dashboard',{admin:true,heading})
});
router.get('/admin-order',(req,res) =>{
  let heading = 'Order Details'
  res.render('admin/admin-order',{admin:true,heading})
})
router.get('/add-product',(req,res) => {
  res.render('admin/admin-add-product',{admin:true})
})
router.post('/add-product',(req,res) => {
  console.log(req.body);
})
module.exports = router;

