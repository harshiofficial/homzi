import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StyledServices = styled.section`
  padding: 100px 0;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;

  .section-header {
    text-align: center;
    margin-bottom: 5rem;

    .subtitle {
      color: var(--primary-color);
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    h2 {
      font-size: 2.8rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 1.5rem;
      
      span {
        color: var(--primary-color);
      }
    }

    .description {
      max-width: 600px;
      margin: 0 auto;
      color: #666;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .service-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.06);

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

      .service-image img {
        transform: scale(1.1);
      }

      .service-content {
        &::before {
          height: 100%;
        }
      }
    }

    .service-image {
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }

    .service-content {
      padding: 2rem;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 4px;
        height: 0;
        background: var(--primary-color);
        transition: height 0.3s ease;
      }

      h3 {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--text-dark);
      }

      p {
        color: #666;
        line-height: 1.7;
        margin-bottom: 1.5rem;
      }

      .service-features {
        list-style: none;
        padding: 0;
        margin-bottom: 1.5rem;

        li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #666;

          i {
            color: var(--primary-color);
            font-size: 0.9rem;
          }
        }
      }

      .price {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--text-dark);
        margin-bottom: 1.5rem;

        .currency {
          font-size: 1rem;
          font-weight: 500;
          margin-right: 0.2rem;
        }

        .period {
          font-size: 1rem;
          color: #666;
          font-weight: 400;
        }
      }

      .btn-book {
        width: 100%;
        padding: 1rem;
        border: none;
        background: var(--primary-color);
        color: white;
        font-weight: 600;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          background: #e55a2a;
          transform: translateY(-2px);
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    .section-header {
      h2 {
        font-size: 2.2rem;
      }
    }

    .service-card {
      margin-bottom: 2rem;
    }
  }
`;

const serviceData = [
  {
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4',
    title: 'Plumbing Services',
    description: 'Professional plumbing solutions for your home maintenance needs.',
    features: [
      'Emergency Repairs',
      'Pipe Installation',
      'Drain Cleaning',
      'Fixture Replacement'
    ],
    price: '49',
    link: '#book-plumbing'
  },
  {
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e',
    title: 'Electrical Work',
    description: 'Expert electrical services to keep your home powered and safe.',
    features: [
      'Wiring Installation',
      'Circuit Repairs',
      'Light Fixtures',
      'Safety Inspections'
    ],
    price: '59',
    link: '#book-electrical'
  },
  {
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
    title: 'HVAC Maintenance',
    description: 'Complete heating and cooling system maintenance services.',
    features: [
      'AC Repair',
      'Heating Service',
      'Duct Cleaning',
      'System Installation'
    ],
    price: '69',
    link: '#book-hvac'
  }
];

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <StyledServices>
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="subtitle">Our Services</div>
          <h2>
            Professional <span>Home Services</span>
          </h2>
          <p className="description">
            Choose from our range of professional home maintenance services, all delivered by experienced and certified technicians.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Row>
            {serviceData.map((service, index) => (
              <Col lg={4} md={6} key={index}>
                <motion.div variants={cardVariants}>
                  <div className="service-card">
                    <div className="service-image">
                      <img src={service.image} alt={service.title} />
                    </div>
                    <div className="service-content">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <ul className="service-features">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>
                            <i className="fas fa-check-circle"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="price">
                        <span className="currency">$</span>
                        {service.price}
                        <span className="period">/visit</span>
                      </div>
                      <motion.button
                        className="btn-book"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </StyledServices>
  );
};

export default Services;
