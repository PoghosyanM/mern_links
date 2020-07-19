const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("./../models/User");
const { check, validationResult } = require("express-validator");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Incorrect email during registration").isEmail(),
    check("password", "Min length is 6 symbols").isLength({
      min: 6,
      max: 30,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during registration",
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User already exist!" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User is created!" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter correct email").isEmail(),
    check("password", "Enter password").isLength({
      min: 6,
      max: 30,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during login",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Wrong password, please try again" });
      }

      const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

module.exports = router;
