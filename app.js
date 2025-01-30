const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connexion à MongoDB established : ", process.env.MONGODB_URI);
}).catch((error) => console.log("Connexion à MongoDB failed : ", error));

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

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
