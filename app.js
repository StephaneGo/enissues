const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

var indexRouter = require("./routes/indexRouter");
var ticketsRouter = require("./routes/ticketsRouter");

app.use("/", indexRouter);
app.use("/tickets", ticketsRouter);

app.use((req, res, next) => {
  res.status(404).render("erreur404");
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("erreur", { titre: "Erreur interne", erreur: err });
});

app.listen(3000);
