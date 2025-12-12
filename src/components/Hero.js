import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const StyledHero = styled.section`
  padding: 0;
  background-color: #f8f9fa;
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  align-items: center;

  .hero-content {
    padding: 2rem 0;
    position: relative;
    z-index: 2;

    .hero-subtitle {
      color: var(--primary-color);
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: #2d2d2d;

      .highlight {
        color: var(--primary-color);
        position: relative;
        display: inline-block;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 8px;
          background-color: rgba(255, 107, 53, 0.2);
          z-index: -1;
        }
      }
    }

    .hero-description {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      max-width: 600px;
      line-height: 1.8;
    }

    .cta-group {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .btn {
      padding: 0.8rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
      border: none;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.2);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.3);
      }
    }

    .btn-outline {
      border: 2px solid #2d2d2d;
      color: #2d2d2d;
      background: transparent;

      &:hover {
        background: #2d2d2d;
        color: white;
        transform: translateY(-2px);
      }
    }

    .stats-container {
      display: flex;
      gap: 3rem;
      margin-top: 3rem;
    }

    .stat-item {
      .stat-number {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }

      .stat-label {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }

  .hero-image {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .main-image {
      width: 100%;
      max-width: 600px;
      height: auto;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .floating-card {
      position: absolute;
      background: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;

      .card-icon {
        width: 40px;
        height: 40px;
        background: #f0f0f0;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
      }

      .card-content {
        h4 {
          font-size: 0.9rem;
          margin-bottom: 0.2rem;
        }
        p {
          font-size: 0.8rem;
          color: #666;
          margin: 0;
        }
      }

      &.card-top {
        top: 10%;
        right: 0;
      }

      &.card-bottom {
        bottom: 10%;
        left: 0;
      }
    }
  }

  @media (max-width: 991px) {
    min-height: auto;
    padding: 4rem 0;

    .hero-content {
      text-align: center;
      padding-bottom: 3rem;

      h1 {
        font-size: 2.8rem;
      }

      .hero-description {
        margin: 0 auto 2rem;
      }

      .cta-group {
        justify-content: center;
      }

      .stats-container {
        justify-content: center;
      }
    }

    .hero-image {
      margin-top: 2rem;

      .floating-card {
        display: none;
      }
    }
  }
`;

const Hero = () => {
  const navigate = useNavigate();

  const handleBookNow = () => navigate('/booking');
  const handleViewServices = () => navigate('/services');

  return (
    <StyledHero>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-subtitle">Welcome to Homzi</div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Quality Maintenance Services at Your <span className="highlight">Fingertips</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Connect with skilled professionals for all your maintenance and repair needs. Experience reliable, efficient, and professional service delivery.
              </motion.p>
              <div className="cta-group">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookNow}
                >
                  Book Now
                  <i className="fas fa-arrow-right"></i>
                </motion.button>
                <motion.button
                  className="btn btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleViewServices}
                >
                  View Services
                </motion.button>
              </div>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Professional Experts</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Customer Support</div>
                </div>
              </div>
            </motion.div>
          </Col>
          <Col lg={6} className="hero-image">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                className="main-image"
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
                alt="Professional maintenance"
              />
              <motion.div
                className="floating-card card-top"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="card-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <div className="card-content">
                  <h4>Expert Services</h4>
                  <p>Verified professionals at your service</p>
                </div>
              </motion.div>
              <motion.div
                className="floating-card card-bottom"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="card-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="card-content">
                  <h4>Guaranteed Quality</h4>
                  <p>100% satisfaction guaranteed</p>
                </div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </StyledHero>
  );
};

export default Hero;
