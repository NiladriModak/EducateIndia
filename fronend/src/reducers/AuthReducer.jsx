import {
  FAIL_LOGIN_STUDENT,
  FAIL_REGISTER_STUDENT,
  REQUEST_LOGIN_STUDENT,
  REQUEST_REGISTER_STUDENT,
  SUCCESS_LOGIN_STUDENT,
  SUCCESS_REGISTER_STUDENT,
} from "../constants/AuthConstants";

export const studentAuthReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case REQUEST_REGISTER_STUDENT:
    case REQUEST_LOGIN_STUDENT:
      return {
        loading: true,
        isStudent: false,
      };
    case SUCCESS_REGISTER_STUDENT:
    case SUCCESS_LOGIN_STUDENT:
      return {
        loading: false,
        isStudent: true,
        student: action.payload,
      };
    case FAIL_REGISTER_STUDENT:
    case FAIL_LOGIN_STUDENT:
      return {
        ...state,
        loading: false,
        isStudent: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
