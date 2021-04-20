var db = require('../config/connection')
var collection = require('../config/collections')

module.exports = {
    addProduct : (productDetails) =>{
        return new Promise((resolve,reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(productDetails).then(()=>{
                resolve({message:"Product Uploaded successfully"});
            })
        })
    }
}