import React, { useEffect, useState } from "react";
import Login from "./components/login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import LoginHeader from "./layout/LoginHeader";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import "./App.css";
import { useSharedContext } from "./context/sharedContext";
import Profile from "./components/Profile";
import SignUp from "./components/signup";
import Footer from "./layout/Footer";
import Sphere from "./components/sphere/sphere";
import Loader from "./layout/Loader";
import { withRouter } from "./context/withRouter";

function App(props) {
  const {
    state: { isAuthenticated },
    dispatch,
  } = useSharedContext();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (
      !["login", "signup"].includes(
        props.history.location.pathname.split("/")[1]
      )
    ) {
      checkAutoLogin(dispatch);
    }
  }, [props.history.location.pathname]);
  console.log({ isAuthenticated });
  if (isAuthenticated) {
    return (
      <div className="app">
        <Loader />
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Loader />
        <Routes>
          <Route path="*" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);

export function checkAutoLogin(dispatch) {
  const tokenDetailsString = localStorage.getItem("token");
  if (!tokenDetailsString) {
    dispatch({
      type: "SET_AUTH_STATE",
      paylod: false,
    });
    return;
  }
  dispatch({
    type: "SET_AUTH_STATE",
    payload: true,
  });
}
