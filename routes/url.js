const express = require("express");
const URL = require('../models/url');
const shortid = require('shortid');

// const { handleGenerateNewShortUrl } = require('../controllers/url')

const router = express.Router();

router.post("/",async (req,res)=>{
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: 'url is required'} );
    }
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory:[],
    });

    return res.json({Id : shortid});
});

module.exports = router;