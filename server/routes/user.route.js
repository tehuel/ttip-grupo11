const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

// "/user" endpoints
router.post("/authenticate", UserController.authenticate);
router.post("/register", UserController.register);
router.get("/current", UserController.getCurrent);
router.post("/addToFav", UserController.addToFav);
module.exports = router;
