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
  const allback = async () => {
    await dispatch(getEnrolledClassesAction());
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const createNewRequest = async () => {
    try {
      if (!className || !subjectName) {
        toast.warning("enter all details");
        return;
      }
      const teacherId = localStorage.getItem("teacherId");
      if (teacherId === undefined) {
        toast.error("No teachers id found");
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

      if (data.success === true) {
        data;
        toast.success("Request Send Successfully");
      }
    } catch (error) {
      setDisable(false);
      error;

      toast.error("Request not send");
    }
  };
  useEffect(() => {
    if (
      enrolledClasses === undefined ||
      !enrolledClasses ||
      Object.keys(enrolledClasses).length === 0
    )
      allback();
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
            // height: "100vh",
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
                autoFocus
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
              <Button type="submit">Upload</Button>
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
            {enrolledClasses && sses.data}
            {enrolledClasses &&
            enrolledClasses.data &&
            enrolledClasses.data.length === 0 ? (
              <h2>You are not enrolled to any class</h2>
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
