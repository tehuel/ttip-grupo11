const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

// "/users" endpoints
router.post("/authenticate", UserController.authenticate);
router.post("/register", UserController.register);

router.post("/addToFav", UserController.addToFav);
router.post("/deleteFromFav", UserController.deleteFromFav);
router.get("/myFavRecipes", UserController.myFavRecipes);
router.get("/myCreatedRecipes", UserController.myCreatedRecipes);

router.get("/:userId", UserController.getProfile);
router.post("/:userId", UserController.updateProfile);

module.exports = router;
