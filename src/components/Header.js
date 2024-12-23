import { useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  console.log("Header Called");
  const [authBtn, setAuthBtn] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
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
