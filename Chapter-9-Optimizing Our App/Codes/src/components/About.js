import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent constructor");
  }
  componentDidMount() {
    console.log("Parent Component Did Mount");
  }
  
  render() {
    console.log("Parent Render");
    return (
      <div className="about-container">
        <h1>About Us</h1>
        <h3>Welcome to Namaste React</h3>
        <div className="user-wrapper">
          <UserClass />
        </div>
      </div>
    );
  }
}

export default About;
