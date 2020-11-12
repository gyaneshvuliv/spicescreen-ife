'use strict';

const express = require('express');
const controller = require('./vuscreen.controller');
const router = express.Router();


// api for file upload
router.post('/upload', controller.IFE_upload)

// send sms
router.get('/send-sms', controller.send_sms)

module.exports = router;