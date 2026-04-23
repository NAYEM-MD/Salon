import { Link } from 'react-router-dom';
import './ServiceCard.css';

const categoryIcons = {
  haircut:   '✂',
  coloring:  '🎨',
  treatment: '✨',
  styling:   '💫',
  package:   '🎁',
};

export default function ServiceCard({ service }) {
  const { _id, name, description, price, duration, category } = service;

  return (
    <div className="service-card">
      <div className="service-card__icon">{categoryIcons[category] || '✂'}</div>
      <div className="service-card__category">{category}</div>
      <h3 className="service-card__name">{name}</h3>
      <p className="service-card__desc">{description}</p>
      <div className="service-card__meta">
        <span className="service-card__duration">⏱ {duration} min</span>
        <span className="service-card__price">${price}</span>
      </div>
      <Link to={`/booking?service=${_id}`} className="service-card__book">
        Book This Service
      </Link>
    </div>
  );
}
