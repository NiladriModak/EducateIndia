import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledClassesAction } from "../../../actions/TeacherAction";
import EnrolledClassesDiv from "./EnrolledClassesDiv";
import Loading from "../../Loading/Loading";

function EnrolledClassesDetails() {
  const { loading, enrolledClasses } = useSelector(
    (state) => state.enrolledClasses
  );
  const allback = async () => {
    await dispatch(getEnrolledClassesAction());
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      enrolledClasses === undefined ||
      !enrolledClasses ||
      Object.keys(enrolledClasses).length === 0
    )
      allback();
  }, [enrolledClasses, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // height: "100vh",
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
            Classes Enrolled
          </h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {enrolledClasses && console.log(enrolledClasses.data)}
            {enrolledClasses &&
            enrolledClasses.data &&
            enrolledClasses.data.length === 0 ? (
              <h2>You are not enrolled to any class</h2>
            ) : (
              enrolledClasses &&
              enrolledClasses.data &&
              enrolledClasses.data.map((c, i) => (
                <EnrolledClassesDiv key={i} class={c} />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EnrolledClassesDetails;
