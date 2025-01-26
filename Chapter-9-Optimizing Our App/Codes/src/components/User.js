import React, { useState } from "react";

const User = (props) => {
    const { name, location, contact } = props;
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(100);
    return (
        <div className="user-card">
            <h1>Count = {count}</h1>
            <h1>Count2 = {count2}</h1>
            <button onClick={()=>{
                setCount(count+1);
                setCount2(count2-1);
            }}>Change Count</button>
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: {contact}</h4>
        </div>
    );
};

export default User;