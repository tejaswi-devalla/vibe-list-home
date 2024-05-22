import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="nav-inside-cont">
        <Link to="/">
          <img
            src="https://furrl.in/_next/static/media/Furrl.13550a62.svg"
            alt="furrl-icon"
          />
        </Link>
        <ul className="nav-items-cont">
          <Link to="/wishlist" className="nav-items">
            <li>
              <IoBookmarkOutline size={25} />
            </li>
          </Link>
          <Link to="/cart" className="nav-items">
            <li>
              <HiOutlineShoppingBag size={25} />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
