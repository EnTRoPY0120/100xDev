const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin , Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  Admin.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json({
    message: "Admin created successfully",
  });
});

router.post("/courses", adminMiddleware, (req, res) => {
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

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find().then((courses) => {
    res.json(courses);
  });
});

module.exports = router;

