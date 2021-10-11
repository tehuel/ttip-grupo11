const express = require("express");
const router = express.Router();

const TagController = require("../controllers/tag.controller");

// /tags endpoints
router.get("/", TagController.getTags);
router.post("/", TagController.add);
router.put("/:name", TagController.update);
router.delete("/:name", TagController.delete);
router.get("/:name", TagController.getByName);

module.exports = router;
