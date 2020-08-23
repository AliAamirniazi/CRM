const multer = require('multer');
const sharp = require('sharp');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const Lead = require('./../models/leadModel');
const nodemailer = require('nodemailer');


exports.lead = catchAsync(async (req, res, next) => {
 
    const { tour, user, price, slug} = req.query;
    await Lead.create({ 
        tour 
        , 
        user 
        ,
         price 
    });
    res.redirect(`/tour/${slug}`);

  
   });



   exports.leads = catchAsync(async (req, res, next) => {
 

    const leads = await Lead.find();
  
    res.status(200).render('leads', {
      title: 'Leads',
      leads
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




   exports.leadMail = catchAsync(async (req, res, next) => {
    const lead = await Lead.findByIdAndUpdate(
      req.params._id,
      {
        leads:'convert'
      }
      );
      const url = `${req.protocol}://${req.get('host')}/tour/${req.body.slug}`;

      text = `Hi ${req.body.name} 
      so you were intrested in our product ${req.body.product} offer is still valid click link given below to place an order
      ${url} `
      const mailOptions = await{
  
        from: 'aliniazisk@gmail.com',
        to: req.body.email,
        subject: 'Leads',
        text
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
        
        
        
        
        res.redirect('/leads');


  });