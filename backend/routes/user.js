// importamos los modulos 1
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bycrypt = require("bcrypt");

//registrar usuario 2
router.post("/registerUser", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("El usuario ya existe");

  const hash = await bycrypt.hash(req.body.password, 10);

  user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  });

  const result = await user.save();
  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("Cant register user");
  }
});

//exportamos el modulo
module.exports = router;
