const { Admin } = require("../db");

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

module.exports = adminMiddleware;
