var db = require('../config/connection')
var collection = require('../config/collections')
const { ObjectId } = require('mongodb')

module.exports = {
    addProduct : (productDetails) =>{
        return new Promise((resolve,reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(productDetails).then(()=>{
                resolve({message:"Product Uploaded successfully"});
            })
        })
    },
    getProductForHomePageCards : (userLoggedIn,userId) =>{
        return new Promise( async(resolve,reject) => {
            if(userLoggedIn){
                let products = await db.get().collection(collection.PRODUCT_COLLECTION).aggregate([
                    {
                        $lookup:{
                            from:collection.WISHLIST_COLLECTION,
                            localField:'_id',
                            foreignField:'wishlist',
                            as:'wishlist'
                        }
                    }
                ]).sort({_id:-1}).limit(15).toArray()
                resolve(products)
            }else{
                let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().sort({_id:-1}).limit(15).toArray() 
                resolve(products)
            }
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