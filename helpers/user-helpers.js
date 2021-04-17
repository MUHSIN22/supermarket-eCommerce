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
            }else if(mobile.mobile == ''){
                resolve({message:'Please enter mobile number',available: false})
            } 
            else {
                resolve({ message: "Number available", available: true })
            }
        })
    },
    checkEmail: (email) => {
        return new Promise(async (resolve, reject) => {
            console.log(email, 'email');
            var emailExist = await db.get().collection(collections.USER_COLLECTION).findOne(email);
            if(emailExist) {
                resolve({ message: 'Email already exist', available: false });
            }else if(email.email == ''){
                resolve({message:'Please enter email',available: false})
            }
            else {
                resolve({ message: "Email available", available: true })
            }
        })
    },

    doLogin: (userdata)=>{
        return new Promise(async (resolve, reject) => {
            let loginStatus=false
            let response ={}

            let user =await db.get().collection(collections.USER_COLLECTION).findOne({mobile:userdata.phone})

            if(user){
                bcrypt.compare(userdata.password,user.password).then((status)=>{
                    if(status){
                        console.log("login successful")
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed")
                        resolve({ status: false})
                    }

                })
            }else{
                console.log("login failed")
                resolve({ status: false})
            }
            
        })
    }
};

