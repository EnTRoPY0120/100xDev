const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://<user>:<password>@cluster0.74fkbrg.mongodb.net/course",
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
  purchasedCourses: [{ type: String }],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  id: String,
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
