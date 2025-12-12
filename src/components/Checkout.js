import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const StyledCheckout = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }

  .checkout-header {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .back-button {
      display: flex;
      align-items: center;
      color: var(--text-color);
      text-decoration: none;
      margin-right: 20px;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary-color);
      }

      svg {
        margin-right: 8px;
      }
    }

    h2 {
      font-size: 2rem;
      color: var(--primary-color);
      margin: 0;
    }
  }

  .billing-form {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h3 {
      color: var(--text-dark);
      margin: 0 0 20px;
    }

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        color: var(--text-dark);
        font-weight: 500;
      }

      input, select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }

      &.row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
      }
    }

    .payment-options {
      margin: 30px 0;

      h4 {
        margin: 0 0 15px;
        color: var(--text-dark);
      }

      .options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;

        .payment-option {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            border-color: var(--primary-color);
          }

          &.selected {
            border-color: var(--primary-color);
            background: var(--light-bg);
          }

          svg {
            font-size: 1.5rem;
            margin-bottom: 8px;
            color: var(--primary-color);
          }

          span {
            display: block;
            font-size: 0.9rem;
            color: var(--text-color);
          }
        }
      }
    }

    .card-details {
      margin-top: 20px;

      .card-inputs {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 15px;
      }
    }
  }

  .order-summary {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    height: fit-content;

    h3 {
      color: var(--text-dark);
      margin: 0 0 20px;
    }

    .service-item {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #eee;

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 15px;
      }

      .service-details {
        flex: 1;

        h4 {
          margin: 0 0 5px;
          color: var(--text-dark);
        }

        .price {
          color: var(--text-color);
        }
      }
    }

    .summary-items {
      margin: 20px 0;

      .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        color: var(--text-color);

        &.total {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 2px solid #eee;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-dark);
        }
      }
    }

    .place-order-button {
      width: 100%;
      padding: 15px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
      }
    }
  }
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', formData);
    // Navigate to confirmation page or show success message
  };

  const serviceCharge = 25;
  const discount = 0;
  const tax = (cartTotal * 0.08).toFixed(2);
  const finalTotal = (cartTotal + serviceCharge + parseFloat(tax) - discount).toFixed(2);

  return (
    <StyledCheckout>
      <div className="checkout-header">
        <a href="/cart" className="back-button" onClick={(e) => { e.preventDefault(); navigate('/cart'); }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Cart
        </a>
        <h2>Checkout</h2>
      </div>

      <div className="billing-form">
        <h3>Billing Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group row">
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="payment-options">
            <h4>Payment Method</h4>
            <div className="options">
              <div
                className={`payment-option ${selectedPayment === 'cash' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('cash')}
              >
                <FontAwesomeIcon icon={faMoneyBill} />
                <span>Cash</span>
              </div>
              <div
                className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('card')}
              >
                <FontAwesomeIcon icon={faCreditCard} />
                <span>Card</span>
              </div>
              <div
                className={`payment-option ${selectedPayment === 'paypal' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('paypal')}
              >
                <FontAwesomeIcon icon={faPaypal} />
                <span>PayPal</span>
              </div>
            </div>
          </div>

          {selectedPayment === 'card' && (
            <div className="card-details">
              <div className="form-group">
                <label>Name on Card</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="card-inputs">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expDate"
                    placeholder="MM/YY"
                    value={formData.expDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="service-item">
            <div className="service-details">
              <h4>{item.name}</h4>
              <span className="price">${item.price}</span>
            </div>
          </div>
        ))}
        <div className="summary-items">
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${cartTotal}</span>
          </div>
          <div className="summary-item">
            <span>Service Charge</span>
            <span>${serviceCharge}</span>
          </div>
          {discount > 0 && (
            <div className="summary-item">
              <span>Discount</span>
              <span>-${discount}</span>
            </div>
          )}
          <div className="summary-item">
            <span>Tax</span>
            <span>${tax}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>${finalTotal} USD</span>
          </div>
        </div>
        <button className="place-order-button" onClick={handleSubmit}>
          Place Order
        </button>
      </div>
    </StyledCheckout>
  );
};

export default Checkout;
