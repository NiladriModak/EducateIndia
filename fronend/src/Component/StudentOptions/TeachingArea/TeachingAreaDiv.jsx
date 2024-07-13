import { Button } from "@mui/material";
import React, { useState } from "react";
import "./teachingArea.css";
import Announcements from "./Announcements";
import Notes from "./Notes";
import Videos from "./Videos";
import Test from "./Test";
function TeachingAreaDiv() {
  const [option, setOption] = useState("Announcements");
  const renderComponent = () => {
    if (option === "Announcements") {
      return <Announcements />;
    } else if (option === "Notes") {
      return <Notes />;
    } else if (option === "Videos") {
      return <Videos />;
    } else {
      return <Test />;
    }
  };
  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="header"
        style={{
          width: "100%",
          margin: "2vmax 0",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgb(46 147 191)",
          overflow: "auto",
          color: "white",
          padding: "1vmax",
          border: "3px solid navy-blue",
        }}
      >
        <h3 onClick={() => setOption("Announcements")}>Announcements</h3>
        <h3 onClick={() => setOption("Notes")}>Notes</h3>
        <h3 onClick={() => setOption("Videos")}>Videos</h3>
        <h3 onClick={() => setOption("Test")}>Test</h3>
      </div>
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          border: "2px solid black",
          padding: "2vmax",
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
}

export default TeachingAreaDiv;
