const express = require("express");
const router = express.Router();

const FollowageController = require("../controllers/followage.controller");
const paginationMiddleware = require("express-pagination-middleware");
const CommentPagination = paginationMiddleware({
  sort: { default: "created" },
});

// "/user" endpoints
//router.get("/", CommentPagination, FollowageController.getFollows);
router.get("/", FollowageController.getFollows);
router.post("/", FollowageController.add);
router.get("/following", FollowageController.getFollowing);

module.exports = router;
