const { Router } = require("express");
const { getAllPosts } = require("./controller");

const router = Router();

router.get("/", getAllPosts);

module.exports = router;
