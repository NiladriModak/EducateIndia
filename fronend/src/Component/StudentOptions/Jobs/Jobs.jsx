import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import JobDetails from "./JobDetails";
import "../Classes/Class.css";
import Layout from "../../Layout";
function Jobs() {
  return (
    <Layout>
      <JobDetails />
    </Layout>
  );
}

export default Jobs;
