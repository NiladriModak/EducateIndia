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
