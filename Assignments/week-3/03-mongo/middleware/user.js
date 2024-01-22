const { User } = require("../db");

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

module.exports = userMiddleware;
