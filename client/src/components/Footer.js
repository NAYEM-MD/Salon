import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__brand-name">
            <span>✂</span> Luxe<em>Hair</em>
          </div>
          <p>Your premier destination for beautiful hair in the heart of the city. Expert stylists, premium products, stunning results.</p>
          <div className="footer__social">
            {['📘', '📸', '🐦', '▶'].map((icon, i) => (
              <a key={i} href="#" className="footer__social-link" aria-label="Social link">{icon}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/services">Services & Pricing</Link></li>
            <li><Link to="/gallery">Hairstyle Gallery</Link></li>
            <li><Link to="/booking">Book Appointment</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4>Contact</h4>
          {[
            { icon: '📍', text: '123 Style Avenue, Suite 4\nNew York, NY 10001' },
            { icon: '📞', text: '(555) 123-4567' },
            { icon: '✉', text: 'hello@luxehair.com' },
          ].map(({ icon, text }) => (
            <div key={icon} className="footer__contact-item">
              <span className="footer__contact-icon">{icon}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>

        {/* Hours */}
        <div className="footer__col">
          <h4>Hours</h4>
          {[
            { day: 'Mon – Fri', time: '9am – 7pm' },
            { day: 'Saturday', time: '9am – 6pm' },
            { day: 'Sunday', time: '10am – 4pm' },
          ].map(({ day, time }) => (
            <div key={day} className="footer__hours-item">
              <span>{day}</span>
              <strong>{time}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} LuxeHair Salon. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
