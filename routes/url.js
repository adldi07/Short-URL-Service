const express = require("express");
const URL = require('../models/url');

const {handleGenerateNewShortUrl, handleRedirectUrl,handleAnalyticsUrl , handleGenerateQR} = require("../controllers/url");

const   router = express.Router();

router.post("/", handleGenerateNewShortUrl); 

router.get('/qr/:shortId' , handleGenerateQR);

router.get("/:shortId",handleRedirectUrl);

router.get('/analytics/:shortId',handleAnalyticsUrl);

module.exports = router;