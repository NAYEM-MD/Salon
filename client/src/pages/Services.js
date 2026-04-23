import { useEffect, useState } from 'react';
import { fetchServices } from '../api/services';
import ServiceCard from '../components/ServiceCard';
import PageHero from '../components/PageHero';
import LoadingSpinner from '../components/LoadingSpinner';
import './Services.css';

const CATEGORIES = ['all', 'haircut', 'coloring', 'treatment', 'styling', 'package'];

export default function Services() {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const cat = activeCategory === 'all' ? undefined : activeCategory;
    fetchServices(cat)
      .then((r) => setServices(r.data.data))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div>
      <PageHero
        title="Services & Pricing"
        subtitle="Premium salon services tailored to your unique style"
        breadcrumb="Services"
      />

      <div className="services-page">
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
          <div className="services-grid">
            {services.map((svc) => (
              <ServiceCard key={svc._id} service={svc} />
            ))}
            {services.length === 0 && (
              <p className="no-results">No services found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
