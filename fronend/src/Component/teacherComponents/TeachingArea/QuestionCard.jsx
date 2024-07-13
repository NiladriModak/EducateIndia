import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function QuestionCard(props) {
  const handleDeleteQuestion = () => {
    props.onDelete(props.text);
  };
  return (
    <div
      style={{
        display: "flex",
        border: "2px solid black",
        padding: "1vmax",
        width: "100%",
        justifyContent: "space-between",
        margin: "1vmax",
      }}
    >
      <div
        style={{
          width: "88%",
          wordWrap: "break-word",
        }}
      >
        <h3 style={{ overflowWrap: "break-word" }}>{props.text}</h3>
        <h3> MARKS: {props.marks}</h3>
        <div>
          <h3>OPTIONS</h3>
          {props.options?.map((op, index) => (
            <p>
              {index} {op}
            </p>
          ))}
        </div>
      </div>
      <DeleteForeverIcon
        fontSize="large"
        onClick={handleDeleteQuestion}
        sx={{
          cursor: "pointer",
          color: "red",
          "&:hover": {
            color: "blue",
          },
        }}
      />
    </div>
  );
}

export default QuestionCard;
