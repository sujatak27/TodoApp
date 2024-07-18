const express = require("express");
const {signupForm, loginForm, signup, login}= require("../controllers/authController.js");



const router = express.Router();

router.get("/signup",signupForm);
router.get("/login",loginForm);
router.post("/signup",signup);
router.post("/login",login);



module.exports= router;