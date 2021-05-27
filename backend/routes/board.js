//importamos los modulos necesarios  1
const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

//registramos actividad sin imagen 2
router.post("/saveTask", Auth, async (req, res) => {
  //buscamos usuario de la peticion 3
  const user = await User.findById(req.user._id);
  // si no se encuentra el usuario 4
  if (!user) return res.status(400).send("Usuario sin autenticado");
  // creamos la nueva tarea 5
  const board = new Board({
    userId: user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
  });
  //salvamos la nueva tarea 6
  const result = await board.save();

  return res.status(200).send({ result });
});

router.get("/listTask", Auth, async (req, res) => {
  //buscamos el id del usuario logeado
  const user = await User.findById(req.user._id);
  //validamos si el usuario no exite
  if (!user) return res.status(401).send("El user no exite en db");
  //si existe vamos a listar las tareas asignadas a nuestro usuario
  const board = await Board.find({ userId: req.user._id });
  //devolvemos un array con todos los documents que tengan un id que coincida
  return res.status(200).send({ board });
});

//esportamos el modulo 7
module.exports = router;
