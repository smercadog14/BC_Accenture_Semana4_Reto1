const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bycrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email o Password Incorrecto");

  const hash = await bycrypt.compare(req.body.password, user.password);

  if (!user.active || !hash)
    return res.status(400).send("Incorrect email or password");

  try {
    const jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (error) {
    return res.status(400).send("Error when you're login");
  }
});

//exportamos el modulo
module.exports = router;
