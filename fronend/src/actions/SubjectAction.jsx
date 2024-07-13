import {
  FAIL_SUBJECT,
  REQUEST_SUBJECT,
  SUCCESS_SUBJECT,
} from "../constants/SubjectConstants";
import axios from "../axios";
import { toast } from "react-toastify";
// /class/:classId/subjects
export const getSubjects = (classId) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_SUBJECT });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/class/${classId}/subjects`, config);
    console.log(data);
    await dispatch({ type: SUCCESS_SUBJECT, payload: data });
  } catch (error) {
    dispatch({
      type: FAIL_SUBJECT,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
