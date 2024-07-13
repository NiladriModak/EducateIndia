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
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentTest, getTests } from "../../../actions/ClassAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

function Test() {
  var { classId, subjectId, teacherId } = useParams();
  const { test, loading, error } = useSelector((state) => state.tests);
  const { studentTest } = useSelector((state) => state.studentTest);

  const dispatch = useDispatch();
  const navigator = useNavigate();
  if (localStorage.getItem("type") === "teacher") {
    teacherId = localStorage.getItem("teacherId");
  }
  // console.log("test to check student", studentTest);

  const handleCreateTest = () => {
    navigator(
      `/enrolledClasses/${classId}/subject/${subjectId}/announcements/createTest`
    );
  };
  const viewTest = (testId) => {
    const role = localStorage.getItem("type");
    if (role === "teacher") {
      navigator(
        `/enrolledClasses/${classId}/subject/${subjectId}/announcements/viewTest-teacher/${testId}`
      );
    } else if (role === "student") {
      navigator(
        `/classes/${classId}/subject/${subjectId}/teacher/${teacherId}/announcements/viewTest-student/${testId}`
      );
    } else {
      navigator(`/`);
    }
  };
  useEffect(() => {
    dispatch(getTests(classId, subjectId, teacherId));
    localStorage.getItem("type") === "student" &&
      dispatch(getStudentTest(localStorage.getItem("studentId")));
  }, [classId, subjectId, teacherId]);
  const handleEnter = async (testId) => {
    navigator(
      `/classes/${classId}/subjects/${subjectId}/teachers/${teacherId}/test/${testId}/giveTest`
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>ALL TESTS</h1>
          {localStorage.getItem("type") === "teacher" ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: "black" }}
              onClick={handleCreateTest}
            >
              Create Test
            </Button>
          ) : (
            <></>
          )}
          <div
            style={{
              border: "3px solid black",
              overflow: "auto",
              maxHeight: "60vh",
              margin: "2vmax",
            }}
          >
            <div>
              <h2>CURRENT TESTS</h2>
            </div>
            <div style={{ width: "100%" }}>
              <Paper sx={{ width: "100%", overflow: "auto" }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader>
                    <TableHead>
                      {/* description name date createdBy link */}
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                          Writer
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                          Start
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "17%" }}>
                          Length
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "18%" }}>
                          Submit
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {test &&
                        test.currentTest &&
                        test.currentTest.map((test) => (
                          <TableRow key={test.id}>
                            <TableCell>{test.title}</TableCell>
                            <TableCell>{test.teacher.name}</TableCell>
                            <TableCell>{`${new Date(test.date)}`}</TableCell>
                            <TableCell>{test.duration}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "black" }}
                                onClick={() => handleEnter(test.id)}
                                disabled={
                                  localStorage.getItem("type") === "student" &&
                                  studentTest &&
                                  studentTest.findStudent.some(
                                    (t) => t.testId === test.id
                                  )
                                }
                              >
                                Enter
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
            <div>
              <h2>UPCOMMING TESTS</h2>
            </div>
            <div style={{ width: "100%" }}>
              <Paper sx={{ width: "100%", overflow: "auto" }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader>
                    <TableHead>
                      {/* description name date createdBy link */}
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                          Writer
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                          Start
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "17%" }}>
                          Length
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "18%" }}>
                          Submit
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {test &&
                        test.upcommingTest &&
                        test.upcommingTest.map((test) => (
                          <TableRow key={test.id}>
                            <TableCell>{test.title}</TableCell>
                            <TableCell>{test.teacher.name}</TableCell>
                            <TableCell>{`${new Date(test.date)}`}</TableCell>
                            <TableCell>{test.duration}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "black" }}
                                disabled="true"
                              >
                                Enter
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
            <div>
              <h2>PAST TESTS</h2>
            </div>
            <div style={{ width: "100%" }}>
              <Paper sx={{ width: "100%", overflow: "auto" }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader>
                    <TableHead>
                      {/* description name date createdBy link */}
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                          Writer
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                          Start
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "17%" }}>
                          Length
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: "18%" }}>
                          Submit
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {test &&
                        test.pastTest &&
                        test.pastTest.map((test) => (
                          <TableRow key={test.id}>
                            <TableCell>{test.title}</TableCell>
                            <TableCell>{test.teacher.name}</TableCell>
                            <TableCell>{`${new Date(test.date)}`}</TableCell>
                            <TableCell>{test.duration}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "black" }}
                                onClick={() => viewTest(test.id)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Test;
