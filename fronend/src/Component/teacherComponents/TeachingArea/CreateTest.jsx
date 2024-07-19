import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Layout from "../../Layout";
import QuestionCard from "./QuestionCard";
import SendIcon from "@mui/icons-material/Send";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { createTests } from "../../../actions/TeacherAction";

dayjs.extend(utc);

function CreateTest() {
  const { classId, subjectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allquestions, setAllquestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [marks, setMarks] = useState(0);
  const [options, setOptions] = useState("");
  const [alloptions, setAlloptions] = useState([]);
  const [startTime, setStartTime] = useState(dayjs());
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    "Updated allquestions:", allquestions;
  }, [allquestions]);

  const handleSend = () => {
    if (question && marks && alloptions.length && correctAnswer) {
      question, marks, alloptions, correctAnswer;

      setAllquestions((prevQuestions) => [
        ...prevQuestions,
        [question, marks, alloptions, correctAnswer],
      ]);
      setQuestion("");
      setAlloptions([]);
      setMarks(0);
      setCorrectAnswer(0);
    } else {
      toast.error("Please enter all details");
    }
  };

  const deleteQuestion = (ques) => {
    const updatedQuestions = allquestions.filter((q) => q[0] !== ques);
    setAllquestions(updatedQuestions);
  };

  const confirmTest = () => {
    if (!title || !description || !duration || !allquestions || !startTime) {
      title, description, duration, allquestions, startTime;

      toast.error("Please enter all the details to create test");
      return;
    }

    const utcStartTime = startTime.utc().toISOString();
    dispatch(
      createTests(
        classId,
        subjectId,
        title,
        description,
        duration,
        allquestions,
        utcStartTime
      )
    );
    toast.success("Test Created Successfully");
    setOpen(false);
    navigate(`/enrolledClasses/${classId}/subject/${subjectId}/announcements`);
  };

  return (
    <Layout>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "2vmax",
          }}
        >
          <h1 style={{ borderBottom: "2px solid black" }}>Create Your Test</h1>
        </div>
        <div
          style={{
            margin: "2vmax",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>Title</h2>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title"
              required
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h2>Description</h2>
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              sx={{ width: "26vmax" }}
              placeholder="Description"
              required
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h2>Start Time</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ margin: "0" }}
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div style={{ textAlign: "center" }}>
            <h2>Duration</h2>
            <TextField
              onChange={(e) => setDuration(Number(e.target.value))}
              value={duration}
              placeholder="Duration in Hours"
              required
            />
          </div>
        </div>
        <div
          style={{
            margin: "2vmax",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{ borderBottom: "2px solid black", marginBottom: "2vmax" }}
          >
            Create Questions for the test
          </h2>
          <Button
            variant="contained"
            onClick={confirmTest}
            sx={{ backgroundColor: "black" }}
          >
            Confirm Test
          </Button>
          <div
            style={{
              margin: "2vmax",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <TextField
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  placeholder="Type your new question"
                  sx={{ width: "100%", margin: "0.3vmax" }}
                />
                <TextField
                  type="Number"
                  placeholder="marks"
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                />
                <SendIcon
                  onClick={handleSend}
                  sx={{
                    cursor: "pointer",
                    fontSize: "2vmax",
                    color: "black",
                    "&:hover": { color: "blue" },
                  }}
                />
              </div>
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <TextField
                  placeholder="Create Options"
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                />
                <Button
                  onClick={() => {
                    setAlloptions([...alloptions, options]);
                    setOptions("");
                  }}
                >
                  Create
                </Button>
                <div
                  style={{
                    width: "40vmax",
                    height: "15vmax",
                    overflow: "auto",
                    margin: "1vmax",
                    border: "2px solid #EEECEC",
                  }}
                >
                  <h2>Options preview</h2>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      {alloptions.map((op, index) => (
                        <div
                          key={index}
                          style={{
                            margin: "0.5vmax",
                            display: "flex",
                            border: "1px solid black",
                            justifyContent: "space-between",
                            width: "30vmax",
                          }}
                        >
                          <FormControlLabel
                            value={index}
                            control={<Radio />}
                            label={op}
                            onChange={() => setCorrectAnswer(index)}
                          />
                          <DeleteForever
                            onClick={() => {
                              setAlloptions(
                                alloptions.filter((_, idx) => idx !== index)
                              );
                            }}
                            sx={{
                              "&:hover": {
                                color: "red",
                              },
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
            <div style={{ width: "80%", marginTop: "2vmax" }}>
              <h2>Created Questions</h2>
              {allquestions.map((q, index) => (
                <QuestionCard
                  key={index}
                  text={q[0]}
                  marks={q[1]}
                  options={q[2]}
                  correctAnswer={q[3]}
                  onDelete={deleteQuestion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Test Creation</DialogTitle>
        <DialogActions>
          <Button onClick={confirmTest}>Confirm</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default CreateTest;
