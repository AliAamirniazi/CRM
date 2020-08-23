const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const Complain = require('./../models/complainModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const nodemailer = require('nodemailer');



exports.sendComplain = catchAsync(async (req, res, next) => {
    const newUser = await Complain.create({
      user:req.params._id,
      subject: req.body.subject,
      description: req.body.description,
      email: req.body.email
        });
        res.redirect(`/sendComplain/${req.params._id}`);

  });
  

  exports.complains = catchAsync(async (req, res, next) => {
 

 
    const complains = await Complain.find();
   
    res.status(200).render('complains', {
      title: 'complains',
      complains
    });
   }); 

   exports.pending = catchAsync(async (req, res, next) => {
 

 
    const complains = await Complain.find();
   
    res.status(200).render('pendingComplain', {
      title: 'complains',
      complains
    });
   }); 
   exports.resolved = catchAsync(async (req, res, next) => {
 

 
    const complains = await Complain.find();
   
    res.status(200).render('resolvedComplain', {
      title: 'complains',
      complains
    });
   }); 

   exports.detail = catchAsync(async (req, res, next) => {
 

    const complain = await Complain.findById(req.params._id)
  
    if (!complain) {
      return next(new AppError('There is no complain with that id.', 404));
    }
  
  
    res.status(200).render('complainDetail', {
      title: `${complain._id} Detail`,
      complain
    });
   });












   const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aliniazisk@gmail.com',
    pass: 'mianwali1234' 
  }
});


// var list=['aliniazisk@gmail.com','shaheerniazisk@gmail.com']


// const transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "18453ee39b4bdf",
//     pass: "84d5b1a21ffa37"
//   }
// });

exports.sendMail=catchAsync(async (req, res, next) => {

const mailOptions = await{
  
from: 'aliniazisk@gmail.com',
to: req.body.email,
text: req.body.reply,
subject: 'Dispute'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});



  await Complain.updateOne(
    {
      status: req.body.status
   });
   



res.redirect('/complains');

});
