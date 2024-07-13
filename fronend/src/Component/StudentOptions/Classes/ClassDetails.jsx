import React from "react";
import ClassDiv from "./ClassDiv";
const cls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function ClassDetails() {
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "'Coming Soon', cursive",
          borderBottom: "2.5px solid black",
          padding: "1vmax 2vmax",
        }}
      >
        All Classes
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {cls && cls.map((c, i) => <ClassDiv key={i} class={c} />)}
      </div>
    </div>
  );
}

export default ClassDetails;
