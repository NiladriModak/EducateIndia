import {
  FAIL_SUBJECT,
  REQUEST_SUBJECT,
  SUCCESS_SUBJECT,
} from "../constants/SubjectConstants";

export const subjectReducer = (state = { sujects: {} }, action) => {
  switch (action.type) {
    case REQUEST_SUBJECT:
      return {
        loading: true,
      };
    case SUCCESS_SUBJECT:
      return {
        loading: false,
        subjects: action.payload,
      };
    case FAIL_SUBJECT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
