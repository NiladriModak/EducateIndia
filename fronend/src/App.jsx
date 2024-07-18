import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./payment/Payment";
import PaymentStatus from "./payment/PaymentStatus";
import Home from "./Authentications/Home";
import Register from "./Authentications/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Authentications/Login";
import { useEffect } from "react";
import ProtectedRoute from "./Authentications/ProtectedRoute";
import Account from "./Component/Account/Account";
import UnprotectedRoute from "./Authentications/UnprotectedRoute";
import Class from "./Component/StudentOptions/Classes/Class";
import Jobs from "./Component/StudentOptions/Jobs/Jobs";
import Subjects from "./Component/StudentOptions/Subjects/Subjects";
import Teachers from "./Component/StudentOptions/Teachers/Teachers";
import TeachingArea from "./Component/StudentOptions/TeachingArea/TeachingArea";
import EnrolledClasses from "./Component/teacherComponents/EnrolledClassses/EnrolledClasses";
// import AnnouncementsTeacher from "./Component/teacherComponents/TeachingArea/AnnouncementsTeacher";
import CreateTest from "./Component/teacherComponents/TeachingArea/CreateTest";
import ViewTestTeacher from "./Component/StudentOptions/TeachingArea/ViewTestTeacher";
import GiveTest from "./Component/StudentOptions/TeachingArea/GiveTest";
import ScholarshipDetails from "./Component/StudentOptions/Scholarships/ScholarshipDetails";
import Library from "./Component/StudentOptions/Library/Library";
import VerifyTeacher from "./Component/admin/verifyTeacher/VerifyTeacher";
import AdminDashboard from "./Component/admin/adminDashboard/AdminDashboard";
// import EnrolledClasses from "./Component/teacherComponents/EnrolledClasses";

function App() {
  function isUserValid() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    let val = localStorage.getItem("token");
    if (!isUserValid()) {
      if (val !== null) {
        toast.error("Session expired! Please Login");
      }
    }
    if (val === null) {
      toast.success("Please Login");
    }
  }, []);
  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route element={<UnprotectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentSuccess" element={<PaymentStatus />} />
          <Route path="/studentRegister" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacherRegister" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Account />} />
          <Route path="/classes" element={<Class />} />
          <Route path="/classes/:classId/subjects" element={<Subjects />} />
          <Route
            path="/classes/:classId/subjects/:subjectId/teachers"
            element={<Teachers />}
          />
          <Route
            path="/classes/:classId/subjects/:subjectId/teachers/:teacherId"
            element={<TeachingArea />}
          ></Route>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/library" element={<Library />} />
          <Route path="/scholarships" element={<ScholarshipDetails />} />
          <Route path="/teacherDashboard" element={<Account />} />
          <Route path="/enrolledClasses" element={<EnrolledClasses />} />
          {/* {localStorage.getItem(type) && ( */}
          <Route
            path="enrolledClasses/:classId/subject/:subjectId/announcements"
            element={<TeachingArea />}
          />
          <Route
            path="/classes/:classId/subjects/:subjectId/teachers/:teacherId/test/:testId/giveTest"
            element={<GiveTest />}
          />
          {/* )} */}
          <Route
            path="enrolledClasses/:classId/subject/:subjectId/announcements/createTest"
            element={<CreateTest />}
          />
          <Route
            path="/enrolledClasses/:classId/subject/:subjectId/announcements/viewTest-teacher/:testId"
            element={<ViewTestTeacher />}
          />
          <Route
            path="/classes/:classId/subject/:subjectId/teacher/:teacherId/announcements/viewTest-student/:testId"
            element={<ViewTestTeacher />}
          />
          <Route path="/verifyTeacher" element={<VerifyTeacher />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
