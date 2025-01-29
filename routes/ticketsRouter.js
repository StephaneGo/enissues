var express = require("express");
var { body, validationResult } = require("express-validator");
var ticketsService = require("../services/ticketsService");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { tickets: ticketsService.findAllTickets() });
});

router.post(
  "/",
  body("titre").trim().notEmpty().withMessage("Champ obligatoire"),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères"),
  (req, res) => {
    const { titre, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("index", {
        tickets: ticketsService.findAllTickets(),
        ticket: req.body,
        errors: errors.array(),
      });
      return;
    }

    ticketsService.addTicket(titre, description);

    res.redirect("/");
  }
);

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

router.post(
  "/:id/modifier",
  body("titre").trim().notEmpty().withMessage("Champ obligatoire"),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("modifier-ticket", {
        ticket: req.body,
        errors: errors.array(),
      });
      return;
    }
    const { id } = req.params;
    const { titre, description } = req.body;
    ticketsService.updateTicket(id, titre, description);
    res.redirect("/");
  }
);

router.get("/:id/supprimer", (req, res) => {
  const { id } = req.params;
  ticketsService.deleteTicket(id);
  res.redirect("/");
});

module.exports = router;
