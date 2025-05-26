import dbConnect from '../../lib/dbConnect';
import Booking from '../../models/Booking';


export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const booking = new Booking(req.body);
      await booking.save();
      res.status(201).json({ success: true, data: booking });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
