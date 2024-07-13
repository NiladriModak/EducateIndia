import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
// import ClassDetails from "./ClassDetails";
import "../../StudentOptions/Classes/Class.css";
import EnrolledClassesDiv from "./EnrolledClassesDiv";
import EnrolledClassesDetails from "./EnrolledClassesDetails";
import Layout from "../../Layout";
function EnrolledClasses() {
  return (
    <Layout className="MainDiv">
      <EnrolledClassesDetails />
    </Layout>
  );
}

export default EnrolledClasses;
