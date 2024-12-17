import React from "react";
import ReactDOM from "react-dom/client";
import swiggy from "./Chapter-4-TalkIsCheapShowMeTheCode/Codes/Sources/swiggy.png";
import logo from "./Chapter-4-TalkIsCheapShowMeTheCode/Codes/Sources/logo.png";

/*
Heading
 -Logo(on left most side)
 -Nav Items(on right most side)
Body
 -Search Bar
 -Restraunt Card Container
  -Restraunt Cards
Footer
 -Copyright
 -Links
 -Address
 -Contact
*/

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const resList = [
  {
    id: 1,
    resName: "Meghana Foods",
    cuisine: "Biryani, North Indian",
    rating: "4.4",
    time: "38 minutes",
  },
  {
    id: 2,
    resName: "KFC",
    cuisine: "Chicken Wings, Burger",
    rating: "4.7",
    time: "45 minutes",
  },
  {
    id: 3,
    resName: "Dominos",
    cuisine: "Pizza, Italian",
    rating: "4.2",
    time: "30 minutes",
  },
];

const RestaurantCard = (props) => {
  const { resName, cuisine, rating, time } = props?.resData;
  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img className="res-logo" alt="res-logo" src={swiggy} />
      <h3>{resName}</h3>
      <h4>{cuisine}</h4>
      <h4>{rating} stars</h4>
      <h4>{time}</h4>
    </div>
  );
};

const Body = () => {
  return (
    <>
      <div className="search">Search</div>
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard
          key={restaurant.id}  
          resData={restaurant}
          />
        ))}
      </div>
    </>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
