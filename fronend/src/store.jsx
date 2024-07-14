import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { studentAuthReducer } from "./reducers/AuthReducer";
import {
  classIdReducer,
  createAnswer,
  getAllTestMarksReducer,
  getAnnouncements,
  getClassDetails,
  getQuestions,
  getSingleTest,
  getStudentTest,
  getTest,
  getVideos,
  notes,
  uploadTotalMarks,
} from "./reducers/ClassReducers";
import { subjectReducer } from "./reducers/SujectReducer";
import {
  createNewAnnouncement,
  createNotes,
  createTest,
  createVideos,
  getAllDetails,
  getEnrolledClasses,
  getTeacherReducer,
} from "./reducers/TeacherReducer";
import { getJob, getScholarship } from "./reducers/JobReducer";
import { getBooks } from "./reducers/LibraryReducer";

// Combine reducers (you currently have an empty object, you'll add reducers here later)
const reducers = combineReducers({
  student: studentAuthReducer,
  classId: classIdReducer,
  subjects: subjectReducer,
  teachers: getTeacherReducer,
  notes: notes,
  videos: getVideos,
  tests: getTest,
  announcements: getAnnouncements,
  enrolledClasses: getEnrolledClasses,
  newannouncements: createNewAnnouncement,
  newnotes: createNotes,
  newvideos: createVideos,
  newtest: createTest,
  questions: getQuestions,
  singleTest: getSingleTest,
  createAnswer: createAnswer,
  studentTest: getStudentTest,
  totalMarks: uploadTotalMarks,
  allTestScore: getAllTestMarksReducer,
  allJobs: getJob,
  allScholarships: getScholarship,
  allBooks: getBooks,
  allDetails: getAllDetails,
  classDetails: getClassDetails,
});

// Define initial state for the store (currently empty)
const initialState = {};

// Define middleware array, including only thunk middleware for now
const middleware = [thunk];

// Create the Redux store, applying middleware and using DevTools extension
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Export the store
export default store;
