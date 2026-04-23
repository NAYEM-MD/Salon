import './HairstyleCard.css';

export default function HairstyleCard({ hairstyle }) {
  const { title, description, imageUrl, category, tags, isFeatured } = hairstyle;

  return (
    <div className="hairstyle-card">
      <div className="hairstyle-card__image-wrap">
        <img src={imageUrl} alt={title} className="hairstyle-card__image" loading="lazy" />
        <div className="hairstyle-card__overlay" aria-hidden="true" />
        {isFeatured && <span className="hairstyle-card__badge">Featured</span>}
        <span className="hairstyle-card__category">{category}</span>
      </div>
      <div className="hairstyle-card__body">
        <h3 className="hairstyle-card__title">{title}</h3>
        {description && <p className="hairstyle-card__desc">{description}</p>}
        <div className="hairstyle-card__tags">
          {tags?.map((tag) => (
            <span key={tag} className="hairstyle-card__tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
