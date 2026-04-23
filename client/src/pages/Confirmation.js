import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import './Confirmation.css';

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, payment, confirmationEmailSent, resetFlow } = useBooking();

  useEffect(() => {
    if (location.pathname === '/confirmation' && (!booking || !payment)) {
      navigate('/booking', { replace: true });
    }
  }, [location.pathname, booking, payment, navigate]);

  if (!booking || !payment) {
    return (
      <div className="confirmation-page confirmation-page--empty">
        <div className="confirmation-card confirmation-card--empty">
          <p className="confirmation-empty__text">
            Your confirmation will appear here after you complete booking and payment.
          </p>
          <Link to="/booking" className="btn-action btn-action--primary">
            Book an appointment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✅</div>
        <h1 className="confirmation-title">Booking Confirmed!</h1>
        <p className="confirmation-subtitle">
          Thank you, <strong>{booking.name}</strong>! Your appointment is booked.
        </p>

        <div className="confirmation-code">
          Confirmation Code: <strong>{booking.confirmationCode}</strong>
        </div>

        <div className="confirmation-details">
          <div className="detail-row">
            <span>Service</span>
            <strong>{booking.service?.name}</strong>
          </div>
          <div className="detail-row">
            <span>Date</span>
            <strong>
              {new Date(booking.date).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              })}
            </strong>
          </div>
          <div className="detail-row">
            <span>Time</span>
            <strong>{booking.time}</strong>
          </div>
          <div className="detail-row">
            <span>Duration</span>
            <strong>{booking.service?.duration} min</strong>
          </div>
          <div className="detail-row">
            <span>Payment</span>
            <strong className="paid-badge">Paid ${payment.amount}</strong>
          </div>
          {payment.cardLast4 && (
            <div className="detail-row">
              <span>Card</span>
              <strong>•••• {payment.cardLast4}</strong>
            </div>
          )}
          <div className="detail-row">
            <span>Transaction ID</span>
            <strong>{payment.transactionId}</strong>
          </div>
        </div>

        <div className="confirmation-notice">
          {confirmationEmailSent ? (
            <p>
              📧 We sent a confirmation email with your code and invoice to{' '}
              <strong>{booking.email}</strong>
            </p>
          ) : (
            <p>
              📧 We could not send email to <strong>{booking.email}</strong>. Please save or print
              this page for your records. Your salon can enable outgoing mail in the server settings.
            </p>
          )}
          <p>📞 Questions? Call us at <strong>(555) 123-4567</strong></p>
          <p>🔄 Free cancellation up to <strong>24 hours</strong> before your appointment</p>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn-action btn-action--primary" onClick={resetFlow}>
            Back to Home
          </Link>
          <Link to="/booking" className="btn-action btn-action--outline" onClick={resetFlow}>
            Book Another
          </Link>
        </div>
      </div>
    </div>
  );
}
