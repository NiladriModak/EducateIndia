// components/Layout.js
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./StudentOptions/Classes/Class.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className="layout"
      style={{
        display: "flex",
        height: windowWidth > 700 ? "100vh" : "100%",
        flexDirection: windowWidth < 700 ? "column" : "row",
      }}
    >
      {windowWidth <= 700 && (
        <button
          style={{
            padding: "1vmax",
            color: "white",
            backgroundColor: "black",
          }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <CloseIcon /> : <KeyboardArrowDownIcon />}
        </button>
      )}
      {windowWidth <= 700 && isSidebarOpen && (
        <div className="SideBar" style={{ height: "fitContent" }}>
          <Sidebar />
        </div>
      )}
      {windowWidth > 700 && (
        <div className="SideBar" style={{ height: "fitContent" }}>
          <Sidebar />
        </div>
      )}
      <div className="AccountDiv">{children}</div>
    </div>
  );
};

export default Layout;
