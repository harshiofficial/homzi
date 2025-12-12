import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faStar, 
  faClock, 
  faPlus,
  faTools,
  faCheckCircle,
  faTint,
  faBolt,
  faPencilRuler,
  faPaw,
  faWifi,
  faFan,
  faCouch,
  faChair,
  faSnowflake,
  faFireExtinguisher,
  faBug,
  faFaucet,
  faLightbulb,
  faHome,
  faTrashAlt,
  faShower,
  faWrench,
  faPaintRoller
} from '@fortawesome/free-solid-svg-icons';

const StyledServices = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  .header-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    h1 {
      font-size: 2.2rem;
      color: var(--text-dark);
      margin: 0;
      text-align: center;
    }

    .search-wrapper {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      position: relative;

      input {
        width: 100%;
        padding: 1rem 1rem 1rem 3.5rem;
        border: 2px solid #e5e7eb;
        border-radius: 50px;
        font-size: 1.1rem;
        background: #f9fafb;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          background: white;
          box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
        }

        &::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }
      }

      .search-icon {
        position: absolute;
        left: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
        font-size: 1.1rem;
      }
    }

    .filter-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 1rem;
    }

    .filter-button {
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--primary-color);
      border-radius: 50px;
      background: white;
      color: var(--primary-color);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover, &.active {
        background: var(--primary-color);
        color: white;
      }
    }

    .sort-select {
      padding: 0.75rem 1.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 50px;
      background: white;
      color: #4b5563;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }

  .filters-panel {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);

    .filter-group {
      margin-bottom: 1.5rem;

      h4 {
        margin: 0 0 1rem 0;
        color: #374151;
        font-size: 1.1rem;
      }
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .category-tag {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 50px;
      background: #f9fafb;
      color: #4b5563;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover, &.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
    }

    .price-range {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;

      input[type="range"] {
        flex: 1;
        height: 6px;
        -webkit-appearance: none;
        background: #e5e7eb;
        border-radius: 3px;
        outline: none;

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: var(--primary-color);
          border-radius: 50%;
          cursor: pointer;
        }
      }

      span {
        font-weight: 600;
        color: var(--text-dark);
        min-width: 60px;
        text-align: center;
      }
    }
  }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;

    h3 {
      margin: 1rem 0 0.5rem;
      color: #1f2937;
    }

    p {
      color: #6b7280;
    }
  }

  .service-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;

    .image-container {
      position: relative;
      padding-top: 60%;
      overflow: hidden;
      background: #f9fafb;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }

      .availability-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(16, 185, 129, 0.95);
        color: white;
        padding: 0.4rem 0.9rem;
        border-radius: 50px;
        font-size: 0.8rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        backdrop-filter: blur(4px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1;
      }

      .featured-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: var(--primary-color);
        color: white;
        padding: 0.4rem 0.9rem;
        border-radius: 50px;
        font-size: 0.8rem;
        font-weight: 600;
        z-index: 1;
      }
    }

    .content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;

      .service-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
      }

      .service-type {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
        background: #f3f4f6;
        padding: 0.25rem 0.75rem;
        border-radius: 50px;
        font-weight: 500;

        .service-icon {
          color: var(--primary-color);
          font-size: 0.8rem;
        }
      }

      h3 {
        font-size: 1.25rem;
        color: #111827;
        margin-bottom: 0.5rem;
      }

      .description {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 1rem;
      }

      .meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #f3f4f6;

        .rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #f59e0b;
          font-weight: 600;
          font-size: 0.95rem;

          .reviews {
            color: #9ca3af;
            font-weight: normal;
            margin-left: 0.25rem;
          }
        }

        .duration {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.9rem;
          background: #f9fafb;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }

        .price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-color);
        }
      }

      .book-now {
        width: 100%;
        padding: 0.75rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        &:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
        }

        &:active {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(var(--primary-rgb), 0.2);
        }
      }
    }
  }

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('popularity');

  // Get unique categories from services
  const serviceCategories = [
    'All',
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Cleaning',
    'Appliance',
    'HVAC',
    'Pest Control',
    'Renovation'
  ];

  // Handle image loading errors
  const handleImageError = useCallback((e) => {
    e.target.src = 'https://via.placeholder.com/400x300?text=Service+Image';
  }, []);

  // Handle book now button click
  const handleBookNow = useCallback((serviceId) => {
    navigate('/booking?serviceId=' + serviceId);
  }, [navigate]);

  // Filter and sort services
  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || service.type === selectedCategory;
      const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popularity':
        default:
          return b.reviews - a.reviews;
      }
    });

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300?text=Service+Image';
  };

  // Service categories
const serviceCategories = [
  'All',
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'Cleaning',
  'Appliance',
  'HVAC',
  'Pest Control',
  'Renovation'
];

const services = [
  {
    id: 1,
    name: 'Emergency Plumbing',
    type: 'Plumbing',
    description: '24/7 emergency plumbing services for leaks, clogs, and installations.',
    rating: 4.7,
    reviews: 245,
    duration: '30min',
    price: 99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop',
    available: true,
    featured: true,
    icon: faTint
  },
  {
    id: 2,
    name: 'Electrical Repairs',
    type: 'Electrical',
    description: 'Certified electricians for all your home and office electrical needs.',
    rating: 4.8,
    reviews: 189,
    duration: '1h',
    price: 89,
    image: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=800&auto=format&fit=crop',
    available: true,
    featured: true,
    icon: faBolt
  },
  {
    id: 3,
    name: 'Furniture Carpentry',
    type: 'Carpentry',
    description: 'Custom furniture and woodworking solutions tailored to your needs.',
    rating: 4.9,
    reviews: 156,
    duration: '2h',
    price: 150,
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
    available: true,
    featured: true,
    icon: faCouch
  },
  {
    id: 4,
    name: 'Interior Painting',
    type: 'Painting',
    description: 'Professional interior painting services with premium quality paints.',
    rating: 4.8,
    reviews: 210,
    duration: '4h',
    price: 199,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop',
    available: true,
    featured: true,
    icon: faPaintRoller
  },
  {
    id: 5,
    name: 'Deep Cleaning',
    type: 'Cleaning',
    description: 'Thorough deep cleaning services for homes and offices.',
    rating: 4.6,
    reviews: 178,
    duration: '3h',
    price: 129,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop',
    available: true,
    icon: faBroom
  },
  {
    id: 6,
    name: 'AC Service & Repair',
    type: 'HVAC',
    description: 'Professional AC maintenance, service, and repair solutions.',
    rating: 4.7,
    reviews: 165,
    duration: '2h',
    price: 149,
    image: 'https://images.unsplash.com/photo-1601134449505-1e4e92b95f5e?w=800&auto=format&fit=crop',
    available: true,
    icon: faSnowflake
  },
  {
    id: 7,
    name: 'Appliance Repair',
    type: 'Appliance',
    description: 'Expert repair services for all major home appliances.',
    rating: 4.5,
    reviews: 132,
    duration: '1.5h',
    price: 99,
    image: 'https://images.unsplash.com/photo-1571902943201-8fa2ac9fbf15?w=800&auto=format&fit=crop',
    available: true,
    icon: faTools
  },
  {
    id: 8,
    name: 'Pest Control',
    type: 'Pest Control',
    description: 'Effective pest control solutions for homes and businesses.',
    rating: 4.8,
    reviews: 201,
    duration: '1h',
    price: 129,
    image: 'https://images.unsplash.com/photo-1601493705871-47f0b169e64b?w=800&auto=format&fit=crop',
    available: true,
    icon: faBug
  },
  {
    id: 9,
    name: 'Bathroom Renovation',
    type: 'Renovation',
    description: 'Complete bathroom remodeling and renovation services.',
    rating: 4.9,
    reviews: 98,
    duration: '8h',
    price: 499,
    image: 'https://images.unsplash.com/photo-1600566752225-3b5a0e4a8b1f?w=800&auto=format&fit=crop',
    available: true,
    icon: faShower
  },
  {
    id: 10,
    name: 'Kitchen Plumbing',
    type: 'Plumbing',
    description: 'Specialized plumbing services for kitchen fixtures and appliances.',
    rating: 4.7,
    reviews: 143,
    duration: '1h',
    price: 109,
    image: 'https://images.unsplash.com/photo-1556911220-e15cddfb3b9d?w=800&auto=format&fit=crop',
    available: true,
    icon: faFaucet
  },
  {
    id: 11,
    name: 'Lighting Installation',
    type: 'Electrical',
    description: 'Professional installation of indoor and outdoor lighting.',
    rating: 4.8,
    reviews: 112,
    duration: '1.5h',
    price: 89,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    available: true,
    icon: faLightbulb
  },
  {
    id: 12,
    name: 'Furniture Assembly',
    type: 'Carpentry',
    description: 'Professional assembly of all types of furniture.',
    rating: 4.9,
    reviews: 187,
    duration: '2h',
    price: 79,
    image: 'https://images.unsplash.com/photo-1555041463-a8f2a0e8c4c2?w=800&auto=format&fit=crop',
    available: true,
    icon: faChair
  }
];

  return (
    <StyledServices>
      <div className="header-section">
        <h1>Our Services</h1>
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={"filter-button" + (showFilters ? ' active' : '')}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            {showFilters ? 'Hide Filters' : 'Filters'}
          </button>
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Sort by: Popularity</option>
            <option value="rating">Sort by: Rating</option>
            <option value="price-asc">Sort by: Price (Low to High)</option>
            <option value="price-desc">Sort by: Price (High to Low)</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <h4>Categories</h4>
            <div className="category-filters">
              {serviceCategories.map(category => (
                <button
                  key={category}
                  className={"category-tag" + (selectedCategory === category ? ' active' : '')}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-range">
              <span>₹{priceRange[0]}</span>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <span>₹{priceRange[1]}+</span>
            </div>
          </div>
        </div>
      )}

      <div className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <div key={service.id} className="service-card">
              <div className="image-container">
                <img 
                  src={service.image} 
                  alt={service.name}
                  onError={handleImageError}
                />
                {service.available && (
                  <span className="availability-badge">
                    <FontAwesomeIcon icon={faCheckCircle} /> Available Now
                  </span>
                )}
                {service.featured && <span className="featured-badge">Featured</span>}
              </div>
              <div className="content">
                <div className="service-header">
                  <span className="service-type">
                    <FontAwesomeIcon icon={service.icon || faTools} className="service-icon" />
                    {service.type}
                  </span>
                  <div className="rating">
                    <FontAwesomeIcon icon={faStar} className="star" />
                    <span>{service.rating}</span>
                    <span className="reviews">({service.reviews})</span>
                  </div>
                </div>
                <h3>{service.name}</h3>
                <p className="description">{service.description}</p>
                <div className="meta">
                  <div className="duration">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{service.duration}</span>
                  </div>
                  <span className="price">₹{service.price}</span>
                </div>
                <button 
                  className="book-now"
                  onClick={() => handleBookNow(service.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <FontAwesomeIcon icon={faSearch} size="2x" />
            <h3>No services found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </StyledServices>
  );
};

export default Services;
