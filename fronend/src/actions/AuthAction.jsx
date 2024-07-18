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
import {
  REGISTER_TEACHER_FAIL,
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
} from "../constants/TeacherConstants";

export const studentRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_REGISTER_STUDENT });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/studentRegistration",
      { name, email, password },
      config
    );
    localStorage.setItem("type", "student");
    localStorage.setItem("token", data.token);
    localStorage.setItem("studentId", data.student.id);

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

export const teacherRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_TEACHER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/requestTeacher",
      { name, email, password },
      config
    );
    console.log(data);
    if (data.message === "success") {
      toast.success(
        "Request send successfully! You might become a teacher soon"
      );
    } else {
      toast.warning(data.message);
    }

    dispatch({ type: REGISTER_TEACHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_TEACHER_FAIL,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const teacherRegisterConfirm =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_TEACHER_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "/api/teacherRegistration",
        { name, email, password },
        config
      );
      console.log(data);
      if (data.message === "success") {
        toast.success("Teacher Registered Successfully");
      } else {
        toast.warning(data.message);
      }

      dispatch({ type: REGISTER_TEACHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REGISTER_TEACHER_FAIL,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };
