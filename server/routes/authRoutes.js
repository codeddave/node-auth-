const express = require("express");
const authContollers = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", authContollers.register);
router.post("/login", authContollers.login);
router.post("/forgotPassword", authContollers.forgotPassword);
router.put("/resetPassword/:token", authContollers.resetPassword);

module.exports = router;
