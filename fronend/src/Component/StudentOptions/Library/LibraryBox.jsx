import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
function LibraryBox(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          src={props.data?.formats["image/jpeg"]}
          alt="scholarships"
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "2vmax",
          }}
        >
          <h1>
            <span>{props.data.title}</span>
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>Authors: </h3>
          <p>{props.data?.authors?.map((j) => j.name)}</p>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>Copyright:</h3>
          <p>false</p>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "1vmax",
          }}
        >
          <h3>Download Count:</h3>
          <p>{props.data?.download_count}</p>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: "1vmax",
          }}
        >
          <h3>Subject:</h3>
          <button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Subjects
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {props.data?.subjects?.map((sub) => (
              <MenuItem> {sub}</MenuItem>
            ))}
          </Menu>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            overflow: "hidden",
          }}
        >
          Text:
          <LinkIcon sx={{ color: "blueviolet" }} />
          <a href={props.data?.formats["text/html"]} target="_blank">
            {props.data?.formats["text/html"]}
          </a>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            overflow: "hidden",
          }}
        >
          EBook:
          <LinkIcon sx={{ color: "blueviolet" }} />
          <a
            href={props.data?.formats["application/x-mobipocket-ebook"]}
            target="_blank"
          >
            {props.data?.formats["application/x-mobipocket-ebook"]}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LibraryBox;
