import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../../actions/SubjectAction";
import SubjectDiv from "./SubjectDiv";
import Loading from "../../Loading/Loading";

function SubjectDetails() {
  const { subjects, loading, error } = useSelector((state) => state.subjects);
  const { loading: classLoading, classDetails } = useSelector(
    (state) => state.classDetails
  );
  const dispatch = useDispatch();
  const { classId } = useParams();
  const allback = async () => {
    await dispatch(getSubjects(classId));
  };
  useEffect(() => {
    if (subjects === undefined) allback();
  }, [dispatch, subjects]);

  return (
    <>
      {loading || classLoading ? (
        <Loading />
      ) : (
        <div
          style={{
            color: "black",
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
            }}
          >
            Subjects
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
            {subjects &&
              subjects.map((c, i) => (
                <SubjectDiv
                  key={i}
                  subject={c}
                  noTeachers={classDetails.teacherByClass[classId].length}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SubjectDetails;
