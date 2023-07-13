const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
// Signup
userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
      res.json({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.json({ err: err });
        } else {
          const user = new userModel({
            email,
            password: hash,
          });
          await user.save();
          res.json({ msg: "user has been Registred.!", user: req.body });
        }
      });
    }
  } catch (error) {
    res.json({ err: error.message });
  }
});

//login

// userRouter.get("/loginget", (req, res) => {
//   res.json({ msg: "you are in login Router" });
// });

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, email: user.email },
            "masai"
          );
          res.json({ msg: "login successfully.", token });
        } else {
          res.json({ error: "worng email or password" });
        }
      });
    } else {
      res.json({ msg: "user does not exists." });
    }
  } catch (error) {
    res.json({ err: error.message });
  }
});

module.exports = { userRouter };
