const { Router } = require("express");

// Controller imports
const {
  signupForm,
  signup,
  loginForm,
  login,
} = require("../controllers/authController.js");

const router = Router();

// Sub Routes
router.get("/signup", signupForm);
router.post("/signup", signup);
router.get("/login", loginForm);
router.post("/login", login);

module.exports = router;
