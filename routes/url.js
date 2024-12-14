const express = require("express");

const { handleGenerateNewShortUrl } = require('../controllers/url')

const router = express.Router();

router.route("/").post(handleGenerateNewShortUrl);

module.exports = router;