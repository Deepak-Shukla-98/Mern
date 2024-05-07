import React from "react";
import { useSharedContext } from "../context/sharedContext";
import { useNavigate } from "react-router-dom";
import { RiSettings5Fill } from "react-icons/ri";
import { BiSolidBell } from "react-icons/bi";
import { HiUser } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import logo from "../asset/logo-creative-tim-black.svg";
import { VscThreeBars } from "react-icons/vsc";

const Header = ({ toggleSidebar }) => {
  const { dispatch } = useSharedContext();
  const navigate = useNavigate();
  const loguot = () => {
    dispatch({
      type: "SET_AUTH_STATE",
      paylod: false,
    });
    dispatch({
      type: "SET_LOGIN_USER",
      paylod: {},
    });
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header className="d-flex p-3 pb-0">
      <div className="d-flex justify-content-start mt-2 pt-2">
        <img src={logo} height={"20px"} width={"20px"} />
        <h6
          className="d-inline mx-2"
          style={{ fontSize: "13px", cursor: "default" }}
        >
          PURITY UI DASHBOARD
          <hr />
        </h6>
      </div>
      <div className="d-flex justify-content-center mt-2 pt-2 cursor-pointer">
        <VscThreeBars onClick={toggleSidebar} size={20} />
      </div>
      <div className="col d-flex justify-content-between align-items-start">
        <div className="mx-5">
          <span className="text-secondary">Pages </span>
          <span>/ Dashboard</span>
          <h6 className="mt-1">Dashboard</h6>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control mx-1 header-search"
            placeholder=" Type here..."
            style={{ position: "relative" }}
          />
          <FiSearch
            size={20}
            className="mx-2 text-secondary cursor-pointer"
            style={{ position: "absolute", right: "125px" }}
          />
          <BiSolidBell
            size={25}
            className="mx-2 text-secondary cursor-pointer"
          />
          <RiSettings5Fill
            size={25}
            className="mx-2 text-secondary cursor-pointer"
          />
          <div class="dropdown">
            <HiUser size={20} className="mx-2 text-secondary cursor-pointer" />
            <div class="dropdown-content sidebar-menu">
              <li className="py-1 px-3">Profile</li>
              <li className="py-1 px-3">Change Password</li>
              <li className="py-1 px-3" onClick={() => loguot()}>
                Logout
              </li>
            </div>
          </div>
        </div>
      </div>
      {/* <button className="toggle-button" >
        Logout
      </button> */}
    </header>
  );
};

export default Header;
