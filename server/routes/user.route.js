const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

// "/users" endpoints
router.post("/authenticate", UserController.authenticate);
router.post("/register", UserController.register);
router.get("/current", UserController.getCurrent);

module.exports = router;
