import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingHeart, faTools, faGraduationCap, faHandHoldingDollar, faShieldHalved, faPeopleArrows, faHandshake, faSeedling, faAward } from '@fortawesome/free-solid-svg-icons';

const scrollAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const StyledMarqueeContainer = styled.div`
  background: linear-gradient(90deg, var(--primary-color) 0%, #ff8f6b 100%);
  padding: 12px 0 20px 0;
  position: relative;
`;

const StyledMarquee = styled.div`
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  margin-bottom: 15px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(255,107,53,0.9), transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(255,107,53,0.9), transparent);
  }

  .marquee-content {
    display: inline-block;
    animation: ${scrollAnimation} 60s linear infinite;
    padding-right: 50px;
    color: white;
    font-size: 1rem;
    font-weight: 500;

    .message-group {
      display: inline-flex;
      align-items: center;
      margin-right: 50px;

      .icon {
        margin: 0 10px;
        font-size: 1.2rem;
      }
    }
  }
`;

const DonateButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;

  .donate-button {
    display: inline-flex;
    align-items: center;
    background: white;
    color: var(--primary-color);
    padding: 8px 24px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
      background: #f8f8f8;
    }

    .icon {
      margin-right: 8px;
      font-size: 1.2rem;
      color: var(--primary-color);
    }

    span {
      font-size: 1.1rem;
    }
  }
`;

const messages = [
  {
    text: "Supporting Blue-Collar Excellence: Every skill matters, every worker counts!",
    icon: faTools
  },
  {
    text: "Empowering Skilled Workers Through Education & Training",
    icon: faGraduationCap
  },
  {
    text: "Join us in supporting skill development programs",
    icon: faHandHoldingHeart
  },
  {
    text: "Building a better future for skilled professionals",
    icon: faHeart
  },
  {
    text: "Fair wages for skilled work - Supporting workforce equality",
    icon: faHandHoldingDollar
  },
  {
    text: "Promoting safe working conditions for all professionals",
    icon: faShieldHalved
  },
  {
    text: "Bridging the skills gap through training and mentorship",
    icon: faPeopleArrows
  },
  {
    text: "Supporting local craftsmen and skilled workers",
    icon: faHandshake
  },
  {
    text: "Creating opportunities for the next generation of skilled workers",
    icon: faSeedling
  },
  {
    text: "Recognizing excellence in skilled trades",
    icon: faAward
  }
];

const MarqueeMessage = () => {
  return (
    <StyledMarqueeContainer>
      <StyledMarquee>
        <div className="marquee-content">
          {[...Array(2)].map((_, index) => (
            <React.Fragment key={index}>
              {messages.map((message, msgIndex) => (
                <span key={msgIndex} className="message-group">
                  <FontAwesomeIcon icon={message.icon} className="icon" />
                  {message.text}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </StyledMarquee>
      
      <DonateButtonContainer>
        <a 
          href="https://donate.homzi.org" 
          className="donate-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faHandHoldingHeart} className="icon" />
          <span>Support Our Mission - Donate Now</span>
        </a>
      </DonateButtonContainer>
    </StyledMarqueeContainer>
  );
};

export default MarqueeMessage;
