module.exports.checkUserAvailability = ( req,res,next ) => {
    console.log(req.session.userLogggedIn);
    if(req.session.userLogggedIn){
        next()
    }else{
        res.redirect('/login')
    }
}