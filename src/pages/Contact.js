import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faBuilding } from '@fortawesome/free-solid-svg-icons';

const StyledContact = styled.div`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;

  .contact-header {
    text-align: center;
    margin-bottom: 60px;

    h1 {
      font-size: 2.5rem;
      color: var(--text-dark);
      margin-bottom: 20px;
    }

    p {
      color: var(--text-light);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .contact-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 60px;

    .contact-card {
      background: white;
      padding: 40px 30px;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        width: 60px;
        height: 60px;
        background: var(--primary-light);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;

        svg {
          font-size: 24px;
          color: var(--primary-color);
        }
      }

      h3 {
        color: var(--text-dark);
        margin-bottom: 15px;
        font-size: 1.3rem;
      }

      a {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 1.1rem;
        transition: color 0.3s ease;

        &:hover {
          color: var(--primary-dark);
        }
      }

      p {
        color: var(--text-light);
        font-size: 1.1rem;
        line-height: 1.6;
      }
    }
  }

  .contact-form {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      text-align: center;
      color: var(--text-dark);
      margin-bottom: 30px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        color: var(--text-dark);
        font-weight: 500;
      }

      input,
      textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }

      textarea {
        height: 150px;
        resize: vertical;
      }
    }

    button {
      width: 100%;
      padding: 15px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
      }
    }
  }
`;

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <StyledContact>
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have questions about our services? We're here to help you find the perfect solution for your needs.</p>
      </div>

      <div className="contact-cards">
        <div className="contact-card">
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <h3>Email</h3>
          <a href="mailto:support@homzi.com">support@homzi.com</a>
        </div>

        <div className="contact-card">
          <div className="icon">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <h3>Phone</h3>
          <a href="tel:1-800-HOMZI-NOW">1-800-HOMZI-NOW</a>
        </div>

        <div className="contact-card">
          <div className="icon">
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          <h3>Office</h3>
          <p>123 Homzi Avenue Maintenance City, MC 56001</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </StyledContact>
  );
};

export default Contact;
