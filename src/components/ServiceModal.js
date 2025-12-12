import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { serviceCenters } from '../data/serviceCenters';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #4a5568;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        color: #1a202c;
        transform: rotate(90deg);
      }
    }

    h2 {
      margin: 0 0 1.5rem;
      color: #1a202c;
      font-size: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #4a5568;
        font-weight: 500;
      }

      input,
      textarea,
      select {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.2s ease;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
        }
      }

      textarea {
        min-height: 100px;
        resize: vertical;
      }

      .image-upload {
        border: 2px dashed #e2e8f0;
        border-radius: 8px;
        padding: 2rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: var(--primary-color);
          background: #f8fafc;
        }

        .upload-icon {
          font-size: 2rem;
          color: #a0aec0;
          margin-bottom: 1rem;
        }

        p {
          margin: 0;
          color: #4a5568;
        }
      }
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;

      button {
        flex: 1;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &.cancel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #4a5568;

          &:hover {
            background: #edf2f7;
          }
        }

        &.submit {
          background: var(--primary-color);
          border: none;
          color: white;

          &:hover {
            background: var(--primary-dark);
          }
        }
      }
    }
  }
`;

const ServiceModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'plumbing',
    price: '',
    duration: '',
    description: '',
    features: '',
    image: null,
    centerId: serviceCenters[0]?.id || '',
    availability: 'Available Today'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StyledModal onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        <h2>Add New Service</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Service Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hvac">HVAC</option>
              <option value="smart-home">Smart Home</option>
              <option value="renovation">Renovation</option>
              <option value="painting">Painting</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 1-2 hours"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="centerId">Assign to Homzi Center</label>
            <select
              id="centerId"
              name="centerId"
              value={formData.centerId}
              onChange={handleChange}
            >
              {serviceCenters.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name} — {center.city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability Note</label>
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

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="features">Features (comma-separated)</label>
            <input
              type="text"
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="e.g. 24/7 Support, Licensed, Warranty"
              required
            />
          </div>

          <div className="form-group">
            <label>Service Image</label>
            <div className="image-upload">
              <FontAwesomeIcon icon={faUpload} className="upload-icon" />
              <p>Click to upload or drag and drop</p>
              <p>SVG, PNG, JPG (max. 800x400px)</p>
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit">
              Add Service
            </button>
          </div>
        </form>
      </div>
    </StyledModal>
  );
};

export default ServiceModal;
