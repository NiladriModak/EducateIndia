import {
  GET_ALL_BOOKS_FAIL,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
} from "../constants/LibraryConstants";

export const getBooks = (state = { allBooks: {} }, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_BOOKS_SUCCESS:
      return {
        loading: false,
        allBooks: action.payload,
      };
    case GET_ALL_BOOKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
