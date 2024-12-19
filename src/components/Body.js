import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import listOfRestaurant from "../utils/mocks/resList";

const Body = () => {
  const [resList, setResList] = useState(listOfRestaurant);

  return (
    <>
      <div className="search">Search</div>
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            filteredRes = listOfRestaurant.filter(
              (res) => res.data.avgRating >= 4
            );
            setResList(filteredRes);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Body;
