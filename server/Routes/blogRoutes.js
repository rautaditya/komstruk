const express = require("express");
const router = express.Router();

const blogController = require("../Controller/blogController");

const upload = require("../Middleware/upload");


const auth = require("../Middleware/authMiddleware");

router.post("/create",auth,upload.single("image"),blogController.createBlog);

module.exports = router;