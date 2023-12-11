import React, { useState } from "react";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginHeader from "./layout/LoginHeader";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import "./App.css";
import { useSharedContext } from "./context/sharedContext";
import Profile from "./components/Profile";
import SignUp from "./components/signup";
import Footer from "./layout/Footer";

function App() {
  const {
    state: { user, isAuthenticated },
  } = useSharedContext();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (isAuthenticated) {
    return (
      <div className="app">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {window.innerWidth > 550 ? <LoginHeader /> : ""}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
