//importamos los modulos que vamos a usar
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
require("dotenv").config();

//importamos nuestras rutas (routes)
const Role = require("./routes/role");
const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");

//configuracion del servidor 1
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);
app.use("/api/role/", Role);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () =>
  console.log("Server Working on Port", process.env.PORT)
);

dbConnection();
