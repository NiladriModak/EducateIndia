import React, { useEffect, useState } from "react";
import TeachingAreaDetails from "./TeachingAreaDetails";
import Layout from "../../Layout";
function TeachingArea() {
  return (
    <Layout className="MainDiv">
      <TeachingAreaDetails />
    </Layout>
  );
}

export default TeachingArea;
