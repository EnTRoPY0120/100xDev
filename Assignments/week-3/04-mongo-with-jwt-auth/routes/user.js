const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const jwtPassword = "12345";
const { User, Course } = require("../db/index.js");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  res.status(200).json({
    message: "User created successfullly",
  });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const token = jwt.sign({ username, password }, jwtPassword);
  res.status(200).json({
    token: token,
  });
});

router.get("/courses", userMiddleware, (req, res) => {
  // Implement listing all courses logic
  Course.find().then((courses) => {
    res.status(200).json(courses);
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = parseInt(req.body.courseId);
  const isCourse = Course.find().then((courses) => {
    if (courses.id !== courseId) {
      return false;
    } else {
      return true;
    }
  });
  if (!isCourse) {
    res.status(404).json({
      message: "Failed to purchase the course",
    });
  } else {
    User.findOne().then((user) => {
      user.purchasedCourses.push(isCourse);
      user.save().then(() => {
        res.status(200).json({
          message: "Course purchased successfullly",
        });
      });
    });
  }
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
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

module.exports = router;
