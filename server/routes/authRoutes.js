const express = require("express");
const authContollers = require("../controllers/authControllers");
const router = express.Router();

router.post("/login", authContollers.login);
router.post("/forgotPassword", authContollers.forgotPassword);
router.post("/resetPassword/:token", authContollers.resetPassword);

module.exports = router;
