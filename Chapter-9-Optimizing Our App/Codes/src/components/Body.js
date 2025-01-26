// import listOfRestaurant from "../utils/mocks/resList";
import React from "react";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard"; // Component to display individual restaurant details
import Shimmer from "./Shimmer"; // Shimmer effect displayed while data is loading
import { SWIGGY_URL } from "../utils/constants"; // API URL for fetching restaurant data
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // State to store the full list of restaurants fetched from the API to apply any filters
  const [resList, setResList] = useState([]);

  // State to store the list of restaurants to be rendered
  const [renderRes, setRenderRes] = useState([]);

  // State to store the user's input in the search bar
  const [searchRes, setSearchRes] = useState("");

  // Fetch restaurant data from the API when the component is first rendered
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  const fetchData = async () => {
    // Fetch data from the Swiggy API
    const data = await fetch(SWIGGY_URL);
    const json = await data.json();

    // Parse the required restaurant data from the API response
    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    // Set both full list and initial rendered list with fetched data
    setResList(restaurants);
    setRenderRes(restaurants);
  };
  const onlineStatus = useOnlineStatus();
  if (onlineStatus == false)
    return (
      <h1>Looks like you're offline! Please check your internet connection.</h1>
    );
    
  return resList.length === 0 ? (
    // Show the Shimmer component while data is being fetched
    <Shimmer />
  ) : (
    <>
      <div className="filter">
        {/* Search Bar Section */}
        <div className="search">
          {/* Input field for entering search text */}
          <input
            type="text"
            className="search-box"
            value={searchRes}
            onChange={(e) => {
              setSearchRes(e.target.value); // Update the search query state as the user types
            }}
          />
          <button
            className="searchBtn"
            onClick={() => {
              // Filter the restaurants based on the search query
              const filteredRes = resList.filter((res) =>
                res.info.name.toLowerCase().includes(searchRes.toLowerCase())
              );
              setRenderRes(filteredRes); // Update the rendered list with search results
            }}
          >
            Search
          </button>
        </div>

        {/* Filter Button for Top Rated Restaurants */}
        <button
          className="filter-btn"
          onClick={() => {
            // Filter restaurants with average ratings of 4 or above
            const filteredRes = resList.filter(
              (res) => res.info.avgRating >= 4
            );
            setRenderRes(filteredRes); // Update the rendered list with top-rated restaurants
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      {/* Section to Display the List of Restaurant Cards */}
      <div className="res-container">
        {renderRes.map((restaurant) => (
          // Render each restaurant's details using the RestaurantCard component
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Body;
