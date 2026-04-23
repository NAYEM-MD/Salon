import { Link } from 'react-router-dom';
import './PageHero.css';

export default function PageHero({ title, subtitle, eyebrow, breadcrumb }) {
  return (
    <section className="page-hero">
      <div className="page-hero__content">
        {eyebrow && <span className="page-hero__eyebrow">{eyebrow}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        {breadcrumb && (
          <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>{breadcrumb}</span>
          </nav>
        )}
      </div>
    </section>
  );
}
