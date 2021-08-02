const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../models/User");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //const isCustomAuth = token.length < 500;
  if (!token) {
    return next(new HttpError("Not authorized to access this route", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = User.findById(decodedData.id);
    if (!user) return next(new HttpError("No user found with that id", 404));
    req.userId = decodedData.id;
    next();
  } catch (error) {
    return next(new HttpError("Not authorized to access this route", 401));
  }
};

momdule.exports = auth;
