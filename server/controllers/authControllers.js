const crypto = require("crypto");
const User = require("../models/User");
const HttpError = require("../utils/httpError");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/SendEmail");
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
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new HttpError("Email could not be sent", 404));
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  try {
    await user.save();

    const resetUrl = `https://localhost:3000/resetpassword/${resetToken}`;
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please visit this link to reset your password</p>
      <a href=${resetUrl} clickTracking=off>${resetUrl}</a>`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new HttpError("Email could not be sent", 500));
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};
const resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken);

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new HttpError("Invalid Reset Token", 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({ message: "Reset Password success" });
  } catch (error) {}
};

exports.login = login;
exports.register = register;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
