import React from "react";
import { useEffect, useState } from "react";
import logo from "../utils/logo.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [authBtn, setAuthBtn] = useState("Login");

  //if no dependency array => useEffect will be called at every render.
  //if empty dependency array([]) => useEffect will be called at initial render only.
  //if depenency array is [authBtn] => useEffect will be called everytime the authBtn is updated.
  
  useEffect(()=>{
  },[authBtn]);

  const onlineStatus = useOnlineStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/"><img className="logo" src={logo} /></Link> 
      </div>
      <div className="nav-items">
        <ul>
          <li>Online Status: {onlineStatus==true? '✅' : '🔴'}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
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
