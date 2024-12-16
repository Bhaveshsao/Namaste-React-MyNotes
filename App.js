import React from "react";
import ReactDOM from "react-dom/client";

// const span = <span>This is a span tag</span>;

// const heading = (
//   <h1 id="heading" className="head" tabIndex="5">
//     {span}
//     <h1>Namaste React using JSX Syntax</h1>
//   </h1>
// );

// const TitleComponent = () => (
//   <h1 id="heading" className="head" tabIndex="5">
//     Title Component
//   </h1>
// );

// const HeadingComponent = () => (
//   <div id="container">
//     {heading}
//     <TitleComponent />
//     <h1 id="heading" className="head" tabIndex="5">
//       Namaste React Functional Component
//     </h1>
//   </div>
// );

const TitleComponent = ({ children }) => (
    <div>
        <h1>Hello from Title Component</h1>
        {children}
    </div>
);

const ChildComponent = () => <h2>Hello from Child Component</h2>;

const App = () => {
    const jsxVariable = <h3>This is JSX from a variable</h3>;

    return (
        <div>
            {/* Using TitleComponent as a variable */}
            {jsxVariable}

            {/* Using TitleComponent as a self-closing component */}
            <TitleComponent />

            {/* Using TitleComponent as a wrapper with children */}
            <TitleComponent>
                <ChildComponent />
            </TitleComponent>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);



