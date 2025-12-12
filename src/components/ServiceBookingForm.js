import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCalendarAlt,
  faMapMarkerAlt,
  faUserClock,
  faClipboardList,
  faTools,
  faComment,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const StyledBookingForm = styled.div`
  .booking-form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    h3 {
      color: var(--text-dark);
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-dark);
        font-weight: 500;
      }

      .input-group {
        position: relative;

        input, textarea, select {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px var(--primary-light);
          }
        }

        textarea {
          min-height: 100px;
          padding-left: 1rem;
        }

        .icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
      }
    }

    .time-slots {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.8rem;
      margin-top: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      .time-slot {
        padding: 0.8rem;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        &:hover:not(.unavailable) {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }

        &.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        &.unavailable {
          background: #f5f5f5;
          color: #999;
          cursor: not-allowed;
          border-color: #ddd;
        }

        .slot-time {
          font-weight: 500;
        }

        .slot-availability {
          font-size: 0.8rem;
        }
      }
    }

    .preferred-pro {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;

      .pro-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;

        .pro-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover:not(.unavailable) {
            border-color: var(--primary-color);
            transform: translateY(-2px);
          }

          &.selected {
            background: var(--primary-light);
            border-color: var(--primary-color);
          }

          &.unavailable {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .pro-name {
            font-weight: 500;
            margin-bottom: 0.5rem;
          }

          .pro-rating {
            color: #ffc107;
            margin-bottom: 0.5rem;
          }

          .pro-availability {
            font-size: 0.8rem;
            color: var(--text-light);
          }
        }
      }
    }

    .urgency-options {
      margin-top: 1.5rem;

      .urgency-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        .urgency-option {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;

          &:hover {
            border-color: var(--primary-color);
          }

          &.selected {
            background: var(--primary-light);
            border-color: var(--primary-color);
          }

          .urgency-icon {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--primary-color);
          }

          .urgency-title {
            font-weight: 500;
            margin-bottom: 0.5rem;
          }

          .urgency-description {
            font-size: 0.8rem;
            color: var(--text-light);
          }

          .urgency-price {
            font-weight: 500;
            color: var(--primary-color);
            margin-top: 0.5rem;
          }
        }
      }
    }
  }

  .error {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ServiceBookingForm = ({ service, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    location: '',
    urgency: 'standard',
    preferredPro: null,
    specialInstructions: '',
    propertyType: 'residential',
    propertyAccess: 'owner_present'
  });

  const [errors, setErrors] = useState({});

  const timeSlots = [
    { time: '9:00 AM', availability: 'available' },
    { time: '10:00 AM', availability: 'available' },
    { time: '11:00 AM', availability: 'booked' },
    { time: '1:00 PM', availability: 'available' },
    { time: '2:00 PM', availability: 'available' },
    { time: '3:00 PM', availability: 'booked' },
    { time: '4:00 PM', availability: 'available' },
    { time: '5:00 PM', availability: 'available' }
  ];

  const professionals = [
    { id: 1, name: 'John Smith', rating: 4.8, availability: true },
    { id: 2, name: 'Sarah Johnson', rating: 4.9, availability: true },
    { id: 3, name: 'Mike Wilson', rating: 4.7, availability: false },
    { id: 4, name: 'Emma Davis', rating: 4.9, availability: true }
  ];

  const urgencyOptions = [
    {
      id: 'standard',
      title: 'Standard',
      description: 'Regular service within 24-48 hours',
      price: 'Regular Rate',
      icon: faClock
    },
    {
      id: 'priority',
      title: 'Priority',
      description: 'Same day service',
      price: '+25% Rate',
      icon: faUserClock
    },
    {
      id: 'emergency',
      title: 'Emergency',
      description: 'Immediate response within 2 hours',
      price: '+50% Rate',
      icon: faExclamationCircle
    }
  ];

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    if (!formData.time) {
      newErrors.time = 'Please select a time slot';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Please enter your location';
    }
    if (!formData.urgency) {
      newErrors.urgency = 'Please select service urgency';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <StyledBookingForm>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Service Date</label>
          <div className="input-group">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            <DatePicker
              selected={formData.date}
              onChange={date => handleChange('date', date)}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              className="form-control"
            />
          </div>
          {errors.date && (
            <div className="error">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.date}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Available Time Slots</label>
          <div className="time-slots">
            {timeSlots.map(slot => (
              <div
                key={slot.time}
                className={`time-slot ${
                  formData.time === slot.time ? 'active' : ''
                } ${slot.availability === 'booked' ? 'unavailable' : ''}`}
                onClick={() => {
                  if (slot.availability !== 'booked') {
                    handleChange('time', slot.time);
                  }
                }}
              >
                <FontAwesomeIcon icon={faClock} />
                <span className="slot-time">{slot.time}</span>
              </div>
            ))}
          </div>
          {errors.time && (
            <div className="error">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.time}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Service Location</label>
          <div className="input-group">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
            <input
              type="text"
              placeholder="Enter your address"
              value={formData.location}
              onChange={e => handleChange('location', e.target.value)}
            />
          </div>
          {errors.location && (
            <div className="error">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.location}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Property Type</label>
          <div className="input-group">
            <FontAwesomeIcon icon={faTools} className="icon" />
            <select
              value={formData.propertyType}
              onChange={e => handleChange('propertyType', e.target.value)}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Property Access</label>
          <div className="input-group">
            <FontAwesomeIcon icon={faTools} className="icon" />
            <select
              value={formData.propertyAccess}
              onChange={e => handleChange('propertyAccess', e.target.value)}
            >
              <option value="owner_present">Owner Present</option>
              <option value="key_pickup">Key Pickup</option>
              <option value="security_desk">Security Desk</option>
              <option value="lockbox">Lockbox</option>
            </select>
          </div>
        </div>

        <div className="urgency-options">
          <label>Service Urgency</label>
          <div className="urgency-list">
            {urgencyOptions.map(option => (
              <div
                key={option.id}
                className={`urgency-option ${
                  formData.urgency === option.id ? 'selected' : ''
                }`}
                onClick={() => handleChange('urgency', option.id)}
              >
                <FontAwesomeIcon
                  icon={option.icon}
                  className="urgency-icon"
                />
                <div className="urgency-title">{option.title}</div>
                <div className="urgency-description">{option.description}</div>
                <div className="urgency-price">{option.price}</div>
              </div>
            ))}
          </div>
          {errors.urgency && (
            <div className="error">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.urgency}
            </div>
          )}
        </div>

        <div className="preferred-pro">
          <label>Preferred Professional (Optional)</label>
          <div className="pro-list">
            {professionals.map(pro => (
              <div
                key={pro.id}
                className={`pro-card ${
                  formData.preferredPro === pro.id ? 'selected' : ''
                } ${!pro.availability ? 'unavailable' : ''}`}
                onClick={() => {
                  if (pro.availability) {
                    handleChange('preferredPro', pro.id);
                  }
                }}
              >
                <div className="pro-name">{pro.name}</div>
                <div className="pro-rating">
                  {'★'.repeat(Math.floor(pro.rating))}
                  {pro.rating % 1 !== 0 && '½'}
                  <span className="rating-number"> ({pro.rating})</span>
                </div>
                <div className="pro-availability">
                  {pro.availability ? 'Available' : 'Unavailable'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Special Instructions</label>
          <div className="input-group">
            <textarea
              placeholder="Any special instructions or requirements..."
              value={formData.specialInstructions}
              onChange={e => handleChange('specialInstructions', e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Proceed to Checkout
        </button>
      </form>
    </StyledBookingForm>
  );
};

export default ServiceBookingForm;
