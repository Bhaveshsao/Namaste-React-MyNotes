import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count2: 100,
    };
    console.log("Child Constructor")
  }
  componentDidMount(){
    console.log("Child Component Did Mount");
  }
  render() {
    console.log("Child render")
    const { name, location, contact } = this.props;
    const { count, count2 } = this.state;
    return (
      <div className="user-card">
        <h1>Count = {count}</h1>
        <h1>Count2 = {count2}</h1>
        <button onClick={()=>{
            this.setState({
                count: count+1,
                count2: count2-1,
            });
        }}>Change Count</button>
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: {contact}</h4>
      </div>
    );
  }
}

export default UserClass;
