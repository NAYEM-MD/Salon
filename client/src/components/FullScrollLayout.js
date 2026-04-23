import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Hairstyles from '../pages/Hairstyles';
import Booking from '../pages/Booking';
import Checkout from '../pages/Checkout';
import Confirmation from '../pages/Confirmation';
import Contact from '../pages/Contact';

const PATH_TO_SECTION = {
  '/': 'home',
  '/services': 'services',
  '/gallery': 'gallery',
  '/booking': 'booking',
  '/checkout': 'checkout',
  '/confirmation': 'confirmation',
  '/contact': 'contact',
};

export default function FullScrollLayout() {
  const location = useLocation();

  useEffect(() => {
    const id = PATH_TO_SECTION[location.pathname] || 'home';
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.pathname, location.search]);

  return (
    <>
      <section id="home" className="app__section" aria-label="Home">
        <Home />
      </section>
      <section id="services" className="app__section" aria-label="Services and pricing">
        <Services />
      </section>
      <section id="gallery" className="app__section" aria-label="Hairstyle gallery">
        <Hairstyles />
      </section>
      <section id="booking" className="app__section" aria-label="Book an appointment">
        <Booking />
      </section>
      <section id="checkout" className="app__section" aria-label="Checkout">
        <Checkout />
      </section>
      <section id="confirmation" className="app__section" aria-label="Booking confirmation">
        <Confirmation />
      </section>
      <section id="contact" className="app__section" aria-label="Contact">
        <Contact />
      </section>
    </>
  );
}
