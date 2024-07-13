const express = require("express");
const app = express();

const errorMiddlewire = require("./middlewires/error");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

//cookie parser did not worked
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies

const Razorpay = require("razorpay");
exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.get("/", (req, res) => {
  res.send("allow");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/files", express.static("files"));

const user = require("./routes/userRoutes");
const payment = require("./routes/paymentRoutes");
const teacher = require("./routes/teacherRoutes");
const admin = require("./routes/adminRoutes");
app.use("/api", user);
app.use("/api", payment);
app.use("/api", teacher);
app.use("/api", admin);
const prisma = new PrismaClient();
prisma
  .$connect()
  .then(() => {
    console.log("Connected to MongoDB database");
    // Any additional code to be executed after successful connection
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB database:", error);
  });

app.use(errorMiddlewire);

// const express = require("express");
// const cors = require("cors");
// const app = express();
// const multer = require("multer");
// const fs = require("fs");
// const cookieParser = require("cookie-parser");
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//   })
// );
// // app.use("/files", express.static("files")); //make accessed by all
// app.use(cookieParser);

// // ------------------------------------------------------------------------

// // Initialize PrismaClient
// //creating student

// const PORT = "800";
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Route to create a new teacher
// app.get("/", (req, res) => {
//   console.log("Server is running");
//   res.send("Server is running");
// });
// app.post("/students", async (req, res) => {
//   try {
//     console.log("yes");
//     const { name, email, password } = req.body;
//     const student = await prisma.Student.create({
//       data: {
//         name,
//         email,
//         password,
//       },
//     });
//     console.log("no");
//     res.json(student);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error creating student" });
//   }
// });

// // app.post("/teachers", async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     const teacher = await prisma.teacher.create({
// //       data: {
// //         name,
// //         email,
// //         password,
// //       },
// //     });
// //     res.json(teacher);
// //   } catch (error) {
// //     res.status(500).json({ error: "Error creating teacher" });
// //   }
// // });

// // // Route to create a new class
// // app.post("/classes", async (req, res) => {
// //   try {
// //     const { name } = req.body;
// //     const newClass = await prisma.class.create({
// //       data: {
// //         name,
// //       },
// //     });
// //     res.json(newClass);
// //   } catch (error) {
// //     res.status(500).json({ error: "Error creating class" });
// //   }
// // });

// // //assign class to student
// // app.post("/students/:studentId/classes/:classId", async (req, res) => {
// //   try {
// //     const { classId, studentId } = req.params;

// //     // Check if the student exists
// //     const student = await prisma.student.findUnique({
// //       where: {
// //         id: studentId,
// //       },
// //     });
// //     if (!student) {
// //       return res.status(404).json({ error: "Student not found" });
// //     }

// //     // Check if the class exists
// //     const selectedClass = await prisma.class.findUnique({
// //       where: {
// //         id: classId,
// //       },
// //     });
// //     if (!selectedClass) {
// //       return res.status(404).json({ error: "Class not found" });
// //     }

// //     const exists = await prisma.studentInClass.findMany({
// //       where: {
// //         studentId: studentId,
// //         classId: classId,
// //       },
// //     });
// //     // console.log(exists);
// //     if (exists.length > 0) {
// //       res.json({
// //         message: "already exist",
// //       });
// //       return;
// //     }
// //     // Create a new entry in the StudentInClass table
// //     const enrollment = await prisma.StudentInClass.create({
// //       data: {
// //         student: { connect: { id: studentId } },
// //         class: { connect: { id: classId } },
// //       },
// //     });

// //     res.json(enrollment);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Error adding class to student" });
// //   }
// // });

// // // Route to find all students in a specific class
// // app.get("/classes/:classId/students", async (req, res) => {
// //   try {
// //     const { classId } = req.params;
// //     const studentClasses = await prisma.studentInClass.findMany({
// //       where: {
// //         classId: classId,
// //       },
// //       include: {
// //         student: true,
// //       },
// //     });
// //     const students = studentClasses.map((studentClass) => studentClass.student);
// //     res.json({ students });
// //   } catch (error) {
// //     res.status(500).json({ error: "Error finding students in class" });
// //   }
// // });

// // //Route to find all classes a student is assigned
// // app.get("/students/:studentId/classes", async (req, res) => {
// //   try {
// //     const { studentId } = req.params;
// //     const studentClasses = await prisma.studentInClass.findMany({
// //       where: {
// //         studentId: studentId,
// //       },
// //       include: {
// //         class: true,
// //       },
// //     });
// //     const classes = studentClasses.map((studentClass) => studentClass.class);

// //     res.json(classes);
// //   } catch (error) {
// //     res.status(500).json({ error: "Error finding classes for the student" });
// //   }
// // });

// // //assigning class to teacher must add subject
// // app.post("/assignClassToTeacher/:teacherId", async (req, res) => {
// //   try {
// //     const { classNames } = req.body;
// //     const { teacherId } = req.params;
// //     if (!classNames || !teacherId) {
// //       console.log("provide all details");
// //       return;
// //     }
// //     var allClasses = [];
// //     for (const className of classNames) {
// //       // Find the class by name
// //       const classData = await prisma.class.findUnique({
// //         where: {
// //           name: className[0],
// //         },
// //       });

// //       if (!classData) {
// //         console.log(`Class ${className[0]} not found.`);
// //         continue;
// //       }

// //       //check existance of subject
// //       var subject = await prisma.Subject.findFirst({
// //         where: {
// //           subjectName: className[1],
// //         },
// //       });

// //       if (!subject) {
// //         const createSubject = await prisma.Subject.create({
// //           data: {
// //             subjectName: className[1],
// //           },
// //         });
// //         subject = createSubject;
// //       }
// //       console.log(subject);
// //       // Check if the class is already assigned to the teacher
// //       const existingAssignment = await prisma.TeacherSubjectClass.findMany({
// //         where: {
// //           classId: classData.id,
// //           teacherId: teacherId,
// //           subjectId: subject.id,
// //         },
// //       });

// //       if (existingAssignment.length > 0) {
// //         console.log(
// //           `Class ${className} and subject ${className[1]} is already assigned to teacher.`
// //         );
// //         continue;
// //       }

// //       // Assign the class to the teacher
// //       const assignment = await prisma.TeacherSubjectClass.create({
// //         data: {
// //           classId: classData.id,
// //           teacherId: teacherId,
// //           subjectId: subject.id,
// //         },
// //       });

// //       allClasses.push(assignment);
// //     }

// //     res.json({ allClasses });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // });

// // //get all teachers of a particular subject and particular class
// // app.get("/classes/:classId/subjects/:subjectId/teachers", async (req, res) => {
// //   try {
// //     const { classId, subjectId } = req.params;
// //     const allDetails = await prisma.TeacherSubjectClass.findMany({
// //       where: {
// //         classId: classId,
// //         subjectId: subjectId,
// //       },
// //       include: {
// //         teacher: true,
// //       },
// //     });
// //     const teachers = allDetails.map((singleDetail) => singleDetail.teacher);
// //     res.json(teachers);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // });

// // //get all the subjects of the class
// // app.get("/class/:classId/subjects", async (req, res) => {
// //   try {
// //     const { classId } = req.params;
// //     const uniqueSubjects = await prisma.teacherSubjectClass.findMany({
// //       where: {
// //         classId: classId,
// //       },
// //       select: {
// //         subject: true,
// //       },
// //       distinct: ["subjectId"], // Retrieve only distinct subjects
// //     });

// //     const subjects = uniqueSubjects.map((detail) => detail.subject);
// //     res.json(subjects);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });

// // //post pdf by teacher ----------------------------------------------------------------------------------
// // const destinationDirectory = "./files";
// // if (!fs.existsSync(destinationDirectory)) {
// //   fs.mkdirSync(destinationDirectory);
// // }
// // const storage = multer.diskStorage({
// //   destination: function (req, pdfData, cb) {
// //     cb(null, "./files");
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now();
// //     cb(null, file.originalname + "-" + uniqueSuffix);
// //   },
// // });
// // const upload = multer({ storage: storage });
// // app.post(
// //   "/class/:classId/subject/:subjectId/teacher/:teacherId/uploadPdf",
// //   upload.single("pdfData"),
// //   async (req, res) => {
// //     try {
// //       const { name, description } = req.body;
// //       const pdfData = req.file;
// //       const { classId, subjectId, teacherId } = req.params;
// //       const date = new Date(Date.now());
// //       const fileData = await prisma.Notes.create({
// //         data: {
// //           name,
// //           description,
// //           classId,
// //           subjectId,
// //           teacherId,
// //           date,
// //           pdfData,
// //         },
// //       });
// //       res.json(fileData);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
// // );

//get pdf
// app.get(
//   "api/classes/:classId/subjects/:subjectId/teachers/:teacherId/showPdf",
//   async (req, res) => {
//     try {
//       const { classId, subjectId, teacherId } = req.params;
//       const allPdfs = await prisma.Notes.findMany({
//         where: {
//           classId: classId,
//           subjectId: subjectId,
//           teacherId: teacherId,
//         },
//       });
//       res.json({
//         allPdfs,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// // //------------------------------------------------------------------------------------------------
// // // Start the server
