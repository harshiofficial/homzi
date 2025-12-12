import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const StyledFeatures = styled.section`
  padding: 100px 0;
  background-color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 143, 107, 0.05) 100%);
    clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
    z-index: 0;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    position: relative;
    z-index: 1;

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

  .feature-card {
    background: white;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    height: 100%;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.06);

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

      .icon-wrapper {
        transform: scale(1.1);
        background: var(--primary-color);
        
        i {
          color: white;
        }
      }
    }

    .icon-wrapper {
      width: 70px;
      height: 70px;
      background: rgba(255, 107, 53, 0.1);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      transition: all 0.3s ease;

      i {
        font-size: 1.8rem;
        color: var(--primary-color);
        transition: all 0.3s ease;
      }
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

    .feature-link {
      color: var(--primary-color);
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;

      &:hover {
        gap: 0.8rem;
      }

      i {
        font-size: 0.9rem;
        transition: all 0.3s ease;
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

    .feature-card {
      margin-bottom: 2rem;
    }
  }

  .learn-more-button {
    display: flex;
    justify-content: center;
    margin-top: 3rem;

    .btn-learn-more {
      background: transparent;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-color);
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: -1;
      }

      &:hover {
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(255, 107, 53, 0.2);

        &::before {
          transform: translateX(0);
        }

        i {
          transform: translateX(5px);
        }
      }

      i {
        transition: transform 0.3s ease;
      }
    }
  }
`;

const featureData = [
  {
    icon: 'fas fa-tools',
    title: 'Expert Repairs',
    description: 'Get your repairs done by certified professionals with years of experience in their respective fields.',
    link: '/about'
  },
  {
    icon: 'fas fa-clock',
    title: '24/7 Service',
    description: 'Emergency repairs? No problem. Our professionals are available round the clock to help you.',
    link: '/about'
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Guaranteed Work',
    description: 'All our services come with a satisfaction guarantee. Your peace of mind is our priority.',
    link: '/about'
  },
  {
    icon: 'fas fa-hand-holding-usd',
    title: 'Competitive Pricing',
    description: 'Get transparent pricing with no hidden fees. Pay only for what you need.',
    link: '/about'
  },
  {
    icon: 'fas fa-user-check',
    title: 'Verified Professionals',
    description: 'All our professionals are thoroughly vetted and background-checked for your safety.',
    link: '/about'
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Easy Booking',
    description: 'Book a service in minutes through our user-friendly mobile app or website.',
    link: '/about'
  }
];

const Features = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <StyledFeatures>
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="subtitle">Why Choose Us</div>
          <h2>
            Making Maintenance <span>Simple & Efficient</span>
          </h2>
          <p className="description">
            We bring together the best professionals and latest technology to make your maintenance experience seamless and reliable.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="row"
        >
          {featureData.map((feature, index) => (
            <Col key={index} md={6} lg={4}>
              <motion.div variants={itemVariants} className="feature-card">
                <div className="icon-wrapper">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            </Col>
          ))}
        </motion.div>

        <motion.div 
          className="learn-more-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link to="/about">
            <motion.button 
              className="btn-learn-more"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More About Us
              <i className="fas fa-arrow-right"></i>
            </motion.button>
          </Link>
        </motion.div>
      </Container>
    </StyledFeatures>
  );
};

export default Features;
