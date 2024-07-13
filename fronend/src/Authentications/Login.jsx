import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { studentLogin } from "../actions/AuthAction";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Student");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isStudent } = useSelector((state) => state.student);
  const handleLoginClick = async (e) => {
    console.log(type);

    if (type === "Student") {
      try {
        if (!email || !password) {
          toast.error("Please enter all details");
          return;
        }
        const config = { headers: { "Content-Type": "application/json" } };
        console.log(email);
        const { data } = await axios.get(
          "/api/checkPayment",
          { params: { email: email } },
          config
        );
        console.log(data);
        if (data.success === false) {
          toast.error("Please pay to continue logging in");
          return;
        }
        await dispatch(studentLogin(email, password));
        if (localStorage.getItem("type") === "student") {
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else if (type === "Teacher") {
      try {
        if (!email || !password) {
          toast.error("Please enter your credentials to login");
          return;
        }
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
          "/api/teacherLogin",
          { email, password },
          config
        );
        if (data.success === false) {
          toast.error(data.message);
          return;
        }
        console.log(data);
        if (data.success === true) {
          console.log(data.token);

          localStorage.setItem("token", data.token);
          localStorage.setItem("type", "teacher");
          localStorage.setItem("teacherId", data.teacher.id);
          navigate("/teacherDashboard");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    // e.preventDefault();
  };

  const options = [
    {
      label: "Student",
      value: "Student",
    },
    {
      label: "Teacher",
      value: "Teacher",
    },
    {
      label: "Admin",
      value: "Admin",
    },
  ];
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://theacademicinsights.com/wp-content/uploads/2021/10/education-in-21st-century.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "35vmax",
          // border: "1px solid green",
          padding: "15px",
          "& .MuiTextField-root": {
            margin: "10px 0", // Apply margin to TextField components
            // color: "white",
          },
          // border: "1px solid black",
          backgroundColor: "white",
          boxShadow: "5px 10px 18px #888888",
        }}
        className="RegisterBox"
      >
        <h2>Login</h2>
        <TextField
          required
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          select
          label="Select"
          defaultValue="Student"
          helperText="Please select your choice"
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={() => {
                setType(option.label);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleLoginClick}>
          Login
        </Button>
        <div className="options">
          <Link to="/studentRegister">Sign Up</Link>
          <Link to="/forgetPassword">Forget Password</Link>
        </div>
      </Box>
    </div>
  );
}

export default Login;
