import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #5B4BFF;
    --secondary-color: #7D5FFF;
    --accent-color: #58D0FF;
    --bg-light: #F3F4FF;
    --text-dark: #1F1F3D;
    --text-light: #FFFFFF;
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
  }

  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    cursor: default;
  }

  body {
    font-family: var(--font-body);
    color: var(--text-dark);
    line-height: 1.6;
    overflow-x: hidden;
    background-color: var(--bg-light);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: var(--font-body);
  }

  .cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    transform: translate(-50%, -50%);
  }

  .cursor-follower {
    width: 8px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.2s ease;
    transform: translate(-50%, -50%);
  }

  .section-heading {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background-color: var(--primary-color);
    }
  }

  .text-gradient {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hover-lift {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    .section-heading {
      font-size: 2.5rem;
    }
  }

  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
    @media screen and (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  /* Animation classes */
  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .stagger-fade-in > * {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }

  .stagger-fade-in.visible > * {
    opacity: 1;
    transform: translateY(0);
  }

  /* Magnetic button effect */
  .magnetic-button {
    transform: translate(0, 0);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
`;

export default GlobalStyle;
