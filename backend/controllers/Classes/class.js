const errorHandler = require("../../utils/ErrorHandler");
const fs = require("fs");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const { connect } = require("http2");
const { errorMonitor } = require("events");
const axios = require("axios");

const prisma = new PrismaClient();

// User Class Routes------------------------------------------------------------------------------------------------

//get all teachers of a particular subject and particular class ((user))
exports.getAllTeachersOfSubjectClass = async (req, res, next) => {
  try {
    const { classId, subjectId } = req.params;
    console.log(classId, subjectId);
    const allDetails = await prisma.TeacherSubjectClass.findMany({
      where: {
        classId: classId,
        subjectId: subjectId,
      },
      include: {
        teacher: true,
      },
    });
    // console.log(allDetails);
    const teachers = allDetails
      .filter((detail) => detail.teacher !== null)
      .map((detail) => detail.teacher);
    res.json({ success: true, teachers });
  } catch (error) {
    return next(new errorHandler(error.message, 404));
  }
};

//get all subjects of class ((user))
exports.getAllSubjectsOfClass = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const uniqueSubjects = await prisma.TeacherSubjectClass.findMany({
      where: {
        classId: classId,
      },
      select: {
        subject: true,
      },
      distinct: ["subjectId"], // Retrieve only distinct subjects
    });

    const subjects = uniqueSubjects.map((detail) => detail.subject);
    res.json(subjects);
  } catch (error) {
    return next(new errorHandler(error.message, 404));
  }
};

//get all videos of a particular class and subject and teacher
exports.getAllVideosClassSubjectTeacher = async (req, res, next) => {
  try {
    const { classId, subjectId, teacherId } = req.params;
    // console.log("ho", classId, subjectId, teacherId);
    const allVideos = await prisma.Videos.findMany({
      where: {
        teacherId,
        classId,
        subjectId,
      },
      include: {
        subject: true,
        class: true,
        createdBy: true,
      },
    });
    res.status(200).json({
      allVideos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.getAllClassesOfStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const studentClasses = await prisma.studentInClass.findMany({
      where: {
        studentId: studentId,
      },
      include: {
        class: true,
      },
    });
    const classes = await studentClasses.map(
      (studentClass) => studentClass.class
    );

    res.status(200).json({
      classes,
    });
  } catch (error) {
    res.status(500).json({ error: "Error finding classes for the student" });
  }
};

exports.viewTest = async (req, res, next) => {
  try {
    const { classId, subjectId, teacherId } = req.params;
    const tests = await prisma.Test.findMany({
      where: {
        classId,
        subjectId,
        teacherId,
      },
      include: {
        class: true,
        subject: true,
        teacher: true,
      },
    });

    const pastTest = [];
    const upcomingTest = [];
    const currentTest = [];
    const currentDate = new Date();

    tests.forEach((test) => {
      const startDate = new Date(test.date);
      console.log(startDate, test.title, test.description, test.duration);

      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + test.duration);

      if (startDate > currentDate) {
        upcomingTest.push(test);
      } else if (currentDate >= startDate && currentDate <= endDate) {
        currentTest.push(test);
      } else {
        pastTest.push(test);
      }
    });

    res.status(200).json({
      pastTest,
      currentTest,
      upcomingTest,
    });
  } catch (error) {
    next(new errorHandler(error.message, 404));
  }
};

exports.getQuestions = async (req, res, next) => {
  try {
    console.log("first");
    const { testId } = req.params;
    console.log(testId);
    if (!testId) {
      return res.status(400).json({
        error: "Invalid testId",
        success: false,
      });
    }

    const questions = await prisma.question.findMany({
      where: {
        testId,
      },
      include: {
        test: true,
      },
    });
    res.status(200).json({
      questions,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    });
    // next(new errorHandler("Internal Server Error", 500));
  }
};

exports.viewAnnouncements = async (req, res, next) => {
  try {
    const { classId, subjectId, teacherId } = req.params;
    const announce = await prisma.Announcement.findMany({
      where: {
        classId,
        teacherId,
        subjectId,
      },
      include: {
        createdBy: true,
        class: true,
        subject: true,
      },
    });
    const currDate = new Date();
    const recentAnnounce = [];
    const pastAnnounce = [];
    announce &&
      announce.forEach((ann) => {
        if (ann.date.getDate() === currDate.getDate()) {
          recentAnnounce.push(ann);
        } else {
          pastAnnounce.push(ann);
        }
      });
    res.json({
      recentAnnounce,
      pastAnnounce,
    });
  } catch (error) {
    next(new errorHandler(error.message, 404));
  }
};

exports.viewSingleTest = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const data = await prisma.Test.findUnique({
      where: {
        id: testId,
      },
    });
    res.status(200).json({
      singleTest: data,
    });
  } catch (error) {
    next(new errorHandler("Cannot fetch Test", 400));
  }
};
// End of User Class Routes________________________________________________________________________________________

//post pdf by teacher ----------------------------------------------------------------------------------
// const fs = require("fs");
// const multer = require("multer");
// const { PrismaClient } = require("@prisma/client"); // Assuming you use Prisma for database
// const prisma = new PrismaClient();

const destinationDirectory = "./files";
if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.UploadPdf = async (req, res) => {
  upload.single("pdfData")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "File upload failed." });
    }

    try {
      const { name, description } = req.body;
      const { classId, subjectId, teacherId } = req.params;
      const date = new Date();

      if (!req.file) {
        return res.status(400).json({ error: "No file provided." });
      }

      const pdfData = req.file.filename;

      try {
        const fileData = await prisma.Notes.create({
          data: {
            name,
            description,
            createdBy: { connect: { id: teacherId } },
            subject: { connect: { id: subjectId } },
            class: { connect: { id: classId } },
            date,
            pdfData,
          },
          include: {
            createdBy: true,
            subject: true,
            class: true,
          },
        });

        res.json(fileData);
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.status(500).json({ error: "Database error." });
      }
    } catch (error) {
      console.error("Internal server error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
};

exports.uploadVideo = async (req, res, next) => {
  try {
    console.log("came");
    const { name, description, url } = req.body;
    const { classId, subjectId, teacherId } = req.params;
    const uploadLink = await prisma.videos.create({
      data: {
        name,
        description,
        url,
        createdBy: { connect: { id: teacherId } }, // Connect to Teacher by ID
        subject: { connect: { id: subjectId } }, // Connect to Subject by ID
        class: { connect: { id: classId } }, // Connect to Class by ID
        date: new Date(Date.now()),
      },
      include: {
        createdBy: true,
        subject: true,
        class: true,
      },
    });
    res.status(200).json({
      uploadLink,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.createTest = async (req, res, next) => {
  try {
    const { classId, subjectId, teacherId } = req.params;
    const { description, title, duration, questions, date } = req.body;

    const createdTest = await prisma.$transaction(async (prisma) => {
      const newTest = await prisma.test.create({
        data: {
          title,
          description,
          teacher: { connect: { id: teacherId } }, // Connect to Teacher by ID
          subject: { connect: { id: subjectId } }, // Connect to Subject by ID
          class: { connect: { id: classId } }, // Connect to Class by ID
          date,
          duration,
        },
        include: {
          teacher: true,
          class: true,
          subject: true,
        },
      });
      console.log("came");
      const questionData = questions.map((q) => ({
        text: q[0],
        marks: q[1],
        options: q[2],
        correctAnswer: q[3],
        testId: newTest.id,
      }));

      await prisma.question.createMany({
        data: questionData,
      });

      return newTest;
    });

    res.status(200).json({
      test: createdTest,
      success: true,
    });
  } catch (error) {
    next(new errorHandler(error, 404));
  }
};

exports.allTestStudents = async (req, res, next) => {
  try {
    const { testId } = req.body;
    const students = await prisma.Answer.findMany({
      where: {
        testId: testId,
      },
      include: {
        student: true,
      },
    });
    res.status(200).json({
      allStudents: students,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

exports.getStudentMarks = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const data = await prisma.Answer.findMany({
      where: {
        studentId: studentId,
      },
      include: {
        student: true,
        test: true,
      },
    });
    res.status(200).json({
      findStudent: data,
      success: true,
    });
  } catch (error) {
    next(new errorHandler(error, 400));
  }
};

exports.uploadTotalMarks = async (req, res, next) => {
  try {
    const { studentId, testId } = req.params;
    const { totalMarks, fullMarks } = req.body;
    const data = await prisma.StudentTest.create({
      data: {
        studentId,
        testId,
        totalMarks,
        fullMarks,
      },
    });
    res.status(200).json({
      studentTotalMarks: data,
      success: true,
    });
  } catch (error) {
    next(new errorHandler(error, 400));
  }
};

exports.getMarksOfAllGivenTest = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const data = await prisma.StudentTest.findMany({
      where: {
        studentId,
      },
      include: {
        test: true,
        student: true,
      },
    });
    res.status(200).json({
      studentTestMarks: data,
    });
  } catch (error) {
    next(new errorHandler(error, 400));
  }
};

//create answers given by the students
exports.createAnswers = async (req, res, next) => {
  try {
    const { studentId, testId, questionId } = req.params;
    const { givenAnswer, obtainedMarks } = req.body;
    const data = await prisma.Answer.create({
      data: {
        test: { connect: { id: testId } },
        student: { connect: { id: studentId } },
        question: { connect: { id: questionId } },
        givenAnswer,
        obtainedMarks,
      },
      include: {
        test: true,
        student: true,
        question: true,
      },
    });
    res.status(200).json({
      answers: data,
      success: true,
    });
  } catch (error) {
    next(new errorHandler(error, 400));
  }
};

exports.createAnnounce = async (req, res, next) => {
  try {
    const { classId, subjectId, teacherId } = req.params;
    const { heading, content } = req.body;
    // console.log(heading, content);
    const announce = await prisma.Announcement.create({
      data: {
        heading,
        content,
        createdBy: { connect: { id: teacherId } }, // Connect to Teacher by ID
        subject: { connect: { id: subjectId } }, // Connect to Subject by ID
        class: { connect: { id: classId } }, // Connect to Class by ID
      },
      include: {
        createdBy: true,
        class: true,
        subject: true,
      },
    });
    res.status(200).json({
      announce,
      success: true,
    });
  } catch (error) {
    next(new errorHandler(error.message, 404));
  }
};

exports.requestTeacher = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const alreadyExist = await prisma.Teacher.findFirst({
      where: {
        email,
      },
    });
    if (alreadyExist) {
      res.status(200).json({
        message: "Teacher is already registered",
      });
      return;
    }
    const alreadyExistt = await prisma.TeacherPending.findFirst({
      where: {
        email,
      },
    });
    if (alreadyExistt) {
      res.status(200).json({
        message: "Request already exists",
      });
      return;
    }
    const requestedTeachers = await prisma.TeacherPending.create({
      data: {
        email: email,
        name: name,
        password: password,
        isConfirmed: false,
      },
    });
    res.status(200).json({
      message: "success",
      requestedTeachers,
    });
  } catch (error) {
    res.status(404).json({
      message: "false",
    });
  }
};

//get all classes of a particular teacher

exports.getAllEnrolledClasses = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    console.log(teacherId);
    const data = await prisma.TeacherSubjectClass.findMany({
      where: {
        teacherId,
      },
      include: {
        subject: true,
        class: true,
      },
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(new errorHandler(error.message, 404));
  }
};
//get all the subjects entrolled by the teacher

// teacher class route_______________________________________________________________________________________

//admin class routes------------------------------------------------------------------------------------------
exports.getPdf = async (req, res, next) => {
  try {
    const { classId, subjectId, teacherId } = req.params;
    // console.log(classId, subjectId, teacherId);
    const allPdfs = await prisma.Notes.findMany({
      where: {
        classId: classId,
        subjectId: subjectId,
        teacherId: teacherId,
      },
    });
    res.json({
      success: true,
      allPdfs,
    });
  } catch (error) {
    console.log(error);
  }
};

//creating class ((admin))
exports.createClass = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(new errorHandler("Enter the class", 400));
    }
    const existClass = await prisma.Class.findUnique({
      where: {
        name,
      },
    });
    if (existClass) {
      return next(new errorHandler("Class Already Exists", 400));
    }
    const newClass = await prisma.Class.create({
      data: {
        name,
      },
    });
    res.status(200).json({ newClass });
  } catch (error) {
    return next(new errorHandler("Error creating class", 404));
  }
};

//assigning class to teacher must add subject ((admin))
exports.assignClassToTeacher = async (req, res, next) => {
  try {
    const { classNames } = req.body;
    const { teacherId } = req.params;
    if (!classNames || !teacherId) {
      console.log("provide all details");
      return;
    }
    var allClasses = [];
    for (const className of classNames) {
      // Find the class by name
      var classData = await prisma.class.findUnique({
        where: {
          name: className[0],
        },
      });

      if (!classData) {
        const createClass = await prisma.Class.create({
          data: {
            name: className[0],
          },
        });
        classData = createClass;
      }

      //check existance of subject
      var subject = await prisma.Subject.findFirst({
        where: {
          subjectName: className[1],
        },
      });

      if (!subject) {
        const createSubject = await prisma.Subject.create({
          data: {
            subjectName: className[1],
          },
        });
        subject = createSubject;
      }
      console.log(subject);
      // Check if the class is already assigned to the teacher
      const existingAssignment = await prisma.TeacherSubjectClass.findMany({
        where: {
          classId: classData.id,
          teacherId: teacherId,
          subjectId: subject.id,
        },
      });

      if (existingAssignment.length > 0) {
        console.log(
          `Class ${className} and subject ${className[1]} is already assigned to teacher.`
        );
        continue;
      }

      // Assign the class to the teacher
      const assignment = await prisma.TeacherSubjectClass.create({
        data: {
          classId: classData.id,
          teacherId: teacherId,
          subjectId: subject.id,
        },
      });

      allClasses.push(assignment);
    }

    res.status(200).json({ allClasses });
  } catch (error) {
    return next(new errorHandler("InternalError", 404));
  }
};

exports.confirmTeacher = async (req, res, next) => {
  try {
    const { email, confirm } = req.body;
    if (confirm === true) {
      const dataa = await prisma.TeacherPending.update({
        where: {
          email,
        },
        data: {
          isConfirmed: true,
        },
      });
      res.status(200).json({
        dataa,
        message: "true",
      });
    } else if (confirm === false) {
      const dataa = await prisma.TeacherPending.delete({
        where: {
          email,
        },
      });
      res.status(200).json({
        dataa,
        message: "true",
      });
    }
  } catch (error) {
    next(new errorHandler("Error in confirming teacher", 400));
  }
};

exports.getAllPendingTeacher = async (req, res, next) => {
  try {
    const allPendingTeacher = await prisma.TeacherPending.findMany({});
    res.status(200).json({
      allPendingTeacher,
    });
  } catch (error) {
    next(new errorHandler(error, 400));
  }
};
// end of admin class route_________________________________________________________

//upload videos by teacher
//JOBS--------------------------------------------------------------------------------------
exports.getJob = async (req, res, next) => {
  try {
    const response = await axios.get("https://arbeitnow.com/api/job-board-api");
    res.json(response.data);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
    res.status(error.response ? error.response.status : 500).json({
      message: errorMessage,
    });
  }
};

exports.getScholarships = async (req, res, next) => {
  try {
    var url =
      "https://api.currentsapi.services/v1/search?" +
      "keywords=Scholarships&language=en&" +
      "apiKey=GuNFgWuD8mQ5yGXYvWdcq5abVaF7KLLsKiPmpiGo7RU79B9u";
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
    res.status(error.response ? error.response.status : 500).json({
      message: errorMessage,
    });
  }
};

exports.getDetailsOfTeacher = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const allTestByTeacher = await prisma.Test.findMany({
      where: {
        teacherId,
      },
    });
    const allNotesByTeacher = await prisma.Notes.findMany({
      where: {
        teacherId,
      },
    });
    const allVideosByTeacher = await prisma.Videos.findMany({
      where: {
        teacherId,
      },
    });
    const numberOfStudentsGivenTest = [];
    const allStudentGivenTest = [];
    for (const test of allTestByTeacher) {
      const students = await prisma.StudentTest.findMany({
        where: {
          testId: test.id,
        },
        include: {
          test: true,
        },
      });
      if (students.length > 0) {
        allStudentGivenTest.push(...students);
        numberOfStudentsGivenTest.push({
          test,
          numberOfStudents: students.length,
        });
      }
    }
    res.status(200).json({
      allTestByTeacher,
      numberOfTest: allTestByTeacher.length,
      allNotesByTeacher,
      numberOfNotes: allNotesByTeacher.length,
      allVideosByTeacher,
      numberOfVideos: allVideosByTeacher.length,
      allStudentGivenTest,
      numberOfStudentsGivenTest,
      success: true,
    });
  } catch (error) {
    next(new errorHandler(error, 400));
  }
};

exports.getAllClassDetails = async (req, res, next) => {
  try {
    const data = await prisma.TeacherSubjectClass.findMany({
      include: {
        teacher: true,
        subject: true,
        class: true,
      },
    });
    const uniqueClasses = new Set();
    const subjectByClass = {};
    const teacherByClass = {};
    const classDetails = {};
    data?.forEach((record) => {
      const classid = record?.class?.id;
      const className = record?.class?.name;
      const subjectName = record?.subject?.subjectName;
      const teacherName = record?.teacher?.name;
      uniqueClasses.add(classid);
      // console.log(uniqueClasses);
      if (!subjectByClass[classid]) {
        subjectByClass[classid] = new Set();
      }
      subjectByClass[classid].add(subjectName);
      if (!teacherByClass[classid]) {
        teacherByClass[classid] = new Set();
      }
      teacherByClass[classid].add(teacherName);
      if (!classDetails[classid]) {
        classDetails[classid] = new Set();
      }
      classDetails[classid].add(className);
    });
    for (const sc in subjectByClass) {
      subjectByClass[sc] = Array.from(subjectByClass[sc]);
    }
    for (const sc in teacherByClass) {
      teacherByClass[sc] = Array.from(teacherByClass[sc]);
    }
    for (const sc in classDetails) {
      classDetails[sc] = Array.from(classDetails[sc]);
    }
    // console.log(uniqueClasses);
    res.status(200).json({
      uniqueClasses: Array.from(uniqueClasses),
      subjectByClass,
      teacherByClass,
      classDetails,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
