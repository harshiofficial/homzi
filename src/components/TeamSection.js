import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const StyledTeamSection = styled.section`
  padding: 80px 0;
  background: var(--background-light);

  .section-header {
    text-align: center;
    margin-bottom: 4rem;

    .subtitle {
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    h2 {
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
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .team-member {
    text-align: center;
    margin-bottom: 3rem;

    .member-image {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.1);
      }
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
    }

    .position {
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .bio {
      color: var(--text-light);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1rem;

      a {
        color: var(--text-light);
        font-size: 1.2rem;
        transition: all 0.3s ease;

        &:hover {
          color: var(--primary-color);
          transform: translateY(-3px);
        }
      }
    }
  }
`;

const teamMembers = [
  {
    name: 'Sarah Johnson',
    position: 'CEO & Founder',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    bio: 'With over 15 years of experience in the maintenance industry, Sarah leads our team with vision and dedication.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    name: 'Michael Chen',
    position: 'Technical Director',
    image: 'https://randomuser.me/api/portraits/men/44.jpg',
    bio: 'Michael brings his expertise in technology and service optimization to ensure seamless operations.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    name: 'Emily Rodriguez',
    position: 'Customer Success Manager',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Emily ensures our service providers and customers have the best possible experience on our platform.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    name: 'David Kim',
    position: 'Head of Operations',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    bio: 'David oversees our day-to-day operations and maintains our high standards of service quality.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
];

const TeamSection = () => {
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
    <StyledTeamSection>
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="subtitle">OUR TEAM</div>
          <h2>Meet The <span>Experts</span> Behind Homzi</h2>
          <p className="description">
            Our dedicated team of professionals works tirelessly to ensure the highest quality of service
            and customer satisfaction.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Row>
            {teamMembers.map((member, index) => (
              <Col key={index} md={6} lg={3}>
                <motion.div className="team-member" variants={itemVariants}>
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <div className="position">{member.position}</div>
                  <p className="bio">{member.bio}</p>
                  <div className="social-links">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </StyledTeamSection>
  );
};

export default TeamSection;
