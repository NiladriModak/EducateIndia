import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import Button from "@mui/material/Button";
import "./teacher.css";
import { useNavigate, useParams } from "react-router-dom";
function TeacherDiv(props) {
  const { teachers, loading, error } = useSelector((state) => state.teachers);
  const navigator = useNavigate();
  const { classId, subjectId } = useParams();
  const joinClass = (id) => {
    navigator(`${id}`);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="ClassDiv1">
            {props.teacher.name}

            <img src="/teacher1.png" style={{ width: "90px" }}></img>
            <div className="teacherButtons">
              <Button
                color="success"
                size="small"
                variant="contained"
                onClick={() => {
                  joinClass(props.teacher.id);
                }}
              >
                Join Class
              </Button>
              <Button size="small" variant="contained">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeacherDiv;
