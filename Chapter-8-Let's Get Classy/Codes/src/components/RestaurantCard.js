import React from "react";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { name, cuisines, avgRating, cloudinaryImageId, costForTwo, sla} = props.resData.info;
    return (
      <div className="res-card">
        <img className="res-logo" alt="res-logo" src={CDN_URL+cloudinaryImageId} />
        <h3>{name}</h3>
        <h4>{cuisines.join(', ')}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{sla.slaString}</h4>
      </div>
    );
  };

  export default RestaurantCard;