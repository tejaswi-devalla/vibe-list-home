import React, { useContext } from "react";
import { TbShare2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductDataContext/ProductDataContext";
import "./ProductList.css";

const ProductsList = (props) => {
  const { productData } = props;
  const { selectProduct } = useContext(ProductContext);

  const handleClick = () => {
    selectProduct(productData);
  };
  const handleShare = () => {
    const baseUrl = window.location.origin;
    const productDetailLink = `${baseUrl}/product/${productData.id}`;
    const title = productData.title;
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
    <div className="product-item" onClick={handleClick}>
      <div className="image-container">
        <Link to={`/product/${productData.id}`}>
          <img
            src={productData.images[0].src}
            alt={productData.title}
            className="prod-img"
          />
        </Link>
        <div className="image-overlay" onClick={handleShare}>
          <button className="share-button">
            <TbShare2 size={25} />
          </button>
        </div>
      </div>
      <Link to={`/product/${productData.id}`} className="product-details">
        <p className="vendor">{productData.brand[0].name}</p>
        <h2 className="title">{productData.title}</h2>
        {productData.discountPercent ? (
          <div className="discount-details">
            <p className="discount-price">Rs {productData.price.value}</p>
            <p className="original-price">Rs {productData.MRP.value}</p>
            <p className="discount-percentage">
              {productData.discountPercent}%
            </p>
          </div>
        ) : (
          <p className="no-discount-price">Rs {productData.MRP.value}</p>
        )}
      </Link>
    </div>
  );
};

export default ProductsList;
