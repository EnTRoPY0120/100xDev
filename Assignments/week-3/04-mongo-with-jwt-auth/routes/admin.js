const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwtPassword = "12345";
const { Admin, Course } = require("../db/index.js");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const newAdmin = new Admin({
    username: username,
    password: password,
  });
  newAdmin.save().then(() => {
    console.log("New admin created successfully");
  });
  res.status(200).json({
    message: "New Admin created successfully",
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

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const newCourse = new Course({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.image,
    published: req.body.published,
  });
  newCourse.save().then(() => {
    res.status(200).json({
      message: `Course created successfully ${newCourse.id}`,
    });
  });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find().then((courses) => {
    res.status(200).json(courses);
  });
});

module.exports = router;

