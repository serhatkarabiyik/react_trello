import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
// import Profile from "./components/pages/Profile";
import ResponsiveAppBar from "./components/pages/ResponsiveAppBar";
import Auth from "./components/signUp/Auth";

function App() {
  return (
    <div className="App">
      <Auth>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Profile/:id" element={<Profile />} /> */}
        </Routes>
      </Auth>
    </div>
  );
}

export default App;
