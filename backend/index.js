//importamos los modulos que vamos a usar
const express = require("express");
const mongoose = require("mongoose");

//importamos nuestras rutas (routes)
const User = require("./routes/user");

//configuracion del servidor 1

const app = express();

app.use(express.json());
app.use("/api/user/", User);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("server on port", port));

//conexion con mongoDB 2
mongoose
  .connect("mongodb://localhost:27017/taskcreatorscrum", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Conection MongoDB ON"))
  .catch((err) => console.log("Failed To Conect MongoDB", err));
