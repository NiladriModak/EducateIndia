import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
function Loading() {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <CircularProgress />
    </div>
  );
}

export default Loading;
