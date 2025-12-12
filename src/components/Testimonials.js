import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MarqueeMessage from './MarqueeMessage';

const StyledTestimonials = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.03) 0%, rgba(255, 143, 107, 0.03) 100%);
    border-radius: 50%;
    transform: scale(2);
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

  .testimonial-card {
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    margin: 1rem;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.06);
    height: 100%;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

      .quote-icon {
        transform: translateY(-5px);
        color: var(--primary-color);
      }
    }

    .quote-icon {
      font-size: 2rem;
      color: #ddd;
      margin-bottom: 1.5rem;
      transition: all 0.3s ease;
    }

    .testimonial-content {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #666;
      margin-bottom: 2rem;
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;

      .author-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .author-info {
        h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.2rem;
        }

        .author-location {
          font-size: 0.9rem;
          color: #666;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          i {
            color: var(--primary-color);
            font-size: 0.8rem;
          }
        }
      }

      .rating {
        margin-left: auto;
        color: #ffc107;
        
        i {
          margin-left: 2px;
        }
      }
    }
  }

  .slick-slider {
    .slick-dots {
      bottom: -50px;

      li {
        button {
          &:before {
            font-size: 12px;
            color: var(--primary-color);
            opacity: 0.3;
          }
        }

        &.slick-active {
          button:before {
            opacity: 1;
          }
        }
      }
    }

    .slick-prev,
    .slick-next {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 1;
      transition: all 0.3s ease;

      &:hover {
        background: var(--primary-color);
        
        &:before {
          color: white;
        }
      }

      &:before {
        font-family: 'slick';
        font-size: 20px;
        color: var(--primary-color);
      }
    }

    .slick-prev {
      left: -20px;
    }

    .slick-next {
      right: -20px;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    .section-header {
      h2 {
        font-size: 2.2rem;
      }
    }

    .slick-slider {
      .slick-prev,
      .slick-next {
        display: none !important;
      }
    }
  }
`;

const testimonialData = [
  {
    content: "The service was exceptional! The technician arrived on time, fixed our plumbing issue quickly, and left the area spotless. Highly recommend!",
    author: "Sarah Johnson",
    location: "New York, NY",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5
  },
  {
    content: "I've used Homzi multiple times for different home repairs. Their professionals are always knowledgeable, courteous, and efficient.",
    author: "Michael Chen",
    location: "San Francisco, CA",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5
  },
  {
    content: "Great experience with their electrical service. Fair pricing, professional work, and excellent customer service. Will definitely use again!",
    author: "Emily Rodriguez",
    location: "Miami, FL",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5
  },
  {
    content: "The HVAC team was fantastic! They diagnosed and fixed our AC issue quickly. Very professional and reasonably priced.",
    author: "David Thompson",
    location: "Chicago, IL",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5
  }
];

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <>
      <MarqueeMessage />
      <StyledTestimonials>
        <Container>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="subtitle">Testimonials</div>
            <h2>
              What Our <span>Customers Say</span>
            </h2>
            <p className="description">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Slider {...settings}>
              {testimonialData.map((testimonial, index) => (
                <div key={index}>
                  <div className="testimonial-card">
                    <i className="fas fa-quote-right quote-icon"></i>
                    <p className="testimonial-content">{testimonial.content}</p>
                    <div className="testimonial-author">
                      <div className="author-image">
                        <img src={testimonial.image} alt={testimonial.author} />
                      </div>
                      <div className="author-info">
                        <h4>{testimonial.author}</h4>
                        <div className="author-location">
                          <i className="fas fa-map-marker-alt"></i>
                          {testimonial.location}
                        </div>
                      </div>
                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </Container>
      </StyledTestimonials>
    </>
  );
};

export default Testimonials;
