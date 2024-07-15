import {
  GET_PENDING_TEACHERS_FAIL,
  GET_PENDING_TEACHERS_REQUEST,
  GET_PENDING_TEACHERS_SUCCESS,
} from "../constants/AdminConstants";
import axios from "../axios";
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
    console.log(data);

    dispatch({ type: GET_PENDING_TEACHERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PENDING_TEACHERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const confirmTeacher = (email, confirm) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/confirmTeacher`,
      { email, confirm },
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
