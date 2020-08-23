const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'lead must belong to a Product!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'lead must belong to a User!']
  },
  price: {
    type: Number,
    require: [true, 'lead must have a price.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  leads: {
    type: String,
    enum: ['leads', 'convert'],
    default: 'leads'
  }
 
});

leadSchema.pre(/^find/, function(next) {
  this.populate('user').populate('tour'
    
  );
  next();
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
