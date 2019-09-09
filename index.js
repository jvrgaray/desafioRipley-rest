const express = require("express");
const request = require("request");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/productos", function(req, res) {
  console.log("en funcion get 0");
  request(
    "https://simple.ripley.cl/api/v2/products?partNumbers=2000374667876P,2000372444561P,2000375722154P,2000369724997P,MPM00002893384,2000374667883P,2000374667913P,2000375441888P,2000371726989P",
    function(error, response, body) {
      console.log("en funcion get 1");
      if (!error && response.statusCode == 200) {
        console.log("en funcion get 2");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(body);
      }
    }
  );
  //res.send('[GET]Saludos desde express');
});

app.post("/hola", function(req, res) {
  res.send("[POST]Saludos desde express");
});

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
