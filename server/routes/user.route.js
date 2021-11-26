const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

// "/users" endpoints
router.post("/authenticate", UserController.authenticate);
router.post("/register", UserController.register);
router.get("/profile", UserController.getCurrent);
router.post("/addToFav", UserController.addToFav);
router.get("/myFavRecipes", UserController.myFavRecipes);
module.exports = router;
