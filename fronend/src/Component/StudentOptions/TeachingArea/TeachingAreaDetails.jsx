import React from "react";
import TeachingAreaDiv from "./TeachingAreaDiv";

function TeachingAreaDetails() {
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{
          fontFamily: "'Coming Soon', cursive",
          borderBottom: "2.5px solid black",
          padding: "1vmax 2vmax",
        }}
      >
        Teaching Area
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TeachingAreaDiv />
      </div>
    </div>
  );
}

export default TeachingAreaDetails;
