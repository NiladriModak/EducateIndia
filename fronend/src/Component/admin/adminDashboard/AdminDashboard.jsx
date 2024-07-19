import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Layout";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  confirmPendingClasses,
  getAllPendingClasses,
  getUserAdmin,
} from "../../../actions/AdminAction";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loading from "../../Loading/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AdminDashboard() {
  const pieChartRef = useRef(null);
  const dispatch = useDispatch();
  const { pendingClasses, loading } = useSelector(
    (state) => state.pendingClasses
  );
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const [disable, setDisable] = useState(false);
  const handleConfirm = async (className, subjectName, teacherId) => {
    const classNames = [[className, subjectName]];
    setDisable(true);
    await dispatch(
      confirmPendingClasses(classNames, teacherId, className, subjectName)
    );
    setDisable(false);
  };
  useEffect(() => {
    dispatch(getAllPendingClasses());
    dispatch(getUserAdmin());
  }, [dispatch, disable]);

  const pieData = {
    labels: ["Teachers", "Students"],
    datasets: [
      {
        label: "Informations about sites",
        data: [4, 5],
        backgroundColor: ["rgba(75,192,192,0.4)", "rgba(192,75,75,0.4)"],
        borderColor: ["rgba(75,192,192,1)", "rgba(192,75,75,1)"],
      },
    ],
  };

  const chartContainerStyle = {
    width: "500px",
    height: "500px",
    padding: "2vmax",
    // boxShadow: "1px 1px 1px 1px grey",
    overflow: "auto",
    marginBottom: "2rem",
    overflow: "hidden",
    justifyContent: "center",
  };

  return (
    <Layout>
      {loading || userLoading ? (
        <Loading />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <div style={chartContainerStyle}>
            <h2>Stats</h2>
            <Pie options={{ radius: "60%" }} data={pieData} ref={pieChartRef} />
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
                <h4>
                  Name:
                  <span>
                    <p>{user && user.admin?.name}</p>
                  </span>
                </h4>
                <h4>
                  Email:
                  <span>
                    <p>{user && user.admin?.email}</p>
                  </span>
                </h4>
                <h4>
                  Type:
                  <span>
                    <p>Admin</p>
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
                  src="/teacher2.png"
                  alt="profile"
                />
              </div>
            </div>
          </div>
          <div style={{ width: "80%", marginBottom: "40px" }}>
            <h2>All Pending Class Request</h2>
            <div style={{ width: "100%" }}>
              <Paper style={{ width: "100%", overflow: "auto" }}>
                <TableContainer style={{ maxHeight: "100%" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold", width: "10%" }}>
                          Teacher Id
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", width: "25%" }}>
                          Class Name
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", width: "25%" }}>
                          Subject Name
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", width: "18%" }}>
                          Confirm/Reject
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingClasses &&
                        pendingClasses.allPendingClasses?.map((teacher) => {
                          return (
                            <TableRow key={teacher.id}>
                              <TableCell
                                style={{ fontWeight: "bold", width: "10%" }}
                              >
                                {teacher.teacherId}
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", width: "25%" }}
                              >
                                {teacher.className}
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", width: "25%" }}
                              >
                                {teacher.subjectName}
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", width: "18%" }}
                              >
                                <div style={{ display: "flex" }}>
                                  <Button
                                    variant="contained"
                                    style={{ backgroundColor: "black" }}
                                    disabled={disable}
                                    onClick={() =>
                                      handleConfirm(
                                        teacher.className,
                                        teacher.subjectName,
                                        teacher.teacherId
                                      )
                                    }
                                  >
                                    Confirm
                                  </Button>
                                  <Button
                                    variant="contained"
                                    // disabled={disable}
                                    style={{
                                      margin: "0 2vmax",
                                      backgroundColor: "red",
                                    }}
                                    // onClick={() =>
                                    //   handleConfirm(
                                    //     teacher.name,
                                    //     teacher.email,
                                    //     teacher.password,
                                    //     false
                                    //   )
                                    // } // Assuming you have a handleReject function
                                  >
                                    Reject
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                  {/* {pendingClasses && present === 0 && (
                      <h1 style={{ textAlign: "center" }}>
                        No Pending Request
                      </h1>
                    )} */}
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AdminDashboard;
