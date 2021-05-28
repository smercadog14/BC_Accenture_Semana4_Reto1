//modulo jwt
const jwt = require("jsonwebtoken");
//validamos la autenticacion
const auth = (req, res, next) => {
  let jwtToken = req.header("Authorization");

  if (!jwtToken)
    return res.status(401).send("Autoriazicion rechazada: no hay un token");
  //si existe dividimos el actual jwt para quitar el "bearer", obtenemos el payload  para eso selecionamos la poscicion donde esta nuestro token, en este caso [1] 2.3
  jwtToken = jwtToken.split(" ")[1];

  if (!jwtToken)
    return res.status(401).send("Autorizacion rechazada: no hay un token");

  //validamos que el token recibido se el nuestro
  try {
    const payload = jwt.verify(jwtToken, "secretJWT");

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).send("Autorizacion rechazada: token no valido");
  }
};

//exportamos el modulo
module.exports = auth;
3;
