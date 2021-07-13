const nodemailer = require('nodemailer');
const catchAsync = require('../utils/catchAsync');
const pug = require('pug');
const htmlToText = require('html-to-text');
const User = require('../models/userModel');
const { getMaxListeners } = require('../models/userModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // type your email here 
    pass: '' // type your password here  
  }
});


// var list=['aliniazisk@gmail.com','shaheerniazisk@gmail.com']


// const transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "18453ee39b4bdf",
//       pass: "84d5b1a21ffa37"
//     }
//   });

exports.sendMail=catchAsync(async (req, res, next) => {
    var mailList = [];

    const users = await User.find();
    users.forEach(function(user) {
        mailList.push(user.email);
                return mailList;
      });

const mailOptions = await{
    
  from: 'aliniazisk@gmail.com',
  bcc: mailList,
  subject: req.body.subject,
  text: req.body.description,
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(200).render('email', {
    title: 'Send Mail'
  });
});



