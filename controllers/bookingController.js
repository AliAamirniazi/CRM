const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Lead = require('../models/leadModel');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { json } = require('body-parser');
const Transaction = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/chain.json`)
);


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  console.log(tour);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/lead/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}&slug=${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Product`,
        description: tour.summary,
        
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, price, quantity } = req.query;

  if (!tour && !user && !price && !quantity) return next();
    await Booking.create({ tour, user, price, quantity:1 });

      await Tour.findByIdAndUpdate(
          tour,
          {
            "$inc": { "quantity": -1 }
            
          }
        
        )
        console.log(
          JSON.stringify(Transaction)
        );
      
        
        
     

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aliniazisk@gmail.com',
    pass: 'mianwali1234' 
  }
});


// const transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "18453ee39b4bdf",
//     pass: "84d5b1a21ffa37"
//   }
// });

exports.invoice = catchAsync(async (req, res, next) => {
  // const lead = await Lead.findByIdAndUpdate(
  //   req.params._id,
  //   {
  //     leads:'convert'
  //   }
  //   );

  const newOders=await Booking.findByIdAndUpdate(req.params._id,
    {
      delivered: req.body.action
   });
   

    text =`Hi ${req.body.name} 
    Product Name: ${req.body.product} 
    is Shiped it will be delivered with in 3 days at your given address
    Address: House# cb582 Gulistan colony near sherzaman masjid  Rawalpindi
    Price:${req.body.price} 
    status:paid 
    Order ID:${req.body.id}`
    const mailOptions = await{

      from: 'aliniazisk@gmail.com',
      to: req.body.email,
      subject: 'Invoice',
      text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
      
      
      
      
      res.redirect('/allOders');


});