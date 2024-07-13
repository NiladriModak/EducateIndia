import React from "react";
import Loading from "../../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
// import "../../StudentOptions/Classes/Class.css";
const loading = false;
function EnrolledClassesDiv(props) {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Link
          to={`${props.class.classId}/subject/${props.class.subjectId}/announcements`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
          }}
          // onClick={handleClick}
        >
          <div className="ClassDiv1" style={{ borderRadius: "5%" }}>
            <div>
              <img src="/pencil.png" style={{ width: "100%" }}></img>
            </div>
            <div>{props.class.class.name}</div>
            <div>
              <div>{props.class.subject.subjectName}</div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default EnrolledClassesDiv;
