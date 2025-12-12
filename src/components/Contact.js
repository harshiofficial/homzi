import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faBuilding } from '@fortawesome/free-solid-svg-icons';

const StyledContact = styled.section`
  padding: 6rem 0;
  background-color: white;

  .contact-card {
    text-align: center;
    padding: 2rem;
    border-radius: 16px;
    background: var(--bg-light);
    transition: all 0.3s ease;
    height: 100%;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }

    .icon {
      color: var(--primary-color);
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }

    h4 {
      margin-bottom: 1rem;
    }

    p {
      color: var(--secondary-color);
      margin: 0;
    }
  }
`;

const contactMethods = [
  {
    icon: faEnvelope,
    title: 'Email',
    info: 'support@homzi.com'
  },
  {
    icon: faPhone,
    title: 'Phone',
    info: '1-800-HOMZI-NOW'
  },
  {
    icon: faBuilding,
    title: 'Office',
    info: '123 Homzi Avenue\nMaintenance City, MC 56001'
  }
];

const Contact = () => {
  return (
    <StyledContact id="contact">
      <Container>
        <h2 className="text-center mb-5">Get in Touch</h2>
        <Row>
          {contactMethods.map((contact, index) => (
            <Col md={4} key={index}>
              <div className="contact-card">
                <FontAwesomeIcon icon={contact.icon} className="icon" />
                <h4>{contact.title}</h4>
                <p>{contact.info}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </StyledContact>
  );
};

export default Contact;
