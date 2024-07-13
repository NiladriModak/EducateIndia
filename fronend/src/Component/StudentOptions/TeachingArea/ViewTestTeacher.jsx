import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import ExamQuestion from "./ExamQuestion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getQuestions,
  getSingleTest,
  getStudentTest,
} from "../../../actions/ClassAction";
import { Button } from "@mui/material";

function ViewTestTeacher() {
  const { loading, questions, error } = useSelector((state) => state.questions);
  const navigator = useNavigate();
  const {
    loading: singleTestLoading,
    singleTest,
    error: singleTestError,
  } = useSelector((state) => state.singleTest);
  const { studentTest } = useSelector((state) => state.studentTest);

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
    dispatch(getStudentTest(localStorage.getItem("studentId")));
  }, [classId, subjectId, teacherId, testId]);

  // Calculate the total marks
  const totalMarks =
    questions && questions.questions
      ? questions.questions.reduce((sum, question) => sum + question.marks, 0)
      : 0;

  // Calculate the total marks obtained by the student
  const totalMarksObtained =
    studentTest && studentTest.findStudent && questions && questions.questions
      ? studentTest.findStudent.reduce((sum, answer) => {
          const question = questions.questions.find(
            (q) => q.id === answer.questionId
          );
          return question && answer.givenAnswer === question.correctAnswer
            ? sum + question.marks
            : sum;
        }, 0)
      : 0;

  return (
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
          {singleTest && singleTest.singleTest && singleTest.singleTest.title}
        </h1>
        <p>
          {singleTest &&
            singleTest.singleTest &&
            singleTest.singleTest.description}
        </p>
        <h2>Total Marks: {totalMarks}</h2>
        <h2>Total Marks Obtained: {totalMarksObtained}</h2>
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
                disabled={true}
                key={q.id}
                id={q.id}
                qind={index}
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
  );
}

export default ViewTestTeacher;
