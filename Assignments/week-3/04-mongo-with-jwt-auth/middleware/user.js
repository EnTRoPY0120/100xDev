const jwt = require("jsonwebtoken");
const jwtPassword = "12345";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const auth = req.headers.authorization;
  console.log(auth);
  try {
    jwt.verify(auth, jwtPassword);
    next();
  } catch (error) {
    res.status(404).json({
      message: "You are not an authorized User",
    });
  }
}

module.exports = userMiddleware;
