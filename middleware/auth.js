const { getUser } = require('../service/auth')

async function restrictToLoggedinUserOnly(req,res,next){
    // const userUid = req.cookies?.uid;
    console.log("start form here");
    console.log(req.headers);
    const userUid = req.headers["authorization"] ;
    if(!userUid) return res.redirect('/login');
    // const user = getUser(userUid);
    const token = userUid.split("Bearer ")[1];
    const user = getUser(token);
    if(!user) return res.redirect('/login');

    req.user = user ;
    next();
}

async function checkAuth(req , res , next){
    // const userUid = req.cookies?.uid;
    console.log("start form here");
    console.log(req.headers);
    const userUid = req.headers["authorization"] ;
    const token = userUid.split("Bearer ")[1];

    // if(!userUid) return res.redirect('/login');
    const user = getUser(token);

    // if(!user) return res.redirect('/login');

    req.user = user ;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}