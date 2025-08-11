const users = require('../models/users')
const {v4 : uuidv4} = require('uuid')
const { setUser } = require('../service/auth')


async function handleUserLogout(req , res){
    res.clearCookie('token');
    res.redirect('/login');
}

async function handleUserSignup(req,res){
    const { name , email , password } = req.body ;
    await users.create({
        name,
        email,
        password,
    });
    return res.redirect('/login');
}


async function handleUserLogin(req,res){
    const { email , password } = req.body ;
    const user = await users.findOne({ email , password });
    // console.log(user);
    if(!user) return res.render("login",{
        error:"Invalid username or password",
    });
    
    // const sessionId = uuidv4();
    const token =  setUser(user);
    res.cookie("token", token); 
    
    return res.redirect('/');
    // return res.json({ token });
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
};