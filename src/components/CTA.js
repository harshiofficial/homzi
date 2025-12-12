import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const StyledCTA = styled.section`
  background-color: var(--primary-color);
  color: white;
  padding: 6rem 0;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .lead {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .btn-light {
    background-color: white;
    color: var(--primary-color);
    font-weight: 600;
    padding: 1rem 3rem;
    border-radius: 8px;
    font-size: 1.1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  }
`;

const CTA = () => {
  return (
    <StyledCTA>
      <Container>
        <h2>Ready to Get Started?</h2>
        <p className="lead">Join our community of professionals and customers today</p>
        <button className="btn btn-light btn-lg">Sign Up Now</button>
      </Container>
    </StyledCTA>
  );
};

export default CTA;
