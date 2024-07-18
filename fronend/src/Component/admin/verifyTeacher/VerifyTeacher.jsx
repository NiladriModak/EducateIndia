import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
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
import { useDispatch, useSelector } from "react-redux";
import {
  confirmTeacher,
  getPendingTeachers,
} from "../../../actions/AdminAction";
import Loading from "../../Loading/Loading";

function VerifyTeacher() {
  const dispatch = useDispatch();
  const { loading, pendingTeachers } = useSelector(
    (state) => state.pendingTeachers
  );
  const [disable, setDisable] = useState(false);
  const handleConfirm = async (name, email, password, confirm) => {
    setDisable(true);
    await dispatch(confirmTeacher(name, email, password, confirm));
    setDisable(false);
  };

  useEffect(() => {
    dispatch(getPendingTeachers());
  }, [dispatch, disable]);
  let present = 0;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ textAlign: "center" }}>Confirm Teachers</h1>

            <div style={{ width: "100%" }}>
              <Paper style={{ width: "100%", overflow: "auto" }}>
                <TableContainer style={{ maxHeight: "100%" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold", width: "10%" }}>
                          Id
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", width: "25%" }}>
                          Name
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", width: "25%" }}>
                          Email
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", width: "18%" }}>
                          Confirm/Reject
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingTeachers &&
                        pendingTeachers.allPendingTeacher?.map((teacher) => {
                          if (teacher.isConfirmed === false) {
                            present += 1;
                            return (
                              <TableRow key={teacher.id}>
                                <TableCell
                                  style={{ fontWeight: "bold", width: "10%" }}
                                >
                                  {teacher.id}
                                </TableCell>
                                <TableCell
                                  style={{ fontWeight: "bold", width: "25%" }}
                                >
                                  {teacher.name}
                                </TableCell>
                                <TableCell
                                  style={{ fontWeight: "bold", width: "25%" }}
                                >
                                  {teacher.email}
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
                                          teacher.name,
                                          teacher.email,
                                          teacher.password,
                                          true
                                        )
                                      }
                                    >
                                      Confirm
                                    </Button>
                                    <Button
                                      variant="contained"
                                      disabled={disable}
                                      style={{
                                        margin: "0 2vmax",
                                        backgroundColor: "red",
                                      }}
                                      onClick={() =>
                                        handleConfirm(
                                          teacher.name,
                                          teacher.email,
                                          teacher.password,
                                          false
                                        )
                                      } // Assuming you have a handleReject function
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          }
                          return null; // Return null if the condition is not met
                        })}
                    </TableBody>
                  </Table>
                  {pendingTeachers && present === 0 && (
                    <h1 style={{ textAlign: "center" }}>No Pending Request</h1>
                  )}
                </TableContainer>
              </Paper>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default VerifyTeacher;
