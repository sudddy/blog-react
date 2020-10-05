import React from "react";
import "./App.css";
import Routes from "./routes/route";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Roboto"]
  }
});
function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
