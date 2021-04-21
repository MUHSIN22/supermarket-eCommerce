const { on } = require('cluster');
var express = require('express');
const { response } = require('../app');
var router = express.Router();
var uploadController = require('../controllers/upload');
const productHelpers = require('../helpers/productHelpers');
var productMaker = require('../middleware/productMaker')

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
router.post('/add-product',uploadController.saveProductImages,productMaker.productObject, (req,res) => {
  productHelpers.addProduct(res.locals.formDetails).then((response)=>{
    console.log(response.message);
  })
})
module.exports = router;


