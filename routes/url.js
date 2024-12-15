const express = require("express");

const {handleGenerateNewShortUrl} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl); 

router.get("/:shortId",(req,res)=>{
    const id = req.params.shortId;
    
})

module.exports = router;