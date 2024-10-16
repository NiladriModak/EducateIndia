import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledClassesAction } from "../../../actions/TeacherAction";
import EnrolledClassesDiv from "./EnrolledClassesDiv";
import Loading from "../../Loading/Loading";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "../../../axios";

function EnrolledClassesDetails() {
  const { loading, enrolledClasses } = useSelector(
    (state) => state.enrolledClasses
  );
  const dispatch = useDispatch();

  const allback = async () => {
    await dispatch(getEnrolledClassesAction());
  };

  const [open, setOpen] = React.useState(false);
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [disable, setDisable] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewRequest = async () => {
    try {
      if (!className || !subjectName) {
        toast.warning("Enter all details");
        return;
      }
      const teacherId = localStorage.getItem("teacherId");
      if (!teacherId) {
        toast.error("No teacher's id found");
        return;
      }
      setDisable(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "/api/requestForClasses",
        {
          teacherId,
          className,
          subjectName,
        },
        config
      );

      if (data.success) {
        toast.success("Request sent successfully");
        allback(); // Refresh the enrolled classes after a new request is sent
      }
    } catch (error) {
      setDisable(false);
      toast.error("Request not sent");
    }
  };

  useEffect(() => {
    if (!enrolledClasses || !enrolledClasses.data) {
      allback();
    }
  }, [enrolledClasses, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Coming Soon', cursive",
              borderBottom: "2.5px solid black",
              padding: "1vmax 2vmax",
              color: "black",
            }}
          >
            Classes Enrolled
          </h1>
          <Button
            sx={{ margin: "10px", backgroundColor: "black" }}
            variant="contained"
            onClick={handleClickOpen}
          >
            +Request for class
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                createNewRequest();
                handleClose();
              },
            }}
          >
            <DialogTitle>Create</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter the Class Name</DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="classname"
                label="ClassName"
                fullWidth
                variant="standard"
                onChange={(e) => setClassName(e.target.value)}
              />
              <DialogContentText sx={{ marginTop: "3vmax" }}>
                Enter Subject Name
              </DialogContentText>
              <TextField
                required
                margin="dense"
                id="subjectName"
                label="SubjectName"
                fullWidth
                onChange={(e) => setSubjectName(e.target.value)}
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={disable}>
                Upload
              </Button>
            </DialogActions>
          </Dialog>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {enrolledClasses &&
            enrolledClasses.data &&
            enrolledClasses.data.length === 0 ? (
              <h2>You are not enrolled in any class</h2>
            ) : (
              enrolledClasses &&
              enrolledClasses.data &&
              enrolledClasses.data.map((c, i) => (
                <EnrolledClassesDiv key={i} class={c} />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EnrolledClassesDetails;
