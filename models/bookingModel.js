const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Oders must belong to a Product!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Oders must belong to a User!']
  },
  price: {
    type: Number,
    require: [true, 'Oders must have a price.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    require: [true, 'Oders must have a quantity.']
  },

  delivered: {
    type: String,
    enum: ['delivered', 'shiped', 'pending'],
    default: 'pending'
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
