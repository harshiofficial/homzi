import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faMapMarkerAlt,
  faStar,
  faClock,
  faPhone,
  faArrowRight,
  faEnvelope,
  faRulerCombined
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from '../context/LocationContext';
import { serviceCenters, getServiceCentersByLocation } from '../data/serviceCenters';

const StyledServicesPage = styled.div`
  min-height: 100vh;
  background: #f5f5f5;

  .location-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .location-content {
      max-width: 1400px;
      margin: 0 auto;

      .location-title {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        svg {
          font-size: 1.4rem;
        }
      }

      .current-location {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .location-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        button {
          padding: 0.75rem 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: white;
          }
        }
      }
    }
  }

  .main-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;

    .search-section {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .search-wrapper {
        position: relative;
        margin-bottom: 1.5rem;

        input {
          width: 100%;
          padding: 1rem 1rem 1rem 3.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 50px;
          font-size: 1.1rem;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          }
        }

        svg {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
      }

      .quick-filters {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        button {
          padding: 0.6rem 1.2rem;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;

          &:hover, &.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
          }
        }
      }
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #1f2937;
    }
  }

  .service-centers-section {
    margin-bottom: 3rem;

    .centers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .center-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      .center-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;

        .center-name {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .center-address {
          font-size: 0.9rem;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .center-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);

          .rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;

            svg {
              color: #fbbf24;
            }
          }

          .delivery-time {
            font-size: 0.9rem;
            opacity: 0.9;
          }
        }
      }

      .center-body {
        padding: 1.5rem;

        .distance {
          font-size: 1.1rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 1rem;
        }

        .services-list {
          margin-bottom: 1.5rem;

          .services-label {
            font-size: 0.85rem;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
          }

          .services-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;

            .service-tag {
              background: #f3f4f6;
              color: #4b5563;
              padding: 0.35rem 0.75rem;
              border-radius: 50px;
              font-size: 0.8rem;
              font-weight: 500;
            }
          }
        }

        .metadata {
          display: grid;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          color: #4b5563;
          font-size: 0.9rem;

          svg {
            margin-right: 0.5rem;
            color: #667eea;
          }
        }

        .contact-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 1rem;

          svg {
            font-size: 1.1rem;
          }
        }

        .view-button {
          width: 100%;
          padding: 0.75rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;

          &:hover {
            background: #764ba2;
            transform: translateX(2px);
          }
        }
      }
    }
  }

  .all-centers-section {
    margin-top: 4rem;

    .section-subtitle {
      color: #6b7280;
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    .all-centers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 1.5rem;
    }

    .all-center-card {
      background: white;
      border-radius: 16px;
      padding: 1.75rem;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08);
      border: 1px solid rgba(148, 163, 184, 0.15);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      .header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: flex-start;

        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          color: #1f2937;
        }

        .address {
          margin: 0;
          font-size: 0.95rem;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rating {
          background: rgba(102, 126, 234, 0.12);
          color: #4338ca;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;

          .reviews {
            color: #6b7280;
            font-size: 0.8rem;
            font-weight: 500;
          }
        }
      }

      .meta-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1rem;

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;

          .label {
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #9ca3af;
          }

          .value {
            font-weight: 600;
            color: #374151;

            &.email {
              font-size: 0.85rem;
              color: #6366f1;
            }
          }
        }
      }

      .coverage,
      .specialties {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;

          .tag {
            background: #f3f4f6;
            color: #4b5563;
            padding: 0.35rem 0.75rem;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 500;
          }
        }
      }

      .view-button {
        width: auto;
        align-self: flex-start;
        padding: 0.65rem 1.5rem;
      }
    }
  }

  .loading {
    text-align: center;
    padding: 3rem;
    color: #6b7280;

    .spinner {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 4px solid #f3f4f6;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 16px;
    color: #6b7280;

    h3 {
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    .location-header {
      padding: 1.5rem;

      .location-content {
        .current-location {
          font-size: 1.4rem;
        }

        .location-actions {
          flex-direction: column;

          button {
            width: 100%;
          }
        }
      }
    }

    .main-content {
      padding: 1rem;

      .search-section {
        padding: 1.5rem;
      }
    }

    .service-centers-section {
      .centers-grid {
        grid-template-columns: 1fr;
      }
    }

    .all-centers-section {
      .all-centers-grid {
        grid-template-columns: 1fr;
      }
    }
  }
`;

const ServicesNew = () => {
  const navigate = useNavigate();
  const { userLocation, getUserLocation, loading: locationLoading, getNearbyServiceCenters } = useLocation();
  const [nearbyServiceCenters, setNearbyServiceCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('All');
  const [loading, setLoading] = useState(true);

  // Get user location on component mount
  useEffect(() => {
    if (!userLocation) {
      getUserLocation();
    }
  }, [userLocation, getUserLocation]);

  // Get nearby service centers when location is available
  useEffect(() => {
    if (userLocation) {
      const nearby = getNearbyServiceCenters
        ? getNearbyServiceCenters(serviceCenters, 50)
        : getServiceCentersByLocation(userLocation.latitude, userLocation.longitude, 50);
      setNearbyServiceCenters(nearby);
      setLoading(false);
    }
  }, [userLocation]);

  const handleViewServices = useCallback((centerId) => {
    navigate(`/booking?centerId=${centerId}`);
  }, [navigate]);

  const filteredCenters = nearbyServiceCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = selectedService === 'All' || center.services.includes(selectedService);
    return matchesSearch && matchesService;
  });

  const allServices = ['All', ...new Set(serviceCenters.flatMap(c => c.services))];

  const getLocationName = () => {
    if (userLocation) {
      return `Serving your area (${userLocation.latitude.toFixed(2)}°, ${userLocation.longitude.toFixed(2)}°)`;
    }
    return 'Finding your location...';
  };

  const allCentersSorted = serviceCenters
    .slice()
    .sort((a, b) => b.rating - a.rating);

  return (
    <StyledServicesPage>
      <div className="location-header">
        <div className="location-content">
          <div className="location-title">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            Your Location
          </div>
          <div className="current-location">
            {getLocationName()}
          </div>
          <div className="location-actions">
            <button onClick={getUserLocation}>
              Update Location
            </button>
            <button>
              Change Area
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="search-section">
          <div className="search-wrapper">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search service centers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="quick-filters">
            {allServices.map(service => (
              <button
                key={service}
                className={selectedService === service ? 'active' : ''}
                onClick={() => setSelectedService(service)}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div className="service-centers-section">
          <h2 className="section-title">
            {selectedService === 'All' ? 'Nearby Service Centers' : `${selectedService} Service Centers`}
          </h2>

          {loading || locationLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Finding service centers near you...</p>
            </div>
          ) : filteredCenters.length > 0 ? (
            <div className="centers-grid">
              {filteredCenters.map(center => (
                <div key={center.id} className="center-card">
                  <div className="center-header">
                    <div className="center-name">{center.name}</div>
                    <div className="center-address">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {center.address}
                    </div>
                    <div className="center-meta">
                      <div className="rating">
                        <FontAwesomeIcon icon={faStar} />
                        <span>{center.rating}</span>
                        <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>({center.reviews})</span>
                      </div>
                      <div className="delivery-time">
                        <FontAwesomeIcon icon={faClock} /> {center.deliveryTime}
                      </div>
                    </div>
                  </div>
                  <div className="center-body">
                    <div className="distance">
                      📍 {center.distance.toFixed(1)} km away
                    </div>
                    <div className="services-list">
                      <div className="services-label">Services Available</div>
                      <div className="services-tags">
                        {center.services.map(service => (
                          <span key={service} className="service-tag">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="metadata">
                      <div>
                        <FontAwesomeIcon icon={faClock} /> {center.operatingHours}
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faRulerCombined} /> Service radius ~{center.serviceRadiusKm} km
                      </div>
                    </div>
                    <div className="contact-info">
                      <FontAwesomeIcon icon={faPhone} />
                      {center.phone}
                    </div>
                    <div className="contact-info">
                      <FontAwesomeIcon icon={faEnvelope} />
                      {center.supportEmail}
                    </div>
                    <button 
                      className="view-button"
                      onClick={() => handleViewServices(center.id)}
                    >
                      View Services
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No service centers found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        <div className="all-centers-section">
          <h2 className="section-title">All Service Centers</h2>
          <p className="section-subtitle">Explore every Homzi hub with complete coverage and contact information</p>

          <div className="all-centers-grid">
            {allCentersSorted.map(center => (
              <div key={`all-${center.id}`} className="all-center-card">
                <div className="header">
                  <div>
                    <h3>{center.name}</h3>
                    <p className="address">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {center.address}, {center.city} - {center.pincode}
                    </p>
                  </div>
                  <span className="rating">
                    <FontAwesomeIcon icon={faStar} /> {center.rating}
                    <span className="reviews">({center.reviews} reviews)</span>
                  </span>
                </div>
                <div className="meta-row">
                  <div className="meta-item">
                    <span className="label">Operating Hours</span>
                    <span className="value">{center.operatingHours}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Service Radius</span>
                    <span className="value">≈ {center.serviceRadiusKm} km</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Contact</span>
                    <span className="value">{center.phone}</span>
                    <span className="value email">{center.supportEmail}</span>
                  </div>
                </div>
                <div className="coverage">
                  <span className="label">Coverage Areas</span>
                  <div className="tags">
                    {center.coverageAreas.map(area => (
                      <span key={`${center.id}-${area}`} className="tag">{area}</span>
                    ))}
                  </div>
                </div>
                <div className="specialties">
                  <span className="label">Specialties</span>
                  <div className="tags">
                    {center.specialties.map(specialty => (
                      <span key={`${center.id}-${specialty}`} className="tag">{specialty}</span>
                    ))}
                  </div>
                </div>
                <button className="view-button" onClick={() => handleViewServices(center.id)}>
                  Book at this center
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledServicesPage>
  );
};

export default ServicesNew;
