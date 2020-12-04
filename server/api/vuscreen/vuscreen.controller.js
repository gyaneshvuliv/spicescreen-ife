'use strict';

var _ = require('lodash');
var db = require('../../config/mysql')
var moment = require('moment');
var request = require('request');

exports.IFE_upload = function (req, res) {
  const { f_type, start_date, base_station, from, to, fno, host1, host2, rem} = req.body
  let query = "Insert INTO"
    + " vuscreen_ife_data "
    + " (f_type, date, base_station, source, destination, f_no, host1, host2, remote)"
    + " VALUES ('" + f_type + "','" + moment(start_date).format("YYYY-MM-DD") + "','" + base_station
    + "','" + from + "','" + to + "','" + fno + "'," + host1 + "," + host2 + "," + rem + ")";
    db.get().query(query, function (err, doc) {
    if (err) { return handleError(res, err); }
    else {
      return res.status(200).json(doc);
    }
  })
}

// send sms
exports.send_sms = function (req, res) {
  let number = req.query.number;
  console.log(number)
  generateSecureVal(function (secureVal) {
    console.log(secureVal)
    let message = 'https://api.infobip.com/sms/1/text/query?username=Mobiserve&password=SpicEN@2018&from=SpicEN&to=$$91' + number + '$$&text=Dear Recipients,\nYour OTP for IFE registraion is - ' + secureVal
    // var message = 'http://www.myvaluefirst.com/smpp/sendsms?username=Mobiservehttp1&password=mobi1234&to=' + number + '&from=VUINFO&text=Dear Recipients,\nYour OTP is -' + secureVal
    request(message, function (error, response, body) {
      console.log(response.statusCode)
      console.log(11111111)
      console.log(body)
      if (!error && response.statusCode == 200) {
        console.log("Alert has been " + body) // Show the HTML for the Google homepage.
        return res.status(200).send({ "body": body, "response": response, "secureVal": secureVal });
      } else {
        return handleError(res, err);
      }
    })
  })
}

const crypto = require('crypto');
let secureVal = 0;

function generateSecureVal(cb) {
  crypto.randomBytes(3, function (err, buffer) {
    secureVal = parseInt(buffer.toString('hex'), 16);
    if (secureVal > 999999 || secureVal < 100000) {
      generateSecureVal(cb);
    } else {
      cb(secureVal);
    }
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}