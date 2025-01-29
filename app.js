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

app.listen(3000);
