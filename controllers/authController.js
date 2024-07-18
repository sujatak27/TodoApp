const bcrypt = require("bcryptjs");

const signupForm = (req, res) => {
  res.render("signupForm");
};

const loginForm = (req, res) => {
  res.render("loginForm");
};

const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await User;
  } catch (err) {}
};

const login = async (req, res) => {};

module.exports = { signupForm, loginForm, signup, login };
