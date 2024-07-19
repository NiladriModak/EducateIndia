import React, { useEffect, useRef } from "react";
import { getDetails, getUserTeacher } from "../../../actions/TeacherAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TeacherDashboard() {
  const dispatch = useDispatch();
  const { allDetails, loading } = useSelector((state) => state.allDetails);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(getDetails());
    dispatch(getUserTeacher());
  }, [dispatch]);

  const getData = () => {
    if (!allDetails) return [];
    return [
      allDetails.numberOfTest,
      allDetails.numberOfNotes,
      allDetails.numberOfVideos,
    ];
  };

  const lineData = {
    labels: ["Test", "Notes", "Videos"],
    datasets: [
      {
        label: "Items by Teacher",
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
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              // marginBottom: "2rem",
              width: "550px",
              height: "fit-content",
              padding: "2vmax",
              // boxShadow: "1px 1px 1px 1px grey",
              overflow: "auto",
            }}
          >
            <h1>Teachers Chart</h1>
            <Bar data={lineData} ref={chartRef} />
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
            <div>
              <div>
                <h4 style={{ display: "flex" }}>
                  Name:
                  <span>
                    <p>{user && user.teacher?.name}</p>
                  </span>
                </h4>
                <h4 style={{ display: "flex" }}>
                  Email:
                  <span>
                    <p>{user && user.teacher?.email}</p>
                  </span>
                </h4>
                <h4 style={{ display: "flex" }}>
                  Type:
                  <span>
                    <p>Teacher</p>
                  </span>
                </h4>
                <h4 style={{ display: "flex" }}>
                  Phone Number:
                  {/* <span>
                  <p>{student && student.student?.name}</p>
                </span> */}
                </h4>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <img
                  style={{
                    width: "15vmax",
                  }}
                  src="/teacher2.png"
                  alt="profile"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              margin: "2vmax",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Students proficiency</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "5vmax",
                border: "1px solid black",
                borderRadius: "1vmax",
                backgroundColor: "violet",
                color: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    width: "19%",
                    height: "100%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  Title
                </h3>
                <h3
                  style={{
                    width: "28%",
                    height: "100%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  Date
                </h3>
                <h3
                  style={{
                    width: "24%",
                    height: "100%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  Duration
                </h3>
                <h3
                  style={{
                    width: "24%",
                    height: "100%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  Attendence
                </h3>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "5vmax",
                border: "1px solid black",
                borderRadius: "1vmax",
                backgroundColor: "rgb(86 178 218 / 70%)",
                color: "white",
                marginTop: ".5vmax",
              }}
            >
              {allDetails &&
                allDetails.numberOfStudentsGivenTest?.map((e) => (
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        width: "19%",
                        height: "100%",
                        textAlign: "center",
                        alignContent: "center",
                      }}
                    >
                      {e.test?.title}
                    </h4>
                    <h4
                      style={{
                        width: "28%",
                        height: "100%",
                        textAlign: "center",
                        alignContent: "center",
                      }}
                    >
                      {e.test?.date?.substr(0, 10)}
                    </h4>
                    <h4
                      style={{
                        width: "24%",
                        height: "100%",
                        textAlign: "center",
                        alignContent: "center",
                      }}
                    >
                      {e.test?.duration}
                    </h4>
                    <h4
                      style={{
                        width: "24%",
                        height: "100%",
                        textAlign: "center",
                        alignContent: "center",
                      }}
                    >
                      {e.numberOfStudents}
                    </h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeacherDashboard;
