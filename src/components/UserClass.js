import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Bhavesh",
        location: "Bilaspur",
      }
    };
    console.log('Child Constructor');
  }
  async componentDidMount(){
    let data = await fetch("https://api.github.com/users/Bhaveshsao");
    let json = await data.json();
    this.setState({
      userInfo: json,
    });
    console.log('Child Component Did Mount');
  }
  componentDidUpdate(){
    console.log('Child Component Did Update');
  }
  componentWillUnmount(){
    console.log('Child Component will Unmount');
  }
  render() {
    console.log('Child Component Render');
    const { name, avatar_url, location, html_url} = this.state.userInfo;
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name: {name}</h2>
        <h4>Location: {location}</h4>
        <h4>Contact: {html_url}</h4>
      </div>
    );
  }
}

export default UserClass;
