import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const StyledCartIcon = styled.div`
  position: fixed;
  right: 20px;
  top: 80px;
  z-index: 1000;
  cursor: pointer;

  .cart-button {
    background: var(--primary-color);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: scale(1.1);
      background: #e55a2a;
    }

    .cart-count {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #e55a2a;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
    }
  }
`;

const CartIcon = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <StyledCartIcon onClick={handleCartClick}>
      <div className="cart-button">
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.length}</span>
        )}
      </div>
    </StyledCartIcon>
  );
};

export default CartIcon;
