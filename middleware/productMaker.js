module.exports.productObject= (req,res,next) => {
    let images = [];
  for(var i = 0;i<req.files.length;i++){
    images.push(req.files[i].filename)
  }
  let formDetails = req.body;
  if(formDetails.pricing == 'default-pricing'){
    delete formDetails.customMeasureUnit
    delete formDetails.productCustomPrice
    delete formDetails.customQuantity

  }else{
    delete formDetails.measure
    delete formDetails.productPrice
  }
  formDetails.images = images;
//   console.log(formDetails);
  res.locals.formDetails = formDetails
  next()
}