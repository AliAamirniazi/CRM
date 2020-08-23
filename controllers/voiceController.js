const Nexmo = require('nexmo');
const catchAsync = require('../utils/catchAsync');



exports.voice = catchAsync(async (req, res, next) => {
 


    res.status(200).render('voice', {
      title: 'Voice SMS'
      
    });
   });

const nexmo = new Nexmo({
  apiKey: '46370f0e',
  apiSecret: 'NuDsZ9Nr1cnLrKQ8',
  applicationId: '6f1bb627-5f31-4ec9-b062-230b4c846e85',
  privateKey: `./private.key`,
});

exports.sendVoice=catchAsync(async (req, res, next) => {

const ncco = [
    {
      action: 'talk',
      voiceName: 'Joey',
      text:req.body.description,
    },
  ];

  nexmo.calls.create(
    {
      to: [{ type: 'phone', number: req.body.number }],
      from: { type: 'phone', number: '923341019978' },
      ncco,
    },
    (err, result) => {
      console.log(err || result);
    },
  );
  res.redirect('/voice');

});