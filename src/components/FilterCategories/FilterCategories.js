import React from "react";
import "./FilterCategories.css";

const FilterCategories = (props) => {
  const { allFilters, activeFilter, onFilterClick } = props;
  const activeClass = activeFilter
    ? "active-item filter-items"
    : "filter-items";
  const handleFilterChange = () => {
    onFilterClick(allFilters.uniqueId);
  };
  return (
    <>
      <li className={activeClass} onClick={handleFilterChange}>
        {allFilters.name}
      </li>
    </>
  );
};

export default FilterCategories;
