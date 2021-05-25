//importamos los modulos 1
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//creamos esquema de la coleccion 2

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
});

//generamos el jwt para el usuario 3
userSchema.methods.generateJWT = () => {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      iat: moment().unix(),
    },
    "secretJWT"
  );
};

//creamos la colecion en la db 4
const User = mongoose.model("user", userSchema);

//exportamos el modulo (ultimo)
module.exports = User;
