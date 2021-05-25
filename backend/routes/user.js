// importamos los modulos 1
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bycrypt = require("bcrypt");

//registrar usuario 2
router.post("/registerUser", async (req, res) => {
  //validamos si existe en DB 2.1
  let user = await User.findOne({ email: req.body.email });
  //si existe decir que ya esta 2.2
  if (user) return res.status(400).send("El usuario ya existe");
  //encriptar el pss 2.3
  const hash = await bycrypt.hash(req.body.password, 10);
  //obtener los datos del usuario
  user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  });
  //guardas los datos del usuario capturados 2.4
  const result = await user.save();
  if (result) {
    //creamos el jwt para mandarlo si se crea el usuario 2.5
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("Cant register user");
  }
});

//exportamos el modulo
module.exports = router;
