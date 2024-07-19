import React, { useEffect, useState } from "react";
import "./Class.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../../actions/ClassAction";
import Loading from "../../Loading/Loading";
import { getSubjects } from "../../../actions/SubjectAction";
function ClassDiv(props) {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  // const { loading, error, classId } = useSelector((state) => state.classId);
  const [storeUpdated, setStoreUpdated] = useState(false);
  const handleClick = async () => {
    try {
      navigator(`/classes/${props.classid}/subjects`);
    } catch (error) {
      error;
    }
  };
  const classId = props.classid;
  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleClick}
      >
        <div className="ClassDiv1">
          <div>
            <img src="/classroom.png" style={{ width: "100%" }}></img>
          </div>
          <h2>{props.data.classDetails[classId][0]}</h2>
          <h4>
            Subjects:{props.data.subjectByClass[classId].length} Teachers:
            {props.data.teacherByClass[classId].length}
          </h4>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default ClassDiv;
