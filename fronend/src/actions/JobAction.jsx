import axios from "../axios";
import {
  GET_JOB_FAIL,
  GET_JOB_REQUEST,
  GET_JOB_SUCCESS,
  GET_SCHOLARSHIP_REQUEST,
  GET_SCHOLARSHIP_SUCCESS,
  GET_SCHOLARSHIP_FAIL,
} from "../constants/JobConstants";
import { toast } from "react-toastify";
export const getJob = () => async (dispatch) => {
  try {
    await dispatch({ type: GET_JOB_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/getJobs", config);
    data;

    await dispatch({ type: GET_JOB_SUCCESS, payload: data });
  } catch (error) {
    await dispatch({
      type: GET_JOB_FAIL,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const getScholarship = () => async (dispatch) => {
  try {
    await dispatch({ type: GET_SCHOLARSHIP_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/getScholarships", config);
    data;

    await dispatch({ type: GET_SCHOLARSHIP_SUCCESS, payload: data });
  } catch (error) {
    await dispatch({
      type: GET_SCHOLARSHIP_FAIL,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
