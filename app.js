const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let issues = [
  { id: 1, titre: "issue 1", description: "description 1" },
  { id: 2, titre: "issue 2", description: "description 2" },
  { id: 3, titre: "issue 3", description: "description 3" },
];

let idx = 4;

app.get(["/", "/issues"], (req, res) => {
  res.render("index", { issues });
});

app.post("/issues", (req, res) => {
  const { titre, description } = req.body;
  issues.push({ id: idx++, titre, description });
  res.redirect("/");
});

app.get("/issues/:id/modifier", (req, res) => {
  const { id } = req.params;
  const issue = issues.find((issue) => issue.id == id);
  res.render("modifier-issue", { issue });
});

app.post("/issues/:id/modifier", (req, res) => {
  const { id } = req.params;
  const { titre, description } = req.body;
  let index = issues.findIndex((issue) => issue.id == id);
  issues[index] = {
    id: id,
    titre: titre || issues[index].titre,
    description: description || issues[index].description,
  };
  res.redirect("/");
});

app.get("/issues/:id/supprimer", (req, res) => {
  const { id } = req.params;
  let index = issues.findIndex((issue) => issue.id == id);
  issues.splice(index, 1);
  res.redirect("/");
});

app.listen(3000);
