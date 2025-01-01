// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "adesh@8061";

function setUser(user){
    const payload = {
        _id : user._id,
        email : user.email,
        role: user.role,
    }
    // sessionIdToUserMap.set(id,user);
    return jwt.sign(payload,secret);
}

function getUser(token){
    if(!token)  return null ;
    try {
        return jwt.verify(token , secret);
    } catch (error) {
        console.log(error);
        return null;
    }
    // return sessionIdToUserMap.get(id);
}


module.exports = {
    setUser,
    getUser,
};  