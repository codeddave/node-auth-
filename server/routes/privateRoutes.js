const express = require("express");
const router = express.Router();
const privateControllers = require("../controllers/privateController");

router.get("/", privateControllers.getPrivateData);

module.exports = router;
