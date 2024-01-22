const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.status(200).json({
    message: "User created successfully",
  });
});
router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find().then((courses) => {
    res.json(courses);
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
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

module.exports = router