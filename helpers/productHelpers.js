var db = require('../config/connection')
var collection = require('../config/collections')

module.exports = {
    addProduct : (productDetails) =>{
        return new Promise((resolve,reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(productDetails).then(()=>{
                resolve({message:"Product Uploaded successfully"});
            })
        })
    },
    getProductForHomePageCards : () =>{
        return new Promise( async(resolve,reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().sort({_id:-1}).limit(15).toArray()
            resolve(products)
        })
    },
    getProductByCategory : (category) => {
        return new Promise( async(resolve,reject) => {
            console.log('category =' , category);
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find({category:category}).toArray()
            console.log(products);
            resolve(products)
        })
    }
}