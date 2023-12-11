import React from "react";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="">
        <div className="card-body" style={{ height: "100vh" }}>
          <div className="d-flex align-items-center justify-content-center">
            Side Bar
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
