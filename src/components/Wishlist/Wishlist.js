import React from "react";
import NavBar from "../NavBar/NavBar";
import EmptyWishlistCart from "../EmptyWishlistCart/EmptyWishlistCart";

const Wishlist = () => {
  return (
    <>
      <NavBar />
      <EmptyWishlistCart
        imageSrc="https://furrl.in/_next/static/media/emptyWishlist.c12c0656.svg"
        altText="emptyWishlist"
        message="Looks like your wishlist is empty"
      />
    </>
  );
};

export default Wishlist;
