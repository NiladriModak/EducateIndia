import axios from "axios";
import {
  GET_ALL_BOOKS_FAIL,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
} from "../constants/LibraryConstants";
export const getBooks = () => async (dispatch) => {
  try {
    await dispatch({ type: GET_ALL_BOOKS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("http://gutendex.com/books/", config);
    console.log(data);

    await dispatch({ type: GET_ALL_BOOKS_SUCCESS, payload: data });
  } catch (error) {
    await dispatch({
      type: GET_ALL_BOOKS_FAIL,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
