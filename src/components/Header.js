import React from "react";
import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  console.log("Header Called");
  const [authBtn, setAuthBtn] = useState("Login");

  //if no dependency array => useEffect will be called at every render.
  //if empty dependency array([]) => useEffect will be called at initial render only.
  //if depenency array is [authBtn] => useEffect will be called everytime the authBtn is updated.
  
  useEffect(()=>{
    console.log("useEffect Called");
  },[authBtn]);



  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li>Cart</li>
          <li>
            <button
              className="auth-btn"
              onClick={() => {
                authBtn === "Login" ? setAuthBtn("Logout") : setAuthBtn("Login");
              }}
            >
              {authBtn}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
