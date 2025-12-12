import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faMapMarkerAlt, faCalendar, faCity, faMapMarked, faMapPin, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const StyledSignup = styled.div`
  padding: 80px 0;
  background: var(--background-light);
  min-height: calc(100vh - 80px);

  .signup-container {
    max-width: 500px;
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

  .form-section {
    margin-bottom: 2rem;
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

      input {
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

  .form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    .form-group {
      flex-basis: 30%;
    }
  }

  .radio-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    label {
      margin-right: 1rem;
    }
  }

  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    label {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }

  .terms-group {
    margin-bottom: 2rem;
  }

  .checkbox-label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
    font-weight: 500;
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

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    preferredContactMethod: 'email',
    notifications: {
      email: true,
      sms: false,
      whatsapp: false
    },
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.fullName.trim())) {
      newErrors.fullName = 'Name should be 2-50 characters long and contain only letters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (minimum 10 digits)';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.city.trim())) {
      newErrors.city = 'Please enter a valid city name';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    // Zip Code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    // Emergency Contact validation
    if (!formData.emergencyContact.name.trim()) {
      newErrors['emergencyContact.name'] = 'Emergency contact name is required';
    }
    if (!formData.emergencyContact.phone.trim()) {
      newErrors['emergencyContact.phone'] = 'Emergency contact phone is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.emergencyContact.phone.replace(/\D/g, ''))) {
      newErrors['emergencyContact.phone'] = 'Please enter a valid phone number';
    }
    if (!formData.emergencyContact.relationship.trim()) {
      newErrors['emergencyContact.relationship'] = 'Relationship is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      // Password strength validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character';
      }
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (type === 'checkbox') {
      if (name === 'termsAccepted') {
        setFormData(prev => ({
          ...prev,
          termsAccepted: checked
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [name]: checked
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <StyledSignup>
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create Customer Account</h1>
          <p>Join our community and get access to quality services</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h2>Personal Information</h2>

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
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <div className="input-group">
                <FontAwesomeIcon icon={faCalendar} className="icon" />
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              {errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="form-section">
            <h2>Contact Information</h2>

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
              <label>Preferred Contact Method</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value="email"
                    checked={formData.preferredContactMethod === 'email'}
                    onChange={handleChange}
                  />
                  Email
                </label>
                <label>
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value="phone"
                    checked={formData.preferredContactMethod === 'phone'}
                    onChange={handleChange}
                  />
                  Phone
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Notifications</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="email"
                    checked={formData.notifications.email}
                    onChange={handleChange}
                  />
                  Email Notifications
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="sms"
                    checked={formData.notifications.sms}
                    onChange={handleChange}
                  />
                  SMS Notifications
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="whatsapp"
                    checked={formData.notifications.whatsapp}
                    onChange={handleChange}
                  />
                  WhatsApp Notifications
                </label>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="form-section">
            <h2>Address Information</h2>

            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <div className="input-group">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your street address"
                />
              </div>
              {errors.address && <div className="error">{errors.address}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <div className="input-group">
                  <FontAwesomeIcon icon={faCity} className="icon" />
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </div>
                {errors.city && <div className="error">{errors.city}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <div className="input-group">
                  <FontAwesomeIcon icon={faMapMarked} className="icon" />
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />
                </div>
                {errors.state && <div className="error">{errors.state}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <div className="input-group">
                  <FontAwesomeIcon icon={faMapPin} className="icon" />
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter ZIP code"
                  />
                </div>
                {errors.zipCode && <div className="error">{errors.zipCode}</div>}
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="form-section">
            <h2>Emergency Contact</h2>

            <div className="form-group">
              <label htmlFor="emergencyContact.name">Contact Name</label>
              <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  id="emergencyContact.name"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  placeholder="Enter emergency contact name"
                />
              </div>
              {errors['emergencyContact.name'] && (
                <div className="error">{errors['emergencyContact.name']}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContact.phone">Contact Phone</label>
              <div className="input-group">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <input
                  type="tel"
                  id="emergencyContact.phone"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  placeholder="Enter emergency contact phone"
                />
              </div>
              {errors['emergencyContact.phone'] && (
                <div className="error">{errors['emergencyContact.phone']}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContact.relationship">Relationship</label>
              <div className="input-group">
                <FontAwesomeIcon icon={faUserFriends} className="icon" />
                <input
                  type="text"
                  id="emergencyContact.relationship"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  placeholder="Enter relationship"
                />
              </div>
              {errors['emergencyContact.relationship'] && (
                <div className="error">{errors['emergencyContact.relationship']}</div>
              )}
            </div>
          </div>

          {/* Password Section */}
          <div className="form-section">
            <h2>Security</h2>

            <div className="form-group">
              <label htmlFor="password">Password</label>
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
          </div>

          {/* Terms and Conditions */}
          <div className="form-group terms-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              I accept the <a href="/terms" target="_blank">Terms and Conditions</a>
            </label>
            {errors.termsAccepted && <div className="error">{errors.termsAccepted}</div>}
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </StyledSignup>
  );
};

export default CustomerSignup;
