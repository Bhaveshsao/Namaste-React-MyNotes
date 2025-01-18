import React from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props){
    super(props);
    console.log("Parent constructor");
  }
  componentDidMount(){
    console.log("Parent Component Did Mount");
  }
  render(){
    console.log("Parent Render")
    return (
      <>
      <div style={styles.container}>
        <h1 style={styles.header}>About Us</h1>
        <p style={styles.paragraph}>
          Welcome to <strong>Namaste React</strong>, your ultimate guide to mastering React! We are dedicated to providing high-quality, hands-on tutorials and resources for developers of all levels.
        </p>
        <p style={styles.paragraph}>
          Our mission is to make learning React an enjoyable and rewarding experience. Whether you're a beginner taking your first steps or an experienced developer looking to sharpen your skills, our tutorials, projects, and examples are tailored to help you succeed.
        </p>
        <h2 style={styles.subHeader}>What We Offer</h2>
        <ul style={styles.list}>
          <li>Comprehensive React tutorials</li>
          <li>Real-world projects and examples</li>
          <li>In-depth explanations of React concepts</li>
          <li>Guidance on best practices and advanced techniques</li>
        </ul>
        <p style={styles.paragraph}>
          Join us on this journey to become a React expert and build powerful, modern web applications with confidence. Happy coding!
        </p>
      </div>
      {/* <User name="Bhavesh Sao(Function)" location="Bilaspur" contact="@be.with.bhavesh"/> */}
      <UserClass name="Bhavesh Sao(Class)" location="Bilaspur" contact="@be.with.bhavesh" />
      </>
    );
  }
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "36px",
    color: "#333",
    textAlign: "center",
  },
  paragraph: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "24px",
    color: "#444",
    marginBottom: "10px",
  },
  list: {
    listStyleType: "disc",
    marginLeft: "20px",
    color: "#666",
  },
};

export default About;
