'use strict';

var _ = require('lodash');
var db = require('../../config/mysql')
var moment = require('moment');
var request = require('request');


exports.IFE_registration = function (req, res) {
  const { name, mobile_no, device_id } = req.body
  let query = "Insert INTO"
    + " vuscreen_ife_registration "
    + " (name, date, mobile_no, device_id)"
    + " VALUES ('" + name + "','" + moment(new Date()).format("YYYY-MM-DD") + "','" + mobile_no
    + "','" + device_id + "')";
  db.get().query(query, function (err, doc) {
    if (err) { return handleError(res, err); }
    else {
      return res.status(200).json({
        "status": 200,
        "message": "Success.",
        "result": { "name": name, "mobile_no": mobile_no, "device_id": device_id }
      });
    }
  })
}


exports.IFE_upload = function (req, res) {
  const { name , mobile_no, f_type, start_date, base_station, from, to, fno, airCrafType, host1, host2, rem } = req.body
  let query = "Insert INTO"
    + " vuscreen_ife_data "
    + " (name, mobile_no, f_type, date, base_station, source, destination, f_no, airCrafType, host1, host2, remote)"
    + " VALUES ('" + name + "','" + mobile_no + "','" + f_type + "','" + moment(start_date).format("YYYY-MM-DD") + "','" + base_station
    + "','" + from + "','" + to + "','" + fno + "','" + airCrafType + "'," + host1 + "," + host2 + "," + rem + ")";
//  console.log(query)
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
  generateSecureVal(function (secureVal) {
    console.log(secureVal)
    let message = 'https://api.infobip.com/sms/1/text/query?username=Mobiserve&password=SpicEN@2018&from=SpicEN&to=$$91' + number + '$$&text=Dear Recipients,\nYour OTP for IFE registraion is - ' + secureVal
    // var message = 'http://www.myvaluefirst.com/smpp/sendsms?username=Mobiservehttp1&password=mobi1234&to=' + number + '&from=VUINFO&text=Dear Recipients,\nYour OTP is -' + secureVal
    request(message, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("OTP has been sent.") // Show the HTML for the Google homepage.
        insertOtp(number, secureVal)
        return res.status(200).send({ "status": 200, "message": "OTP has been sent", "secureVal": secureVal });
      } else {
        return handleError(res, err);
      }
    })
  })
}


const insertOtp = function (number, secureVal) {
  let query = "Update "
    + " vuscreen_ife_registration "
    + " SET "
    + " otp = " + secureVal
    + " where mobile_no = " + number;
  console.log(query)
  db.get().query(query, function (err, doc) {
    if (err) { console.log("err"); }
    else {
      console.log("Success")
    }
  })
}

exports.varify_otp = function (req, res) {
  const { mobile_no, otp } = req.body
  let query = "select *  from vuscreen_ife_registration where mobile_no = " + mobile_no
  db.get().query(query, function (err, doc) {
    if (err) { return handleError(res, err); }
    else {
      console.log(doc[0].otp , otp)
      console.log(typeof(doc[0].otp) , typeof(otp))
      if (doc[0].otp == otp) {
        let query = "Update "
          + " vuscreen_ife_registration "
          + " SET "
          + " isVarified = 1"
          + " where mobile_no = " + mobile_no;
        console.log(query)
        db.get().query(query, function (err, doc) {
          if (err) { console.log(err); }
          else {
            return res.status(200).json({ "status": 200, "message": "Successfully Varified." });
          }
        })
      }else {
        return res.status(200).json({ "status": 200, "message": "Wrong OTP."});
      }
    }
  })
  // let query = "Insert INTO"
  //   + " vuscreen_ife_data "
  //   + " (f_type, date, base_station, source, destination, f_no, host1, host2, remote)"
  //   + " VALUES ('" + f_type + "','" + moment(start_date).format("YYYY-MM-DD") + "','" + base_station
  //   + "','" + from + "','" + to + "','" + fno + "'," + host1 + "," + host2 + "," + rem + ")";
  //   db.get().query(query, function (err, doc) {
  //   if (err) { return handleError(res, err); }
  //   else {
  //     return res.status(200).json(doc);
  //   }
  // })
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