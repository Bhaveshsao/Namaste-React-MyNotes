import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_URL } from "./constants";

const useRestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();

  const fetchData = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    setResInfo(json.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return resInfo;
};

export default useRestaurantMenu;
