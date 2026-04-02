const User = require("../model/User.model"); // ⚠️ folder name check (models)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ msg: "All fields are required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ msg: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    res.json({ msg: "User Registered", user });

  } catch (err) {
    console.log(err);
    res.json({ msg: "Error in register", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ msg: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "1d" }
    );

    res.json({ msg: "Login success", token });

  } catch (err) {
    console.log(err);
    res.json({ msg: "Error in login", error: err.message });
  }
};