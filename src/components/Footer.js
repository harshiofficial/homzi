import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const StyledFooter = styled.footer`
  background-color: var(--secondary-color);
  color: white;
  padding: 3rem 0;

  p {
    margin: 0;
    opacity: 0.9;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container className="text-center">
        <p>&copy; {new Date().getFullYear()} Homzi. All rights reserved.</p>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
