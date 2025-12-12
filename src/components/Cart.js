import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faTrash, 
  faClock, 
  faCalendarAlt,
  faTools,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const StyledCart = styled.div`
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;

  .cart-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 0 20px;

    h2 {
      font-size: 2rem;
      color: var(--primary-color);
      margin: 0;
    }

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
  }

  .cart-container {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 30px;
    padding: 0 20px;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
    }
  }

  .cart-items {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .cart-item {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 20px;
    padding: 20px;
    border-bottom: 1px solid #eee;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    .service-icon {
      width: 60px;
      height: 60px;
      background: var(--light-bg);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-color);
      font-size: 1.5rem;
    }

    .service-details {
      h3 {
        margin: 0 0 5px;
        color: var(--text-dark);
        font-size: 1.2rem;
      }

      .service-schedule {
        display: flex;
        gap: 15px;
        color: var(--text-light);
        font-size: 0.9rem;

        .schedule-item {
          display: flex;
          align-items: center;

          svg {
            margin-right: 5px;
          }
        }
      }
    }

    .service-price {
      font-weight: 600;
      color: var(--text-dark);
      font-size: 1.1rem;
    }

    .remove-button {
      background: none;
      border: none;
      color: #ff4444;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: #fff1f1;
      }
    }
  }

  .empty-cart {
    padding: 20px;
    text-align: center;
  }

  .cart-summary {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    height: fit-content;

    h3 {
      margin: 0 0 20px;
      color: var(--text-dark);
      font-size: 1.3rem;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      color: var(--text-color);

      &.total {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 2px solid #eee;
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--text-dark);
      }
    }

    .checkout-button {
      width: 100%;
      padding: 15px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 20px;
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

    .promo-code {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eee;

      h4 {
        margin: 0 0 10px;
        font-size: 1rem;
        color: var(--text-dark);
      }

      .promo-input {
        display: flex;
        gap: 10px;

        input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.9rem;

          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
        }

        button {
          padding: 10px 20px;
          background: var(--light-bg);
          border: none;
          border-radius: 8px;
          color: var(--primary-color);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: var(--primary-color);
            color: white;
          }
        }
      }
    }

    .service-guarantee {
      margin-top: 20px;
      padding: 15px;
      background: var(--light-bg);
      border-radius: 10px;
      font-size: 0.9rem;
      color: var(--text-color);
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        color: var(--primary-color);
      }
    }
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Plumbing Service',
      icon: faTools,
      price: 120,
      date: new Date(),
      time: '10:00 AM',
    },
    {
      id: 2,
      name: 'Electrical Repair',
      icon: faTools,
      price: 150,
      date: new Date(),
      time: '2:00 PM',
    }
  ]);

  const [promoCode, setPromoCode] = useState('');

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const serviceCharge = 25;
  const discount = 0;
  const total = subtotal + serviceCharge - discount;

  return (
    <StyledCart>
      <div className="cart-header">
        <a href="/services" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
          Continue Booking
        </a>
        <h2>Service Cart</h2>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="service-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div className="service-details">
                  <h3>{item.name}</h3>
                  <div className="service-schedule">
                    <div className="schedule-item">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>{item.date.toLocaleDateString()}</span>
                    </div>
                    <div className="schedule-item">
                      <FontAwesomeIcon icon={faClock} />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
                <div className="service-price">
                  <span>${item.price}</span>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </motion.div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h3>Booking Summary</h3>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${subtotal}</span>
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
          <div className="summary-item total">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <div className="promo-code">
            <h4>Have a Promo Code?</h4>
            <div className="promo-input">
              <input
                type="text"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button>Apply</button>
            </div>
          </div>

          <button 
            className="checkout-button" 
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Schedule
          </button>

          <div className="service-guarantee">
            <FontAwesomeIcon icon={faShieldAlt} />
            <span>100% Satisfaction Guaranteed. Professional and Insured Service Providers.</span>
          </div>
        </div>
      </div>
    </StyledCart>
  );
};

export default Cart;
