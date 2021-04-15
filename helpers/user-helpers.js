const db = require('../config/connection');
const collections = require('../config/collections');
const bcrypt = require('bcrypt');

module.exports = {
    doSignup: (userDetails) => {
        return new Promise(async (resolve, reject) => {
            userDetails.password = await bcrypt.hash(userDetails.password, 10);
            db.get().collection(collections.USER_COLLECTION).insertOne(userDetails).then((data) => {
                resolve(data.ops[0]);
            });

        });
    },
    checkMobile: (mobile) => {
        return new Promise(async (resolve, reject) => {
            var mobileExist = await db.get().collection(collections.USER_COLLECTION).findOne(mobile);
            console.log(mobileExist);
            if (mobileExist) {
                resolve({ message: 'Number already exist', available: false });
            } else {
                resolve({ message: "Number available", available: true })
            }
        })
    },
    checkEmail: (email) => {
        return new Promise(async (resolve, reject) => {
            console.log(email);
            var emailExist = await db.get().collection(collections.USER_COLLECTION).findOne(email);
            console.log(emailExist);
            if (emailExist) {
                resolve({ message: 'Email already exist', available: false });
            } else {
                resolve({ message: "Email available", available: true })
            }
        })
    }
};