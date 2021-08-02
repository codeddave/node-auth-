const User = require("../models/User");
const HttpError = require("../utils/httpError");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HttpError("Please provide email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new HttpError("User does not exist", 404));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new HttpError("Invalid Credentials", 404));
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const forgotPassword = (req, res, next) => {};
const resetPassword = (req, res, next) => {};

exports.login = login;
exports.register = register;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
