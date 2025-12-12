import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faTools, faFan, faWater, faBroom, faShieldAlt, faClock, faShower } from '@fortawesome/free-solid-svg-icons';
import PageTransition from '../components/PageTransition';

const StyledPricing = styled.div`
  padding: 70px 0;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 40%);

  .hero {
    text-align: center;
    margin-bottom: 4rem;

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      background: rgba(102, 126, 234, 0.15);
      color: #6366f1;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 2.75rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 1rem;
    }

    p {
      color: #6b7280;
      max-width: 640px;
      margin: 0 auto;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .popular-services {
    margin-bottom: 4rem;

    h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .subtitle {
      color: #6b7280;
      margin-bottom: 2rem;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .service-card {
      background: white;
      border-radius: 18px;
      padding: 1.75rem;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05);
      border: 1px solid rgba(148, 163, 184, 0.12);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 24px 60px rgba(79, 70, 229, 0.16);
      }

      .icon {
        width: 52px;
        height: 52px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        font-size: 1.6rem;
        color: white;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #111827;
        }

        .starting {
          background: #eef2ff;
          color: #4338ca;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
        }
      }

      p {
        margin: 0;
        color: #6b7280;
        line-height: 1.6;
      }

      .includes {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;

        span {
          background: #f9fafb;
          border-radius: 50px;
          padding: 0.4rem 0.75rem;
          font-size: 0.85rem;
          color: #4b5563;
        }
      }
    }
  }

  .care-plans {
    margin-bottom: 4rem;

    h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.75rem;
      text-align: center;
    }

    .subtitle {
      color: #6b7280;
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.75rem;
    }

    .plan-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(99, 102, 241, 0.15);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.08);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      &.featured {
        border: 2px solid #6366f1;

        .badge {
          background: #6366f1;
          color: white;
        }
      }

      .badge {
        align-self: flex-start;
        padding: 0.35rem 0.75rem;
        border-radius: 999px;
        background: rgba(99, 102, 241, 0.12);
        color: #4338ca;
        font-weight: 600;
        font-size: 0.85rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        h3 {
          margin: 0;
          font-size: 1.45rem;
          color: #111827;
        }

        .price {
          text-align: right;
          color: #111827;

          .amount {
            font-size: 2.1rem;
            font-weight: 700;
          }

          .label {
            font-size: 0.85rem;
            color: #6b7280;
          }
        }
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.75rem;

        li {
          color: #4b5563;
          display: flex;
          gap: 0.5rem;
          align-items: center;

          svg {
            color: #34d399;
          }
        }
      }

      .cta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;

        button {
          background: #6366f1;
          color: white;
          border: none;
          padding: 0.65rem 1.5rem;
          border-radius: 999px;
          font-weight: 600;
          transition: background 0.3s ease;

          &:hover {
            background: #4f46e5;
          }
        }

        span {
          font-size: 0.85rem;
          color: #6b7280;
        }
      }
    }
  }

  .value-adds {
    background: #f8fafc;
    border-radius: 24px;
    padding: 2.5rem;
    display: grid;
    gap: 1.75rem;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      color: #1f2937;
    }

    .benefits {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;

      .benefit-card {
        background: white;
        border-radius: 18px;
        padding: 1.5rem;
        box-shadow: 0 16px 30px rgba(15, 23, 42, 0.05);
        border: 1px solid rgba(148, 163, 184, 0.12);

        h4 {
          margin: 0 0 0.75rem 0;
          color: #111827;
          font-size: 1.15rem;
        }

        p {
          margin: 0;
          color: #6b7280;
          line-height: 1.6;
        }
      }
    }
  }

  .faq {
    margin-top: 4rem;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    p {
      text-align: center;
      color: #6b7280;
      margin-bottom: 2rem;
    }

    .faq-item {
      background: white;
      border-radius: 18px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(148, 163, 184, 0.12);

      .question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-weight: 600;
        color: #111827;
        font-size: 1.05rem;

        svg {
          transition: transform 0.3s ease;
        }
      }

      .answer {
        margin-top: 1rem;
        color: #6b7280;
        line-height: 1.7;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 0;

    .hero {
      h1 {
        font-size: 2.2rem;
      }
    }
  }
`;

const popularServices = [
  {
    title: 'Emergency Electrician',
    price: '₹349',
    description: 'Certified experts for quick fixes, overload issues & safety audits.',
    includes: ['60 min turnaround', 'Spares at MRP', '90-day warranty'],
    icon: faBolt,
    color: '#f97316'
  },
  {
    title: 'Premium Bathroom Deep Clean',
    price: '₹799',
    description: 'Full disinfectant treatment for tiles, fittings, glass & drainage.',
    includes: ['Eco-safe chemicals', '2 professional crew', 'Odour neutraliser'],
    icon: faShower,
    color: '#14b8a6'
  },
  {
    title: 'Modular Kitchen Service',
    price: '₹1299',
    description: 'Carpentry + appliance tune-up for modular setups and finishes.',
    includes: ['Hinge & channel tune', 'Chimney deep clean', 'Scratch guard polish'],
    icon: faTools,
    color: '#ef4444'
  },
  {
    title: 'AC Fast Refresh (Split/Window)',
    price: '₹599',
    description: 'Gas pressure check, coil jet wash and airflow balancing by HVAC pros.',
    includes: ['0-drip guarantee', 'Power sanitisation', 'Leak detection'],
    icon: faFan,
    color: '#6366f1'
  },
  {
    title: 'Water Purifier Service',
    price: '₹499',
    description: 'RO/UV AMC support with filter replacement reminders and TDS test.',
    includes: ['Original cartridges', 'TDS report card', 'Pipe sterilisation'],
    icon: faWater,
    color: '#0ea5e9'
  },
  {
    title: 'Move-In Deep Clean',
    price: '₹2499',
    description: 'Full home sterilisation + furniture polish before you move in.',
    includes: ['4-6 member squad', 'Steam plus UV treatment', 'Free pest pre-spray'],
    icon: faBroom,
    color: '#a855f7'
  }
];

const carePlans = [
  {
    name: 'Homzi Lite',
    badge: 'Urban Rental Fav',
    price: '₹1,999',
    billed: 'Quarterly billing',
    perks: [
      '2 emergency call-outs / month',
      '45-minute priority slot window',
      'Spare-part discounts up to 15%',
      'Digital maintenance logbook'
    ]
  },
  {
    name: 'Homzi Priority',
    badge: 'Most Loved',
    price: '₹4,499',
    billed: 'Half-yearly billing',
    perks: [
      'Unlimited breakdown visits',
      'Dedicated relationship manager',
      'Same-day installation support',
      'Quarterly preventive check-ups'
    ],
    featured: true
  },
  {
    name: 'Homzi Estate',
    badge: 'Society & Villa',
    price: '₹9,999',
    billed: 'Annual billing',
    perks: [
      'Multi-property coverage',
      'Night shift availability (10PM-6AM)',
      'Custom SLA with uptime tracking',
      'Consumables & AMC planning support'
    ]
  }
];

const valueAdds = [
  {
    title: 'Transparent, itemised billing',
    desc: 'Every job sheet shows technician time, parts pricing and warranty coverage with GST-compliant invoices.'
  },
  {
    title: 'Only background-verified pros',
    desc: 'All Homzi partners undergo KYC, skill tests and refresher training every quarter before onboarding.'
  },
  {
    title: 'Citywide reach in 60+ micro-localities',
    desc: 'Choose the nearest Homzi service hub and get live ETA updates, technician tracking and doorstep support.'
  }
];

const faqs = [
  {
    question: 'Will I be charged if no work is done?',
    answer: 'Diagnosis is free under all care plans. For on-demand services, a visit fee of ₹149 applies only if jobs are declined post-inspection.'
  },
  {
    question: 'Do plans cover spare parts?',
    answer: 'Plans include labour and inspection. Spare parts are billed at MRP with Homzi partner discounts automatically applied.'
  },
  {
    question: 'Can I shift my plan to a new address?',
    answer: 'Absolutely. Update your address in the Homzi app or call support and we will remap you to the closest service hub within 24 hours.'
  }
];

const iconBackground = (color) => `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`;

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <PageTransition>
      <StyledPricing>
        <Container>
          <section className="hero">
            <span className="badge">
              <FontAwesomeIcon icon={faShieldAlt} />
              Trusted by 45,000+ metros households
            </span>
            <h1>Home services by Homzi. Clear prices, zero surprises.</h1>
            <p>
              Book the city’s top-rated Homzi technicians with doorstep arrival slots that match your schedule. Prices
              include hygiene kits, travel, and workmanship warranty.
            </p>
          </section>

          <section className="popular-services">
            <h2>Quick-book favourites</h2>
            <p className="subtitle">Hassle-free jobs you can schedule in under 60 seconds</p>
            <div className="services-grid">
              {popularServices.map((service) => (
                <div key={service.title} className="service-card">
                  <div className="icon" style={{ background: iconBackground(service.color) }}>
                    <FontAwesomeIcon icon={service.icon} />
                  </div>
                  <div className="header">
                    <h3>{service.title}</h3>
                    <span className="starting">Starts at {service.price}</span>
                  </div>
                  <p>{service.description}</p>
                  <div className="includes">
                    {service.includes.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="care-plans">
            <h2>Homzi Care Plans</h2>
            <p className="subtitle">For regular upkeep, unlimited support and guaranteed response times</p>
            <div className="plans-grid">
              {carePlans.map((plan) => (
                <div key={plan.name} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
                  <span className="badge">{plan.badge}</span>
                  <div className="header">
                    <h3>{plan.name}</h3>
                    <div className="price">
                      <div className="amount">{plan.price}</div>
                      <div className="label">{plan.billed}</div>
                    </div>
                  </div>
                  <ul>
                    {plan.perks.map((perk) => (
                      <li key={perk}>
                        <FontAwesomeIcon icon={faShieldAlt} />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <div className="cta">
                    <button>Book plan</button>
                    <span>No auto-renewal. Pay only on confirmation.</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="value-adds">
            <div>
              <h3>Every booking includes</h3>
              <div className="benefits">
                {valueAdds.map((benefit) => (
                  <div key={benefit.title} className="benefit-card">
                    <h4>{benefit.title}</h4>
                    <p>{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="faq">
            <h2>Pricing FAQs</h2>
            <p>Transparent answers before you book your Homzi expert.</p>
            {faqs.map((faq, index) => (
              <div key={faq.question} className="faq-item" onClick={() => toggleFaq(index)}>
                <div className="question">
                  {faq.question}
                  <FontAwesomeIcon icon={faClock} style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>
                {openFaq === index && <div className="answer">{faq.answer}</div>}
              </div>
            ))}
          </section>
        </Container>
      </StyledPricing>
    </PageTransition>
  );
};

export default Pricing;
