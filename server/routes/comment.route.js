const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.controller");
const paginationMiddleware = require("express-pagination-middleware");
const CommentPagination = paginationMiddleware({
  sort: { default: "created" },
});

// "/user" endpoints
router.get("/", CommentPagination, CommentController.getComments);
router.post("/", CommentController.add);

module.exports = router;
