const express = require("express");
const {
  createClass,
  assignClassToTeacher,
  confirmTeacher,
  getAllPendingTeacher,
  confirmClasses,
  getAllPendingClasses,
} = require("../controllers/Classes/class");
const { isAuth, isAdmin } = require("../middlewires/auth");
const {
  registerAdmin,
  adminLogin,
} = require("../controllers/LoginSign/userControllers");
const router = express.Router();
router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(adminLogin);
router.route("/classes").post(createClass);
router
  .route("/assignClassToTeacher/:teacherId")
  .post(isAdmin, assignClassToTeacher);
router.route("/confirmTeacher").put(isAdmin, confirmTeacher);
router.route("/getAllPendingTeachers").get(isAdmin, getAllPendingTeacher);
router.route("/confirmClasses").put(isAdmin, confirmClasses);
router.route("/getAllPendingClasses").get(isAdmin, getAllPendingClasses);
module.exports = router;
