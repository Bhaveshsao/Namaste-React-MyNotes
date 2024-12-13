
const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child1" }, [
    React.createElement("h1", {}, "I am h1 tag inside child 1"),
    React.createElement("h2", {}, "I am h2 tag inside child 1"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I am h1 tag inside child 2"),
    React.createElement("h2", {}, "I am h2 taginside child 2"),
  ]),
]); 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
