import {
  GET_JOB_FAIL,
  GET_JOB_REQUEST,
  GET_JOB_SUCCESS,
  GET_SCHOLARSHIP_FAIL,
  GET_SCHOLARSHIP_REQUEST,
  GET_SCHOLARSHIP_SUCCESS,
} from "../constants/JobConstants";

export const getJob = (state = { allJobs: {} }, action) => {
  switch (action.type) {
    case GET_JOB_REQUEST:
      return {
        loading: true,
      };
    case GET_JOB_SUCCESS:
      return {
        loading: false,
        allJobs: action.payload,
      };
    case GET_JOB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getScholarship = (state = { allScholarships: {} }, action) => {
  switch (action.type) {
    case GET_SCHOLARSHIP_REQUEST:
      return {
        loading: true,
      };
    case GET_SCHOLARSHIP_SUCCESS:
      return {
        loading: false,
        allScholarships: action.payload,
      };
    case GET_SCHOLARSHIP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
