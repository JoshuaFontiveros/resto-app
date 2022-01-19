import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
const App = props => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
};
export default App;
