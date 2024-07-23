import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../../actions/ClassAction";
// import Button from '@mui/material/Button';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createNotes } from "../../../actions/TeacherAction";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

function Notes() {
  var { classId, subjectId, teacherId } = useParams();
  const { notes, loading } = useSelector((state) => state.notes);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewNote = async () => {
    await dispatch(createNotes(classId, subjectId, name, description, pdf));
    toast.success("Uploaded Successfully");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotes(classId, subjectId, teacherId));
    // ("notes--->", notes);
  }, [classId, subjectId, teacherId]);

  const showPdf = (pdf) => {
    window.open(`https://educateindia.onrender.com/files/${pdf}`, "_blank");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ width: "100%" }}>
          <div>
            <h2>NOTES</h2>
          </div>
          {localStorage.getItem("type") === "teacher" && (
            <Button variant="contained" onClick={handleClickOpen}>
              Upload
            </Button>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                createNewNote();
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
                Enter the Pdf
              </DialogContentText>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <Input
                  onChange={(e) => setPdf(e.target.files[0])}
                  type="file"
                />
              </Button>
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
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notes &&
                      notes.allPdfs &&
                      notes.allPdfs.map((c, i) => (
                        <TableRow>
                          <TableCell>{c.name}</TableCell>
                          <TableCell>{c.date.substring(0, 10)}</TableCell>
                          <TableCell>{c.date.substring(11, 19)}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => showPdf(c.pdfData)}
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
      )}
    </>
  );
}

export default Notes;
