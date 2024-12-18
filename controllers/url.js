const  shortid  = require("shortid");
const URL = require("../models/url");


async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error : 'url is required' });

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render('home',{ id: shortID });
}

async function handleRedirectUrl(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp : Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
}
async function handleAnalyticsUrl(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne( { shortId } );
    return res.json({ 
        totalClics: result.visitHistory.length ,
        redirectUrl : result.redirectURL,
        analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleAnalyticsUrl,
}