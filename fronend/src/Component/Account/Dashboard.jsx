import React, { useEffect, useRef } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestMarks } from "../../actions/ClassAction";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loading from "../Loading/Loading";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Dashboard() {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.student);
  const studentId = localStorage.getItem("studentId");
  const chartRef = useRef(null);
  const { allTestMarks, loading, error } = useSelector(
    (state) => state.allTestScore
  );

  useEffect(() => {
    if (studentId) {
      dispatch(getAllTestMarks(studentId));
    }
  }, [studentId, dispatch]);
  const data = [0];
  const getThreeTests = () => {
    var tdata = [];
    if (allTestMarks) {
      tdata = allTestMarks.studentTestMarks;
      tdata.sort((a, b) => {
        a.totalMarks / a.fullMarks - b.totalMarks / b.fullMarks;
      });
      return tdata?.map((t) => (
        <div
          style={{
            // border: "1px solid rgba(75,192,192,1)",
            boxShadow: "1px 1px 1px 1px rgba(75,192,192,1)",
            padding: "2vmax",
            overflow: "auto",
            borderRadius: "3vmax",
          }}
        >
          <h3>{t.test.title}</h3>
          <h4>{t.test.description}</h4>
          <h3>{t.test.date.substr(0, 10)}</h3>
          <h3 style={{ color: "green" }}>Marks Obtained : {t.totalMarks}</h3>
          <h3 style={{ color: "red" }}>Full Marks : {t.fullMarks}</h3>
        </div>
      ));
    } else {
      return <div>No Test Given </div>;
    }
  };
  const getData = () => {
    allTestMarks &&
      allTestMarks.studentTestMarks?.map((e) =>
        data.push(e.totalMarks / e.fullMarks)
      );

    return data;
  };
  const getLabel = () => {
    const lab = [0, 1, 2, 3];
    allTestMarks &&
      allTestMarks.studentTestMarks?.map((e, index) => lab.push(index + 4));
    return lab;
  };
  const lineData = {
    labels: getLabel(),
    datasets: [
      {
        label: "Score",
        data: getData(),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100%",
            overflow: "auto",
            padding: "4vmax",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Welcome {student && student.student?.name}</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                // marginBottom: "2rem",
                width: "500px",
                height: "fit-content",
                padding: "2vmax",
                // boxShadow: "1px 1px 1px 1px grey",
                overflow: "auto",
              }}
            >
              <h2>Progress Chart</h2>
              <Line data={lineData} ref={chartRef} />
            </div>
            <div
              style={{
                width: "500px",
                height: "fit-content",
                // boxShadow: "1px 1px 1px 1px grey",
                padding: "2vmax",
                overflow: "auto",
              }}
            >
              <h2>Profile Details</h2>
              <div style={{ display: "flex" }}>
                <div>
                  <h4>
                    Name:
                    <span>
                      <p>{student && student.student?.name}</p>
                    </span>
                  </h4>
                  <h4>
                    Email:
                    <span>
                      <p>{student && student.student?.email}</p>
                    </span>
                  </h4>
                  <h4>
                    Type:
                    <span>
                      <p>Student</p>
                    </span>
                  </h4>
                  <h4>
                    Phone Number:
                    {/* <span>
                  <p>{student && student.student?.name}</p>
                </span> */}
                  </h4>
                </div>
                <div>
                  <img
                    style={{
                      width: "15vmax",
                    }}
                    src="/books.png"
                    alt="profile"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                width: "500px",
                height: "fit-content",
                padding: "2vmax",
                overflow: "auto",
              }}
            >
              <h2>Top Three Tests</h2>
              <div>{getThreeTests()}</div>
            </div>
            <div
              style={{
                width: "500px",
                height: "fit-content",
                padding: "2vmax",
                overflow: "auto",
              }}
            >
              <h2>Top Three Jobs</h2>
              <div>{getThreeTests()}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
