const express = require("express");
const {
  createClass,
  assignClassToTeacher,
  confirmTeacher,
  getAllPendingTeacher,
} = require("../controllers/Classes/class");
const { isAuth } = require("../middlewires/auth");
const router = express.Router();
router.route("/classes").post(createClass);
router.route("/assignClassToTeacher/:teacherId").post(assignClassToTeacher);
router.route("/confirmTeacher").put(confirmTeacher);
router.route("/getAllPendingTeachers").get(getAllPendingTeacher);
module.exports = router;
