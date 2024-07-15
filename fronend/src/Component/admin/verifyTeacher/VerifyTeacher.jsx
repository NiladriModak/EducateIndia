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

function VerifyTeacher() {
  const dispatch = useDispatch();
  const { loading, pendingTeachers } = useSelector(
    (state) => state.pendingTeachers
  );
  const [disable, setDisable] = useState(false);
  const handleConfirm = async (email, confirm) => {
    setDisable(true);
    await dispatch(confirmTeacher(email, confirm));
    setDisable(false);
  };

  useEffect(() => {
    dispatch(getPendingTeachers());
  }, [dispatch, disable]);

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Confirm Teachers</h1>

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
                                    handleConfirm(teacher.email, true)
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
                                    handleConfirm(teacher.email, false)
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
            </TableContainer>
          </Paper>
        </div>
      </div>
    </Layout>
  );
}

export default VerifyTeacher;
