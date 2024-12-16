import React from "react";
import ReactDOM from "react-dom/client";

const span = <span>This is a span tag</span>;

const heading = (
  <h1 id="heading" className="head" tabIndex="5">
    {span}
    <h1>Namaste React using JSX Syntax</h1>
  </h1>
);

const TitleComponent = () => (
  <h1 id="heading" className="head" tabIndex="5">
    Title Component
  </h1>
);

const HeadingComponent = () => (
  <div id="container">
    {heading}
    <TitleComponent />
    <h1 id="heading" className="head" tabIndex="5">
      Namaste React Functional Component
    </h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);
