const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const ErrorHandler = require("../utils/ErrorHandler");
const prisma = new PrismaClient();
exports.isAuth = async (req, res, next) => {
  // ("0");
  try {
    "came", req.headers.authorization;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      token;
      var decode = await jwt.verify(token, process.env.JWT_SECRET);

      req.student = await prisma.Student.findUnique({
        where: {
          id: decode,
        },
      });
      // ("sher aya", req.user);
      if (!req.user) {
        req.teacher = await prisma.Teacher.findUnique({
          where: {
            id: decode,
          },
        });
        // ("sher nhi aya", req.user);
      }
      next();
    } else {
      next(new ErrorHandler("Not authorized", 400));
    }
  } catch (error) {
    next(new ErrorHandler("Not authorized", 400));
  }
};

exports.isTeacher = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      var decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await prisma.Teacher.findUnique({
        where: {
          id: decode,
        },
      });

      next();
    }
  } catch (error) {
    next(new ErrorHandler("Not authorized", 400));
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      var decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await prisma.Admin.findUnique({
        where: {
          id: decode,
        },
      });

      next();
    }
  } catch (error) {
    next(new ErrorHandler("Not authorized", 400));
  }
};
