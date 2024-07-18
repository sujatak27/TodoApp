const User = require("../models/userSchema.js");
const bcrypt = require("bcryptjs");

const signupForm = async (req, res) => {
  try {
    res.status(200).render("signupForm");
  } catch (err) {
    console.log("Error in signupForm controller", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginForm = (req, res) => {
  try {
    res.status(200).render("loginForm");
  } catch (err) {
    console.log("Error in loginForm controller", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { fullname, email, username, password, role } = req.body;
    if (!fullname || !email || !username || !password || !role) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname,
      email,
      username,
      password: hashedPassword,
      role,
    });

    newUser.password = "";

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (err) {
    console.log("Error in signup controller", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userObj = await User.findOne({ username });
    if (!userObj) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    const isCorrectPassword = await bcrypt.compare(password, userObj.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    res.status(200).json({ message: "User loggedin successfully" });
  } catch (err) {
    console.log("Error in login controller", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signupForm, signup, loginForm, login };
