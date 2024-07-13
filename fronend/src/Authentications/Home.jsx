import React from "react";
import "./Home.css";
import Homeheader from "./Homeheader";
import Register from "./Register";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigator = useNavigate();
  const handlePayButton = () => {
    navigator("/payment");
  };

  const loginClick = () => {
    navigator("/login");
  };

  const handleTeacherReg = () => {
    navigator("/teacherRegister");
  };
  return (
    <div className="MainContainer">
      <Homeheader />
      <div className="Container">
        <div className="first">
          <img
            style={{ width: "100%", height: "100%" }}
            // src="/logo1.png"
            src={
              "https://theacademicinsights.com/wp-content/uploads/2021/10/education-in-21st-century.jpeg"
            }
            alt="Eduacate India"
          />
        </div>
        <div className="second">
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "1px 1px 1px 1px grey",
              padding: "3vmax",
              width: "70%",
              height: "70%",
            }}
          >
            <div style={{ fontFamily: "Courier New", marginBottom: "2vmax" }}>
              <h1>Educate India</h1>
              <h4 style={{ marginLeft: "3.5vmax" }}>The Key to Freedom</h4>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2>1</h2>
              <Button
                sx={{
                  margin: "1vmax",
                  fontSize: "1.2max",
                  fontWeight: "Bold",
                  cursor: "pointer",
                }}
                variant="outlined"
                onClick={handlePayButton}
              >
                Pay Rs 20 to Register as a Student
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2>2</h2>
              <Button
                sx={{
                  margin: "1vmax",
                  fontSize: "1.2max",
                  fontWeight: "Bold",
                  cursor: "pointer",
                }}
                variant="outlined"
                onClick={handleTeacherReg}
              >
                Teacher Registration
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2>3</h2>
              <Button
                sx={{
                  margin: "1vmax",
                  fontSize: "1.2max",
                  fontWeight: "Bold",
                  cursor: "pointer",
                }}
                variant="outlined"
                onClick={loginClick}
              >
                Login as Teacher/Student/Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
