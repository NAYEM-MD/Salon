import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__brand-scissors">✂</span>
          <span className="navbar__brand-text">Luxe<em>Hair</em></span>
        </Link>

        <ul className="navbar__links navbar__links--desktop">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
                end={to === '/'}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__right">
          <Link to="/booking" className="navbar__cta btn btn--primary btn--sm">
            Book Now
          </Link>
          <button
            className={`navbar__toggle ${open ? 'navbar__toggle--open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className={`navbar__overlay ${open ? 'navbar__overlay--visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div className={`navbar__drawer ${open ? 'navbar__drawer--open' : ''}`}>
        <div className="navbar__drawer-header">
          <span className="navbar__brand-text">Luxe<em>Hair</em></span>
        </div>
        <ul className="navbar__drawer-links">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `navbar__drawer-link ${isActive ? 'navbar__drawer-link--active' : ''}`
                }
                onClick={() => setOpen(false)}
                end={to === '/'}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/booking" className="navbar__drawer-cta btn btn--primary" onClick={() => setOpen(false)}>
          Book an Appointment
        </Link>
        <div className="navbar__drawer-footer">
          <p>📞 (555) 123-4567</p>
          <p>✉ hello@luxehair.com</p>
        </div>
      </div>
    </>
  );
}
