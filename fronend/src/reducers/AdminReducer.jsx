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

export const getPendingTeachers = (state = { pendingTeachers: {} }, action) => {
  switch (action.type) {
    case GET_PENDING_TEACHERS_REQUEST:
      return {
        loading: true,
      };
    case GET_PENDING_TEACHERS_SUCCESS:
      return {
        loading: false,
        pendingTeachers: action.payload,
      };
    case GET_PENDING_TEACHERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const registerAdmin = (state = { admin: {} }, action) => {
  switch (action.type) {
    case REGISTER_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_ADMIN_SUCCESS:
      return {
        loading: false,
        admin: action.payload,
      };
    case REGISTER_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPendingClasses = (state = { pendingClasses: {} }, action) => {
  switch (action.type) {
    case GET_PENDING_CLASSES_REQUEST:
      return {
        loading: true,
      };
    case GET_PENDING_CLASSES_SUCCESS:
      return {
        loading: false,
        pendingClasses: action.payload,
      };
    case GET_PENDING_CLASSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
