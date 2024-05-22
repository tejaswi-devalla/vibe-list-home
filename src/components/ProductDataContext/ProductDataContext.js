import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setSelectedProduct(JSON.parse(storedProduct));
    }
    setLoading(false);
  }, []);

  const selectProduct = (productData) => {
    setSelectedProduct(productData);
    localStorage.setItem("selectedProduct", JSON.stringify(productData));
  };

  return (
    <ProductContext.Provider
      value={{ selectedProduct, selectProduct, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};
