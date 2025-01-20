import React from "react";

const Contact = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Contact Us</h1>
      <p style={styles.paragraph}>
        We'd love to hear from you! If you have any questions, feedback, or inquiries, feel free to reach out to us using the form below or through the provided contact details.
      </p>
      <form style={styles.form}>
        <label style={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          style={styles.input}
        />

        <label style={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          style={styles.input}
        />

        <label style={styles.label} htmlFor="message">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Enter your message"
          style={styles.textarea}
        ></textarea>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      <div style={styles.contactInfo}>
        <h2 style={styles.subHeader}>Our Contact Details</h2>
        <p>Email: support@example.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 React Street, JavaScript City, Webland</p>
      </div>
    </div>
  );
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
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  label: {
    fontSize: "16px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "none",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  contactInfo: {
    marginTop: "20px",
  },
  subHeader: {
    fontSize: "24px",
    color: "#444",
    marginBottom: "10px",
  },
};

export default Contact;
