import {
  GET_PENDING_CLASSES_FAIL,
  GET_PENDING_CLASSES_REQUEST,
  GET_PENDING_CLASSES_SUCCESS,
  GET_PENDING_TEACHERS_FAIL,
  GET_PENDING_TEACHERS_REQUEST,
  GET_PENDING_TEACHERS_SUCCESS,
  REGISTER_ADMIN_FAIL,
  REGISTER_ADMIN_REQUEST,
  REGISTER_ADMIN_SUCCESS,
} from "../constants/AdminConstants";
import axios from "../axios";
import { teacherRegister, teacherRegisterConfirm } from "./AuthAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../constants/AuthConstants";
export const getPendingTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PENDING_TEACHERS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/getAllPendingTeachers`, config);
    data;

    dispatch({ type: GET_PENDING_TEACHERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PENDING_TEACHERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const confirmTeacher =
  (name, email, password, confirm) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await dispatch(teacherRegisterConfirm(name, email, password));
        toast.success("Registered Successfully");
      } catch (err) {
        toast.error(err);
        return;
      }
      const { data } = await axios.put(
        `/api/confirmTeacher`,
        { email, confirm },
        config
      );
      data;
    } catch (error) {
      error;
    }
  };

export const registerAdmin = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_ADMIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/registerAdmin",
      { email, name, password },
      config
    );
    localStorage.setItem("type", "admin");
    localStorage.setItem("token", data.token);
    localStorage.setItem("adminId", data.admin.id);

    // toast.success("Admin registered successfully");
    dispatch({ type: REGISTER_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const confirmPendingClasses =
  (classNames, teacherId, className, subjectName) => async (dispatch) => {
    try {
      //dispatch({ type: GET_PENDING_CLASSES_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await dispatch(createClass(classNames, teacherId));
      } catch (err) {
        toast.error(err);
        return;
      }
      const { data } = await axios.put(
        `/api/confirmClasses`,
        { teacherId, className, subjectName },
        config
      );
      data;
      toast.success("deleted successfully");
    } catch (error) {
      error;
      toast.error("overall error");
    }
  };

export const createClass = (classNames, teacherId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `/api/assignClassToTeacher/${teacherId}`,
      { classNames },
      config
    );
    data;
    toast.success("Class Registered Successfully");
  } catch (error) {
    error;
    toast.error("Class is not registered");
  }
};

export const getAllPendingClasses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PENDING_CLASSES_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/getAllPendingClasses`, config);
    dispatch({ type: GET_PENDING_CLASSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PENDING_CLASSES_FAIL, payload: error });
  }
};

export const getUserAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("adminId");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/getAdmin`, { adminId }, config);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAIL, payload: error });
  }
};
