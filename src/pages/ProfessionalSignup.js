import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faLock, 
  faPhone, 
  faMapMarkerAlt,
  faTools,
  faIdCard,
  faBriefcase,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import { submitProfessionalLead } from '../api/homziApi';
import { serviceCenters } from '../data/serviceCenters';
import { SERVICE_CATEGORIES } from '../data/serviceCatalog';

const StyledSignup = styled.div`
  padding: 80px 0;
  background: var(--background-light);
  min-height: calc(100vh - 80px);

  .signup-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .signup-header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      color: var(--text-dark);
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    p {
      color: var(--text-light);
      font-size: 1rem;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
    position: relative;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
      font-weight: 500;
    }

    .input-group {
      position: relative;

      input, select, textarea {
        width: 100%;
        padding: 0.8rem 1rem 0.8rem 2.5rem;
        border: 1px solid #ddd;
        border-radius: 25px;
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

      select {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1em;
      }

      .icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-light);
      }
    }

    .error {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      padding-left: 1rem;
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;

    .service-option {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        border-color: var(--primary-color);
      }

      &.selected {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);

        .icon {
          color: white;
        }
      }

      .icon {
        color: var(--primary-color);
      }
    }
  }

  .submit-button {
    width: 100%;
    padding: 1rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
  }

  .login-link {
    text-align: center;
    margin-top: 1.5rem;
    color: var(--text-light);

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const serviceCategories = SERVICE_CATEGORIES;

const ProfessionalSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    experience: '',
    services: [],
    otherServiceDescription: '',
    bio: '',
    businessName: '',
    insuranceInfo: '',
    centerId: '',
    availability: 'Available Today'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Years of experience is required';
    }

    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }

    if (formData.services.includes('other') && !formData.otherServiceDescription.trim()) {
      newErrors.otherServiceDescription = 'Please describe your other service';
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Professional bio is required';
    }

    if (!formData.centerId) {
      newErrors.centerId = 'Please choose your primary Homzi service center';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleService = (serviceId) => {
    setFormData(prev => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId];
      return { ...prev, services };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionStatus(null);

    submitProfessionalLead({
      ...formData,
      centerId: Number(formData.centerId),
      services: formData.services,
    })
      .then(() => {
        setSubmissionStatus({
          type: 'success',
          message: 'Thanks for registering with Homzi! Our onboarding team will reach out within 24 hours.'
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          password: '',
          confirmPassword: '',
          licenseNumber: '',
          experience: '',
          services: [],
          otherServiceDescription: '',
          bio: '',
          businessName: '',
          insuranceInfo: '',
          centerId: '',
          availability: 'Available Today'
        });
      })
      .catch((error) => {
        setSubmissionStatus({
          type: 'error',
          message: error.message || 'Something went wrong while submitting your details. Please try again.'
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <StyledSignup>
      <div className="signup-container">
        <div className="signup-header">
          <h1>Professional Registration</h1>
          <p>Join our network of trusted service providers</p>
        </div>

        <form onSubmit={handleSubmit}>
          {submissionStatus && (
            <div className={`alert ${submissionStatus.type}`}>
              {submissionStatus.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faBriefcase} className="icon" />
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Business Address</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your business address"
              />
            </div>
            {errors.address && <div className="error">{errors.address}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="licenseNumber">License Number</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faIdCard} className="icon" />
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Enter your professional license number"
              />
            </div>
            {errors.licenseNumber && <div className="error">{errors.licenseNumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="experience">Years of Experience</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faBriefcase} className="icon" />
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="How many years have you been working?"
                min="0"
              />
            </div>
            {errors.experience && <div className="error">{errors.experience}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="centerId">Primary Homzi Service Center</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <select
                id="centerId"
                name="centerId"
                value={formData.centerId}
                onChange={handleChange}
              >
                <option value="">Select a service center</option>
                {serviceCenters.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.name} — {center.city}
                  </option>
                ))}
              </select>
            </div>
            {errors.centerId && <div className="error">{errors.centerId}</div>}
          </div>

          <div className="form-group">
            <label>Select the services you offer</label>

            <div className="services-grid" style={{ display: 'block' }}>
              {serviceCategories.map(category => (
                <div key={category.id} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                    {category.label}
                  </div>
                  <div
                    className="category-services-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gap: '0.5rem'
                    }}
                  >
                    {category.subServices.map(sub => (
                      <div
                        key={sub.id}
                        className={
                          'service-option ' +
                          (formData.services.includes(sub.id) ? 'selected' : '')
                        }
                        onClick={() => toggleService(sub.id)}
                      >
                        <span>{sub.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {errors.services && <div className="error">{errors.services}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="bio">Professional Bio</label>
            <div className="input-group">
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about your professional experience and expertise"
              />
            </div>
            {errors.bio && <div className="error">{errors.bio}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="insuranceInfo">Insurance / Certifications</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faFileAlt} className="icon" />
              <textarea
                type="text"
                id="insuranceInfo"
                name="insuranceInfo"
                value={formData.insuranceInfo}
                onChange={handleChange}
                placeholder="Enter your insurance policy details"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <div className="input-group">
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
              >
                <option value="Available Today">Available Today</option>
                <option value="Slots Filling Fast">Slots Filling Fast</option>
                <option value="Next Day Slots">Next Day Slots</option>
                <option value="Booked for the Week">Booked for the Week</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Create Password</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-group">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register as Professional'}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </StyledSignup>
  );
};

export default ProfessionalSignup;
