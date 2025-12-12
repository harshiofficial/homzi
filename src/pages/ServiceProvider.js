import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import PageTransition from '../components/PageTransition';

const StyledProvider = styled.div`
  padding: 40px 0;
  background: var(--background-light);

  .profile-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .profile-header {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 2rem;
    align-items: center;
    margin-bottom: 2rem;

    .profile-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #f5f5f5;
    }

    .profile-info {
      h1 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .profession {
        color: var(--text-light);
        margin-bottom: 0.5rem;
      }

      .rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        .star {
          color: #ffd700;
        }

        .reviews {
          color: var(--text-light);
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 1rem;

      button {
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;

        &.book-now {
          background: var(--primary-color);
          color: white;
          border: none;

          &:hover {
            background: #e55a2a;
          }
        }

        &.contact {
          background: white;
          color: var(--text-dark);
          border: 1px solid #e1e1e1;

          &:hover {
            background: #f5f5f5;
          }
        }
      }
    }
  }

  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;

    .info-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--text-light);

      i {
        color: var(--primary-color);
      }
    }
  }

  .description {
    margin-bottom: 2rem;
    line-height: 1.6;
    color: var(--text-dark);
  }

  .skills {
    margin-bottom: 2rem;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;

      .skill-tag {
        background: #f5f5f5;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        color: var(--text-dark);
      }
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    text-align: center;
    margin-bottom: 2rem;

    .stat-item {
      .number {
        font-size: 2rem;
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }

      .label {
        color: var(--text-light);
        font-size: 0.9rem;
      }
    }
  }

  .gallery {
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;

      .gallery-item {
        position: relative;
        aspect-ratio: 4/3;
        border-radius: 8px;
        overflow: hidden;
        background: #f5f5f5;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          color: white;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .profile-header {
      grid-template-columns: auto 1fr;
      
      .action-buttons {
        grid-column: 1/-1;
        justify-content: stretch;
        
        button {
          flex: 1;
        }
      }
    }
  }
`;

const ServiceProvider = () => {
  const provider = {
    name: 'John Doe',
    profession: 'Plumber',
    rating: 4.8,
    reviews: 127,
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    memberSince: '2018',
    description: 'Experienced plumber with over 10 years in the field. Specializing in residential and commercial plumbing services.',
    skills: ['Pipe Repair', 'Drain Cleaning', 'Water Heater Installation', 'Leak Detection'],
    stats: {
      completedJobs: 215,
      responseRate: '98%',
      totalReviews: 127
    },
    gallery: [
      { title: 'Kitchen Sink Installation', image: 'kitchen-sink.jpg' },
      { title: 'Bathroom Remodeling', image: 'bathroom.jpg' },
      { title: 'Water Heater Repair', image: 'water-heater.jpg' },
      { title: 'Pipe Replacement', image: 'pipe.jpg' },
      { title: 'Drain Cleaning', image: 'drain.jpg' },
      { title: 'Faucet Installation', image: 'faucet.jpg' }
    ]
  };

  return (
    <PageTransition>
      <StyledProvider>
        <Container>
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-image" />
              <div className="profile-info">
                <h1>{provider.name}</h1>
                <div className="profession">{provider.profession}</div>
                <div className="rating">
                  <i className="fas fa-star star"></i>
                  <span>{provider.rating}</span>
                  <span className="reviews">({provider.reviews} reviews)</span>
                </div>
              </div>
              <div className="action-buttons">
                <button className="book-now">Book Now</button>
                <button className="contact">Contact</button>
              </div>
            </div>

            <div className="contact-info">
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{provider.location}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <span>{provider.phone}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <span>{provider.email}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-calendar-alt"></i>
                <span>Member since {provider.memberSince}</span>
              </div>
            </div>

            <div className="description">
              {provider.description}
            </div>

            <div className="skills">
              <h3>Skills</h3>
              <div className="skill-tags">
                {provider.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="stats">
              <div className="stat-item">
                <div className="number">{provider.stats.completedJobs}</div>
                <div className="label">Completed Jobs</div>
              </div>
              <div className="stat-item">
                <div className="number">{provider.stats.responseRate}</div>
                <div className="label">Response Rate</div>
              </div>
              <div className="stat-item">
                <div className="number">{provider.stats.totalReviews}</div>
                <div className="label">Total Reviews</div>
              </div>
            </div>
          </div>

          <div className="gallery">
            <h2>Photo Gallery</h2>
            <div className="gallery-grid">
              {provider.gallery.map((item, index) => (
                <div key={index} className="gallery-item">
                  <div className="caption">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </StyledProvider>
    </PageTransition>
  );
};

export default ServiceProvider;
