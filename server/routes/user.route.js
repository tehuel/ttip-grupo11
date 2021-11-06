const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

// "/user" endpoints
router.post("/authenticate", UserController.authenticate);
router.post("/register", UserController.register);
router.get("/current", UserController.getCurrent);
// router.get("/", UserController.getAll);
// router.get("/:id", UserController.getById);
// router.get("/check_availability/:email", UserController.checkAvailability);
// router.put("/:id", UserController.update);
// router.delete("/:id", UserController.delete);

module.exports = router;
