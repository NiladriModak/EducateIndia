import React from "react";
import Loading from "../Component/Loading/Loading";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function UnprotectedRoute() {
  //   const { loading } = useSelector((state) => state.loginUser);

  //   if (loading) {
  //     return <Loading />;
  //   }

  if (
    localStorage.getItem("token") &&
    localStorage.getItem("type") === "student"
  ) {
    // console.log("Redirect to the login page if the user is not authenticated");
    return <Navigate to="/dashboard" />;
  } else if (
    localStorage.getItem("token") &&
    localStorage.getItem("type") === "teacher"
  ) {
    return <Navigate to="/teacherDashboard" />;
  } else if (
    localStorage.getItem("token") &&
    localStorage.getItem("type") === "admin"
  ) {
    return <Navigate to="/adminDashboard" />;
  }
  // console.log("If none of the above conditions are met, render the child components");
  return <Outlet />;
}

export default UnprotectedRoute;
