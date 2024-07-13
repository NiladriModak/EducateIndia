import React, { useEffect, useState } from "react";
import "./Account.css";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "./Dashboard";
import TeacherDashboard from "../teacherComponents/TeacherDashboard/TeacherDashboard";
import Login from "../../Authentications/Login";
import Layout from "../Layout";
function Account() {
  return (
    <Layout>
      {localStorage.getItem("type") === "teacher" ? (
        <TeacherDashboard />
      ) : (
        localStorage.getItem("type") == "student" && <Dashboard />
      )}
    </Layout>
  );
}

export default Account;
