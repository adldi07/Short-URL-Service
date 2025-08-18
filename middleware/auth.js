const { getUser } = require('../service/auth')

async function restrictToLoggedinUserOnly(req,res,next){
    // const userUid = req.cookies?.uid;
    console.log("start form here1");
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
    // const userUid = 'Bearer 23eioif3onefuihef38uef';
    const token = userUid.split("Bearer ")[1];

    // if(!userUid) return res.redirect('/login');
    const user = getUser(token);

    // if(!user) return res.redirect('/login');

    req.user = user ;
    next();
}

function checkForAuthentication(req,res,next){
    // const authenticationHeaderValue = req.headers["authorization"];
    const tokenCookie = req.cookies?.token;
    req.user = null;
    // if(!authenticationHeaderValue || !authenticationHeaderValue.startsWith("Bearer")){
    //     return next();
    // }
    if(!tokenCookie){
        return next();
    }
    // const token = authenticationHeaderValue.split("Bearer")[1];
    const user = getUser(tokenCookie);
    req.user = user ;
    return next();
}   

function restrictTo(roles = []){
    return function (req,res,next){
        if(!req.user){
            return res.redirect("/login");
        }
        if(!roles.includes(req.user.role)){
            return res.end('UnAuthorized'); 
        }
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictToLoggedinUserOnly,
    checkAuth,
    restrictTo,
}