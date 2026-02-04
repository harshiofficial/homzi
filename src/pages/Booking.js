import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilter, 
  faSearch,
  faStar,
  faCheckCircle,
  faClock,
  faTools,
  faMoneyBillWave,
  faArrowRight,
  faHome,
  faWrench,
  faBolt,
  faFan,
  faMobileAlt,
  faTag,
  faPlus,
  faChevronDown,
  faCheck,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import ServiceBookingForm from '../components/ServiceBookingForm';
import ServiceModal from '../components/ServiceModal';
import { useLocation as useLocationContext } from '../context/LocationContext';
import { serviceCenters as homziCenters, getServiceCentersByLocation } from '../data/serviceCenters';
import { fetchProfessionalLeads } from '../api/homziApi';

const StyledBooking = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: #ffffff;

  .header-section {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .search-wrapper {
      flex: 1;
      max-width: 600px;
      position: relative;

      input {
        width: 100%;
        padding: 1rem 1rem 1rem 3rem;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        font-size: 1rem;
        background: #f9fafb;
        transition: all 0.2s ease;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          background: white;
          box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
        }
      }

      .search-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
      }
    }

    .filter-button {
      padding: 0.75rem 1.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: white;
      color: #374151;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #f9fafb;
      }

      .icon {
        font-size: 0.875rem;
      }
    }

    .add-service-button {
      padding: 0.75rem 1.5rem;
      background: #18181b;
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #27272a;
        transform: translateY(-1px);
      }

      .icon {
        font-size: 1rem;
      }
    }
  }

  .filter-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .filter-dropdown {
      position: relative;

      .dropdown-button {
        width: 100%;
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background: white;
        color: #374151;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #f9fafb;
        }

        .icon {
          color: #9ca3af;
          transition: transform 0.2s ease;

          &.open {
            transform: rotate(180deg);
          }
        }
      }

      .dropdown-content {
        position: absolute;
        top: calc(100% + 0.5rem);
        left: 0;
        width: 100%;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 10;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: all 0.2s ease;

        &.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .dropdown-item {
          padding: 0.75rem 1rem;
          color: #374151;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &:hover {
            background: #f9fafb;
          }

          &.selected {
            background: #f3f4f6;
            color: var(--primary-color);
            font-weight: 500;
          }

          .check-icon {
            color: var(--primary-color);
          }
        }
      }
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .availability-alert {
    margin-top: 1.5rem;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    &.error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    &.info {
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }
  }

  .service-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }

    .service-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-bottom: 1px solid #e5e7eb;
    }

    .service-content {
      padding: 1.5rem;

      .service-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;

        .service-title {
          h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            margin: 0 0 0.5rem;
          }

          .availability {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem;
            background: #dcfce7;
            color: #166534;
            border-radius: 100px;
            font-size: 0.875rem;
            font-weight: 500;

            &.unavailable {
              background: #fee2e2;
              color: #991b1b;
            }

            .status-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: currentColor;
            }
          }
        }
      }

      .service-description {
        color: #4b5563;
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }

      .service-meta {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        .rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #111827;
          font-weight: 500;

          .icon {
            color: #f59e0b;
          }

          .reviews {
            color: #6b7280;
            font-weight: 400;
          }
        }

        .duration, .price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #374151;

          .icon {
            color: #6b7280;
          }
        }
      }

      .provider-info {
        background: #f9fafb;
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 1.5rem;
        display: grid;
        gap: 0.5rem;

        .provider-name {
          font-weight: 600;
          color: #111827;
        }

        .provider-center {
          color: #4b5563;
          font-size: 0.95rem;
        }

        .provider-contact {
          color: #6366f1;
          font-size: 0.9rem;
        }

        .availability-note {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1f2937;
        }
      }

      .book-button {
        width: 100%;
        padding: 0.875rem;
        background: #18181b;
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #27272a;
        }
      }
    }
  }
`;

const Booking = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { userLocation, getUserLocation, loading: locationLoading } = useLocationContext();
  const [viewMode, setViewMode] = useState('nearby');
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: { min: 0, max: 1000 },
    duration: 'Any Duration',
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [providerLeads, setProviderLeads] = useState([]);
  const [providerLoading, setProviderLoading] = useState(false);
  const [providerError, setProviderError] = useState(null);

  useEffect(() => {
    if (!userLocation && !locationLoading) {
      getUserLocation();
    }
  }, [userLocation, locationLoading, getUserLocation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setProviderLoading(true);
        setProviderError(null);
        const leads = await fetchProfessionalLeads('approved');
        setProviderLeads(Array.isArray(leads) ? leads : []);
      } catch (err) {
        setProviderError(err.message || 'Failed to load provider availability');
      } finally {
        setProviderLoading(false);
      }
    };

    loadLeads();
  }, []);

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const priceRanges = [
    { label: 'All Prices', min: 0, max: 1000 },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Over $200', min: 200, max: 1000 }
  ];

  const serviceTypes = [
    'All Services',
    'Plumbing',
    'Electrical',
    'HVAC',
    'Smart Home',
    'Cleaning',
    'Appliance Repair',
    'Pest Control',
    'Renovation',
    'Painting'
  ];

  const durations = [
    'Any Duration',
    'Under 1 hour',
    '1-2 hours',
    '2-4 hours',
    'Over 4 hours',
    'Custom'
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (bookingData) => {
    addToCart({
      ...selectedService,
      ...bookingData
    });
    setShowBookingForm(false);
    navigate('/cart');
  };

  const [services, setServices] = useState(() => ([
    {
      id: 1,
      name: 'Emergency Plumbing Visit',
      category: 'plumbing',
      subServiceId: 'plumbing_emergency',
      description: '24/7 emergency visit for leaks, burst pipes, or drainage issues.',
      price: 799,
      duration: '30min–1 hour',
      rating: 4.8,
      reviews: 540,
      available: true,
      image: '/images/services/plumbing-emergency.jpg',
      features: ['30-min response in metros', 'Genuine spares', 'Safety-checked pros'],
      badges: ['Most Booked', 'Emergency'],
      centerId: 1,
      availability: 'Available Today'
    },
    {
      id: 2,
      name: 'Full Home Deep Cleaning (2 BHK)',
      category: 'cleaning',
      subServiceId: 'clean_full_home',
      description: 'Floor, kitchen, bathroom, balcony and dusting with machine tools.',
      price: 3499,
      duration: '6-8 hours',
      rating: 4.9,
      reviews: 310,
      available: true,
      image: '/images/services/deep-clean-2bhk.jpg',
      features: ['Mechanised cleaning', 'Eco-friendly chemicals', '2-person crew'],
      badges: ['Popular', 'Festive Offer'],
      centerId: 9,
      availability: 'Slots Filling Fast'
    },
    {
      id: 3,
      name: 'AC Service & Gas Top-Up',
      category: 'appliance',
      subServiceId: 'app_ac',
      description: 'Wet service, filter cleaning, basic repairs, and gas top-up if needed.',
      price: 1499,
      duration: '1-2 hours',
      rating: 4.7,
      reviews: 420,
      available: true,
      image: '/images/services/ac-service.jpg',
      features: ['90-day service warranty', 'Leak check', 'Cooling test'],
      badges: ['Summer Special'],
      centerId: 8,
      availability: 'Available Today'
    },
    {
      id: 4,
      name: 'Interior Painting (1 Room)',
      category: 'painting',
      subServiceId: 'paint_interior',
      description: 'Repaint a single room with premium emulsion paints and basic putty.',
      price: 2499,
      duration: '1 day',
      rating: 4.6,
      reviews: 190,
      available: true,
      image: '/images/services/interior-paint.jpg',
      features: ['Dust cover protection', 'Color consultation', 'Cleanup included'],
      badges: ['Trending'],
      centerId: 2,
      availability: 'Available Today'
    },
    {
      id: 5,
      name: 'Termite Treatment (Up to 2 BHK)',
      category: 'pest_control',
      subServiceId: 'pest_termites',
      description: 'Drill-fill-seal treatment with long-term protection for wood and walls.',
      price: 3999,
      duration: '3-4 hours',
      rating: 4.7,
      reviews: 210,
      available: true,
      image: '/images/services/termite.jpg',
      features: ['1-year service warranty', 'Odour-controlled chemicals'],
      badges: ['High Protection'],
      centerId: 6,
      availability: 'Next Day Slots'
    }
  ]));

  const handleAddService = (serviceData) => {
    const features = serviceData.features.split(',').map(f => f.trim()).filter(Boolean);
    const newService = {
      id: services.length + 1,
      ...serviceData,
      features,
      price: Number(serviceData.price) || 0,
      rating: 0,
      reviews: 0,
      available: true,
      badges: ['New'],
      centerId: Number(serviceData.centerId),
      availability: serviceData.availability || 'Available Today'
    };

    setServices(prev => [...prev, newService]);
    setShowAddService(false);
  };

  const centerMap = useMemo(() => {
    const map = {};
    homziCenters.forEach(center => {
      map[center.id] = center;
    });
    return map;
  }, []);

  const servicesWithProviders = useMemo(() => {
    return services.map(service => {
      const matchingLeads = providerLeads.filter(lead => {
        const leadServices = Array.isArray(lead.services) ? lead.services : [];

        const matchesSubService =
          service.subServiceId && leadServices.includes(service.subServiceId);

        const matchesCategory =
          !matchesSubService &&
          leadServices.some(
            id => typeof id === 'string' && id.startsWith(service.category + '_')
          );

        const matchesCenter =
          lead.centerId && Number(lead.centerId) === Number(service.centerId);

        return matchesSubService || matchesCenter || matchesCategory;
      });

      const bestLead = matchingLeads[0];
      const availabilityLabel = bestLead?.availability || service.availability;
      const availabilityStatus = availabilityLabel?.toLowerCase() || '';
      const isAvailable = !availabilityStatus.includes('booked');

      return {
        ...service,
        availabilityLabel,
        available: isAvailable,
        providerLeads: matchingLeads
      };
    });
  }, [services, providerLeads]);

  const filteredServices = servicesWithProviders.filter(service => {
    const matchesSearch = !filters.search || 
      service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || 
      service.category.toLowerCase() === filters.category.toLowerCase();
    
    const matchesPriceRange = service.price >= filters.priceRange.min && 
      service.price <= filters.priceRange.max;
    
    const matchesDuration = !filters.duration || filters.duration === 'Any Duration' || 
      service.duration === filters.duration;

    return matchesSearch && matchesCategory && matchesPriceRange && matchesDuration;
  });

  return (
    <StyledBooking>
      <div className="header-section">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search services..." 
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <button className="filter-button">
          <FontAwesomeIcon icon={faFilter} className="icon" />
          Filters
        </button>
        <button className="add-service-button" onClick={() => setShowAddService(true)}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Add a New Service
        </button>
      </div>

      {providerError && (
        <div className="availability-alert error">
          <FontAwesomeIcon icon={faCheckCircle} />
          {providerError}
        </div>
      )}

      {!providerError && providerLoading && (
        <div className="availability-alert info">
          <FontAwesomeIcon icon={faCheckCircle} />
          Syncing live availability across Homzi hubs...
        </div>
      )}

      <div className="filter-section" ref={dropdownRef}>
        <div className="filter-dropdown">
          <button 
            className="dropdown-button"
            onClick={() => handleDropdownClick('price')}
          >
            Price Range
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`icon ${activeDropdown === 'price' ? 'open' : ''}`} 
            />
          </button>
          <div className={`dropdown-content ${activeDropdown === 'price' ? 'active' : ''}`}>
            {priceRanges.map((range, index) => (
              <div
                key={index}
                className={`dropdown-item ${
                  filters.priceRange.min === range.min && 
                  filters.priceRange.max === range.max ? 'selected' : ''
                }`}
                onClick={() => {
                  setFilters({
                    ...filters,
                    priceRange: { min: range.min, max: range.max }
                  });
                  setActiveDropdown(null);
                }}
              >
                {range.label}
                {filters.priceRange.min === range.min && 
                 filters.priceRange.max === range.max && (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="filter-dropdown">
          <button 
            className="dropdown-button"
            onClick={() => handleDropdownClick('type')}
          >
            Service Type
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`icon ${activeDropdown === 'type' ? 'open' : ''}`} 
            />
          </button>
          <div className={`dropdown-content ${activeDropdown === 'type' ? 'active' : ''}`}>
            {serviceTypes.map((type, index) => (
              <div
                key={index}
                className={`dropdown-item ${
                  filters.category === type.toLowerCase() ? 'selected' : ''
                }`}
                onClick={() => {
                  setFilters({
                    ...filters,
                    category: type === 'All Services' ? 'all' : type.toLowerCase()
                  });
                  setActiveDropdown(null);
                }}
              >
                {type}
                {(filters.category === type.toLowerCase() || 
                  (filters.category === 'all' && type === 'All Services')) && (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="filter-dropdown">
          <button 
            className="dropdown-button"
            onClick={() => handleDropdownClick('duration')}
          >
            Duration
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`icon ${activeDropdown === 'duration' ? 'open' : ''}`} 
            />
          </button>
          <div className={`dropdown-content ${activeDropdown === 'duration' ? 'active' : ''}`}>
            {durations.map((duration, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => {
                  setFilters({
                    ...filters,
                    duration: duration === 'Any Duration' ? '' : duration
                  });
                  setActiveDropdown(null);
                }}
              >
                {duration}
                {filters.duration === duration && (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.name} className="service-image" />
            <div className="service-content">
              <div className="service-header">
                <div className="service-title">
                  <h3>{service.name}</h3>
                  <div className={`availability ${service.available ? '' : 'unavailable'}`}>
                    <span className="status-dot"></span>
                    {service.availabilityLabel || (service.available ? 'Available Today' : 'Booked')}
                  </div>
                </div>
              </div>

              <p className="service-description">{service.description}</p>

              <div className="service-meta">
                <div className="rating">
                  <FontAwesomeIcon icon={faStar} className="icon" />
                  {service.rating}
                  <span className="reviews">({service.reviews} reviews)</span>
                </div>
                <div className="duration">
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  {service.duration}
                </div>
                <div className="price">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="icon" />
                  ₹{service.price}
                </div>
              </div>

              <div className="provider-info">
                <div className="provider-name">
                  {centerMap[service.centerId]?.name || 'Homzi Service Hub'}
                </div>
                {centerMap[service.centerId] && (
                  <div className="provider-center">
                    {centerMap[service.centerId].address} · {centerMap[service.centerId].city}
                  </div>
                )}
                {service.providerLeads.length > 0 ? (
                  <div className="provider-contact">
                    {service.providerLeads.slice(0, 2).map(lead => lead.fullName).join(' • ')}
                    {service.providerLeads.length > 2 && ' +' + (service.providerLeads.length - 2)}
                  </div>
                ) : (
                  <div className="provider-center">Managed by Homzi partner network</div>
                )}
                <div className="availability-note">
                  <FontAwesomeIcon icon={faClock} />
                  {service.availabilityLabel || 'Availability updating'}
                </div>
              </div>

              <button className="book-button" onClick={() => handleServiceSelect(service)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddService && (
        <ServiceModal
          onClose={() => setShowAddService(false)}
          onSubmit={handleAddService}
        />
      )}
    </StyledBooking>
  );
};

export default Booking;
