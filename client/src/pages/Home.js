import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchServices } from '../api/services';
import { fetchHairstyles } from '../api/hairstyles';
import ServiceCard from '../components/ServiceCard';
import HairstyleCard from '../components/HairstyleCard';
import './Home.css';

export default function Home() {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredStyles, setFeaturedStyles] = useState([]);

  useEffect(() => {
    fetchServices('package').then((r) => setFeaturedServices(r.data.data.slice(0, 3)));
    fetchHairstyles({ featured: true }).then((r) => setFeaturedStyles(r.data.data.slice(0, 4)));
  }, []);

  return (
    <div className="home">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__gradient" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__eyebrow">Welcome to LuxeHair</p>
          <h1 className="hero__title">
            Your Best Hair,<br /><em>Every Single Day</em>
          </h1>
          <p className="hero__subtitle">
            Expert stylists. Premium products. Stunning results that speak for themselves.
          </p>
          <div className="hero__actions">
            <Link to="/booking" className="btn btn--primary btn--lg">Book Appointment</Link>
            <Link to="/gallery" className="btn btn--outline btn--lg">View Gallery</Link>
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <div className="hero__scroll-hint-line" />
          <span>scroll</span>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="stats">
        {[
          { value: '10+', label: 'Years Experience' },
          { value: '5,000+', label: 'Happy Clients' },
          { value: '15', label: 'Expert Stylists' },
          { value: '4.9★', label: 'Average Rating' },
        ].map(({ value, label }) => (
          <div key={label} className="stats__item">
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      {/* ── Featured Packages ─────────────────────────────────── */}
      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Our Packages</p>
          <h2>Curated Salon Experiences</h2>
          <p>Beautifully bundled services for the full LuxeHair treatment</p>
        </div>
        <div className="card-grid card-grid--3">
          {featuredServices.map((svc) => (
            <ServiceCard key={svc._id} service={svc} />
          ))}
        </div>
        <div className="section__cta">
          <Link to="/services" className="btn btn--outline-gold btn--lg">View All Services</Link>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────────────────── */}
      <section className="why-us">
        <div className="why-us__inner">
          <div className="section__header">
            <p className="eyebrow">Why Choose Us</p>
            <h2>The LuxeHair Difference</h2>
          </div>
          <div className="why-us__grid">
            {[
              { icon: '🏆', title: 'Award-Winning Stylists', desc: 'Our team has won multiple local and national styling awards.' },
              { icon: '🌿', title: 'Premium Products', desc: 'We use only the finest, cruelty-free, salon-grade products.' },
              { icon: '📅', title: 'Easy Booking', desc: 'Book online 24/7 in under 2 minutes — no phone call needed.' },
              { icon: '💳', title: 'Secure Payment', desc: 'Simple, secure checkout with instant booking confirmation.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="why-us__item">
                <div className="why-us__icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Gallery ──────────────────────────────────── */}
      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Featured Styles</p>
          <h2>Get Inspired</h2>
          <p>Browse our latest work and find your perfect look</p>
        </div>
        <div className="card-grid card-grid--4">
          {featuredStyles.map((style) => (
            <HairstyleCard key={style._id} hairstyle={style} />
          ))}
        </div>
        <div className="section__cta">
          <Link to="/gallery" className="btn btn--outline-gold btn--lg">Browse Full Gallery</Link>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="cta-banner">
        <div className="cta-banner__content">
          <p className="cta-banner__eyebrow">Ready for a Change?</p>
          <h2>Transform Your Look Today</h2>
          <p>Book your appointment and let our expert stylists craft your perfect look.</p>
          <div className="cta-banner__actions">
            <Link to="/booking" className="btn btn--primary btn--lg">Book Appointment</Link>
            <Link to="/contact" className="btn btn--outline btn--lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
