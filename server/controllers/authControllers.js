const User = require("../models/User");
const HttpError = require("../utils/httpError");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new HttpError("Please provide email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      next(new HttpError("Invalid credentials", 404));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      next(new HttpError("Invalid Credentials", 404));
    }

    res.status(200).json({ token: "ogibcibkb" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const forgotPassword = (req, res, next) => {};
const resetPassword = (req, res, next) => {};

exports.login = login;
exports.register = register;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
