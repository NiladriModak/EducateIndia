import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getVideos } from "../../../actions/ClassAction";
import { useDispatch, useSelector } from "react-redux";
import { createVideos } from "../../../actions/TeacherAction";
import Loading from "../../Loading/Loading";

function Videos() {
  const { videos, loading } = useSelector((state) => state.videos);
  const { classId, subjectId, teacherId } = useParams();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewVideos = async () => {
    await dispatch(createVideos(classId, subjectId, name, description, url));
    toast.success("Uploaded Successfully");
  };

  useEffect(() => {
    console.log(videos, subjectId);
    // if (!videos || Object.keys(videos).length === 0)
    dispatch(getVideos(classId, subjectId, teacherId));
  }, [classId, subjectId, teacherId]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ width: "100%" }}>
          <div>
            <h2>VIDEOS</h2>
          </div>
          {localStorage.getItem("type") === "teacher" && (
            <Button variant="contained" onClick={handleClickOpen}>
              Upload+
            </Button>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                createNewVideos();
                handleClose();
              },
            }}
          >
            <DialogTitle>Create</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter the Name</DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
              <DialogContentText sx={{ marginTop: "3vmax" }}>
                Enter the Description
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                label="Description"
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
                variant="standard"
              />
              <DialogContentText sx={{ marginTop: "3vmax" }}>
                Enter the Url
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="url"
                label="Url"
                fullWidth
                onChange={(e) => setUrl(e.target.value)}
                variant="standard"
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Upload</Button>
            </DialogActions>
          </Dialog>
          <div style={{ width: "100%" }}>
            <Paper sx={{ width: "100%", overflow: "auto" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                  <TableHead>
                    {/* description name date createdBy link */}
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Link</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        CreatedBy
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {videos &&
                      videos.allVideos &&
                      videos.allVideos.map((c, i) => (
                        <TableRow>
                          <TableCell>{c.name}</TableCell>
                          <TableCell>{c.date.substring(0, 10)}</TableCell>
                          <TableCell>{c.date.substring(11, 19)}</TableCell>
                          <TableCell>
                            <a
                              href={c.url}
                              target="_blank"
                              style={{ cursor: "pointer" }}
                            >
                              click here
                            </a>
                          </TableCell>
                          <TableCell>{c.createdBy.name}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      )}
    </>
  );
}

export default Videos;
