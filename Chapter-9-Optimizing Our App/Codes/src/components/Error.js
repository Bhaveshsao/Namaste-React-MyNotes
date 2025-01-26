import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
    return (
      <div>
        <h1>Oops! Page Not Found</h1>
        <h3>Looks like you've hit a broken link!</h3>
        <h3>{err.status}: {err.statusText}</h3>
      </div>
    );
  };
  
  export default Error;
  