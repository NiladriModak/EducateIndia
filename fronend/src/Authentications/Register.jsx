import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { studentRegister, teacherRegister } from "../actions/AuthAction";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Component/Loading/Loading";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Student");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isStudent } = useSelector((state) => state.student);
  const handleRegisterClick = async (e) => {
    console.log(type);

    if (type === "Student") {
      try {
        if (!name || !email || !password) {
          toast.error("Please enter all details");
          return;
        }
        const config = { headers: { "Content-Type": "application/json" } };
        // console.log(email);
        const { data } = await axios.get(
          "/api/checkPayment",
          { params: { email: email } },
          config
        );
        // console.log(data);
        if (data.success === false) {
          toast.error("Please pay to continue signing up");
          return;
        }
        await dispatch(studentRegister(name, email, password));
        if (isStudent) {
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else if (type === "Teacher") {
      try {
        if (!name || !email || !password) {
          toast.error("Please enter all credentials");
          return;
        }
        dispatch(teacherRegister(name, email, password));
      } catch (error) {
        toast.error(error.message);
      }
    }
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
    <>
      {loading ? (
        <Loading />
      ) : (
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
            <h2>Sign Up As A Student</h2>
            <TextField
              required
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
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
                  onClick={(e) => {
                    setType(option.value);
                  }}
                >
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={handleRegisterClick}>
              SignUp
            </Button>
            <div className="options">
              <Link to="/login">Login</Link>
              <Link to="/payment">Make Payment</Link>
            </div>
          </Box>
        </div>
      )}
    </>
  );
}

export default Register;
