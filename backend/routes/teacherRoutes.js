const express = require("express");
const {
  uploadVideo,
  UploadPdf,
  createTest,
  createAnnounce,
  requestTeacher,
  getAllEnrolledClasses,
  allTestStudents,
  getDetailsOfTeacher,
  requestForClasses,
} = require("../controllers/Classes/class");
const { isTeacher } = require("../middlewires/auth");
const { teacherLogin } = require("../controllers/LoginSign/userControllers");
const router = express.Router();
router
  .route("/classes/:classId/subjects/:subjectId/teachers/:teacherId/uploadPdf")
  .post(isTeacher, UploadPdf);
router
  .route(
    "/classes/:classId/subjects/:subjectId/teachers/:teacherId/uploadVideos"
  )
  .post(isTeacher, uploadVideo);
router
  .route("/classes/:classId/subjects/:subjectId/teachers/:teacherId/createTest")
  .post(isTeacher, createTest);

router
  .route("/classes/:classId/subjects/:subjectId/teachers/:teacherId/announce")
  .post(isTeacher, createAnnounce);

router.route("/teacherLogin").post(teacherLogin);
router
  .route("/teachers/:teacherId/getEnrolledClasses")
  .get(isTeacher, getAllEnrolledClasses);
router.route("/requestTeacher").post(requestTeacher);
router
  .route("test/:testId/viewAllTestStudents")
  .get(isTeacher, allTestStudents);

router.route("/getFullDetails/:teacherId").get(getDetailsOfTeacher);
router.route("/requestForClasses").post(isTeacher, requestForClasses);
module.exports = router;
