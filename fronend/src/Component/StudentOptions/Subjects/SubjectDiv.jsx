import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./subject.css";
import { useNavigate, useParams } from "react-router-dom";

function SubjectDiv(props) {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.subjects);

  const { classId } = useParams();
  const handleClick = async (id) => {
    try {
      navigator(`/classes/${classId}/subjects/${id}/teachers`);
    } catch (error) {
      console.log(error);
    }
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
            // backgroundColor: "blue",
          }}
        >
          <div
            className="SubjectDiv"
            onClick={() => handleClick(props.subject.id)}
          >
            <div>
              <img src="/Books.webp" style={{ width: "100%" }}></img>
            </div>
            <h2>{props.subject.subjectName} </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default SubjectDiv;
