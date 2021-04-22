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
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().sort({_id:-1}).limit(15).toArray() 
            if(userLoggedIn){
                console.log(userId);
                let user = await db.get().collection(collection.USER_COLLECTION).findOne({_id : ObjectId(userId)})
                console.log(user.wishlist);
                if(user.wishlist){
                    for(var i = 0;i<user.wishlist.length;i++){
                        for(var j=0;j<products.length;j++){
                            if(products[j]._id==user.wishlist[i]){
                                products[j].wishlist = true;
                            }
                        }
                    }
                }
            }
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