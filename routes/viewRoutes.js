const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const tourController = require('../controllers/tourController');
const emailController = require('../controllers/emailControllers');
const complainController = require('../controllers/complainController');
const smsController = require('../controllers/smsController');
const voiceController = require('../controllers/voiceController');
const leadController = require('../controllers/leadController');
const chainController = require('../controllers/chainController');


const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup',  viewsController.signup);


router.get('/me', authController.protect, viewsController.getAccount);
router.get('/products', authController.protect, authController.restrictTo('admin', 'lead-guide'), viewsController.products);
router.get('/users', authController.protect, authController.restrictTo('admin', 'lead-guide'), viewsController.users);
router.get('/userDetail/:_id', authController.protect,authController.restrictTo('admin', 'lead-guide'), viewsController.userDetail);
router.get('/email', authController.protect, authController.restrictTo('admin', 'lead-guide'),viewsController.mailAd);
router.get('/allOders', authController.protect, authController.restrictTo('admin', 'lead-guide'),viewsController.allOders);
router.get('/pending', authController.protect, authController.restrictTo('admin', 'lead-guide'),viewsController.pending);
router.get('/shiped', authController.protect, authController.restrictTo('admin', 'lead-guide'),viewsController.shiped);
router.get('/delivered', authController.protect, authController.restrictTo('admin', 'lead-guide'),viewsController.delivered);
router.get('/sendComplain/:_id', authController.protect, viewsController.sendComplain);
router.get('/complains', authController.protect, authController.restrictTo('admin', 'lead-guide'),complainController.complains);
router.get('/complainDetail/:_id', authController.protect,authController.restrictTo('admin', 'lead-guide'), complainController.detail);
router.get('/pendingComplain', authController.protect, authController.restrictTo('admin', 'lead-guide'),complainController.pending);
router.get('/resolvedComplain', authController.protect, authController.restrictTo('admin', 'lead-guide'), authController.restrictTo('admin', 'lead-guide'), complainController.resolved);
router.get('/sms', authController.protect, authController.restrictTo('admin', 'lead-guide'), smsController.sms);
router.get('/voice', authController.protect,authController.restrictTo('admin', 'lead-guide'), voiceController.voice);
router.get('/dashboard', authController.protect,authController.restrictTo('admin', 'lead-guide'), viewsController.dashboard);
router.get('/chain', authController.protect, chainController.getChain);

router.get('/createChain', authController.protect, chainController.createChain);

router.post('/create-chain', authController.protect, chainController.addChain);



router.post('/send-sms', authController.protect, authController.restrictTo('admin', 'lead-guide'), smsController.sendSms);
router.post('/send-voice', authController.protect, authController.restrictTo('admin', 'lead-guide'), voiceController.sendVoice);




router.get('/createProduct', authController.protect, authController.restrictTo('admin', 'lead-guide'), viewsController.createProduct);

router.get(
  '/my-tours',
  bookingController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);
router.post('/create-product', authController.protect, authController.restrictTo('admin', 'lead-guide'),  tourController.uploadTourImages,tourController.resizeTourImages, tourController.createProduct)


router.post('/register-user',  viewsController.registerUser);
router.post('/register-Complain/:_id',  complainController.sendComplain);

router.post('/oders-action/:_id', authController.restrictTo('admin', 'lead-guide'),  bookingController.invoice);
// router.post('/oders-action/:_id',  bookingController.invoice);

router.post('/send-mail', authController.protect, emailController.sendMail);
router.post('/replyMail', authController.protect, complainController.sendMail);

router.post('/leadMail/:_id', authController.restrictTo('admin', 'lead-guide'), leadController.leadMail);

router.get('/lead', authController.protect, authController.restrictTo('admin', 'lead-guide'),  leadController.lead);
router.get('/leads', authController.protect, authController.restrictTo('admin', 'lead-guide'),leadController.leads);


router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
