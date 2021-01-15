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

// get base stations
router.get('/get-base-stations', controller.get_base_stations)

// get stations
router.get('/get-stations', controller.get_stations)

// get hosts
router.get('/get-hosts', controller.get_hosts)

// get aircraft
router.get('/get-aircraft', controller.get_aircraft)

module.exports = router;