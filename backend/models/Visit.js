const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema(
  {
    visitId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ownerId: {
      type: String,
      required: true,
      trim: true,
    },
    petName: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
    },
    visitTime: {
      type: Date,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'COMPLETED'],
      required: true,
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Visit', visitSchema);
