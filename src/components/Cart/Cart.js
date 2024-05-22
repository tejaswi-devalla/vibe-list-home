import React from "react";
import NavBar from "../NavBar/NavBar";
import EmptyWishlistCart from "../EmptyWishlistCart/EmptyWishlistCart";

const Cart = () => {
  return (
    <>
      <NavBar />
      <EmptyWishlistCart
        imageSrc="https://furrl.in/_next/static/media/emptyBag.317aed26.svg"
        altText="emptyBag"
        message="Looks like your shopping bag is empty"
      />
    </>
  );
};

export default Cart;
