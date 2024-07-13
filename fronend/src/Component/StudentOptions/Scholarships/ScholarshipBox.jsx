import React from "react";
import LinkIcon from "@mui/icons-material/Link";
function ScholarshipBox(props) {
  return (
    <div
      style={{
        border: "1px solid black",
        boxShadow: "1px 1px 1px 1px grey",
        width: "33vmax",
        minWidth: "350px",
        marginTop: "2vmax",
        borderRadius: "2vmax",
        padding: "2vmax",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ backgroundSize: "cover", width: "25vmax", height: "15vmax" }}
          src={props.data.image}
          alt="scholarships"
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "2vmax",
          }}
        >
          <h2>
            <span>{props.data.title}</span>
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>Catagories: </h3>
          <p>{props.data?.category?.map((j) => j)}</p>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>{props.data?.author}</h3>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>Created at:</h3>
          <p>{props.data?.published}</p>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <LinkIcon sx={{ color: "blueviolet" }} />
          <a href={props.data?.url} target="_blank">
            {props.data?.url}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipBox;
