const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const complainSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Complain must belong to a User!']
  },
  subject: {
    type: String,
    require: [true, 'Complain must have a subject.']
  },
  description: {
    type: String,
    require: [true, 'Complain must have a description.']
  },
  email: {
    type: String,
    require: [true, 'Complain must have a Email.']
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

});

complainSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });
  next();
});

const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;
