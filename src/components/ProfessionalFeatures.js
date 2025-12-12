import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWrench, 
  faBolt, 
  faSnowflake, 
  faHammer, 
  faPaintRoller, 
  faBroom, 
  faTree, 
  faShieldAlt, 
  faTools, 
  faHome 
} from '@fortawesome/free-solid-svg-icons';

const StyledServices = styled.section`
  padding: 80px 0;
  background: var(--light-bg);

  .section-header {
    text-align: center;
    margin-bottom: 50px;

    h2 {
      color: var(--primary-color);
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    p {
      color: var(--text-color);
      font-size: 1.1rem;
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    padding: 20px;
  }

  .service-card {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .icon {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 20px;
    }

    h3 {
      color: var(--primary-color);
      font-size: 1.5rem;
      margin-bottom: 15px;
    }

    .description {
      color: var(--text-color);
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .service-features {
      flex-grow: 1;
      
      h4 {
        color: var(--primary-color);
        font-size: 1.1rem;
        margin-bottom: 15px;
        font-weight: 600;
      }

      ul {
        list-style: none;
        padding: 0;
        margin-bottom: 20px;

        li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 10px;
          color: var(--text-color);
          
          i {
            color: var(--primary-color);
            margin-right: 10px;
            font-size: 0.9rem;
          }
        }
      }

      .requirements {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;

        h4 {
          color: var(--primary-color);
          font-size: 1.1rem;
          margin-bottom: 10px;
        }

        p {
          color: var(--text-color);
          font-size: 0.95rem;
          line-height: 1.5;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }

    .service-card {
      padding: 20px;
    }
  }
`;

const services = [
  {
    icon: faWrench,
    title: 'Plumbing Services',
    description: 'Expert plumbing solutions for residential and commercial properties. From emergency repairs to new installations.',
    features: [
      'Emergency leak repairs & pipe fixes',
      'Water heater installation & maintenance',
      'Drain cleaning & unclogging',
      'Fixture installation & upgrades',
      'Pipe inspection & replacement'
    ],
    requirements: 'Licensed and insured professionals with minimum 5 years experience'
  },
  {
    icon: faBolt,
    title: 'Electrical Services',
    description: 'Comprehensive electrical solutions ensuring safety and efficiency. Available 24/7 for emergency electrical issues.',
    features: [
      'Electrical panel upgrades',
      'Wiring repair & installation',
      'Emergency power solutions',
      'Lighting system installation',
      'Safety inspections & certifications'
    ],
    requirements: 'Certified electricians with valid licensing and safety training'
  },
  {
    icon: faSnowflake,
    title: 'HVAC Services',
    description: 'Complete heating, ventilation, and air conditioning solutions for optimal climate control and energy efficiency.',
    features: [
      'System installation & replacement',
      'Preventive maintenance',
      'Emergency repairs 24/7',
      'Air quality improvement',
      'Energy efficiency optimization'
    ],
    requirements: 'HVAC certified technicians with EPA certification'
  },
  {
    icon: faHammer,
    title: 'Carpentry Services',
    description: 'Professional carpentry work from repairs to custom installations. Quality craftsmanship for all your woodworking needs.',
    features: [
      'Custom furniture building',
      'Cabinet installation & repair',
      'Door & window installation',
      'Structural repairs',
      'Finish carpentry work'
    ],
    requirements: 'Skilled carpenters with proven portfolio of work'
  },
  {
    icon: faPaintRoller,
    title: 'Painting Services',
    description: 'Professional painting services for interior and exterior surfaces, using premium materials and techniques.',
    features: [
      'Interior & exterior painting',
      'Wallpaper installation',
      'Color consultation',
      'Surface preparation',
      'Special finish applications'
    ],
    requirements: 'Professional painters with attention to detail and clean work habits'
  },
  {
    icon: faBroom,
    title: 'Cleaning Services',
    description: 'Comprehensive cleaning solutions for residential and commercial spaces, using eco-friendly products.',
    features: [
      'Deep cleaning services',
      'Regular maintenance cleaning',
      'Post-construction cleanup',
      'Carpet & upholstery cleaning',
      'Sanitization services'
    ],
    requirements: 'Trained cleaning professionals with background checks'
  },
  {
    icon: faTree,
    title: 'Landscaping',
    description: 'Professional landscape design and maintenance services to enhance your outdoor spaces year-round.',
    features: [
      'Landscape design & planning',
      'Garden maintenance & care',
      'Tree trimming & removal',
      'Irrigation system installation',
      'Hardscape construction'
    ],
    requirements: 'Experienced landscapers with horticultural knowledge'
  },
  {
    icon: faShieldAlt,
    title: 'Security Systems',
    description: 'State-of-the-art security solutions for protection and peace of mind, with 24/7 monitoring options.',
    features: [
      'Security camera installation',
      'Access control systems',
      'Alarm system setup',
      'Remote monitoring solutions',
      'Security assessment'
    ],
    requirements: 'Licensed security system installers with IT expertise'
  },
  {
    icon: faTools,
    title: 'Appliance Repair',
    description: 'Expert repair services for all major appliances, with quick response times and warranty coverage.',
    features: [
      'Major appliance repairs',
      'Preventive maintenance',
      'Parts replacement',
      'Performance optimization',
      'Installation services'
    ],
    requirements: 'Certified appliance technicians with multi-brand expertise'
  },
  {
    icon: faHome,
    title: 'Smart Home Installation',
    description: 'Cutting-edge smart home technology integration for automation and enhanced living experience.',
    features: [
      'Smart device installation',
      'Home automation setup',
      'System integration',
      'Voice control configuration',
      'Network optimization'
    ],
    requirements: 'Certified smart home technicians with networking knowledge'
  }
];

const ProfessionalFeatures = () => {
  return (
    <StyledServices id="professionals">
      <Container>
        <div className="section-header">
          <h2>Services Provided</h2>
          <p>Comprehensive maintenance and repair solutions delivered by certified professionals</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <FontAwesomeIcon icon={service.icon} className="icon" />
              <h3>{service.title}</h3>
              <p className="description">{service.description}</p>
              <div className="service-features">
                <h4>Services Include:</h4>
                <ul>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="requirements">
                  <h4>Professional Requirements:</h4>
                  <p>{service.requirements}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </StyledServices>
  );
};

export default ProfessionalFeatures;
