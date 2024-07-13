import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudentTest } from "../../../actions/ClassAction";

function ExamQuestion(props) {
  const [answer, setAnswer] = useState(-1);
  const { testId } = useParams();
  const dispatch = useDispatch();
  const { studentTest } = useSelector((state) => state.studentTest);
  useEffect(() => {
    dispatch(getStudentTest(localStorage.getItem("studentId")));
  }, [testId]);

  const getYourAnswer = () => {
    if (
      studentTest &&
      studentTest.findStudent &&
      studentTest.findStudent.length > 0
    ) {
      const answerObj = studentTest.findStudent.find(
        (e) => e.questionId === props.id
      );
      return answerObj
        ? answerObj.givenAnswer
          ? answerObj.givenAnswer
          : "NA"
        : "NA";
    }
    return "NA";
  };

  const getYourScore = () => {
    if (
      studentTest &&
      studentTest.findStudent &&
      studentTest.findStudent.length > 0
    ) {
      const answerObj = studentTest.findStudent.find(
        (e) => e.questionId === props.id
      );
      return answerObj
        ? answerObj.givenAnswer
          ? answerObj.givenAnswer === props.correctAnswer
            ? props.marks
            : 0
          : 0
        : 0;
    }
    return 0;
  };

  const handleChooseOption = (index) => {
    setAnswer(index);
    const updatedAnswers = [...props.allAnswers];
    updatedAnswers[props.qind] = index; // Update the answer for the specific question index
    props.setallAnswers(updatedAnswers);
  };
  var yourAnswer = 0;
  return (
    <div
      style={{
        backgroundColor: "#F4F4F4",
        width: "80%",
        border: "1px solid black",
        margin: "2vmax",
        padding: "2vmax",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Question {props.questionNumber}</h3>
          <h4>Marks: {props.marks}</h4>
        </div>
        <p>{props.question}</p>
      </div>
      <div>
        <h3>Options</h3>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {props.options &&
              props.options.map((op, index) => (
                <div
                  key={index}
                  style={{
                    margin: "0.5vmax",
                    display: "flex",
                    // border: "1px solid black",
                    justifyContent: "space-between",
                    width: "30vmax",
                  }}
                >
                  <FormControlLabel
                    value={index}
                    control={<Radio />}
                    label={op}
                    disabled={props.disabled}
                    onChange={() => handleChooseOption(index)}
                  />
                </div>
              ))}
          </RadioGroup>
        </FormControl>
        {props.disabled === true && (
          <div>
            <h3>Correct Answer: {props.correctAnswer + 1}</h3>
            <h4>Your score: {getYourScore()}</h4>
            <h4>Your answer: {getYourAnswer()}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamQuestion;
