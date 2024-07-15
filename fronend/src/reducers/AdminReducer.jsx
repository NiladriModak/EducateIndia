import {
  GET_PENDING_TEACHERS_FAIL,
  GET_PENDING_TEACHERS_REQUEST,
  GET_PENDING_TEACHERS_SUCCESS,
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
