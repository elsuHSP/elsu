import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (Array.isArray(data.bookings)) {
        setBookings(
          data.bookings.sort(
            (a, b) => new Date(b.datetime) - new Date(a.datetime)
          )
        );
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">🛠️ Admin Dashboard</h1>
      <p className="text-center text-gray-600 mb-6">
        {bookings.length} booking{bookings.length !== 1 && 's'} found
      </p>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <p>
                <span className="font-semibold">👤 Name:</span> {booking.name}
              </p>
              <p>
                <span className="font-semibold">📞 Phone:</span> {booking.phone}
              </p>
              <p>
                <span className="font-semibold">🛠️ Service:</span> {booking.service}
              </p>
              <p>
                <span className="font-semibold">📍 Address:</span> {booking.address}
              </p>
              <p>
                <span className="font-semibold">🕒 Date & Time:</span>{' '}
                {new Date(booking.datetime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
