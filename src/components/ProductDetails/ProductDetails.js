import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../ProductDataContext/ProductDataContext";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import NavBar from "../NavBar/NavBar";
import ImageSlider from "../ImageSlider/ImageSlider";
import { FaRupeeSign } from "react-icons/fa";
import { TbShare2 } from "react-icons/tb";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { selectedProduct, loading } = useContext(ProductContext);
  const [totDiscount, setTotDiscount] = useState(0);

  useEffect(() => {
    const fetchDiscountCoupon = async () => {
      const response = await fetch(
        "https://api.furrl.in/api/v2/coupon/getCouponDetailByCouponCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: { couponCode: "FURRLNEW10" } }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTotDiscount(data.data.getCouponDetail.totalDiscountPercent);
      } else {
        console.log("Error Fetching Coupon Data");
      }
    };
    fetchDiscountCoupon();
  }, []);
  const handleProdShare = () => {
    const baseUrl = window.location.origin;
    const productDetailLink = `${baseUrl}/product/${selectedProduct.id}`;
    const title = selectedProduct.title;
    const text = `I found this amazing product: ${title}`;
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: productDetailLink,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      window.open(productDetailLink, "_blank");
    }
  };
  return (
    <>
      <NavBar />
      <div className="product-details-container">
        {loading ? (
          <LoaderSpinner />
        ) : (
          <>
            <ImageSlider images={selectedProduct.images} />
            <div className="bottom-prod-info-cont">
              <div className="title-share-cont">
                <h1 className="product-title">{selectedProduct.title}</h1>
                <button className="prod-share-button" onClick={handleProdShare}>
                  <TbShare2 size={25} />
                </button>
              </div>
              {selectedProduct.discountPercent ? (
                <div className="prod-cost-cont">
                  <p className="prod-price">
                    <FaRupeeSign size={14} />
                    {selectedProduct.price.value}
                  </p>
                  <p className="prod-original-price">
                    ₹{selectedProduct.MRP.value}
                  </p>
                  <p className="prod-discount">
                    {selectedProduct.discountPercent}%
                  </p>
                </div>
              ) : (
                <p className="prod-price">₹{selectedProduct.MRP.value}</p>
              )}
              {totDiscount ? (
                <div className="final-discount-cont">
                  <p>
                    Get it at just
                    <span className="get-it-price">
                      ₹
                      {Math.round(
                        selectedProduct.price.value -
                          (selectedProduct.price.value * totDiscount) / 100
                      )}
                    </span>
                  </p>
                  <span className="vertical-line"> | </span>
                  <p>use FURRLNEW10</p>
                </div>
              ) : (
                ""
              )}
              <button type="button" className="add-to-bag-button">
                Add to Bag
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
