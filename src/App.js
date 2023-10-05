import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
// import Profile from "./components/pages/Profile";
import ResponsiveAppBar from "./components/pages/ResponsiveAppBar";
import Auth from "./components/signUp/Auth";
import ProjectPage from "./components/pages/ProjectPage";
import ProjectToDoList from "./components/pages/ProjectToDoList";

function App() {
  return (
    <div className="App">
      <Auth>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Profile/:id" element={<Profile />} /> */}
          <Route path="/project" element={<ProjectPage />} />
          <Route path="project/:id" element={<ProjectToDoList />} />
        </Routes>
      </Auth>
    </div>
  );
}

export default App;
