//modulo jwt 1
const jwt = require("jsonwebtoken");
//validamos la autenticacion 2
const auth = (req, res, next) => {
  //revisamos el header en su parte de autorizacion 2.1
  let jwtToken = req.header("Authorization");
  //validamos si existe el jwt 2.2
  if (!jwtToken)
    return res.status(401).send("Autoriazicion rechazada: no hay un token");
  //si existe dividimos el actual jwt para quitar el "bearer", obtenemos el payload  para eso selecionamos la poscicion donde esta nuestro token, en este caso [1] 2.3
  jwtToken = jwtToken.split(" ")[1];
  //validamos si se hizo la division bien 2.4
  if (!jwtToken)
    return res.status(401).send("Autorizacion rechazada: no hay un token");

  //validamos que el token recibido se el nuestro 2.5
  try {
    //validamos la palabra secreta que nos trae el payload 2.5.1
    const payload = jwt.verify(jwtToken, "secretJWT");
    //asignamos el valor para poder contunuar 2.5.2
    req.user = payload;
    //continuamos 2.5.3
    next();
  } catch (error) {
    //validamos que no haya algun error y si lo hay lo capturamos y mandammos el mensaje 2.6
    return res.status(401).send("Autorizacion rechazada: token no valido");
  }
};

//exportamos el modulo
module.exports = auth;
3;
