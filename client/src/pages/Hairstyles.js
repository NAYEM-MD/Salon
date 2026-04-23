import { useEffect, useState } from 'react';
import { fetchHairstyles } from '../api/hairstyles';
import HairstyleCard from '../components/HairstyleCard';
import PageHero from '../components/PageHero';
import LoadingSpinner from '../components/LoadingSpinner';
import './Hairstyles.css';

const CATEGORIES = ['all', 'short', 'medium', 'long', 'curly', 'color', 'updo'];

export default function Hairstyles() {
  const [hairstyles, setHairstyles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = activeCategory !== 'all' ? { category: activeCategory } : {};
    fetchHairstyles(params)
      .then((r) => setHairstyles(r.data.data))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div>
      <PageHero
        title="Hairstyle Gallery"
        subtitle="Browse our curated collection of stunning looks"
        breadcrumb="Gallery"
      />

      <div className="gallery-page">
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'category-tab--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="gallery-grid">
            {hairstyles.map((style) => (
              <HairstyleCard key={style._id} hairstyle={style} />
            ))}
            {hairstyles.length === 0 && (
              <p className="no-results">No styles found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
