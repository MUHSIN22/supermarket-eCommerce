const { on } = require('cluster');
var express = require('express');
var router = express.Router();
var uploadController = require('../controllers/upload')

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
router.post('/add-product',uploadController.multipleUpload, (req,res) => {
  let productDetails = {}
  let formDetails = req.body;
   console.log(req.body);
   if(formDetails.pricing == 'default-pricing'){
   }

})
module.exports = router;


