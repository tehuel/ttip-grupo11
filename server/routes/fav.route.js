const express = require("express");
const router = express.Router();

const FavController = require("../controllers/fav.controller");
const paginationMiddleware = require("express-pagination-middleware");
const FavPagination = paginationMiddleware({
  sort: { default: "created" },
});

// "/user" endpoints
router.get("/", FavPagination, FavController.getFavs);
router.post("/add", FavController.add);

module.exports = router;
