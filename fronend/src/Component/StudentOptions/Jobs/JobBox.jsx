import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
function JobBox(props) {
  return (
    <div
      style={{
        border: "1px solid black",
        boxShadow: "1px 1px 1px 1px grey",
        width: "30vmax",
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
          style={{ backgroundSize: "cover", width: "25vmax" }}
          src="/job1.png"
          alt="job"
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // backgroundColor: "rgb(46 147 191)",
            // color: "white",
            borderRadius: "2vmax",
          }}
        >
          <h2>
            <span>{props.data.company_name}</span>
          </h2>
        </div>
        <h2
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          Title: {props.data.title}
        </h2>
        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>Job Types: </h3>
          <p>{props.data?.job_types?.map((j) => j)}</p>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>{props.data?.remote ? "Remote" : "Non Remote"}</h3>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>Tags:</h3>
          <p>
            {props.data?.tags?.map((r) => (
              <span>{r}</span>
            ))}
          </p>
        </div>
        <p style={{ display: "flex", marginTop: "1vmax 0" }}>
          <LocationOnIcon sx={{ color: "blue" }} />
          <span>{props.data?.location}</span>
        </p>
        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>Created at:</h3>
          <p>{new Date(props.data?.created_at * 1000).toLocaleDateString()}</p>
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

export default JobBox;
