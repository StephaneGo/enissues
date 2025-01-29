var express = require("express");
var ticketsService = require("../services/ticketsService");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { tickets: ticketsService.findAllTickets() });
});

router.post("/", (req, res) => {
  const { titre, description } = req.body;

  ticketsService.addTicket(titre, description);

  res.redirect("/");
});

router.get("/:id/modifier", (req, res) => {
  const { id } = req.params;
  const ticket = ticketsService.findTicketById(id);
  res.render("modifier-ticket", { ticket });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const ticket = ticketsService.findTicketById(id);
  res.render("detail-ticket", { ticket });
});

router.post("/:id/modifier", (req, res) => {
  const { id } = req.params;
  const { titre, description } = req.body;
  ticketsService.updateTicket(id, titre, description);
  res.redirect("/");
});

router.get("/:id/supprimer", (req, res) => {
  const { id } = req.params;
  ticketsService.deleteTicket(id);
  res.redirect("/");
});

module.exports = router;
