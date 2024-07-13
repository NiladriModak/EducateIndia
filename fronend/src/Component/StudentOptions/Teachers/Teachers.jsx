import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Classes/Class.css";
import Sidebar from "../../Sidebar/Sidebar";
import TeacherDetails from "./TeacherDetails";
import Layout from "../../Layout";

function Teachers() {
  return (
    <Layout className="MainDiv">
      <TeacherDetails />
    </Layout>
  );
}

export default Teachers;
