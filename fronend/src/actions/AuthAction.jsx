import {
  FAIL_LOGIN_STUDENT,
  FAIL_REGISTER_STUDENT,
  REQUEST_LOGIN_STUDENT,
  REQUEST_REGISTER_STUDENT,
  SUCCESS_LOGIN_STUDENT,
  SUCCESS_REGISTER_STUDENT,
} from "../constants/AuthConstants";
import axios from "../axios";
import { toast } from "react-toastify";

export const studentRegister = (name, email, password) => async (dispatch) => {
  try {
    // console.log("came");
    dispatch({ type: REQUEST_REGISTER_STUDENT });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/studentRegistration",
      { name, email, password },
      config
    );
    const jsonString = JSON.stringify(data);
    localStorage.setItem("type", "student");
    localStorage.setItem("token", data.token);
    localStorage.setItem("studentId", data.student.id);
    // navigate("/account");
    dispatch({ type: SUCCESS_REGISTER_STUDENT, payload: data });
  } catch (error) {
    dispatch({
      type: FAIL_REGISTER_STUDENT,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const studentLogin = (email, password) => async (dispatch) => {
  try {
    // console.log("came");
    dispatch({ type: REQUEST_LOGIN_STUDENT });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/studentLogin",
      { email, password },
      config
    );
    const jsonString = JSON.stringify(data);
    localStorage.setItem("type", "student");
    localStorage.setItem("token", data.token);
    localStorage.setItem("studentId", data.student.id);
    console.log(data);
    dispatch({ type: SUCCESS_LOGIN_STUDENT, payload: data });
  } catch (error) {
    dispatch({
      type: FAIL_LOGIN_STUDENT,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
