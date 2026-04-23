import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { createCheckout, confirmPayment } from '../api/payments';
import PageHero from '../components/PageHero';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, setPayment, setConfirmationEmailSent } = useBooking();
  const [step, setStep] = useState('review'); // 'review' | 'payment' | 'processing'
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.pathname === '/checkout' && !booking) {
      navigate('/booking', { replace: true });
    }
  }, [location.pathname, booking, navigate]);

  if (!booking) {
    return (
      <div>
        <PageHero title="Checkout" subtitle="Secure payment for your appointment" breadcrumb="Checkout" />
        <div className="checkout-page checkout-placeholder">
          <p className="checkout-placeholder__text">
            After you submit the booking form, you will review and pay in this section.
          </p>
          <Link to="/booking" className="checkout-placeholder__link">
            Go to booking →
          </Link>
        </div>
      </div>
    );
  }

  const handleCardChange = (e) =>
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const formatCardNumber = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');
    setStep('processing');
    try {
      const checkoutRes = await createCheckout(booking._id);
      const paymentId = checkoutRes.data.data._id;
      const last4 = card.number.replace(/\s/g, '').slice(-4);
      const confirmRes = await confirmPayment(paymentId, last4);
      setPayment(confirmRes.data.data);
      setConfirmationEmailSent(confirmRes.data.emailSent === true);
      navigate('/confirmation');
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      setStep('payment');
    }
  };

  return (
    <div>
      <PageHero title="Checkout" subtitle="Secure payment for your appointment" breadcrumb="Checkout" />

      <div className="checkout-page">
        <div className="checkout-layout">
          <div className="checkout-main">
            {step === 'review' && (
              <div className="checkout-section">
                <h2>Review Your Booking</h2>
                <div className="review-table">
                  <div className="review-row"><span>Name</span><strong>{booking.name}</strong></div>
                  <div className="review-row"><span>Email</span><strong>{booking.email}</strong></div>
                  <div className="review-row"><span>Phone</span><strong>{booking.phone}</strong></div>
                  <div className="review-row"><span>Service</span><strong>{booking.service?.name}</strong></div>
                  <div className="review-row"><span>Date</span><strong>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong></div>
                  <div className="review-row"><span>Time</span><strong>{booking.time}</strong></div>
                  {booking.notes && <div className="review-row"><span>Notes</span><strong>{booking.notes}</strong></div>}
                </div>
                <button className="pay-btn" onClick={() => setStep('payment')}>
                  Proceed to Payment →
                </button>
              </div>
            )}

            {(step === 'payment' || step === 'processing') && (
              <div className="checkout-section">
                <h2>Payment Details</h2>
                <p className="demo-notice">🔒 Demo mode — no real charges will be made</p>

                {error && <div className="form-error">{error}</div>}

                <form onSubmit={handlePay} className="payment-form">
                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={card.name}
                      onChange={handleCardChange}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="number"
                      value={card.number}
                      onChange={(e) => setCard((p) => ({ ...p, number: formatCardNumber(e.target.value) }))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry *</label>
                      <input
                        type="text"
                        name="expiry"
                        value={card.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={card.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="pay-btn" disabled={step === 'processing'}>
                    {step === 'processing' ? 'Processing Payment...' : `Pay $${booking.service?.price}`}
                  </button>
                </form>

                <button className="back-link" onClick={() => setStep('review')}>
                  ← Back to review
                </button>
              </div>
            )}
          </div>

          <aside className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="order-row"><span>{booking.service?.name}</span><strong>${booking.service?.price}</strong></div>
            <div className="order-row order-row--total"><span>Total</span><strong>${booking.service?.price}</strong></div>
            <div className="security-badges">
              <p>🔒 SSL Encrypted</p>
              <p>✅ Booking Confirmation by Email</p>
              <p>🔄 Free cancellation 24h before</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
