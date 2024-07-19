import axios from "../axios";
import { toast } from "react-toastify";
import {
  CREATE_ANSWERS_FAIL,
  CREATE_ANSWERS_REQUEST,
  CREATE_ANSWERS_SUCCESS,
  FAIL_CLASSID,
  GET_ALL_CLASS_DETAILS_FAIL,
  GET_ALL_CLASS_DETAILS_REQUEST,
  GET_ALL_CLASS_DETAILS_SUCCESS,
  GET_ALL_TEST_MARKS_FAIL,
  GET_ALL_TEST_MARKS_REQUEST,
  GET_ALL_TEST_MARKS_SUCCESS,
  GET_ANNOUNCEMENTS_FAIL,
  GET_ANNOUNCEMENTS_REQUEST,
  GET_ANNOUNCEMENTS_SUCCESS,
  GET_NOTES_FAIL,
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_SINGLE_TEST_FAIL,
  GET_SINGLE_TEST_REQUEST,
  GET_SINGLE_TEST_SUCCESS,
  GET_STUDENT_TEST_FAIL,
  GET_STUDENT_TEST_REQUEST,
  GET_STUDENT_TEST_SUCCESS,
  GET_TEST_FAIL,
  GET_TEST_REQUEST,
  GET_TEST_SUCCESS,
  GET_VIDEOS_FAIL,
  GET_VIDEOS_REQUEST,
  GET_VIDEOS_SUCCESS,
  REQUEST_CLASSID,
  SUCCESS_CLASSID,
  UPLOAD_TOT_MARKS_FAIL,
  UPLOAD_TOT_MARKS_REQUEST,
  UPLOAD_TOT_MARKS_SUCCESS,
} from "../constants/ClassConstants";
import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../constants/AuthConstants";

export const getClassId = (className) => async (dispatch) => {
  try {
    await dispatch({ type: REQUEST_CLASSID });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/classes/${className}`, config);
    await dispatch({ type: SUCCESS_CLASSID, payload: data.classes });
  } catch (error) {
    await dispatch({
      type: FAIL_CLASSID,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const getNotes = (classId, subjectId, teacherId) => async (dispatch) => {
  try {
    // ("elen");
    dispatch({ type: GET_NOTES_REQUEST });
    const token = localStorage.getItem("token");
    if (localStorage.getItem("type") === "teacher" && !teacherId) {
      teacherId = localStorage.getItem("teacherId");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/classes/${classId}/subjects/${subjectId}/teachers/${teacherId}/showPdf`,
      config
    );
    // (data);
    await dispatch({ type: GET_NOTES_SUCCESS, payload: data });
  } catch (error) {
    await dispatch({
      type: GET_NOTES_FAIL,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const getVideos =
  (classId, subjectId, teacherId) => async (dispatch) => {
    try {
      if (!teacherId && localStorage.getItem("type") === "teacher")
        teacherId = localStorage.getItem("teacherId");
      dispatch({ type: GET_VIDEOS_REQUEST });
      if (!classId || !subjectId || !teacherId) return;
      //("ji", classId, subjectId, teacherId);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/classes/${classId}/subjects/${subjectId}/teachers/${teacherId}/showVideos`,
        config
      );
      data;
      await dispatch({ type: GET_VIDEOS_SUCCESS, payload: data });
    } catch (error) {
      await dispatch({
        type: GET_VIDEOS_FAIL,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };

export const getTests = (classId, subjectId, teacherId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TEST_REQUEST });
    "get test", classId, subjectId, teacherId;
    if (!teacherId && localStorage.getItem("type") === "teacher")
      teacherId = localStorage.getItem("teacherId");

    if (!classId || !subjectId || !teacherId) return;
    //("ji", classId, subjectId, teacherId);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/api/classes/${classId}/subejcts/${subjectId}/teachers/${teacherId}/viewTests`,
      config
    );
    data;
    dispatch({ type: GET_TEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TEST_FAIL, payload: error.response.data.message });
    toast.error(error.response.data.message);
  }
};

export const getAnnouncements =
  (classId, subjectId, teacherId) => async (dispatch) => {
    try {
      if (!classId || !subjectId) return;
      if (!teacherId) {
        teacherId = localStorage.getItem("teacherId");
      }
      dispatch({ type: GET_ANNOUNCEMENTS_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/api/classes/${classId}/subjects/${subjectId}/teachers/${teacherId}/announce`,
        config
      );
      data;
      await dispatch({ type: GET_ANNOUNCEMENTS_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: GET_ANNOUNCEMENTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getQuestions =
  (classId, subjectId, teacherId, testId) => async (dispatch) => {
    try {
      classId, " ", subjectId, " ", teacherId, " ", testId;

      dispatch({ type: GET_QUESTIONS_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/api/classes/${classId}/subjects/${subjectId}/teachers/${teacherId}/test/${testId}/giveTest`,
        config
      );
      data;
      dispatch({ type: GET_QUESTIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_QUESTIONS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getSingleTest =
  (classId, subjectId, teacherId, testId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TEST_REQUEST });
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/api/classes/${classId}/subjects/${subjectId}/teachers/${teacherId}/viewTests/${testId}`,
        config
      );
      data;
      dispatch({ type: GET_SINGLE_TEST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const createAnswers =
  (questionId, testId, studentId, givenAnswer, obtainedMarks) =>
  async (dispatch) => {
    try {
      // (questionId, testId, studentId, givenAnswer, obtainedMarks);

      dispatch({ type: CREATE_ANSWERS_REQUEST });
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");
      if (type === "teacher") {
        toast.error("Tteachers cannot submit the test");
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/student/${studentId}/test/${testId}/question/${questionId}/createAnswer`,
        { givenAnswer, obtainedMarks },
        config
      );
      data;
      dispatch({ type: CREATE_ANSWERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ANSWERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getStudentTest = (studentId) => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENT_TEST_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/api/student/${studentId}/getStudent`,
      config
    );
    data;
    dispatch({ type: GET_STUDENT_TEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_STUDENT_TEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const uploadTotalMarks =
  (studentId, testId, totalMarks, fullMarks) => async (dispatch) => {
    try {
      dispatch({ type: UPLOAD_TOT_MARKS_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/student/${studentId}/test/${testId}/uploadMarks`,
        { totalMarks, fullMarks },
        config
      );
      data;
      dispatch({ type: UPLOAD_TOT_MARKS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPLOAD_TOT_MARKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getAllTestMarks = (studentId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TEST_MARKS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/api/student/${studentId}/getTestMarks`,
      config
    );
    data;
    dispatch({ type: GET_ALL_TEST_MARKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_TEST_MARKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getClassDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CLASS_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/getallClassDetails`, config);
    dispatch({ type: GET_ALL_CLASS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CLASS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserStudent = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const studentId = localStorage.getItem("studentId");
    const token = localStorage.getItem("token");
    token, studentId;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/api/getStudent`,
      { studentId: studentId },
      config
    );
    data;

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAIL, payload: error });
  }
};
