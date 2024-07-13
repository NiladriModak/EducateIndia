import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import ClassDetails from "./ClassDetails";
import "./Class.css";
import Layout from "../../Layout";
function Class() {
  return (
    <Layout className="MainDiv">
      <ClassDetails />
    </Layout>
  );
}

export default Class;
