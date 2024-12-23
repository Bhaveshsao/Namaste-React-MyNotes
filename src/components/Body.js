import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
// import listOfRestaurant from "../utils/mocks/resList";
import Shimmer from "./Shimmer";
import { SWIGGY_URL } from "../utils/constants";

const Body = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(SWIGGY_URL);
    const json = await data.json();
    setResList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  // if(resList.length === 0){
  //   return <Shimmer/>;
  // }


  return resList.length === 0? (<Shimmer/>):(
    <>
      <div className="search">Search</div>
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            filteredRes = resList.filter(
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
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Body;
