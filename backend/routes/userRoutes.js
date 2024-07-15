const express = require("express");
const router = express.Router();
const {
  studentRegistration,
  teacherRegistration,
  studentLogin,
  teacherLogin,
} = require("../controllers/LoginSign/userControllers");
const {
  findAllStudentsInClass,
  getAllTeachersOfSubjectClass,
  getAllSubjectsOfClass,
  getPdf,
  getAllVideosClassSubjectTeacher,
  getAllClassesOfStudent,
  getAllClasses,
  viewTest,
  viewAnnouncements,
  getQuestions,
  viewSingleTest,
  createAnswers,
  allTestStudents,
  getStudentMarks,
  uploadTotalMarks,
  getMarksOfAllGivenTest,
  getJob,
  getScholarships,
  getAllClassDetails,
} = require("../controllers/Classes/class");
const { isAuth } = require("../middlewires/auth");

router.route("/studentRegistration").post(studentRegistration);
router.route("/studentLogin").post(studentLogin);

router.route("/teacherRegistration").post(teacherRegistration);

router
  .route("/classes/:classId/subjects/:subjectId/teachers")
  .get(isAuth, getAllTeachersOfSubjectClass);

router.route("/class/:classId/subjects").get(isAuth, getAllSubjectsOfClass);
router
  .route("/classes/:classId/subjects/:subjectId/teachers/:teacherId/showPdf")
  .get(isAuth, getPdf);
router
  .route("/classes/:classId/subjects/:subjectId/teachers/:teacherId/showVideos")
  .get(isAuth, getAllVideosClassSubjectTeacher);

router
  .route("/students/:studentId/classes")
  .get(isAuth, getAllClassesOfStudent);

router
  .route(
    "/classes/:classId/subjects/:subjectId/teachers/:teacherId/test/:testId/giveTest"
  )
  .get(isAuth, getQuestions);

router
  .route("/classes/:classId/subejcts/:subjectId/teachers/:teacherId/viewTests")
  .get(isAuth, viewTest);

router
  .route("/classes/:classId/subjects/:subjectId/teachers/:teacherId/announce")
  .get(isAuth, viewAnnouncements);

router
  .route(
    "/classes/:classId/subjects/:subjectId/teachers/:teacherId/viewTests/:testId"
  )
  .get(isAuth, viewSingleTest);

router
  .route("/student/:studentId/test/:testId/question/:questionId/createAnswer")
  .post(isAuth, createAnswers);
router.route("/student/:studentId/getStudent").get(isAuth, getStudentMarks);

router
  .route("/student/:studentId/test/:testId/uploadMarks")
  .post(isAuth, uploadTotalMarks);
router.route("/student/:studentId/getTestMarks").get(getMarksOfAllGivenTest);
router.route("/getJobs").get(isAuth, getJob);
router.route("/getScholarships").get(isAuth, getScholarships);
router.route("/getallClassDetails").get(isAuth, getAllClassDetails);
module.exports = router;
