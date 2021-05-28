//modulos que vamos a usar (siempre van de primeros!) 1
const express = require("express");
const router = express.Router();

//modulo de usuario 2
const User = require("../models/user");
//modulo para manejar las contraseñas encriptadas de nuestra DB 3
const bycrypt = require("bcrypt");

//hacemos un post porque vamos a enviar un dato a la db (ejemplo el boscador de google) 4
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Email o Password Incorrecto");

  const hash = await bycrypt.compare(req.body.password, user.password);

  if (!hash) return res.status(400).send("Email o Password Incorrecto");

  const jwtToken = user.generateJWT();
  return res.status(200).send({ jwtToken });
});

//exportamos el modulo
module.exports = router;
