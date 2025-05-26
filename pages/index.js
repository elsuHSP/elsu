import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    address: '',
    datetime: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        service: '',
        address: '',
        datetime: '',
      });
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🌟 HEADER */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">🏠 HomeServePH</h1>
          <span className="text-sm opacity-80">Book trusted local services</span>
        </div>
      </header>

      {/* 📋 FORM CARD */}
      <div className="flex justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Book a Home Service
          </h2>

          {success && (
            <p className="mb-4 text-green-600 font-medium text-center">
              ✅ Booking submitted successfully!
            </p>
          )}
          {error && (
            <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                required
              >
                <option value="">Select a service</option>
                <option value="Plumbing">🚿 Plumbing</option>
                <option value="Cleaning">🧼 Cleaning</option>
                <option value="Electrical Repair">⚡ Electrical Repair</option>
                <option value="Aircon Servicing">❄️ Aircon Servicing</option>
                <option value="Pest Control">🐜 Pest Control</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Date & Time</label>
              <input
                type="datetime-local"
                name="datetime"
                value={formData.datetime}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
            >
              Submit Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
