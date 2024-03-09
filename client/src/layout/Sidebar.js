import React from "react";
import {
  IoHome,
  IoStatsChartSharp,
  IoCard,
  IoKey,
  IoBuild,
  IoPerson,
  IoRocketSharp,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="">
        <div className="card-body">
          <ul>
            <li className={`sidebar-menu ${isActive("/home") ? "active" : ""}`}>
              <span
                className={`sidebar-icon ${isActive("/home") ? "active" : ""}`}
              >
                <IoHome size={15} />
              </span>{" "}
              <Link to="/home">Dashboard</Link>
            </li>
            <li
              className={`sidebar-menu ${isActive("/sphere") ? "active" : ""}`}
            >
              <span
                className={`sidebar-icon ${
                  isActive("/sphere") ? "active" : ""
                }`}
              >
                <IoStatsChartSharp size={15} />
              </span>{" "}
              <Link to="/sphere">Tables</Link>
            </li>
            <li className={`sidebar-menu ${isActive("/") ? "active" : ""}`}>
              <span className={`sidebar-icon ${isActive("/") ? "active" : ""}`}>
                <IoCard size={15} />
              </span>{" "}
              Biling
            </li>
            <li className={`sidebar-menu ${isActive("/") ? "active" : ""}`}>
              <span className={`sidebar-icon ${isActive("/") ? "active" : ""}`}>
                <IoBuild size={15} />
              </span>{" "}
              RTL
            </li>
            <h6 className="my-3">Account Pages</h6>
            <li className={`sidebar-menu ${isActive("/") ? "active" : ""}`}>
              <span className={`sidebar-icon ${isActive("/") ? "active" : ""}`}>
                <IoPerson size={15} />
              </span>{" "}
              Profile
            </li>
            <li className={`sidebar-menu ${isActive("/") ? "active" : ""}`}>
              <span className={`sidebar-icon ${isActive("/") ? "active" : ""}`}>
                <IoKey size={15} />
              </span>{" "}
              Sign In
            </li>
            <li className={`sidebar-menu ${isActive("/") ? "active" : ""}`}>
              <span className={`sidebar-icon ${isActive("/") ? "active" : ""}`}>
                <IoRocketSharp size={15} />
              </span>{" "}
              Sign Up
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
