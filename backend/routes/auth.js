//modulos que vamos a usar (siempre van de primeros!) 1
const express = require("express");
const router = express.Router();

//modulo de usuario 2
const User = require("../models/user");
//modulo para manejar las contraseñas encriptadas de nuestra DB 3
const bycrypt = require("bcrypt");

//hacemos un post porque vamos a enviar un dato a la db (ejemplo el boscador de google) 4
router.post("/login", async (req, res) => {
  //buscamos el usuario (usamos el modelo user :D) 4.1
  const user = await User.findOne({ email: req.body.email });
  //validamos si encontreo un usuario que tenga el correo en la db
  if (!user) return res.status(400).send("Email o Password Incorrecto");
  //comparamos si el pass que recibimos en del front es el mismo de la db hasheado (encryptado)
  const hash = await bycrypt.compare(req.body.password, user.password);
  //si coincide o no procemos
  if (!hash) return res.status(400).send("Email o Password Incorrecto");
  //devolvemos la info del usuario encriptada como un token
  const jwtToken = user.generateJWT();
  return res.status(200).send({ jwtToken });
});

//exportamos el modulo
module.exports = router;
