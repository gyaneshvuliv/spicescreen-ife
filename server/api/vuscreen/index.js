'use strict';

const express = require('express');
const controller = require('./vuscreen.controller');
const router = express.Router();

// api for registration
router.post('/register', controller.IFE_registration)

// api for file upload
router.post('/upload', controller.IFE_upload)

// send sms
router.get('/send-sms', controller.send_sms)

// send sms
router.post('/verify-otp', controller.varify_otp)

module.exports = router;