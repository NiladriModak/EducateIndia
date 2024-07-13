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
  const { loading, error, classId } = useSelector((state) => state.classId);
  const [storeUpdated, setStoreUpdated] = useState(false);
  const handleClick = async () => {
    try {
      var too = props.class;
      const className = `class ${too}`;
      await dispatch(getClassId(className));
      setStoreUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Log classId and loading whenever they change
    if (storeUpdated && localStorage.getItem("type") === "student") {
      if (classId.name === `class ${props.class}`) {
        navigator(`/classes/${classId.id}/subjects`);
        dispatch(getSubjects(classId.id));
      }
    } else if (storeUpdated && localStorage.getItem("type") === "teacher") {
      if (classId.name === `class ${props.class}`) {
        navigator(`/classes/${classId.id}/selectedSubjects`);
        // dispatch(getSubjects(classId.id));
      }
    }
  }, [classId, loading, storeUpdated]);

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
          onClick={handleClick}
        >
          <div className="ClassDiv1">
            <div>
              <img src="/Books.webp" style={{ width: "100%" }}></img>
            </div>
            <div>Class {props.class}</div>
            <div>Students: Teachers:</div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClassDiv;
