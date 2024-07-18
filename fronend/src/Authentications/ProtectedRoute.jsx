import React from "react";
import Loading from "../Component/Loading/Loading";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === undefined
  ) {
    // console.log("Redirect to the login page if the user is not authenticated");
    return <Navigate to="/" />;
  }

  // console.log("If none of the above conditions are met, render the child components");
  return <Outlet />;
}

export default ProtectedRoute;
