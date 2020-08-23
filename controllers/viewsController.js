const express = require('express');

const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authController = require('../controllers/authController');
const Email = require('./../utils/email');
const router = express.Router();
const Lead = require('./../models/leadModel');



exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.signup = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up'
  });

};

exports.createProduct = (req, res) => {
  res.status(200).render('createProduct', {
    title: 'Create Product'
  });

};


exports.registerUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    address:req.body.address,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  authController.createSendToken;
 

  const url = `${req.protocol}://${req.get('host')}/me`;
  console.log(url);
  await new Email(newUser, url).sendWelcome();
  res.status(200).render('signup', {
    title: 'Sign up'
  });
  
});


exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.products = catchAsync(async (req, res, next) => {
 

 // 1) Get tour data from collection
 const tours = await Tour.find();

 // 2) Build template
 // 3) Render that template using tour data from 1)
 res.status(200).render('products', {
   title: 'All products',
   tours
 });
});

exports.allOders = catchAsync(async (req, res, next) => {
 

 
  const oders = await Booking.find();
 
  res.status(200).render('oders', {
    title: 'All Oders',
    oders
  });
 });
 
 exports.pending = catchAsync(async (req, res, next) => {
 

 
  const oders = await Booking.find();
 
  res.status(200).render('pending', {
    title: 'Pending Oders',
    oders
  });
 });
 
 exports.shiped = catchAsync(async (req, res, next) => {
 

 
  const oders = await Booking.find();
 
  res.status(200).render('shiped', {
    title: 'Shiped Oders',
    oders
  });
 });
 
 exports.delivered = catchAsync(async (req, res, next) => {
 

 
  const oders = await Booking.find();
 
  res.status(200).render('delivered', {
    title: 'Delivered Oders',
    oders
  });
 });
 


// exports.newProduct = catchAsync(async (req, res, next) => {
//     res.status(200).render('account', {
//     title: 'account'
    
    
//   });
//  });

 exports.users = catchAsync(async (req, res, next) => {
 

  const users = await User.find();

  res.status(200).render('users', {
    title: 'Users',
    users
  });
 });
 exports.mailAd = catchAsync(async (req, res, next) => {
 


  res.status(200).render('email', {
    title: 'email'
    
  });
 });
 exports.userDetail = catchAsync(async (req, res, next) => {
 

  // 1) Get the data, for the requested tour (including reviews and guides)
  const user = await User.findById(req.params._id)

  if (!user) {
    return next(new AppError('There is no user with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('userDetail', {
    title: `${user.name} Detail`,
    user
  });
 });
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});


exports.odersAction = catchAsync(async (req, res, next) => {
  const newOders=await Booking.findByIdAndUpdate(req.params._id,
    {
      delivered: req.body.action
   });
   
   res.redirect('/allOders');


});


exports.sendComplain = catchAsync(async (req, res, next) => {
 

  const user = await User.findById(req.params._id)

 
  res.status(200).render('sendComplain', {
    title: 'Complain cell',
    user
  });
 });
 

 exports.dashboard = catchAsync(async (req, res, next) => {
  const users = await User.count()
  const leads = await Lead.count()
  const orders = await Booking.count()
  const products = await Tour.count()
  const delivered= await Booking.count({ delivered:"delivered" })
  const pending= await Booking.count({ delivered:"pending" })
  const april= await Booking.count({ createdAt:{ $gt: new Date('04/1/2020'),$lte:new Date('04/30/2020') } })
  const may= await Booking.count({ createdAt:{ $gt: new Date('05/1/2020'),$lte:new Date('05/31/2020') } })
  const june= await Booking.count({ createdAt:{ $gt: new Date('06/1/2020'),$lte:new Date('06/30/2020') } })
  const july= await Booking.count({ createdAt:{ $gt: new Date('07/1/2020'),$lte:new Date('07/31/2020') } })
  const aug= await Booking.count({ createdAt:{ $gt: new Date('08/1/2020'), $lte:new Date('08/30/2020') } })

  res.status(200).render('dashboard', {
    title: 'Dashboard',
    users,
    leads,
    orders,
    products,
    delivered,
    pending,
    aug,
    july,
    june,
    may,
    april
  });
 });
 