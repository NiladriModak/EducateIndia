import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeachers } from "../../../actions/TeacherAction";
import TeacherDiv from "./TeacherDiv";

function TeacherDetails() {
  const { classId, subjectId } = useParams();
  const { teachers, loading, error } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  // const allback = async () => {
  //   await dispatch(getTeachers(classId, subjectId));
  // };
  useEffect(() => {
    classId, subjectId;
    dispatch(getTeachers(classId, subjectId));
  }, [classId, subjectId, dispatch]);
  return (
    <div
      style={{
        color: "white",
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
          color: "black",
        }}
      >
        Teachers
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
        {teachers &&
          teachers.teachers &&
          Array.isArray(teachers.teachers) &&
          teachers.teachers.map((c, i) => <TeacherDiv key={i} teacher={c} />)}
      </div>
    </div>
  );
}

export default TeacherDetails;
