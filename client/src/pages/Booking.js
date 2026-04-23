import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchServices } from '../api/services';
import { createBooking } from '../api/bookings';
import { useBooking } from '../context/BookingContext';
import PageHero from '../components/PageHero';
import './Booking.css';

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setBooking } = useBooking();

  const [services, setServices] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: searchParams.get('service') || '',
    date: '',
    time: '',
    notes: '',
  });

  useEffect(() => {
    fetchServices().then((r) => setServices(r.data.data));
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleTimeSelect = (t) =>
    setForm((prev) => ({ ...prev, time: t }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await createBooking(form);
      setBooking(res.data.data);
      navigate('/checkout');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Failed to create booking. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService = services.find((s) => s._id === form.service);

  return (
    <div>
      <PageHero title="Book an Appointment" subtitle="Fill in your details and we'll see you soon" breadcrumb="Booking" />

      <div className="booking-page">
        <div className="booking-layout">
          <form className="booking-form" onSubmit={handleSubmit}>
            <h2 className="booking-form__title">Your Details</h2>

            {error && <div className="form-error">{error}</div>}

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Service / Package *</label>
              <select name="service" value={form.service} onChange={handleChange} required>
                <option value="">-- Select a service --</option>
                {services.map((svc) => (
                  <option key={svc._id} value={svc._id}>
                    {svc.name} — ${svc.price} ({svc.duration} min)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Preferred Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={today}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time *</label>
              <div className="time-slot-grid">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`time-slot-btn ${form.time === t ? 'time-slot-btn--selected' : ''}`}
                    onClick={() => handleTimeSelect(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Hidden input to satisfy form validation */}
              <input
                type="hidden"
                name="time"
                value={form.time}
                required
              />
            </div>

            <div className="form-group">
              <label>Special Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Allergies, preferences, or anything we should know..."
              />
            </div>

            <button type="submit" className="submit-btn" disabled={submitting || !form.time}>
              {submitting ? 'Processing…' : 'Proceed to Checkout →'}
            </button>
          </form>

          <aside className="booking-summary">
            <h3>Booking Summary</h3>
            {selectedService ? (
              <div className="summary-card">
                <div className="summary-card__row">
                  <span>Service</span>
                  <strong>{selectedService.name}</strong>
                </div>
                <div className="summary-card__row">
                  <span>Duration</span>
                  <strong>{selectedService.duration} min</strong>
                </div>
                <div className="summary-card__row summary-card__row--total">
                  <span>Total</span>
                  <strong>${selectedService.price}</strong>
                </div>
              </div>
            ) : (
              <p className="summary-placeholder">Select a service to see the summary.</p>
            )}

            {form.date && form.time && (
              <div className="summary-datetime">
                <p>
                  📅{' '}
                  {new Date(form.date + 'T12:00:00').toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
                <p>🕐 {form.time}</p>
              </div>
            )}

            <div className="booking-info">
              <p>✅ Free cancellation up to 24 hours before your appointment</p>
              <p>💳 Secure payment on the next step</p>
              <p>📧 Instant confirmation by email</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
