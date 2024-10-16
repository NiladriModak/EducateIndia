import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
function Homeheader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "5px",
        backgroundColor: "rgb(46 147 191)",
        // border: "1px solid green",
        color: "white",
      }}
      className="Homeheader"
    >
      <img style={{ width: "7%" }} src="/logo1.png" alt="Eduacate India" />
      <img style={{ width: "15%" }} src="/logo.png" alt="Educate India" />
      <Link to="/">
        <h3>Home</h3>
      </Link>

      <Link to="/mission">
        <h3>Mission</h3>
      </Link>

      <Link to="/about">
        <h3>About</h3>
      </Link>
      {/* <Link to="/contributers">
        <h3>Contributers</h3>
      </Link> */}
    </div>
  );
}

export default Homeheader;
