import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import PageTransition from '../components/PageTransition';

const StyledAbout = styled.section`
  padding: 120px 0;
  background: var(--background-light);

  .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 4rem;

    .subtitle {
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    h1, h2 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      color: var(--text-dark);

      span {
        color: var(--primary-color);
      }
    }

    .description {
      color: var(--text-light);
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .about-content {
    margin-bottom: 5rem;

    .about-text {
      padding: 2rem;

      h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: var(--text-dark);

        span {
          color: var(--primary-color);
        }
      }

      p {
        color: var(--text-light);
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
        line-height: 1.8;
      }

      .stats {
        display: flex;
        gap: 2rem;
        margin-top: 3rem;

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          }

          .number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
          }

          .label {
            color: var(--text-light);
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .mission-values-section {
    margin-top: 8rem;
    position: relative;
    z-index: 1;

    .value-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      height: 100%;
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.06);

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

        .icon {
          background: var(--primary-color);
          color: white;
          transform: rotateY(180deg);
        }
      }

      .icon {
        width: 80px;
        height: 80px;
        background: rgba(255, 107, 53, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        transition: all 0.6s ease;

        i {
          font-size: 2rem;
          color: var(--primary-color);
          transition: all 0.3s ease;
        }
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--text-dark);
      }

      p {
        color: #666;
        line-height: 1.6;
        margin: 0;
      }
    }
  }

  @media (max-width: 991px) {
    padding: 80px 0;

    .section-header {
      h1, h2 {
        font-size: 2rem;
      }
    }

    .about-content {
      .about-text {
        padding: 1rem 0;
        text-align: center;

        .stats {
          flex-direction: column;
          gap: 1rem;
        }
      }
    }
  }
`;

const missionValues = [
  {
    icon: 'fas fa-handshake',
    title: 'Trust & Reliability',
    description: 'We build lasting relationships through transparent communication and consistent service quality.'
  },
  {
    icon: 'fas fa-certificate',
    title: 'Excellence',
    description: 'Our commitment to excellence drives us to deliver superior results in every project we undertake.'
  },
  {
    icon: 'fas fa-heart',
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go above and beyond to exceed your expectations.'
  },
  {
    icon: 'fas fa-leaf',
    title: 'Sustainability',
    description: 'We implement eco-friendly practices and solutions for a sustainable future.'
  }
];

const About = () => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [missionRef, missionInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <PageTransition>
      <StyledAbout>
        <Container>
          <motion.div
            className="section-header"
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="subtitle">About Us</div>
            <h1>
              Building Trust Through <span>Quality Service</span>
            </h1>
            <p className="description">
              Since 2025, we've been revolutionizing the maintenance industry by connecting skilled professionals with clients who need reliable services.
            </p>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Row className="align-items-center">
              <Col lg={12}>
                <div className="about-text">
                  <h2>
                    Your Trusted <span>Partner</span>
                  </h2>
                  <p>
                    Since our founding in 2025, we've been committed to providing top-tier maintenance services that combine technical expertise with exceptional customer service. Our team of certified professionals brings years of experience and a passion for excellence to every job.
                  </p>
                  <p>
                    We believe in transparent pricing, reliable service, and building long-term relationships with our clients. Our innovative approach to maintenance has earned us the trust of thousands of satisfied customers.
                  </p>
                  <div className="stats">
                    <motion.div
                      className="stat-item"
                      whileHover={{ y: -5 }}
                    >
                      <div className="number">500+</div>
                      <div className="label">Expert Technicians</div>
                    </motion.div>
                    <motion.div
                      className="stat-item"
                      whileHover={{ y: -5 }}
                    >
                      <div className="number">15K+</div>
                      <div className="label">Happy Customers</div>
                    </motion.div>
                    <motion.div
                      className="stat-item"
                      whileHover={{ y: -5 }}
                    >
                      <div className="number">30+</div>
                      <div className="label">Service Awards</div>
                    </motion.div>
                  </div>
                </div>
              </Col>
            </Row>
          </motion.div>

          <div className="mission-values-section">
            <motion.div
              className="section-header"
              ref={missionRef}
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="subtitle">Our Mission & Values</div>
              <h2>
                What Drives <span>Our Success</span>
              </h2>
              <p className="description">
                Our mission is to provide exceptional maintenance services while upholding our core values that define who we are and how we work.
              </p>
            </motion.div>

            <Row className="mt-5">
              {missionValues.map((item, index) => (
                <Col md={6} lg={3} key={index} className="mb-4">
                  <motion.div
                    className="value-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={missionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="icon">
                      <i className={item.icon}></i>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </StyledAbout>
    </PageTransition>
  );
};

export default About;
