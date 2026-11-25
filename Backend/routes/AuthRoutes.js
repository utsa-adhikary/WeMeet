const express = require("express");
const { requireAuth } = require("../middlewares/Authorization");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/me", requireAuth, AuthController.me);

module.exports = router;
