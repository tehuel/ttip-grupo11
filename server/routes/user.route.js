const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

// "/users" endpoints
router.post("/authenticate", UserController.authenticate);
router.post("/register", UserController.register);

router.get("/:userId", UserController.getProfile);
router.post("/:userId", UserController.updateProfile);

router.get("/myFavRecipes", UserController.myFavRecipes);
router.get("/myCreatedRecipes", UserController.myCreatedRecipes);

router.post("/addToFav", UserController.addToFav);

module.exports = router;
