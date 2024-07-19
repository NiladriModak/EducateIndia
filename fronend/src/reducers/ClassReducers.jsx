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

export const classIdReducer = (state = { classId: {} }, action) => {
  switch (action.type) {
    case REQUEST_CLASSID:
      return {
        loading: true,
      };
    case SUCCESS_CLASSID:
      return {
        loading: false,
        classId: action.payload,
      };
    case FAIL_CLASSID:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const notes = (state = { notes: {} }, action) => {
  switch (action.type) {
    case GET_NOTES_REQUEST:
      return {
        loading: true,
      };
    case GET_NOTES_SUCCESS:
      return {
        loading: false,
        notes: action.payload,
      };
    case GET_NOTES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getVideos = (state = { videos: {} }, action) => {
  switch (action.type) {
    case GET_VIDEOS_REQUEST:
      return {
        loading: true,
      };
    case GET_VIDEOS_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
      };
    case GET_VIDEOS_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getTest = (state = { test: {} }, action) => {
  switch (action.type) {
    case GET_TEST_REQUEST:
      return {
        loading: true,
        test: {},
      };
    case GET_TEST_SUCCESS:
      return {
        loading: false,
        test: action.payload,
      };
    case GET_TEST_FAIL:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };
    default:
      return state;
  }
};

export const getAnnouncements = (state = { announcements: {} }, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS_REQUEST:
      return {
        loading: true,
      };
    case GET_ANNOUNCEMENTS_SUCCESS:
      return {
        loading: false,
        announcements: action.payload,
      };
    case GET_ANNOUNCEMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
        state,
      };
    default:
      return state;
  }
};

export const getQuestions = (state = { questions: {} }, action) => {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return {
        loading: true,
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };
    case GET_QUESTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
        state,
      };
    default:
      return state;
  }
};

export const getSingleTest = (state = { singleTest: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_TEST_REQUEST:
      return {
        loading: true,
      };
    case GET_SINGLE_TEST_SUCCESS:
      return {
        loading: false,
        singleTest: action.payload,
      };
    case GET_SINGLE_TEST_FAIL:
      return {
        loading: false,
        error: action.payload,
        state,
      };
    default:
      return state;
  }
};

export const createAnswer = (state = { answer: {} }, action) => {
  switch (action.type) {
    case CREATE_ANSWERS_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ANSWERS_SUCCESS:
      return {
        loading: false,
        answer: action.payload,
      };
    case CREATE_ANSWERS_FAIL:
      return {
        loading: false,
        error: action.payload,
        state,
      };
    default:
      return state;
  }
};

export const getStudentTest = (state = { students: {} }, action) => {
  switch (action.type) {
    case GET_STUDENT_TEST_REQUEST:
      return {
        loading: true,
      };
    case GET_STUDENT_TEST_SUCCESS:
      return {
        loading: true,
        studentTest: action.payload,
      };
    case GET_STUDENT_TEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const uploadTotalMarks = (state = { totalMarks: {} }, action) => {
  switch (action.type) {
    case UPLOAD_TOT_MARKS_REQUEST:
      return {
        loading: true,
      };
    case UPLOAD_TOT_MARKS_SUCCESS:
      return {
        loading: false,
        totalMarks: action.payload,
      };
    case UPLOAD_TOT_MARKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllTestMarksReducer = (
  state = { alltestMarks: {} },
  action
) => {
  "reduer", action.payload;

  switch (action.type) {
    case GET_ALL_TEST_MARKS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_TEST_MARKS_SUCCESS:
      return {
        ...state,
        loading: false,
        allTestMarks: action.payload,
      };
    case GET_ALL_TEST_MARKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getClassDetails = (state = { classDetails: {} }, action) => {
  switch (action.type) {
    case GET_ALL_CLASS_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_CLASS_DETAILS_SUCCESS:
      return {
        loading: false,
        classDetails: action.payload,
      };
    case GET_ALL_CLASS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
