const express = require("express");
const request = require("request");
var cache = require("express-redis-cache")();
var admin = require("firebase-admin");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

var credencialFirebase = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(credencialFirebase),
  databaseURL: "https://desafioRipley.firebaseio.com"
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/productos", cache.route({ expire: 120 }), function(req, res) {
  console.log("[consultar productos] INICIO  ");

  request(
    "https://simple.ripley.cl/api/v2/products?partNumbers=2000374667876P,2000372444561P,2000375722154P,2000369724997P,MPM00002893384,2000374667883P,2000374667913P,2000375441888P,2000371726989P",
    function(error, response, body) {
      var random =  Math.random()
      console.log("valor random: " + random);
      if (!error && response.statusCode == 200) {
        if (random < 0.15) {
          console.error(
            '[consultar productos] - ERROR correspondiente al error simulado del 15% (random < 0.15)'
          );
          //to-do: reintentar peticion
        } else {
          console.log("[consultar productos] OK");
          res.send(body);
        }
      }
    }
  );
});

app.post("/validarToken", function(req, res) {
  console.log("[validarToken] INICIO");
  admin
    .auth()
    .verifyIdToken(req.body.idToken)
    .then(function(decodedToken) {
      let uid = decodedToken.uid;
      res.status(200).send(uid);
    })
    .catch(function(error) {
      res.status(404).send("token invalido");
      console.error("[validarToken] error - token invalido");
    });
});

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
