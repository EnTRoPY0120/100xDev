const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { any } = require("zod");
const PORT = process.env.port || 3000;
app.use(express.json());
// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://<user>:<password>@sscluster0.74fkbrg.mongodb.net/course_store",
);
// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  purchasedCourses: { type: [String], default: [] },
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  id: Number,
  title: String,
  description: String,
  price: String,
  imageLink: String,
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const user = req.headers.username;
  const pass = req.headers.password;
  const isAdmin = Admin.find().then(
    (userId) => userId.username === user && userId.password === pass,
  );
  if (!isAdmin) {
    res.status(403).send("You are not authorized to login");
  } else {
    // res.status(200).send("You are authorized");
    next();
  }
}

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const user = req.headers.username;
  const pass = req.headers.password;
  const isUser = User.find().then(
    (userId) => userId.username === user && userId.password === pass,
  );
  if (!isUser) {
    res.status(403).send("Not an authorized User");
  } else {
    // res.status(200).send("Authorized user ");
    next();
  }
}

// Admin Routes
app.post("/admin/signup", (req, res) => {
  // Implement admin signup logic
  Admin.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json({
    message: "Admin created successfully",
  });
});

app.post("/admin/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  Course.create({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
    published: req.body.published,
  }).then(() => {
    res.status(201).json({
      message: `Course Created successfully`,
      courseId: `${req.body.id}`,
    });
  });
});

app.get("/admin/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find().then((courses) => {
    res.json(courses);
  });
});

// User Routes
app.post("/users/signup", (req, res) => {
  // Implement user signup logic
  User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.status(200).json({
    message: "User created successfully",
  });
});

app.get("/users/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find().then((courses) => {
    res.json(courses);
  });
});

app.post("/users/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = parseInt(req.params.courseId);
  const isCourse = Course.find().then((courses) => {
    if (courses.id !== courseId) {
      return false;
    } else {
      return true;
    }
  });
  if (!isCourse) {
    res.status(404).send("Failed to purchase the course");
  } else {
    User.findOne().then((user) => {
      user.purchasedCourses.push(courseId);
      user.save().then(() => {
        console.log("Course purchasedCourses successfully");
      });
    });
  }
});

app.get("/users/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  const userName = req.headers.username;

  User.findOne().then((user) => {
    if (user.username === userName) {
      const courses = user.purchasedCourses;
      res.status(200).json({
        courses,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
