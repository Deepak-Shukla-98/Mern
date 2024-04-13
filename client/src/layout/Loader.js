import React from "react";
import duck from "../asset/duck.gif";

const Loader = ({ display = "none" }) => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        zIndex: 999999,
        display: display,
        placeContent: "center",
      }}
      id="spinner"
    >
      <img src={duck} alt="duck" height={"100%"} width={"40%"} />
    </div>
  );
};

export default Loader;
