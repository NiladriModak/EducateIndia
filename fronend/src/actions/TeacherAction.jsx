import axios from "../axios";
import { toast } from "react-toastify";
import {
  CREATE_ANNOUNCEMENT_FAIL,
  CREATE_ANNOUNCEMENT_REQUEST,
  CREATE_ANNOUNCEMENT_SUCCESS,
  CREATE_NOTES_FAIL,
  CREATE_NOTES_REQUEST,
  CREATE_NOTES_SUCCESS,
  CREATE_TEST_FAIL,
  CREATE_TEST_REQUEST,
  CREATE_TEST_SUCCESS,
  CREATE_VIDEOS_FAIL,
  CREATE_VIDEOS_REQUEST,
  CREATE_VIDEOS_SUCCESS,
  GET_ALL_DETAILS_REQUEST,
  GET_ALL_DETAILS_SUCCESS,
  GET_ENROLLED_CLASSES_REQUEST,
  GET_ENROLLED_CLASSES_SUCCESS,
  GET_TEACHER_FAIL,
  GET_TEACHER_REQUEST,
  GET_TEACHER_SUCCESS,
} from "../constants/TeacherConstants";
import { getAnnouncements, getNotes, getTests, getVideos } from "./ClassAction";
import { duration } from "@mui/material";
import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../constants/AuthConstants";
export const getTeachers = (classId, subjectId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TEACHER_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `api/classes/${classId}/subjects/${subjectId}/teachers`,
      config
    );
    data;
    dispatch({ type: GET_TEACHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TEACHER_FAIL, payload: error.response.data.message });
    toast.error(error.response.data.message);
  }
};

export const getEnrolledClassesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ENROLLED_CLASSES_REQUEST });
    const token = localStorage.getItem("token");
    token;

    const id = localStorage.getItem("teacherId");
    "id", id;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/teachers/${id}/getEnrolledClasses`,
      config
    );
    dispatch({ type: GET_ENROLLED_CLASSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TEACHER_FAIL, payload: error.response.data.message });
    toast.error(error.response.data.message);
  }
};

export const createAnnouncements =
  (classId, subjectId, heading, content) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ANNOUNCEMENT_REQUEST });
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("teacherId");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/classes/${classId}/subjects/${subjectId}/teachers/${id}/announce`,
        { heading: heading, content },
        config
      );
      data;

      await dispatch({ type: CREATE_ANNOUNCEMENT_SUCCESS, payload: data });
      await dispatch(getAnnouncements(classId, subjectId, id));
    } catch (error) {
      dispatch({
        type: CREATE_ANNOUNCEMENT_FAIL,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };

export const createNotes =
  (classId, subjectId, name, description, pdfFile) => async (dispatch) => {
    // ("Entered createNotes function");

    try {
      dispatch({ type: CREATE_NOTES_REQUEST });
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("teacherId");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // This is important for file uploads
        },
      };

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("pdfData", pdfFile); // Ensure the key matches the expected key on the server
      // (pdfFile);

      const { data } = await axios.post(
        `/api/classes/${classId}/subjects/${subjectId}/teachers/${id}/uploadPdf`,
        formData,
        config
      );
      // (data);
      dispatch({ type: CREATE_NOTES_SUCCESS, payload: data });
      dispatch(getNotes(classId, subjectId, id));
    } catch (error) {
      console.error("Error creating notes:", error);
      dispatch({ type: CREATE_NOTES_FAIL, payload: error.message });
    }
  };

export const createVideos =
  (classId, subjectId, name, description, url) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_VIDEOS_REQUEST });
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("teacherId");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // This is important for file uploads
        },
      };
      // ("Create Video Teacher Action", name, description, url);

      const { data } = await axios.post(
        `api/classes/${classId}/subjects/${subjectId}/teachers/${id}/uploadVideos`,
        { name, description, url },
        config
      );
      dispatch({ type: CREATE_VIDEOS_SUCCESS, payload: data });
      dispatch(getVideos(classId, subjectId, id));
    } catch (error) {
      console.error("Error creating videos:", error);
      dispatch({ type: CREATE_VIDEOS_FAIL, payload: error.message });
    }
  };

export const createTests =
  (classId, subjectId, title, description, duration, questions, startTime) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_TEST_REQUEST });
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("teacherId");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // This is important for file uploads
        },
      };
      const { data } = await axios.post(
        `api/classes/${classId}/subjects/${subjectId}/teachers/${id}/createTest`,
        { title, description, duration, questions: questions, date: startTime },
        config
      );
      dispatch({ type: CREATE_TEST_SUCCESS, payload: data });
      dispatch(getTests(classId, subjectId, localStorage.getItem("teacherId")));
    } catch (error) {
      // ("creating test ", error);

      dispatch({ type: CREATE_TEST_FAIL, payload: error });
    }
  };

export const getDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("teacherId");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // This is important for file uploads
      },
    };
    const { data } = await axios.get(`/api/getFullDetails/${id}`, config);
    dispatch({ type: GET_ALL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_TEST_FAIL, payload: error });
  }
};

export const getUserTeacher = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const token = localStorage.getItem("token");
    const teacherId = localStorage.getItem("teacherId");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/getTeacher`, { teacherId }, config);
    data;

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAIL, payload: error });
  }
};
