import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmptyWishlistCart.css";

const EmptyWishlistCart = ({ imageSrc, altText, message }) => {
  const navigate = useNavigate();
  const handleContinueShopping = () => {
    navigate("/");
  };
  return (
    <div className="wishlist-cart-container">
      <div className="wishlist-cart-inside-cont">
        <img src={imageSrc} alt={altText} />
        <h1 className="wishlist-cart-text">{message}</h1>
      </div>
      <button
        type="button"
        className="continue-shopping-button"
        onClick={handleContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyWishlistCart;
