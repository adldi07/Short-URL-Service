const express = require("express");
const URL = require('../models/url');

const {handleGenerateNewShortUrl, handleRedirectUrl,handleAnalyticsUrl} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl); 

router.get("/test", async (req,res)=>{
    const allUrls = await URL.find({});
    return res.end(`
        <html>
            <head></head>
            <body>
                <ol>
                    ${allUrls
                        .map((url)=>
                        `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length} </li>`
                    ).join("")}
                </ol>
            </body>
        </html>
    `);
})
router.get("/:shortId",handleRedirectUrl);

router.get('/analytics/:shortId',handleAnalyticsUrl);

module.exports = router;