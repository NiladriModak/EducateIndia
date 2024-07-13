import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import ExamQuestion from "./ExamQuestion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAnswers,
  getQuestions,
  getSingleTest,
  uploadTotalMarks,
} from "../../../actions/ClassAction";
import { Button } from "@mui/material";
import Loading from "../../Loading/Loading";

function GiveTest() {
  const { loading, questions, error } = useSelector((state) => state.questions);
  const navigator = useNavigate();
  const {
    loading: singleTestLoading,
    singleTest,
    error: singleTestError,
  } = useSelector((state) => state.singleTest);

  const [allAnswers, setallAnswers] = useState(
    Array(questions && questions.length).fill(-1)
  );

  var { classId, subjectId, teacherId, testId } = useParams();
  if (localStorage.getItem("type") === "teacher") {
    teacherId = localStorage.getItem("teacherId");
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions(classId, subjectId, teacherId, testId));
    dispatch(getSingleTest(classId, subjectId, teacherId, testId));
  }, [classId, subjectId, teacherId, testId]);

  const submitTest = () => {
    const studentId = localStorage.getItem("studentId");
    for (var i = 0; i < allAnswers.length; i++) {
      console.log(questions.questions[i].marks);
      var totalMarks = 0;
      if (questions && questions.questions[i].correctAnswer === allAnswers[i]) {
        dispatch(
          createAnswers(
            questions.questions[i].id,
            singleTest.singleTest.id,
            studentId,
            allAnswers[i],
            questions.questions[i].marks
          )
        );
        totalMarks += questions.questions[i].marks;
      } else if (questions) {
        dispatch(
          createAnswers(
            questions.questions[i].id,
            singleTest.singleTest.id,
            studentId,
            allAnswers[i],
            0
          )
        );
      }
    }
    dispatch(uploadTotalMarks(studentId, testId, totalMarks, fullMarks));
    navigator(
      `/classes/${classId}/subjects/${subjectId}/teachers/${teacherId}`
    );
  };

  // Timer state
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (singleTest && singleTest.singleTest) {
      const { date, duration } = singleTest.singleTest;
      // console.log("startTime", new Date(date).getTime());

      // Calculate the end time
      const endTime = new Date(date).getTime() + duration * 60 * 60 * 1000;

      const updateTimer = () => {
        const currentTime = new Date().getTime();
        const timeRemaining = endTime - currentTime;

        if (timeRemaining > 0) {
          setTimeLeft(timeRemaining);
        } else {
          setTimeLeft(0);
        }
      };

      updateTimer();
      const intervalId = setInterval(updateTimer, 1000);

      return () => clearInterval(intervalId);
    }
  }, [singleTest]);

  // Format timeLeft into MM:SS
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minute = Math.floor(totalSeconds / 60);
    const minutes = minute % 60;
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalSeconds / 3600);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      {loading || singleTestLoading ? (
        <Loading />
      ) : (
        <Layout>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>
              {singleTest &&
                singleTest.singleTest &&
                singleTest.singleTest.title}
            </h1>
            <p>
              {singleTest &&
                singleTest.singleTest &&
                singleTest.singleTest.description}
            </p>
            <h2>Time Remaining: {formatTime(timeLeft)}</h2>
            <Button
              variant="contained"
              sx={{ backgroundColor: "black" }}
              onClick={submitTest}
            >
              Submit
            </Button>
            <h2>All Questions</h2>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {questions &&
                questions.questions &&
                questions.questions.map((q, index) => (
                  <ExamQuestion
                    disabled={false}
                    key={q.id}
                    qind={index} // Add a key to each question for better performance
                    question={q.text}
                    marks={q.marks}
                    options={q.options}
                    correctAnswer={q.correctAnswer}
                    currentTest={q.test}
                    questionNumber={index + 1}
                    setallAnswers={setallAnswers}
                    allAnswers={allAnswers}
                  />
                ))}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default GiveTest;
