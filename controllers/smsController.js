const Nexmo = require('nexmo');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

const nexmo = new Nexmo({
  apiKey: '46370f0e',
  apiSecret: 'NuDsZ9Nr1cnLrKQ8',
});

exports.sms = catchAsync(async (req, res, next) => {
 


    res.status(200).render('sms', {
      title: 'SMS'
      
    });
   });

exports.sendSms=catchAsync(async (req, res, next) => {
    // var sms = [];

    // const users = await User.find();
    // users.forEach(function(user) {
    //     sms.push(user.number);
    //             return sms;
    //   });

const from =req.body.subject;
const to = req.body.number;
const text = req.body.description;

nexmo.message.sendSms(from, to, text);
res.redirect('/sms');

});