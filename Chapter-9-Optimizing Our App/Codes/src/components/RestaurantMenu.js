import React from "react";
import { CDN_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantMenu = () => {
  const resInfo = useRestaurantMenu();

  const onlineStatus = useOnlineStatus();
  if (onlineStatus == false)
    return (
      <h1>Looks like you're offline! Please check your internet connection.</h1>
    );

  if (resInfo == null) return <Shimmer />;

  // Restaurant Details
  const {
    name,
    avgRatingString,
    cloudinaryImageId,
    costForTwoMessage,
    cuisines,
    isOpen,
    totalRatingsString,
    sla,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const { slaString: deliveryTime } = sla || {};

  

  // Menu List (Recommended)
  const menuList =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.itemCards;

  return (
    <div>
      {/* Restaurant Details */}
      <div className="resName">
        <div className="resDetails">
          <h1>{name}</h1>
          <p>{cuisines?.join(", ")}</p>
          <p>
            Ratings: {avgRatingString || "Not Rated Yet"} ({totalRatingsString})
          </p>
          <p>{costForTwoMessage}</p>
          <p>{deliveryTime}</p>
        </div>
        <div className="resImage">
          <img
            src={`${CDN_URL}${cloudinaryImageId}`}
            alt={name}
            className="restaurant-image"
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="resMenu">
        <h2>Menu ({menuList.length})</h2>
        <ul>
          {menuList?.map((item, index) => {
            const {
              name,
              description,
              id,
              imageId,
              price,
              defaultPrice,
              aggregatedRating,
            } = item?.card?.info || {};

            return (
              <li key={id || index} className="menu-item">
                <div className="menu-item-details">
                  <h3>{name}</h3>
                  <p>{description || "No description available"}</p>
                  <p>Price: ₹{price ? price / 100 : defaultPrice / 100}</p>
                  {aggregatedRating && (
                    <p>
                      Rating: {aggregatedRating?.rating || "No Ratings Yet"} (
                      {aggregatedRating?.ratingCount || 0} reviews)
                    </p>
                  )}
                </div>
                {imageId && (
                  <img
                    src={`${CDN_URL}${imageId}`}
                    alt={name}
                    className="menu-item-image"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
