const express = require("express");
const request = require("request");
var cache = require("express-redis-cache")();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/productos", cache.route({expire: 120}), function(req, res) {
  request(
    "https://simple.ripley.cl/api/v2/products?partNumbers=2000374667876P,2000372444561P,2000375722154P,2000369724997P,MPM00002893384,2000374667883P,2000374667913P,2000375441888P,2000371726989P",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    }
  );
});


app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
