const express = require("express");
const router = express.Router();
const { get_banner_image, get_movies_by_genre, } = require("../controllers/movieController");
const { require_auth } = require("../middleware/auth");


router.get('/banner/:id',require_auth,get_banner_image)
router.get('/movies/:genre',get_movies_by_genre)

























module.exports = router;