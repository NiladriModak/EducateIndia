const errorHandler = require("../../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

exports.studentRegistration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All details missing",
        success: false,
      });
    }
    const exist = await prisma.Student.findUnique({
      where: {
        email,
      },
    });
    // console.log(exist);
    if (exist) {
      res.status(400).json({
        message: "student alreay exist",
        success: "false",
      });
      return;
    }
    // console.log(exist);
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const student = await prisma.Student.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });

    const options = {
      maxAge: 30 * 60 * 60 * 1000,
      httpOnly: true,
    };
    const token = jwt.sign(student.id, process.env.JWT_SECRET);
    res.status(200).cookie("token", token, options).json({
      success: true,
      student,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

exports.studentLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    return res.status(404).json({
      message: "All details missing",
      success: false,
    });
  }
  const exist = await prisma.Student.findUnique({
    where: {
      email,
    },
  });
  if (!exist) {
    return res.status(400).json({
      message: "Please sign up",
      success: false,
    });
  }
  const matchPassword = await bcrypt.compare(password, exist.password);
  if (!matchPassword) {
    return res.status(400).json({
      message: "Wrong Credentials ",
      success: false,
    });
  }
  const options = {
    maxAge: 30 * 60 * 60 * 1000,
    httpOnly: true,
  };
  const token = jwt.sign(exist.id, process.env.JWT_SECRET);
  res.status(200).cookie("token", token, options).json({
    success: true,
    student: exist,
    token,
  });
};

exports.teacherLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return next(new errorHandler("All details missing", 400));
  }
  const exist = await prisma.Teacher.findUnique({
    where: {
      email,
    },
  });
  console.log(exist);
  if (!exist) {
    return res.status(200).json({
      message: "Please sign up",
      success: false,
    });
  }
  const matchPassword = await bcrypt.compare(password, exist.password);
  console.log(matchPassword);
  if (!matchPassword) {
    return res.status(200).json({
      message: "Wrong Credentials ",
      success: false,
    });
  }
  const options = {
    maxAge: 30 * 60 * 60 * 1000,
    httpOnly: true,
  };
  const token = jwt.sign(exist.id, process.env.JWT_SECRET);
  res.status(200).cookie("token", token, options).json({
    success: true,
    teacher: exist,
    token,
  });
};

exports.teacherRegistration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Fill all details",
        success: false,
      });
    }

    const exist = await prisma.Teacher.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Teacher allready exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const teacher = await prisma.Teacher.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });
    res.status(200).json({
      teacher,
      success: true,
    });
  } catch (error) {
    return next(new errorHandler(error.message, error.statusCode));
  }
};

exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Fill all details",
        success: false,
      });
    }
    const exist = await prisma.Admin.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Teacher allready exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const admin = await prisma.Admin.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });
    res.status(200).json({
      admin,
      success: true,
    });
  } catch (error) {
    return next(new errorHandler(error.message, error.statusCode));
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return next(new errorHandler("All details missing", 400));
    }
    const exist = await prisma.Admin.findUnique({
      where: {
        email,
      },
    });
    console.log(exist);
    if (!exist) {
      return res.status(200).json({
        message: "Please sign up",
        success: false,
      });
    }
    const matchPassword = await bcrypt.compare(password, exist.password);
    console.log(matchPassword);
    if (!matchPassword) {
      return res.status(200).json({
        message: "Wrong Credentials ",
        success: false,
      });
    }
    const options = {
      maxAge: 30 * 60 * 60 * 1000,
      httpOnly: true,
    };
    const token = jwt.sign(exist.id, process.env.JWT_SECRET);
    res.status(200).cookie("token", token, options).json({
      success: true,
      admin: exist,
      token,
    });
  } catch (error) {
    next(new errorHandler(error.message, 400));
  }
};
