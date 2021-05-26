//importamos modulos 1
const mongoose = require("mongoose");

//creamos coleccion de tablero 2

const boardSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  status: String,
  imageUrl: String,
  date: { type: Date, default: Date.now },
});

//collecion board 3
const Board = mongoose.model("board", boardSchema);

//exportamos el modulo 4
module.exports = Board;
