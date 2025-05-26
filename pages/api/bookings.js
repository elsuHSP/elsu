import dbConnect from '../../lib/dbConnect';
import Booking from '../../models/Booking';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const bookings = await Booking.find();
      res.status(200).json({ bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const newBooking = new Booking(req.body);
      await newBooking.save();
      res.status(201).json({ message: 'Booking saved successfully' });
    } catch (error) {
      console.error('Error saving booking:', error);
      res.status(500).json({ error: 'Failed to save booking' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
