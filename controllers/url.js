const  shortid  = require("shortid");
const URL = require("../models/url");
const QRCode = require('qrcode');


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
    return res.render('home', { 
        id: shortID,
        BASE_URL: process.env.BASE_URL 
    });
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

    // Generate QR code as base64 string
    const shortUrl = `http://localhost:8001/url/${shortId}`
    const qrBase64 = await QRCode.toDataURL(shortUrl, {
        errorCorrectionLevel: 'H',
        width: 200,
        color: {
            dark: '#2c7be5',  // theme color
            light: '#ffffff'
        }
    });

    return res.render('analytics' , { 
        totalClics: result.visitHistory.length ,
        redirectUrl : result.redirectURL,
        analytics : result.visitHistory,
        shortId : shortId,
        qrCodeData: qrBase64  // pass QR code to template
    });
}

async function handleGenerateQR(req, res) {
    const shortId = req.params.shortId;
    const shortUrl = `http://localhost:8001/url/${shortId}`;
    try {
        const qrDataUrl = await QRCode.toDataURL(shortUrl, {
            errorCorrectionLevel: 'H',
            color: {
                dark: '#ce53feff',
                light: '#ffffff'
            },
            width: 128
        });
        // qrDataUrl is a base64 PNG image
        // return res.json({ qr: qrDataUrl });
        // return res.send(`
        //         <html>
        //             <body>
        //             <img src="${qrDataUrl}" alt="QR Code" />
        //             </body>
        //         </html>
        //         `);
        return res.render('qr' , {
            qr : qrDataUrl,
            shortUrl : shortUrl,
        });

    } catch (err) {
        return res.status(500).json({ error: 'QR code generation failed' });
    }
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleAnalyticsUrl,
    handleGenerateQR,
}