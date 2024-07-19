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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "../../../actions/ClassAction";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createAnnouncements } from "../../../actions/TeacherAction";
import Loading from "../../Loading/Loading";

function Announcements() {
  const dispatch = useDispatch();
  const { announcements, loading } = useSelector(
    (state) => state.announcements
  );
  const { classId, subjectId, teacherId } = useParams();
  const navigator = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewAnnouncement = async () => {
    try {
      heading, content;
      bjectId;
      await dispatch(createAnnouncements(classId, subjectId, heading, content));
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(getAnnouncements(classId, subjectId, teacherId));
  }, [classId, subjectId, teacherId]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>ALL ANNOUNCEMENTS</h1>
          {localStorage.getItem("type") === "teacher" && (
            <div>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black" }}
                onClick={handleClickOpen}
              >
                + Create
              </Button>
            </div>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                createNewAnnouncement();
                handleClose();
              },
            }}
          >
            <DialogTitle>Create</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the Announcement Topic
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="topic"
                label="Topic"
                fullWidth
                variant="standard"
                onChange={(e) => setHeading(e.target.value)}
              />
              <DialogContentText>Enter the Content</DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="content"
                label="Content"
                fullWidth
                onChange={(e) => setContent(e.target.value)}
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </Dialog>
          <div
            style={{
              border: "1px solid black",
              overflow: "auto",
              maxHeight: "60vh",
              marginTop: "2vmax",
            }}
          >
            <div>
              <h2>RECENT ANNOUNCEMNETS</h2>
            </div>
            <div style={{ width: "100%" }}>
              <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader>
                    <TableHead>
                      {/* description name date createdBy link */}
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "1px solid black",
                            fontWeight: "bold",
                            width: "25%",
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px solid black",
                            width: "50%",
                            fontWeight: "bold",
                          }}
                        >
                          Description
                        </TableCell>

                        <TableCell
                          sx={{ border: "1px solid black", fontWeight: "bold" }}
                        >
                          By
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {announcements &&
                        announcements.recentAnnounce &&
                        announcements.recentAnnounce.map((ann) => (
                          <TableRow key={ann.id}>
                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "25%",
                              }}
                            >{`${new Date(ann.date)}`}</TableCell>
                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "25%",
                              }}
                            >{`${ann.heading} : ${ann.content}`}</TableCell>
                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "25%",
                              }}
                            >
                              {ann.createdBy.name}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
            <div>
              <h2>PAST ANNOUNCEMENTS</h2>
            </div>
            <div style={{ width: "100%" }}>
              <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader>
                    <TableHead>
                      {/* description name date createdBy link */}
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "1px solid black",
                            fontWeight: "bold",
                            width: "25%",
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px solid black",
                            width: "50%",
                            fontWeight: "bold",
                          }}
                        >
                          Description
                        </TableCell>

                        <TableCell
                          sx={{ border: "1px solid black", fontWeight: "bold" }}
                        >
                          By
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {announcements &&
                        announcements.pastAnnounce &&
                        announcements.pastAnnounce.map((ann) => (
                          <TableRow key={ann.id}>
                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "25%",
                              }}
                            >{`${new Date(ann.date)}`}</TableCell>
                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "25%",
                              }}
                            >{`${ann.heading} : ${ann.content}`}</TableCell>
                            <TableCell
                              sx={{
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "25%",
                              }}
                            >
                              {ann.createdBy.name}
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

export default Announcements;
