import React, { useEffect, useState, useCallback } from "react";
import { RxDotFilled } from "react-icons/rx";
import FilterCategories from "../FilterCategories/FilterCategories";
import ProductsList from "../ProductsList/ProductsList";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import "./AllProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [remainingPages, setRemainingPages] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filterCategories, setFilterCategories] = useState({});
  const [activeFilter, setActiveFilter] = useState({ id: "allData" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListingFilters = async () => {
      const response = await fetch(
        "https://api.furrl.in/api/v2/listing/getListingFilters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "#HomeHunts",
            entity: "vibe",
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const filters = data.data.getListingFilters.advanceFilters.filters;
        const categoryFilters = filters.find(
          (filter) => filter.contentType === "CATEGORY"
        );
        if (categoryFilters) {
          const allData = [
            {
              name: "All",
              uniqueId: "allData",
            },
          ];
          const newData = {
            type: categoryFilters.contentType,
            renderItems: [...allData, ...categoryFilters.renderItems],
          };
          setFilterCategories(newData);
        }
      }
    };
    fetchListingFilters();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.furrl.in/api/v2/listing/getListingProducts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              input: {
                page,
                pageSize: 10,
                filters: activeFilter.id === "allData" ? [] : activeFilter,
                id: "#HomeHunts",
                entity: "vibe",
              },
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const totProd = data.data.getListingProducts.totalProducts;
          const newProducts = data.data.getListingProducts.products;
          setTotalProducts(totProd);
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
          if (
            newProducts.length === 0 ||
            page > data.data.getListingProducts.totalPages
          ) {
            setRemainingPages(false);
          }
        } else {
          console.log("Error Fetching Data");
        }
      } catch (err) {
        console.log("Error Fetching Data: ", err);
      } finally {
        setLoading(false);
      }
    };
    if (remainingPages) {
      fetchProducts();
    }
  }, [page, remainingPages, activeFilter]);
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      remainingPages &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [remainingPages, loading]);

  useEffect(() => {
    if (remainingPages) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, remainingPages]);

  const handleFilterClick = (uniqueId) => {
    if (uniqueId === "allData") {
      setActiveFilter({ id: uniqueId });
    } else {
      setActiveFilter({ type: "CATEGORY", id: uniqueId });
    }
    setProducts([]);
    setPage(1);
    setRemainingPages(true);
  };
  return (
    <>
      {products && (
        <div className="bottom-prod-container">
          <div className="text-container">
            <div className="inside-text-cont">
              <h1 className="shop-prod-text">Shop Products</h1>
              <RxDotFilled
                color="gray"
                size={20}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
              <p className="total-prod-text">{totalProducts} Products</p>
            </div>
          </div>
          <ul className="filters-container">
            {filterCategories.renderItems &&
              filterCategories.renderItems.map((filter) => {
                return (
                  <FilterCategories
                    key={filter.uniqueId}
                    allFilters={filter}
                    activeFilter={filter.uniqueId === activeFilter.id}
                    onFilterClick={handleFilterClick}
                  />
                );
              })}
          </ul>
          <div className="all-products-cont">
            {products.map((product, index) => {
              return <ProductsList key={index} productData={product} />;
            })}
          </div>
          {loading && <LoaderSpinner />}
        </div>
      )}
    </>
  );
};

export default AllProducts;
