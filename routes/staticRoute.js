const express = require("express");
const URL = require('../models/url');
const { restrictTo } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/urls" , restrictTo(["ADMIN"]), 
    async (req,res)=>{
        // if(!req.user) return res.redirect('/signup');
        // const allUrls = await URL.find({});
        const allUrls = await URL.find({}); 
        return res.render("home",{
            urls: allUrls,
            BASE_URL: process.env.BASE_URL
        });
    }
);

router.get('/', restrictTo([ "NORMAL" , "ADMIN" ]) ,  async (req,res)=>{
    // if(!req.user) return res.redirect('/signup');
    // const allUrls = await URL.find({});
    const allUrls = await URL.find({ createdBy : req.user._id }); 
    return res.render("home",{
        urls: allUrls,
        BASE_URL: process.env.BASE_URL
    });
});

router.get('/signup', (req,res)=>{
    return res.render("signup", {
        BASE_URL: process.env.BASE_URL
    });
})
router.get('/login',(req,res)=>{
    return res.render('login', {
        BASE_URL: process.env.BASE_URL
    });
})

module.exports = router ;