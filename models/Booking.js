
// models/Booking.js

import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  address: String,
  datetime: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
