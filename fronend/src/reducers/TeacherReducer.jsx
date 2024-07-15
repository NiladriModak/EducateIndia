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
  GET_ALL_DETAILS_FAIL,
  GET_ALL_DETAILS_REQUEST,
  GET_ALL_DETAILS_SUCCESS,
  GET_ENROLLED_CLASSES_FAIL,
  GET_ENROLLED_CLASSES_REQUEST,
  GET_ENROLLED_CLASSES_SUCCESS,
  GET_TEACHER_FAIL,
  GET_TEACHER_REQUEST,
  GET_TEACHER_SUCCESS,
  REGISTER_TEACHER_FAIL,
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
} from "../constants/TeacherConstants";

export const getTeacherReducer = (state = { teachers: {} }, action) => {
  switch (action.type) {
    case GET_TEACHER_REQUEST:
      return {
        laoding: true,
      };
    case GET_TEACHER_SUCCESS:
      return {
        laoding: false,
        teachers: action.payload,
      };
    case GET_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getEnrolledClasses = (state = { enrolledClasses: {} }, action) => {
  switch (action.type) {
    case GET_ENROLLED_CLASSES_REQUEST:
      return {
        loading: true,
      };
    case GET_ENROLLED_CLASSES_SUCCESS:
      return {
        loading: false,
        enrolledClasses: action.payload,
      };
    case GET_ENROLLED_CLASSES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const createNewAnnouncement = (
  state = { announcements: {} },
  action
) => {
  switch (action.type) {
    case CREATE_ANNOUNCEMENT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        announcements: action.payload,
      };
    case CREATE_ANNOUNCEMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const createNotes = (state = { notes: {} }, action) => {
  switch (action.type) {
    case CREATE_NOTES_REQUEST:
      return {
        loading: true,
      };
    case CREATE_NOTES_SUCCESS:
      return {
        loading: false,
        notes: action.payload,
      };
    case CREATE_NOTES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const createVideos = (state = { notes: {} }, action) => {
  switch (action.type) {
    case CREATE_VIDEOS_REQUEST:
      return {
        loading: true,
      };
    case CREATE_VIDEOS_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
      };
    case CREATE_VIDEOS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const createTest = (state = { tests: {} }, action) => {
  switch (action.type) {
    case CREATE_TEST_REQUEST:
      return {
        loading: true,
      };
    case CREATE_TEST_SUCCESS:
      return {
        loading: false,
        tests: action.payload,
      };
    case CREATE_TEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getAllDetails = (state = { allDetails: {} }, action) => {
  switch (action.type) {
    case GET_ALL_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_DETAILS_SUCCESS:
      return {
        loading: false,
        allDetails: action.payload,
      };
    case GET_ALL_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const registerTeacher = (state = { teacher: {} }, action) => {
  switch (action.type) {
    case REGISTER_TEACHER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_TEACHER_SUCCESS:
      return {
        loading: false,
        teacher: action.payload,
      };
    case REGISTER_TEACHER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
