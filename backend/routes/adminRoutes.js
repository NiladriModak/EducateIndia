const express = require("express");
const {
  createClass,
  assignClassToTeacher,
  confirmTeacher,
  getAllPendingTeacher,
} = require("../controllers/Classes/class");
const { isAuth } = require("../middlewires/auth");
const {
  registerAdmin,
  adminLogin,
} = require("../controllers/LoginSign/userControllers");
const router = express.Router();
router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(adminLogin);
router.route("/classes").post(createClass);
router.route("/assignClassToTeacher/:teacherId").post(assignClassToTeacher);
router.route("/confirmTeacher").put(confirmTeacher);
router.route("/getAllPendingTeachers").get(isAuth, getAllPendingTeacher);
module.exports = router;
