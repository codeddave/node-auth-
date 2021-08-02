const User = require("../models/User");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: " Please provide email and password" });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(404).json({ message: "Invalid Credentials" });
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
