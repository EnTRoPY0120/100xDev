const jwt = require("jsonwebtoken");
const jwtPassword = "12345";
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const auth = req.headers.authorization;
  console.log(auth);
  try{
    jwt.verify(auth, jwtPassword);
    next();
  }
  catch(error){
    res.status(404).json({
      message: "You are not an authorized Admin",
    });
  }
}

module.exports = adminMiddleware;
