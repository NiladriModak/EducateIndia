import React from "react";
import "./Sidebar.css";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ChatIcon from "@mui/icons-material/Chat";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import LogoutIcon from "@mui/icons-material/Logout";
function Sidebar() {
  const handleLogout = () => {
    if (localStorage.getItem("type") === "student") {
      localStorage.removeItem("studentId");
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      window.location.reload();

      return;
    }
    if (localStorage.getItem("type") === "teacher") {
      localStorage.removeItem("teacherId");
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      window.location.reload();
      return;
    }
    if (localStorage.getItem("type") === "admin") {
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      window.location.reload();
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        backgroundColor: "rgb(46 147 191)",
        color: "white",
        overflow: "auto",
        paddingBottom: ".8vmax",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: ".8vmax",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid white",
            margin: "1vmax",
            padding: "0.8vmax",
            width: "80%",
            color: "white",
          }}
        >
          <img style={{ width: "100%" }} src="/logo.png" />
        </div>
        <div>
          <Stack spacing={3}>
            {localStorage.getItem("type") === "student" ? (
              <Link
                to="/dashboard"
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <DashboardIcon sx={{ margin: "0 8px" }} />
                <h3>Dashboard</h3>
              </Link>
            ) : localStorage.getItem("type") === "teacher" ? (
              <Link
                to="/teacherDashboard"
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <DashboardIcon sx={{ margin: "0 8px" }} />
                <h3>Dashboard</h3>
              </Link>
            ) : (
              <Link
                to="/adminDashboard"
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <DashboardIcon sx={{ margin: "0 8px" }} />
                <h3>Dashboard</h3>
              </Link>
            )}
            {localStorage.getItem("type") === "student" ? (
              <Link
                to="/classes"
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <ClassIcon sx={{ margin: "0 8px" }} />
                <h3>Classes and Courses</h3>
              </Link>
            ) : localStorage.getItem("type") === "teacher" ? (
              <Link
                to="/enrolledClasses"
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <ClassIcon sx={{ margin: "0 8px" }} />
                <h3>Enrolled Classes</h3>
              </Link>
            ) : (
              <Link
                to="/verifyTeacher"
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <ClassIcon sx={{ margin: "0 8px" }} />
                <h3>Verify Teachers</h3>
              </Link>
            )}
            <Link
              to="/jobs"
              style={{
                display: "flex",
                textDecoration: "none",
                color: "white",
              }}
            >
              <WorkIcon sx={{ margin: "0 8px" }} />
              <h3>Jobs</h3>
            </Link>
            <Link
              to="/scholarships"
              style={{
                display: "flex",
                textDecoration: "none",
                color: "white",
              }}
            >
              <SchoolIcon sx={{ margin: "0 8px" }} />
              <h3>Scholarships</h3>
            </Link>
            <Link
              to="/library"
              style={{
                display: "flex",
                textDecoration: "none",
                color: "white",
              }}
            >
              <LibraryBooksIcon sx={{ margin: "0 8px" }} />
              <h3>Library</h3>
            </Link>
            {/* <Link
              to="/discuss"
              style={{
                display: "flex",
                textDecoration: "none",
                color: "white",
              }}
            >
              <ChatIcon sx={{ margin: "0 8px" }} />
              <h3>Discuss Section</h3>
            </Link> */}
            <Link
              to="/chatGpt"
              style={{
                display: "flex",
                textDecoration: "none",
                color: "white",
              }}
            >
              <TipsAndUpdatesIcon sx={{ margin: "0 8px" }} />
              <h3>ChatGPT</h3>
            </Link>
            {/* <Link to="/researchPapers">
            <h3>Research Papers</h3>
          </Link> */}
          </Stack>
        </div>
      </div>
      <div
        onClick={handleLogout}
        style={{ display: "flex", width: "80%", cursor: "pointer" }}
      >
        <LogoutIcon />
        <h3>Logout</h3>
      </div>
    </div>
  );
}

export default Sidebar;
