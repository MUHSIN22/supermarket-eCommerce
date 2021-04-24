var db = require('../config/connection')
var collection = require('../config/collections')
const { ObjectId } = require('mongodb')
const collections = require('../config/collections')

module.exports = {
    addProduct : (productDetails) =>{
        return new Promise((resolve,reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(productDetails).then(()=>{
                resolve({message:"Product Uploaded successfully"});
            })
        })
    },
    getProductForHomePageCards : (userLoggedIn,userId) =>{
        userId = ObjectId(userId)
        return new Promise( async(resolve,reject) => {
            if(userLoggedIn){
                let products = await  db.get().collection(collection.PRODUCT_COLLECTION).aggregate([
                    {
                        $lookup: {
                            from : collection.WISHLIST_COLLECTION,
                            let : {id : '$_id' , userId : userId},
                            pipeline : [
                                {
                                    $match :{
                                        $expr: {
                                            $and: [
                                                {$eq:['$user','$$userId']},
                                                {$eq:['$wishlist','$$id']}
                                            ]
                                        }
                                    }
                                }
                            ],
                            as : 'wishlist'
                        }
                    },
                    {
                        $lookup:{
                            from : collection.CART_COLLECTION,
                            let:{id: '$_id' , userId : userId},
                            pipeline : [
                                {
                                    $match :{
                                        $expr: {
                                            $and: [
                                                {$eq:['$user','$$userId']},
                                                {$eq:['$product','$$id']}
                                            ]
                                        }
                                    }
                                }
                            ],
                            as : 'cartItem'
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
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find({category:category}).toArray()
            resolve(products)
        })
    },
    getProductById : (proId) => {
        return new Promise((resolve,reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id: ObjectId(proId)}).then((product) => {
                resolve(product)
            })
        })
    },
    getProductByWishlist : (userId) => {
        return new Promise(async (resolve,reject) => {
            let products = await db.get().collection(collection.WISHLIST_COLLECTION).aggregate([
                {
                    $match:{user:ObjectId(userId)}
                },
                {
                    $lookup:{
                        from : collection.PRODUCT_COLLECTION,
                        localField : 'wishlist',
                        foreignField : '_id',
                        as : 'productDetails'
                    }
                },
                {
                    $unwind:'$productDetails'
                },
                {
                    $project : {product:'$productDetails'}
                }
            ]).toArray()
            resolve(products)
        })
    },
    getProductForCart : (userId) => {
        return new Promise(async (resolve,reject) => {
            let products = await db.get().collection(collections.CART_COLLECTION).aggregate([
                {
                    $match: {user:ObjectId(userId)}
                },
                {
                    $lookup:{
                        from : collections.PRODUCT_COLLECTION,
                        localField : 'product',
                        foreignField : '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $unwind : '$productDetails'
                }
            ]).toArray()
            resolve(products)
        })
    }
}