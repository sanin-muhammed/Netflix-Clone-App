const express = require("express");
const { get_all_users, post_signup, post_login, verify_otp } = require("../controllers/authController");
const { require_auth } = require("../middleware/auth");
const router = express.Router();


router.post("/signup", post_signup);
router.post("/login", post_login);
router.post('/verify-otp', verify_otp)
router.get('/check',require_auth)
module.exports = router;
