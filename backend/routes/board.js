//importamos los modulos necesarios  1
const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");
const { find } = require("../models/board");

const findUser = (_idUser) => {
  const user = await User.findById(_idUser);

  if (!user) return res.status(401).send("El user no exite en db");
};

//registramos actividad sin imagen 2
router.post("/saveTask", Auth, async (req, res) => {
  findUser(req.user._id);

  const board = new Board({
    userId: user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
  });

  const result = await board.save();
  return res.status(200).send({ result });
});

//listar tareas
router.get("/listTask", Auth, async (req, res) => {
  findUser(req.user._id);

  const board = await Board.find({ userId: req.user._id });

  return res.status(200).send({ board });
});

//eliminar tarea
router.delete("/:_id", Auth, async (req, res) => {
  findUser(req.user._id);
  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(401).send("Error to delete task");
  return res.status(200).send({ mensaje: "task deleted" });
});

//esportamos el modulo 7
module.exports = router;
