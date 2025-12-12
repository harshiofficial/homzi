import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const StyledLogin = styled.div`
  padding: 80px 0;
  background: var(--background-light);
  min-height: calc(100vh - 80px);

  .login-container {
    max-width: 450px;
    margin: 0 auto;
    padding: 2.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .login-header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      color: var(--text-dark);
      margin-bottom: 1rem;
      font-size: 2rem;
      font-weight: 600;
    }

    p {
      color: var(--text-light);
      font-size: 1rem;
    }
  }

  .user-type-toggle {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2.5rem;

    .toggle-button {
      padding: 0.8rem 1.5rem;
      border: 1px solid var(--primary-color);
      border-radius: 25px;
      background: transparent;
      color: var(--primary-color);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;

      &:hover {
        background: var(--primary-light);
      }

      &.active {
        background: var(--primary-color);
        color: white;
      }

      .icon {
        font-size: 0.9rem;
      }
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

  .forgot-password {
    text-align: right;
    margin: -0.5rem 0 1.5rem;

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .remember-me {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    
    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
    
    label {
      color: var(--text-dark);
      font-size: 0.9rem;
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
    margin-bottom: 1.5rem;

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

  .signup-links {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;

    p {
      color: var(--text-light);
      margin-bottom: 1rem;
    }

    .links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;

      a {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // TODO: Implement actual login logic here
        console.log('Logging in as:', userType, formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // On success, redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        setErrors({
          submit: 'Invalid email or password. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <StyledLogin>
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <div className="user-type-toggle">
          <button
            className={`toggle-button ${userType === 'customer' ? 'active' : ''}`}
            onClick={() => setUserType('customer')}
          >
            <FontAwesomeIcon icon={faUser} className="icon" />
            Customer
          </button>
          <button
            className={`toggle-button ${userType === 'professional' ? 'active' : ''}`}
            onClick={() => setUserType('professional')}
          >
            <FontAwesomeIcon icon={faUser} className="icon" />
            Professional
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
                autoComplete="email"
              />
            </div>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

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
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me on this device</label>
          </div>

          {errors.submit && <div className="error">{errors.submit}</div>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="signup-links">
            <p>Don't have an account?</p>
            <div className="links">
              {userType === 'customer' ? (
                <Link to="/customer-signup">Sign up as Customer</Link>
              ) : (
                <Link to="/professional-signup">Sign up as Professional</Link>
              )}
            </div>
          </div>
        </form>
      </div>
    </StyledLogin>
  );
};

export default Login;
