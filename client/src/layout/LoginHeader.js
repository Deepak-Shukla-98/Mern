import React from "react";
import { useSharedContext } from "../context/sharedContext";
import { useNavigate } from "react-router-dom";
import { HiMiniCube, HiUser, HiUserCircle, HiKey } from "react-icons/hi2";
import logo from "../asset/logo-creative-tim-black.svg";

const LoginHeader = () => {
  return (
    <header className="header" style={{ position: "fixed", width: "70%" }}>
      <div>
        <img src={logo} className="header-logo" />
        <b className="mx-2">PURITY UI DASHBOARD</b>
      </div>
      <div className="d-flex">
        <b className="d-flex align-items-center mx-3">
          <HiMiniCube className="mx-1" />
          DASHBOARD
        </b>
        <b className="d-flex align-items-center mx-3">
          <HiUser className="mx-1" /> PROFILE
        </b>
        <b className="d-flex align-items-center mx-3">
          <HiUserCircle className="mx-1" /> SING UP
        </b>
        <b className="d-flex align-items-center mx-3">
          <HiKey className="mx-1" /> SINGIN
        </b>
      </div>
      <button className="toggle-button">Free Donwload</button>
    </header>
  );
};

export default LoginHeader;
