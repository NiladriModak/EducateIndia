import React, { useEffect } from "react";
import ClassDiv from "./ClassDiv";
import { useDispatch, useSelector } from "react-redux";
import { getClassDetails } from "../../../actions/ClassAction";
import Loading from "../../Loading/Loading";

function ClassDetails() {
  const dispatch = useDispatch();
  const { loading, classDetails } = useSelector((state) => state.classDetails);
  useEffect(() => {
    dispatch(getClassDetails());
  }, [dispatch]);

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
          }}
        >
          <h1
            style={{
              fontFamily: "'Coming Soon', cursive",
              borderBottom: "2.5px solid black",
              padding: "1vmax 2vmax",
            }}
          >
            All Classes
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
            {classDetails?.uniqueClasses?.map((e) => (
              <ClassDiv
                data={classDetails}
                key={e}
                classid={e}
                class={classDetails?.classDetails.e}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ClassDetails;
